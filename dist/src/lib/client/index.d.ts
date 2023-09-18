import type { WeaponSearchDbItem } from "@/weapons";
import type { ClientSearchResults } from "./types";
type ClientWeaponSearchResults = ClientSearchResults<WeaponSearchDbItem>;
export declare function sortWeaponResults(searchResults: ClientWeaponSearchResults): import("./types").ClientSearchResultItem<WeaponSearchDbItem>[];
export {};
