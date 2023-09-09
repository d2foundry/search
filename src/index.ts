import { AllDestinyManifestComponents } from "bungie-api-ts/destiny2";
import {
  getEnergyFromDamageType,
  getInventoryItem,
  getRarityFromTierType,
  getSlotFromSlotHash,
} from "./utils";

const SUNSET_MAX_POWER = 1310;

type JsonValue = string | number | boolean | string[] | number[];

type SearchValue = string | string[];

// registered keywords for search
export type SearchKeywords =
  | "name"
  | "rarity"
  | "weapon"
  | "trait"
  | "trait_1"
  | "trait_2"
  | "season"
  | "sunset"
  | "slot"
  | "craftable"
  | "adept"
  | "ammo"
  | "energy"
  | "rpm";

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
      return "";
    },
    getFromDb: (item) => item.energy,
  },
};
