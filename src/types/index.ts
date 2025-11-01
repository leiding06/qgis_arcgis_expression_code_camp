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

export interface TableData {
  id_field: string;     // ID字段名：如 'fid', 用于第一列
  id_value: string[];   // ID列所有值
  columns: string[];    // e.g., ['source_field', 'new_field', 'extra_field']
  values: string[][];   // e.g.,
                        // [
                        //   ['123', 'ABC123', 'foo'],
                        //   ['456', 'DEF456', 'bar'],
                        //   ['789', 'GHI789', 'baz']
                        // ]
}

// single exercise
export interface ExerciseStep {
    id: number;
    pathType: PathType; //QGIS or ArcGIS
    moduleKey: ModuleKey; // basic, intermediate, advanced
    level: number; // 1,2,3
    
    title: string;
    description: string;
    example: string | string[];
    question: string;
    initialData: string;    
    expectedResult:string;

    
    // correct answers
    correctAnswers: (number | string)[];

    hints?: string[];

    initialTable: TableData;
    expectedTable: TableData;
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