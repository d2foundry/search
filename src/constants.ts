import { AllDestinyManifestComponents } from "bungie-api-ts/destiny2";
export const SUNSET_MAX_POWER = 1310;

export const SOTL_2023 = [3103255595, 3871226707, 177568179, 413901114];
export const S22_EXOTICS = [2188764214, 46125926];

export const MANIFEST_SLICES = [
  "DestinyInventoryItemDefinition",
  "DestinyPlugSetDefinition",
  "DestinyStatDefinition",
  "DestinyPowerCapDefinition",
  "DestinyCollectibleDefinition",
  "DestinyStatGroupDefinition",
  "DestinyDamageTypeDefinition",
  "DestinySocketTypeDefinition",
  "DestinySandboxPerkDefinition",
] as (keyof AllDestinyManifestComponents)[];
