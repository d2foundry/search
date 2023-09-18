import { ClientSearchOptions } from "./types";
import { WeaponSearchDbItem, weaponSearchOptionKeys } from "@/weapons";

export const baseWeaponFuseOptions: ClientSearchOptions<WeaponSearchDbItem> = {
  // fuzzy match threshold, 0 = perfect, 1 = match anything
  threshold: 0.2,
  isCaseSensitive: false,
  ignoreLocation: false,
  ignoreFieldNorm: true,
  // we use this for sorting
  includeScore: true,
  // we have a custom sort fn
  shouldSort: false,
  // useful for keywords
  useExtendedSearch: true,
  keys: weaponSearchOptionKeys,
};
