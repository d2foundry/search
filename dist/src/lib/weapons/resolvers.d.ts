declare const _default: {
    adept: import("./types").KeywordDefinition<"adept">;
    ammo: import("./types").KeywordDefinition<"ammo">;
    craftable: import("./types").KeywordDefinition<"craftable">;
    energy: import("./types").KeywordDefinition<"energy">;
    event: import("./types").KeywordDefinition<"event">;
    foundry: import("./types").KeywordDefinition<"foundry">;
    frame: import("./types").KeywordDefinition<"frame">;
    name: import("./types").KeywordDefinition<"name">;
    perk: import("./types").KeywordDefinition<"perk">;
    rarity: import("./types").KeywordDefinition<"rarity">;
    rpm: import("./types").KeywordDefinition<"rpm">;
    season: import("./types").KeywordDefinition<"season">;
    slot: import("./types").KeywordDefinition<"slot">;
    source: import("./types").KeywordDefinition<"source">;
    sunset: import("./types").KeywordDefinition<"sunset">;
    trait_1: import("./types").KeywordDefinition<"trait_1">;
    trait_2: import("./types").KeywordDefinition<"trait_2">;
    weapon: import("./types").KeywordDefinition<"weapon">;
};
export default _default;
export declare const getMetadata: (hash: number, defs: import("bungie-api-ts/destiny2").AllDestinyManifestComponents) => {
    hash: number;
    iconSrc: string;
    watermarkSrc: string | undefined;
};
