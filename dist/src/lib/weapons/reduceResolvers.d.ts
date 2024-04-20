import { AllDestinyManifestComponents, DestinyInventoryItemDefinition } from "bungie-api-ts/destiny2";
import { WeaponSearchDbItem, WeaponSearchKeywordSchema } from "./schema";
export default function reduceAllResolvers(weapons: DestinyInventoryItemDefinition[], defs: AllDestinyManifestComponents): WeaponSearchDbItem[];
export declare const weaponSearchOptionKeys: {
    name: "adept" | "ammo" | "craftable" | "energy" | "event" | "foundry" | "frame" | "name" | "perk" | "rarity" | "rpm" | "season" | "slot" | "source" | "sunset" | "trait_1" | "trait_2" | "weapon" | "zoom";
    getFn: (searchDbItem: WeaponSearchKeywordSchema) => import("../../types").SearchValue;
}[];
