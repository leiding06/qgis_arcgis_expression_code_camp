'use client';


import { Globe, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getProgress, saveProgress } from '@/utils/storage';


export default function HomePage() {
  const router = useRouter();



  const handlePathSelect = (path: 'QGIS' | 'ArcGIS') => {
    if (path === 'ArcGIS') {
      alert('Coming Soon!' );
      return;
    }
    
    const progress = getProgress();
    progress.currentPath = path;
    saveProgress(progress);
    router.push(`/${path.toLowerCase()}/level1`);
  };

  const text = {
      title: 'GIS Expression Learning Platform',
      subtitle: 'Learn QGIS & ArcGIS expressions step by step',
      selectPath: 'Select Your Learning Path',
      qgisTitle: 'QGIS Expression Basic Editor',
      qgisDesc: 'Learn QGIS field calculator expressions',
      arcgisTitle: 'ArcGIS Expression Basic Editor',
      arcgisDesc: 'Learn ArcGIS Pro Arcade expressions',
      level1: 'Level 1',
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
              {text.level1} <ChevronRight className="w-5 h-5 ml-1" />
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
      </div>
    </div>
  );
}