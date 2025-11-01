import { UserProgress, PathType, ModuleKey} from '@/types';
import { MODULE_LEVEL_SIZES } from '@/data/config';

const STORAGE_KEY = 'gis_learning_progress';

// initial progree
export const initialProgress: UserProgress = {
    currentPath: null,
    currentModule: null,
    currentLevel: 1,
    qgis: {},
    arcgis: {},
    achievements: [],
    lastUpdated: new Date().toISOString(),
    };

    // Get user progress
    export const getProgress = (): UserProgress => {
    if (typeof window === 'undefined') return initialProgress;
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
        const parsed = JSON.parse(saved);
        // 保证 qgis/arcgis 至少为对象
        return {
            ...initialProgress,
            ...parsed,
            qgis: parsed.qgis || {},
            arcgis: parsed.arcgis || {},
        };
        }
    } catch (error) {
        console.error('Failed to load progress:', error);
    }
    return initialProgress;
    };

    // Save the progress
    export const saveProgress = (progress: UserProgress): void => {
    if (typeof window === 'undefined') return;
    
    try {
        progress.lastUpdated = new Date().toISOString();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
        console.error('Failed to save progress:', error);
    }
    };
    const computeLevelFromPoints = (
    path: PathType,
    moduleKey: ModuleKey,
    completedSteps: number
    ): number => {
    const levelSizes = MODULE_LEVEL_SIZES[path][moduleKey];
    let cumulative = 0;

    for (let i = 0; i < levelSizes.length; i++) {
        cumulative += levelSizes[i];
        if (completedSteps <= cumulative) return i + 1; // Level 1,2,3
    }

    return levelSizes.length; // Highest level if exceeded
    };

    /**
     * Based on stepId, infer which level it belongs to
     */
    const inferLevelFromStepId = (
        path: PathType,
        moduleKey: ModuleKey,
        stepId: number
    ): number => {
        const sizes = MODULE_LEVEL_SIZES[path]?.[moduleKey] ?? [10, 10, 10];
        let cumulative = 0;
        for (let i = 0; i < sizes.length; i++) {
            cumulative += sizes[i];
            if (stepId <= cumulative) return i + 1;
        }
        return sizes.length;
    };
    export const markStepCompleted = (
    progress: UserProgress,
    path: PathType,
    moduleKey: ModuleKey,
    level: number,
    stepId: number
    ): UserProgress => {
    // Deep clone progress object
    const newProgress: UserProgress =
        typeof structuredClone !== 'undefined'
        ? structuredClone(progress)
        : JSON.parse(JSON.stringify(progress));
        
        
    // if level is not provided, infer from stepId
    const resolvedLevel = (typeof level === 'number' && level > 0)
        ? level
        : inferLevelFromStepId(path, moduleKey, stepId);

    const pathKey = path === 'QGIS' ? 'qgis' : 'arcgis';
    //make sure path/module/level exist
    if (!newProgress[pathKey]) newProgress[pathKey] = {};
    const levelKey = `level${resolvedLevel}` as const;
    // initialize if not exist
    if (!newProgress[pathKey][moduleKey]) newProgress[pathKey][moduleKey] = {};
    if (!newProgress[pathKey][moduleKey][levelKey]) {
        newProgress[pathKey][moduleKey][levelKey] = {
        completedSteps: [],
        currentStep: 1,
        testPassed: false,
        };
    }

    const levelProgress = newProgress[pathKey][moduleKey][levelKey];

    // Add step if not already completed
    if (!levelProgress.completedSteps.includes(stepId)) {
        levelProgress.completedSteps.push(stepId);
        levelProgress.completedSteps.sort((a, b) => a - b);
    }

    // Calculate total completed steps across all modules and levels
    const totalSteps =
        Object.values(newProgress.qgis)
        .flatMap(module => Object.values(module))
        .flatMap(level => level.completedSteps.length)
        .reduce((a, b) => a + b, 0) + // a is from last reduce, b is current, 0 is initial value
        Object.values(newProgress.arcgis)
        .flatMap(module => Object.values(module))
        .flatMap(level => level.completedSteps.length)
        .reduce((a, b) => a + b, 0);
    
    // Update current level based on total completed steps
    newProgress.currentLevel = computeLevelFromPoints(path, moduleKey, totalSteps);

    saveProgress(newProgress);
    return newProgress;
    };

    // Access completed steps for a specific path/module/level
    export const getCompletedSteps = (
    progress: UserProgress,
    path: PathType,
    moduleKey: ModuleKey,
    level: number
    ): number[] => {
    const pathKey = path === 'QGIS' ? 'qgis' : 'arcgis';
    const levelKey = `level${level}` as const;

    return (
        progress[pathKey][moduleKey]?.[levelKey]?.completedSteps || []
    );
    };

    // Clear progress
    export const clearProgress = (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
};