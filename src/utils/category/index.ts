import { DestinyInventoryItemDefinition } from "bungie-api-ts/destiny2";

const WEAPONS_ITEM_CATEGORY = 1;
const DUMMIES_ITEM_CATEGORY = 3109687656;

export function hasWeaponItemCategory(item: DestinyInventoryItemDefinition) {
  return item.itemCategoryHashes?.includes(WEAPONS_ITEM_CATEGORY);
}

export function hasDummyItemCategory(item: DestinyInventoryItemDefinition) {
  return item.itemCategoryHashes?.includes(DUMMIES_ITEM_CATEGORY);
}

export default {
  hasWeaponItemCategory,
  hasDummyItemCategory,
};
