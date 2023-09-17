import {
  AllDestinyManifestComponents,
  DestinyInventoryItemDefinition,
} from "bungie-api-ts/destiny2";
import resolvers, { getMetadata } from "./resolvers";
import {
  KeywordType,
  WeaponSearchDbItem,
  WeaponSearchKeywordSchema,
  WeaponSearchMetadataSchema,
} from "./schema";

function reduceSearchResolvers(
  hash: number,
  defs: AllDestinyManifestComponents
): WeaponSearchKeywordSchema {
  // now that's what I call TypeScript! (tm)
  return Object.values(resolvers).reduce(
    (acc: WeaponSearchKeywordSchema, curr) => {
      const keyword = curr.label;
      const dbItem: KeywordType<typeof keyword> = curr.formatToDb(hash, defs);
      acc = { ...acc, [keyword]: dbItem };
      return acc;
    },
    Object.assign({})
  );
}

function reduceMetadataResolvers(
  hash: number,
  defs: AllDestinyManifestComponents
): WeaponSearchMetadataSchema {
  return getMetadata(hash, defs);
}

export default function reduceAllResolvers(
  weapons: DestinyInventoryItemDefinition[],
  defs: AllDestinyManifestComponents
) {
  const searchDb: WeaponSearchDbItem[] = [];
  for (const weapon of weapons) {
    const dbItem = {
      ...reduceSearchResolvers(weapon.hash, defs),
      ...reduceMetadataResolvers(weapon.hash, defs),
    };
    searchDb.push(dbItem);
  }
  return searchDb;
}

// convenience for fuse
export const weaponSearchOptionKeys = Object.values(resolvers).map((v) => ({
  name: v.label,
  getFn: v.getFromDb,
}));
