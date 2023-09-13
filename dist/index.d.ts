declare module "constants" {
    export const SOTL_2023: number[];
    export const S22_EXOTICS: number[];
}
declare module "data/d2-additional-info/source-info" {
    const D2Sources: {
        [key: string]: {
            itemHashes: number[];
            sourceHashes: number[];
            searchString: string[];
        };
    };
    export default D2Sources;
}
declare module "data/d2-additional-info/missing-source-info" {
    const missingSources: {
        [key: string]: number[];
    };
    export default missingSources;
}
declare module "data/sourceInfoToItemLookUp" {
    export const sourceLookup: {
        [key: number]: string[];
    };
}
declare module "types" {
    export enum SocketPlugSources {
        /** If there's no way we can detect to insert new plugs. */
        None = 0,
        /**
         * Use plugs found in the player's inventory, based on the socket type rules (see
         * DestinySocketTypeDefinition for more info)
         *
         * Note that a socket - like Shaders - can have *both* reusable plugs and inventory
         * items inserted theoretically.
         */
        InventorySourced = 1,
        /**
         * Use the DestinyItemSocketsComponent.sockets.reusablePlugs property to determine
         * which plugs are valid for this socket. This may have to be combined with other
         * sources, such as plug sets, if those flags are set.
         *
         * Note that "Reusable" plugs may not necessarily come from a plug set, nor from
         * the "reusablePlugItems" in the socket's Definition data. They can sometimes be "
         * randomized" in which case the only source of truth at the moment is still the
         * runtime DestinyItemSocketsComponent.sockets.reusablePlugs property.
         */
        ReusablePlugItems = 2,
        /**
         * Use the ProfilePlugSets (DestinyProfileResponse.profilePlugSets) component data
         * to determine which plugs are valid for this socket.
         */
        ProfilePlugSet = 4,
        /**
         * Use the CharacterPlugSets (DestinyProfileResponse.characterPlugSets) component
         * data to determine which plugs are valid for this socket.
         */
        CharacterPlugSet = 8
    }
}
declare module "utils" {
    import { TierType, AllDestinyManifestComponents, DamageType, DestinyInventoryItemDefinition, DestinyAmmunitionType } from "bungie-api-ts/destiny2";
    export function getInventoryItem(inventoryItemHash: number, definitions: AllDestinyManifestComponents): DestinyInventoryItemDefinition;
    export function mapItemSocketsToInventoryItems(item: DestinyInventoryItemDefinition, defs: AllDestinyManifestComponents): DestinyInventoryItemDefinition[][];
    export function getWatermark(item: DestinyInventoryItemDefinition): string | undefined;
    export const getItemSource: (itemHash: number, sourceHash?: number) => string | string[];
    export const getAmmoType: (ammoType: DestinyAmmunitionType) => "" | "Primary" | "Special" | "Heavy";
    export const getEnergyFromDamageType: (damageType?: DamageType | null) => "" | "kinetic" | "arc" | "solar" | "void" | "stasis" | "strand";
    export const getSlotFromSlotHash: (slotHash?: number | null) => "" | "kinetic" | "energy" | "power";
    export function getRarityFromTierType(tier?: TierType): "common" | "uncommon" | "rare" | "legendary" | "exotic" | "";
    export const getSeasonNumberFromWatermark: (watermarkSrc?: string) => number | null;
    export const getEventFromWatermark: (watermarkSrc?: string) => number | null;
    export const getIsAdeptFromName: (name: string) => boolean;
    export function compressJson(json: string): string;
    export function decompressJson(compressed: string): string;
}
declare module "keywords" {
    import { AllDestinyManifestComponents } from "bungie-api-ts/destiny2";
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
    export const keywordDictionary: KeywordDefinitionDictionary;
}
declare module "index" {
    export { keywordDictionary } from "keywords";
    export type { KeywordDefinition, KeywordDefinitionDictionary, SearchKeywords, } from "keywords";
    export { decompressJson, compressJson } from "utils";
}
declare module "__test__/utils.test" { }
declare module "data/d2-additional-info/d2-event-info" {
    export const enum D2EventEnum {
        DAWNING = 1,
        CRIMSON_DAYS = 2,
        SOLSTICE_OF_HEROES = 3,
        FESTIVAL_OF_THE_LOST = 4,
        REVELRY = 5,
        GUARDIAN_GAMES = 6
    }
    export const D2EventInfo: {
        1: {
            name: string;
            shortname: string;
            sources: number[];
            engram: number[];
        };
        2: {
            name: string;
            shortname: string;
            sources: number[];
            engram: number[];
        };
        3: {
            name: string;
            shortname: string;
            sources: number[];
            engram: number[];
        };
        4: {
            name: string;
            shortname: string;
            sources: number[];
            engram: number[];
        };
        5: {
            name: string;
            shortname: string;
            sources: number[];
            engram: number[];
        };
        6: {
            name: string;
            shortname: string;
            sources: number[];
            engram: never[];
        };
    };
    export type D2EventIndex = keyof typeof D2EventInfo;
    export const D2EventPredicateLookup: {
        dawning: D2EventEnum;
        crimsondays: D2EventEnum;
        solstice: D2EventEnum;
        fotl: D2EventEnum;
        revelry: D2EventEnum;
        games: D2EventEnum;
    };
    export const D2SourcesToEvent: {
        464727567: D2EventEnum;
        547767158: D2EventEnum;
        629617846: D2EventEnum;
        2364515524: D2EventEnum;
        3092212681: D2EventEnum;
        3952847349: D2EventEnum;
        4054646289: D2EventEnum;
        2502262376: D2EventEnum;
        151416041: D2EventEnum;
        641018908: D2EventEnum;
        1666677522: D2EventEnum;
        3724111213: D2EventEnum;
        1054169368: D2EventEnum;
        1677921161: D2EventEnum;
        1919933822: D2EventEnum;
        3190938946: D2EventEnum;
        3693722471: D2EventEnum;
        4041583267: D2EventEnum;
        2187511136: D2EventEnum;
        611838069: D2EventEnum;
        2006303146: D2EventEnum;
        2011810450: D2EventEnum;
        2473294025: D2EventEnum;
        3388021959: D2EventEnum;
    };
}
declare module "data/d2-additional-info/exotics-with-catalysts" {
    const exoticWeaponHashesWithCatalyst: Set<number>;
    export default exoticWeaponHashesWithCatalyst;
}
