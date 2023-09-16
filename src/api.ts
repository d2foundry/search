import { formatWeaponInventoryItemsToDb } from "./keywords";
import {
  AllDestinyManifestComponents,
  DestinyManifestSlice,
  HttpClientConfig,
  getDestinyManifest,
  getDestinyManifestSlice,
} from "bungie-api-ts/destiny2";
import { getWeaponInventoryItems } from "./utils";
import { MANIFEST_SLICES } from "./constants";

export function buildSearchDatabase(defs: AllDestinyManifestComponents) {
  const weapons = getWeaponInventoryItems(defs);

  const results = formatWeaponInventoryItemsToDb(weapons, defs);

  return results;
}

export async function $http<T>(config: HttpClientConfig): Promise<T> {
  const res = await fetch(config.url, {
    method: config.method,
    headers: {
      "X-API-KEY": process.env.BUNGIE_API_KEY ?? "",
    },
  });
  const data = await res.json();
  return data as T;
}

async function fetchManifest() {
  const data = await getDestinyManifest($http);
  return data.Response;
}

export async function getManifest(): Promise<
  DestinyManifestSlice<typeof MANIFEST_SLICES>
> {
  const destinyManifest = await fetchManifest();
  return await getDestinyManifestSlice($http, {
    destinyManifest,
    tableNames: MANIFEST_SLICES,
    language: "en",
  });
}

export async function getSearchDb() {
  const defs = await getManifest();
  const searchDb = buildSearchDatabase(defs);
  return searchDb;
}
