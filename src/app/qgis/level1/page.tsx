'use client';
//src/app/qgis/level1/page.tsx
import React, { useState, useEffect } from 'react';
import { Home, Check, Award } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getProgress } from '@/utils/storage';
import { qgisLevel1Steps } from '@/data/qgis/level1-steps';


export default function QGISLevel1Roadmap() {
    const router = useRouter();
    const [completedSteps, setCompletedSteps] = useState<number[]>([]);

    useEffect(() => {
        const progress = getProgress();
        setCompletedSteps(progress.qgisProgress.level1.completedSteps);
    }, []);



    const handleStepClick = (stepId: number) => {
        if (stepId > 1 && !completedSteps.includes(stepId - 1)) {
        return;
        }
        router.push(`/qgis/level1/step/${stepId}`);
    };


    const text =  {
        title: 'QGIS Expression Basic Editor',
        level1: 'Level 1',
        completed: 'Completed',
        steps: 'Steps',
        backToHome: 'Back to Home',
        takeTest: 'Take Final Test',
        stepLocked: 'Complete previous steps to unlock'
        }
    const totalSteps = 10;

    return (
        <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
                <button 
                onClick={() => router.push('/')} 
                className="p-2 text-black hover:bg-gray-100 rounded-lg transition"
                >
                <Home className="w-5 h-5" />
                </button>
            
            </div>
            
            </div>
        </nav>

        <div className="max-w-xl mx-auto px-6 py-12">
            <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{text.level1}</h1>
            <p className="text-gray-600">
                {completedSteps.length} / {totalSteps} {text.completed}
            </p>
            </div>

            <div className="grid grid-cols-5 gap-6">
            {qgisLevel1Steps.map((step) => {
                const isCompleted = completedSteps.includes(step.id);
                const isLocked = step.id > 1 && !completedSteps.includes(step.id - 1);
                
                return (
                <button
                    key={step.id}
                    onClick={() => handleStepClick(step.id)}
                    disabled={isLocked}
                    className={`aspect-square rounded-full flex items-center justify-center text-xl font-bold transition ${
                    isCompleted
                        ? 'bg-green-500 text-white shadow-lg'
                        : isLocked
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-white border-2 border-green-500 text-green-600 hover:bg-green-50 shadow-md'
                    }`}
                    title={isLocked ? text.stepLocked : step.title}
                >
                    {isCompleted ? <Check className="w-6 h-6" /> : step.id}
                </button>
                );
            })}
            
            {Array.from({ length: totalSteps - qgisLevel1Steps.length }).map((_, idx) => (
                <div 
                key={`future-${idx}`} 
                className="aspect-square rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-xl font-bold"
                >
                {qgisLevel1Steps.length + idx + 1}
                </div>
            ))}
            </div>

            {completedSteps.length === qgisLevel1Steps.length && (
            <div className="mt-12 text-center">
                <button 
                onClick={() => alert('Congratulations! You have completed all the steps for Level 1 Basic, you can now proceed to the next level.')}
                className="px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl font-bold text-lg shadow-lg flex items-center gap-2 mx-auto transition"
                >
                <Award className="w-6 h-6" />
                {text.takeTest}
                </button>
            </div>
            )}
        </div>
        </div>
    );
    }