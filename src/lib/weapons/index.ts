import { AllDestinyManifestComponents } from "bungie-api-ts/destiny2";
import { getWeaponInventoryItems } from "@/utils";
import { getManifest } from "@/dataSources/destinyManifest";
import reduceAllResolvers, { weaponSearchOptionKeys } from "./reduceResolvers";

function buildSearchDatabase(defs: AllDestinyManifestComponents) {
  const weapons = getWeaponInventoryItems(defs);
  const results = reduceAllResolvers(weapons, defs);
  return results;
}

async function getSearchDbFromDestinyApi() {
  const defs = await getManifest();
  const searchDb = buildSearchDatabase(defs);
  return searchDb;
}

export type {
  KeywordType,
  WeaponSearchDbItem,
  WeaponSearchKeywords,
  WeaponSearchMetadataKeys,
  WeaponSearchKeywordSchema,
  WeaponSearchMetadataSchema,
} from "./schema";
export type { KeywordDefinition } from "./types";
export {
  buildSearchDatabase,
  getSearchDbFromDestinyApi,
  weaponSearchOptionKeys,
};
