import { DamageType, DestinyAmmunitionType, TierType } from "bungie-api-ts/destiny2";
export declare const getAmmoType: (ammoType: DestinyAmmunitionType) => "" | "Primary" | "Special" | "Heavy";
export declare const getEnergyFromDamageType: (damageType?: DamageType | null) => "" | "kinetic" | "arc" | "solar" | "void" | "stasis" | "strand";
export declare function getRarityFromTierType(tier?: TierType): "" | "common" | "uncommon" | "rare" | "legendary" | "exotic";
export declare const getTierTypeFromRarity: (rarity?: string) => 0 | 2 | 4 | 3 | 5 | 6;
export declare const getSlotFromSlotHash: (slotHash?: number | null) => "" | "kinetic" | "energy" | "power";
