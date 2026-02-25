import { getProgress, clearProgress } from '@/utils/storage';
import { getRemoteProgress, saveRemoteProgress } from './progress.remote';

const STORAGE_KEY = 'gis_learning_progress';

export async function migrateLocalProgressIfNeeded(userId: string) {
    if (typeof window === 'undefined') return;

    const local = localStorage.getItem(STORAGE_KEY);
    if (!local) return;

    const remote = await getRemoteProgress(userId);
    if (remote) return;

    const localProgress = getProgress();
    await saveRemoteProgress(userId, localProgress);
    clearProgress();

    if (localStorage.getItem(STORAGE_KEY)) {
        console.warn('⚠️ Local progress was not cleared!');
    }
}