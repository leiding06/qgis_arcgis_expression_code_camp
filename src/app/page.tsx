'use client';

import React, { useState, useEffect } from 'react';
import { Globe, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getProgress, saveProgress } from '@/utils/storage';
import { Language } from '@/types';

export default function HomePage() {
  const router = useRouter();
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const progress = getProgress();
    setLanguage(progress.preferredLanguage);
  }, []);

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    const progress = getProgress();
    progress.preferredLanguage = newLang;
    saveProgress(progress);
  };

  const handlePathSelect = (path: 'QGIS' | 'ArcGIS') => {
    if (path === 'ArcGIS') {
      alert(language === 'en' ? 'Coming Soon!' : '即將推出！');
      return;
    }
    
    const progress = getProgress();
    progress.currentPath = path;
    saveProgress(progress);
    router.push(`/${path.toLowerCase()}/level1`);
  };

  const t = {
    en: {
      title: 'GIS Expression Learning Platform',
      subtitle: 'Learn QGIS & ArcGIS expressions step by step',
      selectPath: 'Select Your Learning Path',
      qgisTitle: 'QGIS Expression Basic Editor',
      qgisDesc: 'Learn QGIS field calculator expressions',
      arcgisTitle: 'ArcGIS Expression Basic Editor',
      arcgisDesc: 'Learn ArcGIS Pro Arcade expressions',
      level1: 'Level 1',
      comingSoon: 'Coming Soon'
    },
    zh: {
      title: 'GIS 表達式學習平台',
      subtitle: '逐步學習 QGIS 和 ArcGIS 表達式',
      selectPath: '選擇你的學習路徑',
      qgisTitle: 'QGIS 表達式基礎編輯器',
      qgisDesc: '學習 QGIS 欄位計算器表達式',
      arcgisTitle: 'ArcGIS 表達式基礎編輯器',
      arcgisDesc: '學習 ArcGIS Pro Arcade 表達式',
      level1: '第一級',
      comingSoon: '即將推出'
    }
  };

  const text = t[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Globe className="w-6 h-6 text-black" />
            <span className="text-xl font-bold text-gray-800">{text.title}</span>
          </div>
          <button
            onClick={() => handleLanguageChange(language === 'en' ? 'zh' : 'en')}
            className="px-4 py-2 bg-gray-100 border-1 border-white hover:bg-gray-200 text-gray-600 rounded-lg text-sm font-medium transition"
          >
            {language === 'en' ? '中文' : 'EN'}
          </button>
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