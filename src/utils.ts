import {
  TierType,
  AllDestinyManifestComponents,
  DamageType,
  DestinyInventoryItemDefinition,
  DestinyAmmunitionType,
} from "bungie-api-ts/destiny2";
import { compress, decompress } from "lz-string";
import watermarkToSeason from "@data/d2-additional-info/watermark-to-season.json";
import watermarkToEvent from "@data/d2-additional-info/watermark-to-event.json";
import { sourceLookup } from "@data/sourceInfoToItemLookUp";

export function getInventoryItem(
  inventoryItemHash: number,
  definitions: AllDestinyManifestComponents
) {
  const item = definitions.DestinyInventoryItemDefinition[inventoryItemHash];
  return item;
}

export function getWatermark(item: DestinyInventoryItemDefinition) {
  const quality = item.quality;
  const watermark =
    quality?.displayVersionWatermarkIcons[quality.currentVersion];
  return watermark;
}

export const getItemSource = (
  itemHash: number,
  sourceHash?: number
): string | string[] => {
  if (sourceHash && sourceLookup[sourceHash]) {
    return sourceLookup[sourceHash];
  } else if (itemHash && sourceLookup[itemHash]) {
    return sourceLookup[itemHash];
  }
  return "";
};

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
export const getSeasonNumberFromWatermark = (watermarkSrc?: string) => {
  if (!watermarkSrc) return null;
  const strippedSrc = watermarkSrc.replace("https://www.bungie.net", "");
  const watermarkItem =
    watermarkToSeason[strippedSrc as keyof typeof watermarkToSeason];
  if (!watermarkItem) return null;

  return watermarkItem;
};

export const getEventFromWatermark = (watermarkSrc?: string) => {
  if (!watermarkSrc) return null;
  const strippedSrc = watermarkSrc.replace("https://www.bungie.net", "");
  const watermarkItem =
    watermarkToEvent[strippedSrc as keyof typeof watermarkToEvent];
  if (!watermarkItem) return null;

  return watermarkItem;
};
export const getIsAdeptFromName = (name: string) =>
  name.search(/(Adept|Timelost|Harrowed)/) !== -1;

// compress using LZ on server
export function compressJson(json: string) {
  return compress(json);
}

// decompress on client
export function decompressJson(compressed: string) {
  return decompress(compressed);
}
