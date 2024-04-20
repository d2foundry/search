import {
  DamageType,
  DestinyAmmunitionType,
  TierType,
} from "bungie-api-ts/destiny2";

export const getAmmoType = (ammoType: DestinyAmmunitionType) => {
  switch (ammoType) {
    case 1:
      return "Primary";
    case 2:
      return "Special";
    case 3:
      return "Heavy";
    default:
      return "";
  }
};

export const getEnergyFromDamageType = (damageType?: DamageType | null) => {
  switch (damageType) {
    case 1:
      return "kinetic";
    case 2:
      return "arc";
    case 3:
      return "solar";
    case 4:
      return "void";
    case 6:
      return "stasis";
    case 7:
      return "strand";
    default:
      return "";
  }
};

// transform bungie TierType to plain text
export function getRarityFromTierType(tier?: TierType) {
  switch (tier) {
    case 2:
      return "common";
    case 3:
      return "uncommon";
    case 4:
      return "rare";
    case 5:
      return "legendary";
    case 6:
      return "exotic";
    default:
      return "";
  }
}

export const getTierTypeFromRarity = (rarity?: string) => {
  switch (rarity) {
    case "common":
      return 2;
    case "uncommon":
      return 3;
    case "rare":
      return 4;
    case "legendary":
      return 5;
    case "exotic":
      return 6;
    default:
      return 0;
  }
};

export const getSlotFromSlotHash = (slotHash?: number | null) => {
  switch (slotHash) {
    case 1498876634:
      return "kinetic";
    case 2465295065:
      return "energy";
    case 953998645:
      return "power";
    default:
      return "";
  }
};
