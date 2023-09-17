import { weaponSearchOptionKeys } from "./reduceResolvers";
import { AllDestinyManifestComponents } from "bungie-api-ts/destiny2";
declare function buildSearchDatabase(defs: AllDestinyManifestComponents): import("./schema").WeaponSearchDbItem[];
declare function getSearchDbFromDestinyApi(): Promise<import("./schema").WeaponSearchDbItem[]>;
export type { KeywordType, WeaponSearchDbItem, WeaponSearchKeywords, WeaponSearchMetadataKeys, WeaponSearchKeywordSchema, WeaponSearchMetadataSchema, } from "./schema";
export type { KeywordDefinition } from "./types";
export { buildSearchDatabase, getSearchDbFromDestinyApi, weaponSearchOptionKeys, };
