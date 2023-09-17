import { AllDestinyManifestComponents } from "bungie-api-ts/destiny2";
import { WeaponSearchKeywords, WeaponSearchMetadataSchema } from "./schema";
import { KeywordDefinition } from "./types";

// identity functions. could be used later on to apply middleware ? idk
// is it weird that one takes a cb and the other takes an object literal? who knows!
// eventually these should be moved up to some sort of higher level library thing,
// but for now they're here
export function createResolver<T extends WeaponSearchKeywords>(
  keywordDefiniton: KeywordDefinition<T>
) {
  return keywordDefiniton;
}

export function createMetadataResolver<T extends WeaponSearchMetadataSchema>(
  keywordDefiniton: (hash: number, defs: AllDestinyManifestComponents) => T
) {
  return keywordDefiniton;
}
