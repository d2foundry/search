import { AllDestinyManifestComponents } from "bungie-api-ts/destiny2";

type JsonValue = string | number | boolean | string[] | number[];
type SearchValue = string | string[];

interface SearchDbItem {
  hash: number;
  name: string;
}

// Definition for a "Filter Key"
interface Key {
  // filter keyword
  name: string;
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

export const keys: Key[] = [
  {
    name: "displayName",
    formatToDb: (hash, definitions) => {
      const item = definitions.DestinyInventoryItemDefinition[hash];
      return item.displayProperties.name;
    },
    getFromDb: (item) => item.name,
  },
];
