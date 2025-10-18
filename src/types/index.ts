// ==========================================
// Core types
// src/types/index.ts
// ==========================================

export type PathType = 'QGIS' | 'ArcGIS';
export type Language = 'en' | 'zh';
export type StepStatus = 'locked' | 'unlocked' | 'completed';

// single exercise
export interface ExerciseStep {
    id: number;
    pathType: PathType;
    level: number;
    
    title: {
        en: string;
        zh: string;
    };
    
    description: {
        en: string;
        zh: string;
    };
    
    example: {
        en: string;
        zh: string;
    };
    
    question: {
        en: string;
        zh: string;
    };
    
    initialData: {
        en: string;
        zh: string;
    };
    
    expectedResult: {
        en: string;
        zh: string;
    };
    
    // correct answers
    correctAnswers: string[];
    
    hints?: {
        en: string[];
        zh: string[];
    };
    }

    // user progress（current: LocalStorage）
    export interface UserProgress {
    currentPath: PathType | null;
    currentLevel: number;
    
    qgisProgress: {
        level1: {
        completedSteps: number[];
        currentStep: number;
        testPassed: boolean;
        };
    };
    
    arcgisProgress: {
        level1: {
        completedSteps: number[];
        currentStep: number;
        testPassed: boolean;
        };
    };
    
    achievements: string[];
    preferredLanguage: Language;
    lastUpdated: string;
    }

    // path config
    export interface PathConfig {
    type: PathType;
    title: {
        en: string;
        zh: string;
    };
    description: {
        en: string;
        zh: string;
    };
    icon: string;
    color: string;
    }