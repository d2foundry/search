import type Fuse from "fuse.js";

export type ClientSearchResultItem<T> = Fuse.FuseResult<T>;
export type ClientSearchResults<T> = ClientSearchResultItem<T>[] | null;
export type ClientSearchOptions<T> = Fuse.IFuseOptions<T>;
