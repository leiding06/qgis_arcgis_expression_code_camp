// src/components/Auth/AuthProvider.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import type { User } from '@supabase/supabase-js';
import { useRouter } from "next/navigation";



interface AuthContextType {
    user: User | null;
    loading: boolean;
    signOut: () => Promise<void>;
    }

    const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    signOut: async () => {},
    });

    export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
        setUser(session?.user ?? null);
        setLoading(false);
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            setUser(session?.user ?? null);
            setLoading(false);

        });

        return () => subscription.unsubscribe();
    }, []);

    
    const signOut = async () => {
        console.log("Signout clicked");
        const { error } = await supabase.auth.signOut();
        console.log("Signout result:", { error });
        router.refresh()   

    };

    return (
        <AuthContext.Provider value={{ user, loading, signOut }}>
        {children}
        </AuthContext.Provider>
    );
    }

    export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};