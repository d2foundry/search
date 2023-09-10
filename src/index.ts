import { AllDestinyManifestComponents } from "bungie-api-ts/destiny2";
import {
  getAmmoType,
  getEnergyFromDamageType,
  getEventFromWatermark,
  getInventoryItem,
  getIsAdeptFromName,
  getItemSource,
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
  | "source"
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
  ammo: {
    label: "ammo",
    formatToDb: (hash, defs) => {
      const item = getInventoryItem(hash, defs);
      const ammoType = item.equippingBlock?.ammoType;
      if (typeof ammoType !== "undefined") {
        const ammo = getAmmoType(ammoType);
        return ammo;
      }
      return null;
    },
    getFromDb: (item) => item.ammo,
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
  rpm: {
    label: "rpm",
    formatToDb: (hash, defs) => {
      const item = getInventoryItem(hash, defs);
      const rpm = item.stats?.stats[4284893193]?.value ?? null;
      return rpm;
    },
    getFromDb: (item) => item.rpm,
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
  source: {
    label: "source",
    formatToDb: (hash, defs) => {
      const item = getInventoryItem(hash, defs);
      const collectible = item.collectibleHash
        ? defs.DestinyCollectibleDefinition[item.collectibleHash]
        : undefined;
      const sourceHash = collectible?.sourceHash;
      const source = getItemSource(item.hash, sourceHash);
      return source;
    },
    getFromDb: (item) => item.source,
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
  weapon: {
    label: "weapon",
    formatToDb: (hash, defs) => {
      const item = getInventoryItem(hash, defs);
      return item.itemTypeDisplayName;
    },
    getFromDb: (item) => item.weapon,
  },
};
