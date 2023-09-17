import { AllDestinyManifestComponents, DestinyManifestSlice, HttpClientConfig } from "bungie-api-ts/destiny2";
export declare const MANIFEST_SLICES: (keyof AllDestinyManifestComponents)[];
export declare function $http<T>(config: HttpClientConfig): Promise<T>;
export declare function getManifest(): Promise<DestinyManifestSlice<typeof MANIFEST_SLICES>>;
