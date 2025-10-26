// ==========================================
// Core types
// src/types/index.ts
// ==========================================

export type PathType = 'QGIS' | 'ArcGIS';
export type ModuleKey = 'basic' | 'intermediate' | 'advanced' | string;
export type StepStatus = 'locked' | 'unlocked' | 'completed';

// Evey level's progress
export interface StepProgress {
    completedSteps: number[];
    currentStep: number;
    testPassed: boolean;
    }

// Modules' level
export interface ModuleProgress {
    [level: string]: StepProgress;
}

// QGIS / ArcGIS modules
export interface PathProgress {
    [module: string]: ModuleProgress;
}


// User overall progress:
export interface UserProgress {
    currentPath: PathType | null;
    currentModule: ModuleKey | string | null;
    currentLevel: number;
    qgis: PathProgress;
    arcgis: PathProgress;
    achievements: string[];
    lastUpdated: string;
    }


// single exercise
export interface ExerciseStep {
    id: number;
    pathType: PathType; //QGIS or ArcGIS
    moduleKey: ModuleKey; // basic, intermediate, advanced
    level: number; // 1,2,3
    
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
        id_field:string;
        id_value: string[];
        field1: string;
        value1: string[];
        field2: string;
        value2: string[];
    }
    }



    // path config
    export interface PathConfig {
    type: PathType; //QGIS or ArcGIS
    title:  string; // e.g., 'QGIS Expression Basic Editor'
    description:string;
    icon: string;
    color: string;
    comingSoon?: boolean; 
    }