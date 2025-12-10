import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);
// src/utils/storage.ts

// Types for our database
export type UserProgress = {
    id: string;
    user_id: string;
    path_type: string;
    module_key: string;
    level: number;
    step_id: number;
    completed_at: string;
    created_at: string;
    updated_at: string;
};

export type TestResult = {
    id: string;
    user_id: string;
    path_type: string;
    module_key: string;
    level: number;
    score: number;
    total_score: number;
    passed: boolean;
    completed_at: string;
    created_at: string;
};