'use client';
//src/app/qgis/basic/page.tsx
import React, { useState, useEffect } from 'react';
import { Home, Check } from 'lucide-react';//Award has ben removed  for now, need to add later
import { useRouter } from 'next/navigation';
import { getProgress } from '@/utils/storage';
import { qgisBasicSteps,getStepsByLevel } from '@/data/qgis/basic-steps';


export default function QGISBasicPage() {
    const router = useRouter();
    const [completedSteps, setCompletedSteps] = useState<number[]>([]);

    useEffect(() => {
        const progress = getProgress();
    // 确保 basic 模块存在且有 completedSteps
    if (progress.qgis && progress.qgis.basic && Array.isArray(progress.qgis.basic.completedSteps)) {
        setCompletedSteps(progress.qgis.basic.completedSteps);
    } else {
        setCompletedSteps([]); // 防止undefined导致报错
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
    backToHome: 'Back to Home'
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
                
                return (
                <div key={level} className="bg-white rounded-2xl shadow-lg p-8">
                    {/* Level Header */}
                    <div className="mb-6">
                    <h2 className="text-l font-bold text-gray-900 mb-2">{title}</h2>
                    <p className="text-sm text-gray-600">{description}</p>
                    <p className="text-sm text-gray-500 mt-2">
                        {levelCompleted} / {levelSteps.length} completed
                    </p>
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