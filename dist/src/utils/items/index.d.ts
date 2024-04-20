import { AllDestinyManifestComponents, DestinyInventoryItemDefinition } from "bungie-api-ts/destiny2";
export declare function getInventoryItem(inventoryItemHash: number, definitions: AllDestinyManifestComponents): DestinyInventoryItemDefinition;
export declare function mapItemSocketsToInventoryItems(item: DestinyInventoryItemDefinition, defs: AllDestinyManifestComponents): DestinyInventoryItemDefinition[][];
export declare function getWatermark(item: DestinyInventoryItemDefinition): string | undefined;
export declare function getWeaponInventoryItems(defs: AllDestinyManifestComponents): DestinyInventoryItemDefinition[];
export declare const getIsAdeptFromName: (name: string) => boolean;
