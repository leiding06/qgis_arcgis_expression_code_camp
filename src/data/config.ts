// src/data/config.ts

// set of level sizes for each module in QGIS and ArcGIS paths
export type LevelSizes = number[];

// module -> level sizes
export const MODULE_LEVEL_SIZES: Record<string, Record<string, LevelSizes>> = {
    QGIS: {
        basic: [10, 10, 10],         // Level1=10, Level2=10, Level3=10
        intermediate: [8, 8, 8],
        advanced: [5, 5, 5],
    },
    ArcGIS: {
        basic: [10, 10, 10],
        intermediate: [8, 8, 8],
        advanced: [5, 5, 5],
    }
};
