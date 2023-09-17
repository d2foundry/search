import { AllDestinyManifestComponents } from "bungie-api-ts/destiny2";
import { WeaponSearchKeywordSchema, WeaponSearchKeywords, KeywordType } from "./schema";
import { SearchValue } from "src/types";
export interface KeywordDefinition<T extends WeaponSearchKeywords> {
    label: T;
    formatToDb: (inventoryItemHash: number, definitions: AllDestinyManifestComponents) => KeywordType<T>;
    getFromDb: (searchDbItem: WeaponSearchKeywordSchema) => SearchValue;
}
