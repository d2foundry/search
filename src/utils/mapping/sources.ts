import { D2EventInfo } from "@/data/d2-additional-info/d2-event-info";
import watermarkToEvent from "@/data/d2-additional-info/watermark-to-event.json";
import watermarkToSeason from "@/data/d2-additional-info/watermark-to-season.json";
import seasonTags from "@/data/d2-additional-info/season-tags.json";
import { sourceLookup } from "@/data/sourceInfoToItemLookUp";

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

export default {
  getEventFromNumber,
  getEventFromWatermark,
};
