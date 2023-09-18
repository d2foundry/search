export interface WeaponSearchKeywordSchema {
  adept: boolean;
  ammo: string;
  craftable: boolean;
  energy?: string;
  event?: string;
  foundry?: string;
  frame?: string;
  name: string;
  perk: string[];
  rarity: string;
  rpm?: number;
  season?: number;
  slot: string;
  source?: string | string[];
  sunset: boolean;
  trait_1: string[];
  trait_2: string[];
  weapon: string;
  zoom?: number;
}

export interface WeaponSearchMetadataSchema {
  hash: number;
  iconSrc: string;
  watermarkSrc?: string;
}

export type WeaponSearchDbItem = WeaponSearchKeywordSchema &
  WeaponSearchMetadataSchema;

// convenience types
export type WeaponSearchKeywords = keyof WeaponSearchKeywordSchema;
export type WeaponSearchMetadataKeys = keyof WeaponSearchMetadataSchema;

export type KeywordType<T extends WeaponSearchKeywords> =
  WeaponSearchKeywordSchema[T];
