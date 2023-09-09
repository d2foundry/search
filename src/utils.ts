import {
  TierType,
  AllDestinyManifestComponents,
  DamageType,
} from "bungie-api-ts/destiny2";
import { compress, decompress } from "lz-string";

export function getInventoryItem(
  inventoryItemHash: number,
  definitions: AllDestinyManifestComponents
) {
  const item = definitions.DestinyInventoryItemDefinition[inventoryItemHash];
  return item;
}

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

// compress using LZ on server
export function compressJson(json: string) {
  return compress(json);
}

// decompress on client
export function decompressJson(compressed: string) {
  return decompress(compressed);
}
