// src/hooks/useProgress.ts
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { getRemoteProgress } from '@/services/progress/progress.remote';
import { UserProgress } from '@/types';
import { User } from '@supabase/supabase-js';
import { getProgress, clearLocalProgress, initialProgress } from '@/utils/storage';   
export function useProgress() {
    const [user, setUser] = useState<User | null>(null);
    const [progress, setProgress] = useState<UserProgress>(initialProgress);

useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
        console.log('auth event:', _event, 'user:', session?.user?.id);
        const currentUser = session?.user ?? null;
        setUser(currentUser);

        if (_event === 'INITIAL_SESSION') {
            // 页面加载时初始化
            if (currentUser) {
                const remote = await getRemoteProgress(currentUser.id);
                setProgress(remote ?? initialProgress);
            } else {
                setProgress(getProgress());
            }
        } else if (_event === 'SIGNED_IN') {
            // 真正的登录，清本地
            clearLocalProgress();
            const remote = await getRemoteProgress(currentUser!.id);
            setProgress(remote ?? initialProgress);
        } else if (_event === 'SIGNED_OUT') {
            setProgress(getProgress());
        }
        // TOKEN_REFRESHED 等其他事件不重置 progress
    });

    return () => subscription.unsubscribe();
}, []);

    return { user, progress, setProgress };
}