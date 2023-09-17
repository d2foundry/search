import { AllDestinyManifestComponents } from "bungie-api-ts/destiny2";
import {
  WeaponSearchKeywordSchema,
  WeaponSearchKeywords,
  KeywordType,
} from "./schema";
import { SearchValue } from "src/types";

export interface KeywordDefinition<T extends WeaponSearchKeywords> {
  // filter keyword
  label: T;
  // takes inventoryItemHash and D2 Manifest Components,
  // maps data relevant to this keyword to JSON-ok format
  formatToDb: (
    inventoryItemHash: number,
    definitions: AllDestinyManifestComponents
  ) => KeywordType<T>;
  // takes searchDbItem and maps to format ready for Fuzzy Search
  // (may also need some additional parameter depending on how formatToDb goes)
  getFromDb: (searchDbItem: WeaponSearchKeywordSchema) => SearchValue;
}
