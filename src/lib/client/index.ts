import { ValueType, sorter } from "@/utils";
import type { WeaponSearchDbItem } from "@/weapons";
import type { ClientSearchResults } from "./types";
import { getTierTypeFromRarity } from "@/utils/mapping/itemProperties";

type ClientWeaponSearchResults = ClientSearchResults<WeaponSearchDbItem>;

export function sortWeaponResults(searchResults: ClientWeaponSearchResults) {
  if (searchResults?.length) {
    return searchResults.sort(
      sorter(
        // sunset should be below anything else
        { value: (val) => val.item.sunset, descending: false },
        // sort by fuse score as the real "sort"
        { value: "score", descending: true, type: ValueType.Number },
        // we prioritize Legendaries, then Exotics, then everything else
        {
          value: (val) => {
            const tier = getTierTypeFromRarity(val.item.rarity);
            return tier === 5 ? 7 : tier;
          },
          descending: true,
        },
        // if at this point items still match, just take the newest
        {
          value: (val) => val.item.season,
          descending: true,
          type: ValueType.Number,
        }
      )
    );
  }
  // return empty otherwise
  return [];
}
