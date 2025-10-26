import { UserProgress, PathType } from '@/types';

const STORAGE_KEY = 'gis_learning_progress';

// initial progree
export const initialProgress: UserProgress = {
    currentPath: null,
    currentLevel: 1,
    qgisProgress: {
        basic: {
        completedSteps: [],
        currentStep: 1,
        testPassed: false
        }
    },
    arcgisProgress: {
        basic: {
        completedSteps: [],
        currentStep: 1,
        testPassed: false
        }
    },
    achievements: [],
    lastUpdated: new Date().toISOString()
    };

    // Get user progress
    export const getProgress = (): UserProgress => {
    if (typeof window === 'undefined') return initialProgress;
    
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
        return JSON.parse(saved);
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

    // Mark as completed
    export const markStepCompleted = (
    progress: UserProgress,
    path: PathType,
    level: number,
    stepId: number
    ): UserProgress => {
    const newProgress = { ...progress };
    
    if (path === 'QGIS' && level === 1) {
        if (!newProgress.qgisProgress.basic.completedSteps.includes(stepId)) {
        newProgress.qgisProgress.basic.completedSteps.push(stepId);
        newProgress.qgisProgress.basic.completedSteps.sort((a, b) => a - b);
        }
    } else if (path === 'ArcGIS' && level === 1) {
        if (!newProgress.arcgisProgress.basic.completedSteps.includes(stepId)) {
        newProgress.arcgisProgress.basic.completedSteps.push(stepId);
        newProgress.arcgisProgress.basic.completedSteps.sort((a, b) => a - b);
        }
    }
    
    saveProgress(newProgress);
    return newProgress;
    };

    // Get completed steps
    export const getCompletedSteps = (
    progress: UserProgress,
    path: PathType,
    level: number
    ): number[] => {
    if (path === 'QGIS' && level === 1) {
        return progress.qgisProgress.basic.completedSteps;
    } else if (path === 'ArcGIS' && level === 1) {
        return progress.arcgisProgress.basic.completedSteps;
    }
    return [];
    };

    // Remove all progress
    export const clearProgress = (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
    };