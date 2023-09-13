export declare const enum D2EventEnum {
    DAWNING = 1,
    CRIMSON_DAYS = 2,
    SOLSTICE_OF_HEROES = 3,
    FESTIVAL_OF_THE_LOST = 4,
    REVELRY = 5,
    GUARDIAN_GAMES = 6
}
export declare const D2EventInfo: {
    1: {
        name: string;
        shortname: string;
        sources: number[];
        engram: number[];
    };
    2: {
        name: string;
        shortname: string;
        sources: number[];
        engram: number[];
    };
    3: {
        name: string;
        shortname: string;
        sources: number[];
        engram: number[];
    };
    4: {
        name: string;
        shortname: string;
        sources: number[];
        engram: number[];
    };
    5: {
        name: string;
        shortname: string;
        sources: number[];
        engram: number[];
    };
    6: {
        name: string;
        shortname: string;
        sources: number[];
        engram: never[];
    };
};
export type D2EventIndex = keyof typeof D2EventInfo;
export declare const D2EventPredicateLookup: {
    dawning: D2EventEnum;
    crimsondays: D2EventEnum;
    solstice: D2EventEnum;
    fotl: D2EventEnum;
    revelry: D2EventEnum;
    games: D2EventEnum;
};
export declare const D2SourcesToEvent: {
    464727567: D2EventEnum;
    547767158: D2EventEnum;
    629617846: D2EventEnum;
    2364515524: D2EventEnum;
    3092212681: D2EventEnum;
    3952847349: D2EventEnum;
    4054646289: D2EventEnum;
    2502262376: D2EventEnum;
    151416041: D2EventEnum;
    641018908: D2EventEnum;
    1666677522: D2EventEnum;
    3724111213: D2EventEnum;
    1054169368: D2EventEnum;
    1677921161: D2EventEnum;
    1919933822: D2EventEnum;
    3190938946: D2EventEnum;
    3693722471: D2EventEnum;
    4041583267: D2EventEnum;
    2187511136: D2EventEnum;
    611838069: D2EventEnum;
    2006303146: D2EventEnum;
    2011810450: D2EventEnum;
    2473294025: D2EventEnum;
    3388021959: D2EventEnum;
};
