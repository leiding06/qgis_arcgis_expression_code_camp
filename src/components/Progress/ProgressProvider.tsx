//src/components/Progress/ProgressProvider.tsx
'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth} from '@/components/Auth/AuthProvider';;
import { getRemoteProgress, saveRemoteProgress } from '@/services/progress/progress.remote';
import { UserProgress } from '@/types';
import { markStepCompleted } from '@/utils/progressUtils';  


interface ProgressContextType {
    progress: UserProgress | null;
    updateProgress: (p: Partial<UserProgress>) => Promise<void>;
    completeStep: (
        path: 'QGIS' | 'ARCGIS',
        module: string,
        level: number,
        stepId: number
    ) => Promise<void>;
}

const ProgressContext = createContext<ProgressContextType>({
    progress: null,
    updateProgress: async () => {},
    completeStep: async () => {},
});

export function ProgressProvider({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const [progress, setProgress] = useState<UserProgress | null>(null);

    useEffect(() => { //组件挂载时运行一次
        async function loadProgress() { //return a promise, so that we can use ‘await’ to await it in useEffect； but async not always have await, it can be used without await, just like a normal function, but it will always return a promise
            if (!user) {
                setProgress(null);
                return;
            }
            const remote = await getRemoteProgress(user.id);
            setProgress(remote); //waiting for remote progress to load, then set it to state
        }
        loadProgress();
    }, [user]); //当user变化时，重新加载进度

    const updateProgress = async (p: Partial<UserProgress>) => {
        if (!user || !progress) return; //if no user or no progress, do nothing
        const newProgress = { ...progress, ...p }; //merge old progress with new partial progress； spread operator (...) to merge objects, if there are same keys, the latter will overwrite the former
        setProgress(newProgress);
        await saveRemoteProgress(user.id, newProgress);}; //save to remote, but we don't await it, because we don't want to block the UI, we can let it run in the background
    

    // Function to mark a step as completed
        const completeStep = async (
            path: 'QGIS' | 'ARCGIS',
            module: string,
            level: number,
            stepId: number
        ) => {
            if (!progress) return;

            const newProgress = markStepCompleted(
                progress,
                path,
                module,
                level,
                stepId
            );

            setProgress(newProgress);

            if (user) {
                await saveRemoteProgress(user.id, newProgress);
            }
        };
    return (
        <ProgressContext.Provider value={{ progress, updateProgress, completeStep }}>
            {children}
        </ProgressContext.Provider>
    );
}

export const useProgress = () => useContext(ProgressContext);   
