import { AllDestinyManifestComponents } from "bungie-api-ts/destiny2";
import {
  getEnergyFromDamageType,
  getEventFromWatermark,
  getInventoryItem,
  getIsAdeptFromName,
  getRarityFromTierType,
  getSeasonNumberFromWatermark,
  getSlotFromSlotHash,
  getWatermark,
} from "./utils";
import craftableHashes from "@data/d2-additional-info/craftable-hashes.json";
import watermarkToFoundry from "@data/watermarkToFoundry.json";

import extendedFoundry from "@data/d2-additional-info/extended-foundry.json";
import adeptWeaponHashes from "@data/d2-additional-info/adept-weapon-hashes.json";
import { S22_EXOTICS, SOTL_2023 } from "./constants";

const SUNSET_MAX_POWER = 1310;

type JsonValue = string | number | boolean | string[] | number[] | null;

type SearchValue = string | string[];

// registered keywords for search
export type SearchKeywords =
  | "adept"
  | "ammo"
  | "craftable"
  | "energy"
  | "event"
  | "foundry"
  | "frame"
  | "name"
  | "rarity"
  | "rpm"
  | "season"
  | "slot"
  | "sunset"
  | "trait_1"
  | "trait_2"
  | "trait"
  | "weapon";

type SearchDbItem = Record<SearchKeywords, SearchValue>;

// Definition for a "Filter Keyword"
interface KeywordDefinition {
  // filter keyword
  label: SearchKeywords;
  // takes inventoryItemHash and D2 Manifest Components,
  // maps data relevant to this keyword to JSON-ok format
  formatToDb: (
    inventoryItemHash: number,
    definitions: AllDestinyManifestComponents
  ) => JsonValue;
  // takes searchDbItem and maps to format ready for Fuzzy Search
  // (may also need some additional parameter depending on how formatToDb goes)
  getFromDb: (searchDbItem: SearchDbItem) => SearchValue;
}

type KeywordDefinitionDictionary = Partial<{
  [key in KeywordDefinition["label"]]: Omit<KeywordDefinition, "label"> & {
    label: key;
  };
}>;

// search keywords keyed by name
export const keywordDictionary: KeywordDefinitionDictionary = {
  name: {
    label: "name",
    formatToDb: (hash, defs) => {
      const item = getInventoryItem(hash, defs);
      return item.displayProperties.name;
    },
    getFromDb: (item) => item.name,
  },
  rarity: {
    label: "rarity",
    formatToDb: (hash, defs) => {
      const item = getInventoryItem(hash, defs);
      const tierType = item.inventory?.tierType ?? 0;
      const rarity = getRarityFromTierType(tierType);
      return rarity;
    },
    getFromDb: (item) => item.rarity,
  },
  weapon: {
    label: "weapon",
    formatToDb: (hash, defs) => {
      const item = getInventoryItem(hash, defs);
      return item.itemTypeDisplayName;
    },
    getFromDb: (item) => item.weapon,
  },
  slot: {
    label: "slot",
    formatToDb: (hash, defs) => {
      const item = getInventoryItem(hash, defs);
      const slotHash = item.equippingBlock?.equipmentSlotTypeHash;
      const slot = getSlotFromSlotHash(slotHash);
      return slot;
    },
    getFromDb: (item) => item.slot,
  },
  sunset: {
    label: "sunset",
    formatToDb: (hash, defs) => {
      const item = getInventoryItem(hash, defs);
      const powerCapHash =
        item?.quality?.versions[item.quality.currentVersion].powerCapHash;

      if (typeof powerCapHash !== "undefined") {
        const powerCapDef = defs.DestinyPowerCapDefinition[powerCapHash];
        const isSunset = powerCapDef.powerCap < SUNSET_MAX_POWER;
        return isSunset;
      }
      return false;
    },
    getFromDb: (item) => item.sunset,
  },
  energy: {
    label: "energy",
    formatToDb: (hash, defs) => {
      const item = getInventoryItem(hash, defs);
      if (typeof item.defaultDamageTypeHash !== "undefined") {
        const damageType =
          defs.DestinyDamageTypeDefinition[item.defaultDamageTypeHash]
            .enumValue;
        const energy = getEnergyFromDamageType(damageType);
        return energy;
      }
      return null;
    },
    getFromDb: (item) => item.energy,
  },
  foundry: {
    label: "foundry",
    formatToDb: (hash, defs) => {
      const item = getInventoryItem(hash, defs);
      const hashString = item.hash.toString();
      let foundry = (
        (hashString in extendedFoundry
          ? extendedFoundry[hashString as keyof typeof extendedFoundry]
          : undefined) ??
        item.traitIds
          ?.find((trait) => trait.startsWith("foundry."))
          // tex_mechanica
          ?.replace("_", "-")
          ?.replace("x-m", "x m")
      )?.replace("foundry.", "");

      const secondaryIcon = item.secondaryIcon;
      if (secondaryIcon) {
        const foundFoundry =
          watermarkToFoundry[secondaryIcon as keyof typeof watermarkToFoundry];
        if (foundFoundry) {
          foundry = foundFoundry;
        }
      }
      return foundry ?? null;
    },
    getFromDb: (item) => item.foundry,
  },
  season: {
    label: "season",
    formatToDb: (hash, defs) => {
      const item = getInventoryItem(hash, defs);
      const quality = item.quality;
      const watermark =
        quality?.displayVersionWatermarkIcons[quality.currentVersion];
      let season = getSeasonNumberFromWatermark(watermark);

      if (S22_EXOTICS.includes(item.hash)) {
        season = 22;
      }
      return season;
    },
    getFromDb: (item) => item.season,
  },
  event: {
    label: "event",
    formatToDb: (hash, defs) => {
      const item = getInventoryItem(hash, defs);
      const watermark = getWatermark(item);
      const event = SOTL_2023.includes(item.hash)
        ? 4
        : getEventFromWatermark(watermark);

      return event;
    },
    getFromDb: (item) => item.event,
  },
  frame: {
    label: "frame",
    formatToDb: (hash, defs) => {
      const item = getInventoryItem(hash, defs);
      const frameHash = item.sockets?.socketEntries[0].singleInitialItemHash;
      const frameDef = frameHash ? getInventoryItem(frameHash, defs) : null;

      const frame = frameDef?.displayProperties.name ?? null;
      return frame;
    },
    getFromDb: (item) => item.frame,
  },
  adept: {
    label: "adept",
    formatToDb: (hash, defs) => {
      const item = getInventoryItem(hash, defs);

      const isAdept =
        adeptWeaponHashes.includes(item.hash) ||
        getIsAdeptFromName(item?.displayProperties.name);
      return isAdept;
    },
    getFromDb: (item) => item.adept,
  },
  craftable: {
    label: "craftable",
    formatToDb: (hash, defs) => {
      const item = getInventoryItem(hash, defs);

      const isCraftable = craftableHashes.includes(item.hash);
      return isCraftable;
    },
    getFromDb: (item) => item.craftable,
  },
};
