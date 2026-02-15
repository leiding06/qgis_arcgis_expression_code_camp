import { getProgress } from '@/utils/storage';
import {  clearLocalProgress } from '@/utils/storage';
import { getRemoteProgress, saveRemoteProgress } from './progress.remote';

const STORAGE_KEY = 'gis_learning_progress';

export async function migrateLocalProgressIfNeeded(userId: string) {
    //  localStorage
    if (typeof window === 'undefined') return;
    if (!localStorage.getItem(STORAGE_KEY)) return;

    // has remote?
    const remote = await getRemoteProgress(userId);

    // if has remote, do nothing
    if (remote) return;

    // local exists but no remote, migrate local to remote
    const localProgress = getProgress();
    await saveRemoteProgress(userId, localProgress);

    // clear local after migration
    clearLocalProgress();

    console.log('✅ Local progress migrated to Supabase');
}