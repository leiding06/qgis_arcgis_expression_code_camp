import { getProgress } from '@/utils/storage';
import { hasLocalProgress, clearLocalProgress } from '@/utils/storage';
import { getRemoteProgress, saveRemoteProgress } from './progress.remote';

export async function migrateLocalProgressIfNeeded(userId: string) {
    // Has local?
    if (!hasLocalProgress()) return;

    // has remote?
    const remote = await getRemoteProgress(userId);

    // if has remote, do nothing (to avoid overwriting existing cloud progress with local data)
    if (remote) return;

    // local exists but no remote, migrate local to remote
    const localProgress = getProgress();

    await saveRemoteProgress(userId, localProgress);

    // after successful migration, clear local to avoid confusion and save space
    clearLocalProgress();

    console.log('✅ Local progress migrated to Supabase');
    }
