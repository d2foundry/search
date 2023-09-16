import { AllDestinyManifestComponents, DestinyInventoryItemDefinition } from "bungie-api-ts/destiny2";
import { JsonValue, SearchDbItem, SearchDbItemWithMetadata, SearchKeywords, SearchValue } from "./types";
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
export declare function formatWeaponInventoryItemsToDb(weapons: DestinyInventoryItemDefinition[], defs: AllDestinyManifestComponents): SearchDbItemWithMetadata[];
export declare const weaponSearchOptionKeys: {
    name: "adept" | "ammo" | "craftable" | "energy" | "event" | "foundry" | "frame" | "name" | "perk" | "rarity" | "rpm" | "season" | "slot" | "source" | "sunset" | "trait_1" | "trait_2" | "weapon";
    getFn: (searchDbItem: SearchDbItem) => SearchValue;
}[];
