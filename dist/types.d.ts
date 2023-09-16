export declare enum SocketPlugSources {
    /** If there's no way we can detect to insert new plugs. */
    None = 0,
    /**
     * Use plugs found in the player's inventory, based on the socket type rules (see
     * DestinySocketTypeDefinition for more info)
     *
     * Note that a socket - like Shaders - can have *both* reusable plugs and inventory
     * items inserted theoretically.
     */
    InventorySourced = 1,
    /**
     * Use the DestinyItemSocketsComponent.sockets.reusablePlugs property to determine
     * which plugs are valid for this socket. This may have to be combined with other
     * sources, such as plug sets, if those flags are set.
     *
     * Note that "Reusable" plugs may not necessarily come from a plug set, nor from
     * the "reusablePlugItems" in the socket's Definition data. They can sometimes be "
     * randomized" in which case the only source of truth at the moment is still the
     * runtime DestinyItemSocketsComponent.sockets.reusablePlugs property.
     */
    ReusablePlugItems = 2,
    /**
     * Use the ProfilePlugSets (DestinyProfileResponse.profilePlugSets) component data
     * to determine which plugs are valid for this socket.
     */
    ProfilePlugSet = 4,
    /**
     * Use the CharacterPlugSets (DestinyProfileResponse.characterPlugSets) component
     * data to determine which plugs are valid for this socket.
     */
    CharacterPlugSet = 8
}
export type JsonValue = string | number | boolean | JsonValue[] | null;
export type SearchValue = string | string[];
export type SearchKeywords = "adept" | "ammo" | "craftable" | "energy" | "event" | "foundry" | "frame" | "name" | "perk" | "rarity" | "rpm" | "season" | "slot" | "source" | "sunset" | "trait_1" | "trait_2" | "weapon";
export interface SearchDbMetadata {
    hash: number;
    iconSrc: string;
    watermarkSrc?: string;
}
export type SearchDbItem = Record<SearchKeywords, SearchValue> & SearchDbMetadata;
