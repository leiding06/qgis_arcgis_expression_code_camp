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
        const loadProgress = async () => {
            const { data } = await supabase.auth.getUser();
            const currentUser = data.user;
            setUser(currentUser);
            if (currentUser) {
                const remote = await getRemoteProgress(currentUser.id);
                setProgress(remote ?? initialProgress);
            } else {
                setProgress(getProgress());
            }
        };
        loadProgress();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            setUser(session?.user ?? null);
            if (_event === 'SIGNED_IN' && session?.user) {
                clearLocalProgress();
                const remote = await getRemoteProgress(session.user.id);
                setProgress(remote ?? initialProgress);
            } else if (_event === 'SIGNED_OUT') {
                setProgress(getProgress());
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    return { user, progress, setProgress };
}