import { createMetadataResolver, createResolver } from "./createResolver";
import craftableHashes from "@/data/d2-additional-info/craftable-hashes.json";
import watermarkToFoundry from "@/data/watermarkToFoundry.json";

import extendedFoundry from "@/data/d2-additional-info/extended-foundry.json";
import adeptWeaponHashes from "@/data/d2-additional-info/adept-weapon-hashes.json";
import { S22_EXOTICS, SOTL_2023, SUNSET_MAX_POWER } from "./constants";
import { getBungieApiUrl } from "src/utils/url";
import {
  getEventFromNumber,
  getEventFromWatermark,
  getItemSource,
  getSeasonNumberFromWatermark,
} from "src/utils/mapping/sources";
import {
  getInventoryItem,
  getIsAdeptFromName,
  getWatermark,
  mapItemSocketsToInventoryItems,
} from "src/utils/items";
import {
  getAmmoType,
  getEnergyFromDamageType,
  getRarityFromTierType,
  getSlotFromSlotHash,
} from "@/utils/mapping/itemProperties";

const adept = createResolver({
  label: "adept",
  formatToDb: (hash, defs) => {
    const item = getInventoryItem(hash, defs);

    const isAdept =
      adeptWeaponHashes.includes(item.hash) ||
      getIsAdeptFromName(item?.displayProperties.name);
    return isAdept;
  },
  getFromDb: (item) => `${item.adept}`,
});

const ammo = createResolver({
  label: "ammo",
  formatToDb: (hash, defs) => {
    const item = getInventoryItem(hash, defs);
    const ammoType = item.equippingBlock?.ammoType;
    if (typeof ammoType !== "undefined") {
      const ammo = getAmmoType(ammoType);
      return ammo;
    }
    return "";
  },
  getFromDb: (item) => item.ammo,
});

const craftable = createResolver({
  label: "craftable",
  formatToDb: (hash, defs) => {
    const item = getInventoryItem(hash, defs);

    const isCraftable = craftableHashes.includes(item.hash);
    return isCraftable;
  },
  getFromDb: (item) => `${item.craftable}`,
});

const energy = createResolver({
  label: "energy",
  formatToDb: (hash, defs) => {
    const item = getInventoryItem(hash, defs);
    if (typeof item.defaultDamageTypeHash !== "undefined") {
      const damageType =
        defs.DestinyDamageTypeDefinition[item.defaultDamageTypeHash].enumValue;
      const energy = getEnergyFromDamageType(damageType);
      return energy;
    }
    return undefined;
  },
  getFromDb: (item) => item.energy ?? "",
});

const event = createResolver({
  label: "event",
  formatToDb: (hash, defs) => {
    const item = getInventoryItem(hash, defs);
    const watermark = getWatermark(item);
    const eventNumber = SOTL_2023.includes(item.hash)
      ? 4
      : getEventFromWatermark(watermark);

    const event = getEventFromNumber(eventNumber ?? undefined);

    return event;
  },
  getFromDb: (item) => item.event ?? "",
});

const foundry = createResolver({
  label: "foundry",
  formatToDb: (hash, defs) => {
    const item = getInventoryItem(hash, defs);
    const hashString = item.hash.toString();
    let foundry = (
      (hashString in extendedFoundry
        ? extendedFoundry[hashString as keyof typeof extendedFoundry]
        : undefined) ??
      item.traitIds
        ?.find((trait) => trait.startsWith("foundry."))
        // tex_mechanica
        ?.replace("_", "-")
        ?.replace("x-m", "x m")
    )?.replace("foundry.", "");

    const secondaryIcon = item.secondaryIcon;
    if (secondaryIcon) {
      const foundFoundry =
        watermarkToFoundry[secondaryIcon as keyof typeof watermarkToFoundry];
      if (foundFoundry) {
        foundry = foundFoundry;
      }
    }
    return foundry;
  },
  getFromDb: (item) => item.foundry ?? "",
});

const frame = createResolver({
  label: "frame",
  formatToDb: (hash, defs) => {
    const item = getInventoryItem(hash, defs);
    const frameHash = item.sockets?.socketEntries[0].singleInitialItemHash;
    const frameDef = frameHash ? getInventoryItem(frameHash, defs) : undefined;

    const frame = frameDef?.displayProperties.name ?? undefined;
    return frame;
  },
  getFromDb: (item) => item.frame ?? "",
});

const name = createResolver({
  label: "name",
  formatToDb: (hash, defs) => {
    const item = getInventoryItem(hash, defs);
    return item.displayProperties.name;
  },
  getFromDb: (item) => item.name,
});

const perk = createResolver({
  label: "perk",
  formatToDb: (hash, defs) => {
    const item = getInventoryItem(hash, defs);
    let perks = mapItemSocketsToInventoryItems(item, defs);
    return perks.map((s) => s.map((p) => p.displayProperties.name)).flat(1);
  },
  getFromDb: (item) => item.perk,
});

const rarity = createResolver({
  label: "rarity",
  formatToDb: (hash, defs) => {
    const item = getInventoryItem(hash, defs);
    const tierType = item.inventory?.tierType ?? 0;
    const rarity = getRarityFromTierType(tierType);
    return rarity;
  },
  getFromDb: (item) => item.rarity,
});

const rpm = createResolver({
  label: "rpm",
  formatToDb: (hash, defs) => {
    const item = getInventoryItem(hash, defs);
    const rpm = item.stats?.stats[4284893193]?.value;
    return rpm;
  },
  getFromDb: (item) => (item.rpm ? `${item.rpm}` : ""),
});

const season = createResolver({
  label: "season",
  formatToDb: (hash, defs) => {
    const item = getInventoryItem(hash, defs);
    const quality = item.quality;
    const watermark =
      quality?.displayVersionWatermarkIcons[quality.currentVersion];
    let season = getSeasonNumberFromWatermark(watermark);

    if (S22_EXOTICS.includes(item.hash)) {
      season = 22;
    }
    return season ?? undefined;
  },
  getFromDb: (item) => `${item.season}` ?? "",
});

const slot = createResolver({
  label: "slot",
  formatToDb: (hash, defs) => {
    const item = getInventoryItem(hash, defs);
    const slotHash = item.equippingBlock?.equipmentSlotTypeHash;
    const slot = getSlotFromSlotHash(slotHash);
    return slot;
  },
  getFromDb: (item) => item.slot,
});

const source = createResolver({
  label: "source",
  formatToDb: (hash, defs) => {
    const item = getInventoryItem(hash, defs);
    const collectible = item.collectibleHash
      ? defs.DestinyCollectibleDefinition[item.collectibleHash]
      : undefined;
    const sourceHash = collectible?.sourceHash;
    const source = getItemSource(item.hash, sourceHash);
    return source;
  },
  getFromDb: (item) => item.source ?? "",
});

const sunset = createResolver({
  label: "sunset",
  formatToDb: (hash, defs) => {
    const item = getInventoryItem(hash, defs);
    const powerCapHash =
      item?.quality?.versions[item.quality.currentVersion].powerCapHash;

    if (typeof powerCapHash !== "undefined") {
      const powerCapDef = defs.DestinyPowerCapDefinition[powerCapHash];
      const isSunset = powerCapDef.powerCap < SUNSET_MAX_POWER;
      return isSunset;
    }
    return false;
  },
  getFromDb: (item) => `${item.sunset}`,
});

const trait_1 = createResolver({
  label: "trait_1",
  formatToDb: (hash, defs) => {
    const item = getInventoryItem(hash, defs);
    let perks = mapItemSocketsToInventoryItems(item, defs);
    return perks[2]?.map((p) => p.displayProperties.name) || [];
  },
  getFromDb: (item) => item.trait_1,
});

const trait_2 = createResolver({
  label: "trait_2",
  formatToDb: (hash, defs) => {
    const item = getInventoryItem(hash, defs);
    let perks = mapItemSocketsToInventoryItems(item, defs);
    return perks[3]?.map((p) => p.displayProperties.name) || [];
  },
  getFromDb: (item) => item.trait_2,
});

const weapon = createResolver({
  label: "weapon",
  formatToDb: (hash, defs) => {
    const item = getInventoryItem(hash, defs);
    return item.itemTypeDisplayName;
  },
  getFromDb: (item) => item.weapon,
});

const zoom = createResolver({
  label: "zoom",
  formatToDb: (hash, defs) => {
    const item = getInventoryItem(hash, defs);
    // sourced from: https://github.com/d2foundry/oracle_engine/blob/d27fdbdb51f1b33e5496f45f4290686d21bc877d/src/d2_enums.rs#L140C13-L140C23
    const zoom = item.stats?.stats[3555269338]?.value;
    return zoom;
  },
  getFromDb: (item) => (item.zoom ? `${item.zoom}` : ""),
});

export default {
  adept,
  ammo,
  craftable,
  energy,
  event,
  foundry,
  frame,
  name,
  perk,
  rarity,
  rpm,
  season,
  slot,
  source,
  sunset,
  trait_1,
  trait_2,
  weapon,
  zoom,
};

// Metadata
export const getMetadata = createMetadataResolver((hash, defs) => {
  const item = getInventoryItem(hash, defs);
  const { icon } = item.displayProperties;
  const quality = item.quality;

  const iconSrc = getBungieApiUrl(icon);
  const watermark =
    quality?.displayVersionWatermarkIcons[quality.currentVersion];
  const watermarkSrc = watermark ? getBungieApiUrl(watermark) : undefined;

  return { hash, iconSrc, watermarkSrc };
});
