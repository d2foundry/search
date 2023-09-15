import { AllDestinyManifestComponents, DestinyInventoryItemDefinition } from "bungie-api-ts/destiny2";
type JsonValue = string | number | boolean | JsonValue[] | null;
type SearchValue = string | string[];
export type SearchKeywords = "adept" | "ammo" | "craftable" | "energy" | "event" | "foundry" | "frame" | "name" | "perk" | "rarity" | "rpm" | "season" | "slot" | "source" | "sunset" | "trait_1" | "trait_2" | "weapon";
type SearchDbItem = Record<SearchKeywords, SearchValue>;
export interface KeywordDefinition {
    label: SearchKeywords;
    formatToDb: (inventoryItemHash: number, definitions: AllDestinyManifestComponents) => JsonValue;
    getFromDb: (searchDbItem: SearchDbItem) => SearchValue;
}
export type KeywordDefinitionDictionary = Partial<{
    [key in KeywordDefinition["label"]]: Omit<KeywordDefinition, "label"> & {
        label: key;
    };
}>;
export declare const keywordDictionary: KeywordDefinitionDictionary;
export declare function formatWeaponInventoryItemsToDb(weapons: DestinyInventoryItemDefinition[], defs: AllDestinyManifestComponents): SearchDbItem[];
export {};
