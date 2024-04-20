import {
  AllDestinyManifestComponents,
  DestinyInventoryItemDefinition,
} from "bungie-api-ts/destiny2";
import { SocketPlugSources } from "../../types";
import { hasDummyItemCategory, hasWeaponItemCategory } from "../category";

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

export const getIsAdeptFromName = (name: string) =>
  name.search(/(Adept|Timelost|Harrowed)/) !== -1;
