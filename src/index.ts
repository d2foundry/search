import { AllDestinyManifestComponents } from "bungie-api-ts/destiny2";
import { getInventoryItem, getRarityFromTierType } from "./utils";

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
};
