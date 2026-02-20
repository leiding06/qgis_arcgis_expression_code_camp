//src/services/progress/progress.remote.ts
import { supabase } from '@/lib/supabaseClient';
import { UserProgress } from '@/types';


export async function getRemoteProgress(userId: string): Promise<UserProgress | null> {
    const { data, error } = await supabase
        .from('user_progress')
        .select('progress')
        .eq('user_id', userId)
        .single();

    if (error) {
    // If no progress found for user, return null (not error)
    if (error.code === 'PGRST116') {
        return null;
    }
    console.error('getRemoteProgress error:', error);
    return null;
    }

    return data?.progress ?? null;
}

export async function saveRemoteProgress(
    userId: string,
    progress: UserProgress
) {
    const { error } = await supabase
    .from('user_progress')
    .upsert(
        {
        user_id: userId,
        progress,
        updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id' }
    );
    if (error) {
    console.error('saveRemoteProgress error:', error);
    throw error;
    }
}
