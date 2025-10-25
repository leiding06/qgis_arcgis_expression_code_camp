// ==========================================
// Core types
// src/types/index.ts
// ==========================================

export type PathType = 'QGIS' | 'ArcGIS';
export type StepStatus = 'locked' | 'unlocked' | 'completed';

// single exercise
export interface ExerciseStep {
    id: number;
    pathType: PathType;
    level: number;
    
    title: string;

    
    description: string;
    
    example: string;
    
    question: string;
    
    initialData: string;

    
    expectedResult:string;

    
    // correct answers
    correctAnswers: string[];
    
    hints?: string[];

    tableData: { 
        field1: string;
        value1: string[];
        field2: string;
        value2: string[];
    }
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
    lastUpdated: string;
    }

    // path config
    export interface PathConfig {
    type: PathType;
    title:  string;
    description:string;
    icon: string;
    color: string;
    }