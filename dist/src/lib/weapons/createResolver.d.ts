import { AllDestinyManifestComponents } from "bungie-api-ts/destiny2";
import { WeaponSearchKeywords, WeaponSearchMetadataSchema } from "./schema";
import { KeywordDefinition } from "./types";
export declare function createResolver<T extends WeaponSearchKeywords>(keywordDefiniton: KeywordDefinition<T>): KeywordDefinition<T>;
export declare function createMetadataResolver<T extends WeaponSearchMetadataSchema>(keywordDefiniton: (hash: number, defs: AllDestinyManifestComponents) => T): (hash: number, defs: AllDestinyManifestComponents) => T;
