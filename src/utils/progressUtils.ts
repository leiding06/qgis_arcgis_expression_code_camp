//src/utils/progressUtils.ts
// Utility function to mark a step as completed in the user's progress
import { UserProgress, StepProgress } from '@/types/index';

export function markStepCompleted(
    progress: UserProgress,
    path: 'QGIS' | 'ARCGIS',
    module: string,
    level: number,
    stepId: number
    ): UserProgress {

    const pathKey = path.toLowerCase() as 'qgis' | 'arcgis';

    const updated = structuredClone(progress); // Deep clone to avoid mutating original progress

    if (!updated[pathKey][module]) {
        updated[pathKey][module] = {};  // Initialize module if it doesn't exist
    }

    return updated;
    }