'use client';
//src/app/page.tsx

import { Globe, ChevronRight, User, LogIn, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getProgress, saveProgress } from '@/utils/storage';
import { UserProgress } from '@/types';
import { useEffect, useState } from 'react';
import { useAuth } from '@/components/Auth/AuthProvider';
import AuthModal from '@/components/Auth/AuthModal';

export default function HomePage() {
  const router = useRouter();
  const [displayLevel, setDisplayLevel] = useState('Level 1'); //initial level
  const [showAuthModal, setShowAuthModal] = useState(false); //control login modal

  //Use AuthProvider to get user info
  const { user, loading, signOut } = useAuth();

  useEffect(() => {
    const progress = getProgress();
    setDisplayLevel(computeDisplayLevel(progress));
  }, []); 




  const handlePathSelect = (path: 'QGIS' | 'ArcGIS') => {
    if (path === 'ArcGIS') {
      alert('Coming Soon!' );
      return;
    }
    
    const progress = getProgress();
    progress.currentPath = path;
    saveProgress(progress);
    router.push(`/${path.toLowerCase()}/basic`);
  };

  // Get display level from progress
  const computeDisplayLevel = (p: UserProgress)=> {
    if (p.currentPath === 'QGIS') {
      if (p.currentLevel === 1) {
        return 'Level 1';
      } else if (p.currentLevel === 2) {
        return 'Level 2';
      } else if (p.currentLevel === 3) {
        return 'Level 3';
      } else {
        return 'Level 1';
      }
    } else if (p.currentPath === 'ArcGIS') {
      if (p.currentLevel === 1) {
        return 'Level 1';
      } else if (p.currentLevel === 2) {
        return 'Level 2';
      } else if (p.currentLevel === 3) {
        return 'Level 3';
      } else {
        return 'Level 1';
      }
    }
    return 'Level 1'; // default return incase return undefined.
  }
  
  const text = {
      title: 'GIS Expression Learning Platform',
      subtitle: 'Learn QGIS & ArcGIS expressions step by step',
      selectPath: 'Select Your Learning Path',
      qgisTitle: 'QGIS Expression Basic Editor',
      qgisDesc: 'Learn QGIS field calculator expressions',
      arcgisTitle: 'ArcGIS Expression Basic Editor',
      arcgisDesc: 'Learn ArcGIS Pro Arcade expressions',
      display_level: computeDisplayLevel(getProgress()),
      comingSoon: 'Coming Soon'

  };
    


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Globe className="w-6 h-6 text-black" />
            <span className="text-xl font-bold text-gray-800">{text.title}</span>
          </div>
          
        <div>
              {loading ? (
                // loading state - show spinner
                <div className="w-8 h-8 border-2 border-gray-300 border-t-green-600 rounded-full animate-spin" />
              ) : user ? (
                // if logged in - show user email and sign out button
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
                    <User className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">
                      {user.email}
                    </span>
                  </div>
                  <button
                    onClick={signOut}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              ) : (
                // if not logged in - show sign in button
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="px-6 py-2 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg hover:from-green-700 hover:to-teal-700 transition flex items-center gap-2 font-semibold shadow-lg"
                >
                  <LogIn className="w-4 h-4" />
                  Sign In
                </button>
              )}
            </div>
          </div>
        </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
        
          <p className="text-xl text-gray-600">{text.subtitle}</p>
        </div>

        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          {text.selectPath}
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* QGIS Card */}
          <button
            onClick={() => handlePathSelect('QGIS')}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-8 text-left border-2 border-transparent hover:border-green-500"
          >
            
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {text.qgisTitle}
            </h3>
            <p className="text-gray-600 mb-6">{text.qgisDesc}</p>
            <div className="flex items-center text-green-600 font-medium">
              {displayLevel} <ChevronRight className="w-5 h-5 ml-1" />
            </div>
          </button>

          {/* ArcGIS Card */}
          <button
            onClick={() => handlePathSelect('ArcGIS')}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-8 text-left border-2 border-transparent hover:border-blue-500 opacity-60"
          >
            
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {text.arcgisTitle}
            </h3>
            <p className="text-gray-600 mb-6">{text.arcgisDesc}</p>
            <div className="flex items-center text-blue-600 font-medium">
              {text.comingSoon}
            </div>
          </button>
        </div>
        {/* Auth Modal, Pop up when user not logged in */}
        <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
      </div>
    </div>
  );
};