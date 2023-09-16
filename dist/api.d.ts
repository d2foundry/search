import { AllDestinyManifestComponents, DestinyManifestSlice, HttpClientConfig } from "bungie-api-ts/destiny2";
import { MANIFEST_SLICES } from "./constants";
export declare function buildSearchDatabase(defs: AllDestinyManifestComponents): import("./types").SearchDbItemWithMetadata[];
export declare function $http<T>(config: HttpClientConfig): Promise<T>;
export declare function getManifest(): Promise<DestinyManifestSlice<typeof MANIFEST_SLICES>>;
export declare function getSearchDb(): Promise<import("./types").SearchDbItemWithMetadata[]>;
