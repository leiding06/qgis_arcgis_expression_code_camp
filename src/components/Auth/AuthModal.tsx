'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { X, Mail } from 'lucide-react';
import { Eye, EyeOff } from "lucide-react";
interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    }

    export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'error' | 'success', text: string } | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    if (!isOpen) return null;

    const handleGoogleLogin = async () => {
        setLoading(true);
        setMessage(null);
        
        const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${window.location.origin}/auth/callback`
        }
        });

        if (error) {
        setMessage({ type: 'error', text: error.message });
        setLoading(false);
        }
    };

    const handleGithubLogin = async () => {
        setLoading(true);
        setMessage(null);
        
        const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
            redirectTo: `${window.location.origin}/auth/callback`
        }
        });

        if (error) {
        setMessage({ type: 'error', text: error.message });
        setLoading(false);
        }
    };

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        // Password validation
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (isSignUp && !passwordRegex.test(password)) {
        setMessage({ 
            type: 'error', 
            text: 'Password must contain at least 8 characters, including uppercase, lowercase, and numbers' 
        });
        setLoading(false);
        return;
        }

        if (isSignUp) {
        const { error } = await supabase.auth.signUp({ 
            email, 
            password,
            options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`
            }
        });

        if (error) {
            setMessage({ type: 'error', text: error.message });
        } else {
            setMessage({ 
            type: 'success', 
            text: 'Check your email for the confirmation link!' 
            });
            setEmail('');
            setPassword('');
        }
        } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            setMessage({ type: 'error', text: error.message });
        } else {
            setMessage({ type: 'success', text: 'Signed in successfully!' });
            setTimeout(() => {
            onClose();
            window.location.reload(); // Refresh to update auth state
            }, 1000);
        }
        }
        setLoading(false);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-in fade-in zoom-in duration-200">
            <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition"
            >
            <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
                {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="text-slate-600">
                {isSignUp ? 'Start your GIS learning journey' : 'Continue your progress'}
            </p>
            </div>

            {message && (
            <div className={`mb-6 p-4 rounded-xl border-2 ${
                message.type === 'error' 
                ? 'bg-red-50 border-red-200 text-red-700' 
                : 'bg-emerald-50 border-emerald-200 text-emerald-700'
            }`}>
                <p className="text-sm font-medium">{message.text}</p>
            </div>
            )}

            {/* OAuth Buttons */}
            <div className="space-y-3 mb-6">
            <button
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full px-6 py-3 bg-white border-2 border-slate-300 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
            </button>

            <button
                onClick={handleGithubLogin}
                disabled={loading}
                className="w-full px-6 py-3 bg-slate-900 border-2 border-slate-900 rounded-xl font-semibold text-white hover:bg-slate-800 hover:border-slate-800 transition flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                Continue with GitHub
            </button>
            </div>

            <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-slate-500">Or continue with email</span>
            </div>
            </div>

            {/* Email Form */}
            <form onSubmit={handleEmailAuth} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
                </label>
                <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-11 pr-4 py-3 border-2 border-slate-300 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 focus:outline-none transition"
                    placeholder="your@email.com"
                />
                </div>
            </div>
            {/* Password */}
            <div className="relative">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
                </label>
                <div className="relative">
                <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 focus:outline-none transition text-slate-900 bg-white" 
                placeholder="••••••••"
                />

                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                >
                    {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                    ) : (
                    <Eye className="w-5 h-5" />
                    )}
                    </button>
                {isSignUp && (
                <p className="mt-2 text-xs text-slate-500">
                    Min 8 characters with uppercase, lowercase, and numbers
                </p>
                )}
                
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold hover:from-emerald-700 hover:to-teal-700 transition shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? (
                <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    Loading...
                </span>
                ) : (
                isSignUp ? 'Create Account' : 'Sign In'
                )}
            </button>
            </form>

            <div className="mt-6 text-center">
            <button
                onClick={() => {
                setIsSignUp(!isSignUp);
                setMessage(null);
                setEmail('');
                setPassword('');
                }}
                className="text-sm text-slate-600 hover:text-slate-900 font-medium transition"
            >
                {isSignUp 
                ? 'Already have an account? Sign In' 
                : "Don't have an account? Sign Up"}
            </button>
            </div>
        </div>
        </div>
    );
}