import { TierType, AllDestinyManifestComponents } from "bungie-api-ts/destiny2";

export function getInventoryItem(
  inventoryItemHash: number,
  definitions: AllDestinyManifestComponents
) {
  const item = definitions.DestinyInventoryItemDefinition[inventoryItemHash];
  return item;
}

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
