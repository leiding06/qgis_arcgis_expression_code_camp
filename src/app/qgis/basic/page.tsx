'use client';
//src/app/qgis/basic/page.tsx
import React, { useState, useEffect } from 'react';
import { Home, Check, FileText } from 'lucide-react';//Award has ben removed  for now, need to add later
import { useRouter } from 'next/navigation';
import { getProgress } from '@/utils/storage';
import { qgisBasicSteps,getStepsByLevel } from '@/data/qgis/basic-steps';


export default function QGISBasicPage() {
    const router = useRouter();
    const [completedSteps, setCompletedSteps] = useState<number[]>([]);

    useEffect(() => {
        const progress = getProgress();

    if (progress.qgis && progress.qgis.basic && Array.isArray(progress.qgis.basic.completedSteps)) {
        setCompletedSteps(progress.qgis.basic.completedSteps);
    } else {
        setCompletedSteps([]); 
    }
    
}, []);


    const handleStepClick = (stepId: number) => {
        if (stepId > 1 && !completedSteps.includes(stepId - 1)) {
        return;
        }
        router.push(`/qgis/basic/step/${stepId}`);
    };


    const text = {
    title: 'QGIS Basic Editor',
    subtitle: 'Master the fundamentals through 3 progressive levels',
    completed: 'Completed',
    stepLocked: 'Complete previous steps to unlock',
    backToHome: 'Back to Home',
    takeTest: 'Take Level Test',
    skipToTest: 'Skip to test if you already know the material'
    };
    
    const levels = [
        {
        level: 1,
        title: 'Level 1: Data Types & Basic Operations',
        description: 'Level 1 focuses on fundamental expression skills, including referencing fields, handling text and numeric data types, and performing basic calculations. ',
        color: 'green'
        },
        {
        level: 2,
        title: 'Level 2: Intermidiate Functions and Conditional Logis',
        description: 'Master string functions and complex operations',
        color: 'blue'
        },
        {
        level: 3,
        title: 'Level 3: Advanced Functions and More Complex Logic',
        description: 'Learn if-then-else and advanced expressions',
        color: 'purple'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
        {/* Navbar */}
        <nav className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
            <div className="flex items-center gap-4">
                <button 
                onClick={() => router.push('/')} 
                className="p-2 text-black hover:bg-gray-100 rounded-lg transition"
                >
                <Home className="w-5 h-5" />
                </button>
                <span className="text-xl font-bold text-gray-800">{text.title}</span>
            </div>
            
            </div>
        </nav>

        {/* Header */}
        <div className="max-w-xl mx-auto px-6 py-12">
            <div className="text-center mb-12">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{text.title}</h1>
            <p className="text-gray-500">
                {completedSteps.length} / {qgisBasicSteps.length} {text.completed}
            </p>
            </div>

            {/* Levels */}
            <div className="space-y-10">
            {levels.map(({ level, title, description, color }) => {
                const levelSteps = getStepsByLevel(level);
                const levelCompleted = levelSteps.filter(s => completedSteps.includes(s.id)).length;
                const isLevelFullyCompleted = levelCompleted === levelSteps.length;

                return (
                <div key={level} className="bg-white rounded-2xl shadow-lg p-8">
                    {/* Level Header */}
                    <div className="mb-6">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                                <h2 className="text-l font-bold text-gray-900 mb-2">{title}</h2>
                                <p className="text-sm text-gray-600">{description}</p>
                                <p className="text-sm text-gray-500 mt-2">
                                    {levelCompleted} / {levelSteps.length} completed
                                </p>
                            </div>
                            {/* Test Button - Always available */}
                            <button
                                onClick={() => router.push(`/qgis/basic/test/${level}`)}
                                className={`ml-4 px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 whitespace-nowrap ${
                                    isLevelFullyCompleted
                                        ? 'bg-green-600 text-white hover:bg-green-700 shadow-md'
                                        : 'bg-blue-50 text-blue-700 border-2 border-blue-200 hover:bg-blue-100'
                                }`}
                                title={isLevelFullyCompleted ? text.takeTest : text.skipToTest}
                            >
                                <FileText className="w-4 h-4" />
                                <span className="text-sm">
                                    {isLevelFullyCompleted ? 'Take Test' : 'Skip to Test'}
                                </span>
                            </button>
                        </div>

                        {/* Info text for skipping */}
                        {!isLevelFullyCompleted && (
                            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                <p className="text-xs text-blue-700">
                                    💡 Already familiar with this material? Take the test to prove your skills and unlock the next level!
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Steps Grid */}
                    <div className="grid grid-cols-5 md:grid-cols-5 gap-6">
                    {levelSteps.map((step) => {
                        const isCompleted = completedSteps.includes(step.id);
                        const isLocked = step.id > 1 && !completedSteps.includes(step.id - 1);
                        
                        return (
                        <button
                            key={step.id}
                            onClick={() => handleStepClick(step.id)}
                            disabled={isLocked}
                            className={`aspect-square rounded-full flex items-center justify-center text-lg font-bold transition ${
                            isCompleted ? 
                            `bg-${color}-500 text-white shadow-lg border-4 border-${color}-700` : 
                            isLocked ? 
                                'bg-gray-200 text-gray-400 cursor-not-allowed border-none' : 
                                `bg-white text-${color}-600 border-2 border-dashed border-${color}-400 hover:bg-green-100`
                            }`}
                            title={isLocked ? text.stepLocked : step.title}
                        >
                            {isCompleted ? <Check className="w-5 h-5" /> : step.id}
                        </button>
                        );
                    })}

                    
                    </div>
                </div>
                );
            })}
            </div>
        </div>
        </div>
    );
}