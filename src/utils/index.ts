import {
  TierType,
  AllDestinyManifestComponents,
  DamageType,
  DestinyInventoryItemDefinition,
  DestinyAmmunitionType,
} from "bungie-api-ts/destiny2";
import { compress, decompress } from "lz-string";
import watermarkToSeason from "@/data/d2-additional-info/watermark-to-season.json";
import watermarkToEvent from "@/data/d2-additional-info/watermark-to-event.json";
import { sourceLookup } from "@/data/sourceInfoToItemLookUp";
import { SocketPlugSources } from "../types";
import seasonTags from "@/data/d2-additional-info/season-tags.json";
import { D2EventInfo } from "@/data/d2-additional-info/d2-event-info";

export function getInventoryItem(
  inventoryItemHash: number,
  definitions: AllDestinyManifestComponents
) {
  const item = definitions.DestinyInventoryItemDefinition[inventoryItemHash];
  return item;
}

function getReusablePlugItems(
  plugSetHash: number,
  definitions: AllDestinyManifestComponents
) {
  const plugSetDef = plugSetHash
    ? definitions.DestinyPlugSetDefinition[plugSetHash].reusablePlugItems
    : [];
  return plugSetDef;
}

const isValidDisplayPlugCategory = (hash: number) => {
  return hash !== 2947756142; // activity tracker
};

function getValidPlugsForSocketType(
  socketTypeHash: number,
  defs: AllDestinyManifestComponents
) {
  // Get list of allowed plugs' hashes
  const plugWhitelist = new Set<number>();
  // Get SocketTypeDef
  const socketTypeDef =
    socketTypeHash && defs.DestinySocketTypeDefinition[socketTypeHash];

  if (!socketTypeDef) {
    return plugWhitelist;
  }

  socketTypeDef.plugWhitelist.forEach((entry) => {
    if (isValidDisplayPlugCategory(entry.categoryHash)) {
      plugWhitelist.add(entry.categoryHash);
    }
  });
  return plugWhitelist;
}

export function mapItemSocketsToInventoryItems(
  item: DestinyInventoryItemDefinition,
  defs: AllDestinyManifestComponents
): DestinyInventoryItemDefinition[][] {
  let perks: DestinyInventoryItemDefinition[][] = [];
  if (item?.sockets) {
    const { socketCategories, socketEntries } = item.sockets;

    const traitSocketDef = socketCategories.find(
      (x) => x.socketCategoryHash === 4241085061
    );

    if (traitSocketDef) {
      const { socketIndexes } = traitSocketDef;

      for (const index of socketIndexes) {
        const entry = socketEntries.at(index);
        if (!entry) {
          continue;
        }

        // Get PlugSetDefinition for given socket index
        const plugSetHash =
          entry?.reusablePlugSetHash || entry?.randomizedPlugSetHash || 0;

        const socketTypeHash = entry.socketTypeHash;
        const singleInitialItemHash = entry.singleInitialItemHash;

        if (
          (!plugSetHash &&
            entry?.plugSources &&
            entry.plugSources & SocketPlugSources.ReusablePlugItems) ||
          !socketTypeHash
        ) {
          continue;
        }

        const plugWhitelist = getValidPlugsForSocketType(socketTypeHash, defs);

        const initialItem = getInventoryItem(singleInitialItemHash, defs);

        const plugSetDef = getReusablePlugItems(plugSetHash, defs);

        if (
          initialItem &&
          !plugSetDef.find((p) => p.plugItemHash === initialItem.hash)
        ) {
          plugSetDef.push({
            plugItemHash: initialItem.hash,
            currentlyCanRoll: true,
            // curatedExclusive: true,
            craftingRequirements: {
              materialRequirementHashes: [],
              unlockRequirements: [],
            },
          });
        }

        const socketItemDefs = plugSetDef
          .map((curr) => {
            const inventoryItemDef = getInventoryItem(curr.plugItemHash, defs);
            // const sandboxPerkHash = inventoryItemDef.perks?.at(0)?.perkHash;
            // const sandboxPerk = sandboxPerkHash
            //   ? defs.DestinySandboxPerkDefinition[sandboxPerkHash]
            //   : null;

            return inventoryItemDef || null;
          })
          .filter((x): x is DestinyInventoryItemDefinition => x !== null)
          .filter(
            (x) =>
              x.plug?.plugCategoryHash &&
              plugWhitelist.has(x.plug.plugCategoryHash)
          );
        if (socketItemDefs.length) {
          perks.push(socketItemDefs);
        }
      }
    }
  }

  return perks;
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

export const getSeasonNumberFromWatermark = (watermarkSrc?: string) => {
  if (!watermarkSrc) return null;
  const strippedSrc = watermarkSrc.replace("https://www.bungie.net", "");
  const watermarkItem =
    watermarkToSeason[strippedSrc as keyof typeof watermarkToSeason];
  if (!watermarkItem) return null;

  return watermarkItem;
};

const reverseSeasonTagLookup = Object.fromEntries(
  Object.entries(seasonTags).map(([k, v]) => [v.toString(), k])
);

export const getSeasonNameFromNumber = (season?: number) => {
  // const season = item.season;
  // const event = item.event;

  if (!season) return "";
  // if (event) {
  //   const tag = D2EventInfo[event as keyof typeof D2EventInfo];

  //   return `${tag.name}`;
  // }
  if (!season) return "";

  const tag = reverseSeasonTagLookup[season.toString()];
  return `${tag}`;
};

export const getEventFromNumber = (event?: number) => {
  // const season = item.season;
  // const event = item.event;
  if (event) {
    const tag = D2EventInfo[event as keyof typeof D2EventInfo];

    return `${tag.name}`;
  }
};
export const getEventFromWatermark = (watermarkSrc?: string) => {
  if (!watermarkSrc) return null;
  const strippedSrc = watermarkSrc.replace("https://www.bungie.net", "");
  const watermarkItem =
    watermarkToEvent[strippedSrc as keyof typeof watermarkToEvent];
  if (!watermarkItem) return null;

  return watermarkItem;
};

const WEAPONS_ITEM_CATEGORY = 1;
const DUMMIES_ITEM_CATEGORY = 3109687656;

export function hasWeaponItemCategory(item: DestinyInventoryItemDefinition) {
  return item.itemCategoryHashes?.includes(WEAPONS_ITEM_CATEGORY);
}

export function hasDummyItemCategory(item: DestinyInventoryItemDefinition) {
  return item.itemCategoryHashes?.includes(DUMMIES_ITEM_CATEGORY);
}

const Y1_ACRIUS_HASH = 1744115122;
function isValidWeaponItem(item: DestinyInventoryItemDefinition) {
  return !!(
    hasWeaponItemCategory(item) &&
    !hasDummyItemCategory(item) &&
    item.hash !== Y1_ACRIUS_HASH
  );
}
export function getWeaponInventoryItems(defs: AllDestinyManifestComponents) {
  const itemDefs = defs.DestinyInventoryItemDefinition;
  return Object.values(itemDefs).filter(isValidWeaponItem);
}

// itemDef.itemCategoryHashes?.includes(1) &&
// !itemDef.itemCategoryHashes.includes(3109687656) &&
// itemDef.hash !== 1744115122 // acrius

export const getIsAdeptFromName = (name: string) =>
  name.search(/(Adept|Timelost|Harrowed)/) !== -1;

export const getBungieApiUrl = (url: string) => `https://www.bungie.net${url}`;

// compress using LZ on server
export function compressJson(json: string) {
  return compress(json);
}

// decompress on client
export function decompressJson(compressed: string) {
  return decompress(compressed);
}

export { default as sorter, ValueType } from "./sorter";
