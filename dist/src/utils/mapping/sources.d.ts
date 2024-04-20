export declare const getItemSource: (itemHash: number, sourceHash?: number) => string | string[];
export declare const getEventFromNumber: (event?: number) => string | undefined;
export declare const getEventFromWatermark: (watermarkSrc?: string) => number | null;
export declare const getSeasonNumberFromWatermark: (watermarkSrc?: string) => number | null;
export declare const getSeasonNameFromNumber: (season?: number) => string;
declare const _default: {
    getEventFromNumber: (event?: number | undefined) => string | undefined;
    getEventFromWatermark: (watermarkSrc?: string | undefined) => number | null;
};
export default _default;
