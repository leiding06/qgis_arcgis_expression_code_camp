// components/Header.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, LogIn, LogOut } from 'lucide-react';
import { useAuth } from '@/components/Auth/AuthProvider';
import AuthModal from '@/components/Auth/AuthModal';

export default function Navbar() {
    const router = useRouter();
    const { user, loading, signOut } = useAuth();
    const [showAuthModal, setShowAuthModal] = useState(false);

    return (
        <>
        <nav className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">
            {/* Logo - monospace/terminal style */}
            <div style={{ fontFamily: "'Courier New', Courier, monospace" }} className="text-base font-bold text-gray-800 tracking-tight">
                <button 
                onClick={() => router.push('/')}
                style={{ fontFamily: "'Courier New', Courier, monospace" }} 
                className="text-base text-xl font-bold text-gray-800 tracking-tight hover:text-green-700 transition"
            >
                <span className="text-green-600">&gt;_</span> GIS Expression Camp (BETA)
            </button>

            </div>

            <div>
                {loading ? (
                <div className="w-8 h-6 border-2 border-gray-300 border-t-green-500 rounded-full animate-spin" />
                ) : user ? (
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
                    <User className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">{user?.email}</span>
                    </div>
                    <button
                    onClick={signOut}
                    className="px-4 py-1 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition flex items-center gap-2"
                    >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                    </button>
                </div>
                ) : (
                <button
                    onClick={() => setShowAuthModal(true)}
                    className="px-6 py-1 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg hover:from-green-700 hover:to-teal-700 transition flex items-center gap-2 font-semibold text-s shadow-lg"
                >
                    <LogIn className="w-4 h-4" />
                    Sign In
                </button>
                )}
            </div>
            </div>
        </nav>

        {/* Modal all pages， popup when clicl sign in */}
        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
        </>
    );
}