'use client';
// src/app/qgis/basic/step/[id]/page.tsx
import React, { useState } from 'react';
import { ChevronRight, Check, X } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { getProgress, markStepCompleted} from '@/utils/storage';
import { validateAnswer } from '@/utils/validator';
import { qgisBasicSteps } from '@/data/qgis/basic-steps';
import { AttributeTable } from '@/components/AttributeTable';



export default function ExercisePage() {
    const router = useRouter();
    const params = useParams();
    const stepId = parseInt(params.id as string);
    

    const [userCode, setUserCode] = useState('');
    const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null);
    const [showHints, setShowHints] = useState(false);

    const currentStep = qgisBasicSteps.find(s => s.id === stepId);

    if (!currentStep) {
        return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Step not found</h1>
            <button
                onClick={() => router.push('/qgis/basic')}
                className="px-6 py-3 bg-green-600 rounded-lg hover:bg-green-700 transition"
            >
                Back to Roadmap
            </button>
            </div>
        </div>
        );
    }



    const handleSubmit = () => {
        const isCorrect = validateAnswer(userCode, currentStep.correctAnswers);
        setShowFeedback(isCorrect ? 'correct' : 'wrong');

        if (isCorrect) {
        const progress = getProgress();
        // Use the actual level from currentStep instead of hardcoded 1
        markStepCompleted(progress, 'QGIS', 'basic', currentStep.level, stepId);
        setShowHints(false);
    } else {
        setShowHints(true);
        }
    };

    const handleNext = () => {
        setShowFeedback(null);
        setUserCode('');
        setShowHints(false);
        
        if (stepId < qgisBasicSteps.length) {
        router.push(`/qgis/basic/step/${stepId + 1}`);
        } else {
        router.push('/qgis/basic');
        }
    };

    const text = {
        description: 'Description',
        example: 'Example',
        question: 'Question',
        yourCode: 'Field Calculator Editor - Expression Area',
        initialData: 'Initial Attribute Table',
        expectedResult: 'Expected Attribute Table',
        submit: 'Submit Answer',
        nextStep: 'Next Step',
        tryAgain: 'Try Again',
        correct: 'Correct! Well done!',
        wrong: 'Not quite right. Try again!',
        backToRoadmap: 'Back to Roadmap',
        hints: 'Hints',
        showHints: 'Show Hints',
        hideHints: 'Hide Hints'
    };


    return (
        <div className="h-screen flex flex-col bg-gray-200">
        {/* Navbar */}
        <nav className="bg-white shadow-sm border-b flex-shrink-0">
            <div className="max-w-full px-6 py-3 flex justify-between items-center">
            <div className="flex items-center gap-4">
                <button 
                onClick={() => router.push('/qgis/basic')} 
                className="p-2 hover:bg-gray-300 border-1 border-gray-300 rounded-lg transition"
                >
                <ChevronRight className="w-5 h-5 text-black rotate-180" />
                </button>
                <span className="font-bold text-gray-800">
                Step {currentStep.id}: {currentStep.title}
                </span>
            </div>
            
            </div>
        </nav>

        {/* Main Content - Split View */}
        <div className="flex-1 grid md:grid-cols-2 gap-6 p-6 overflow-hidden">
            
            {/* Left Panel - Instructions */}
            <div className="bg-white rounded-xl shadow-lg p-6 overflow-y-auto">
            <h2 className="text-md font-bold text-gray-900 mb-4">
                {currentStep.title}
            </h2>
            
            {/* Description, Example, and Question */}
            <div className="mb-3">
                <h3 className="text-md font-semibold text-gray-700 mb-2">
                {text.description}
                </h3>
                <div
                    className="text-md text-gray-600 whitespace-pre-line"
                    dangerouslySetInnerHTML={{ __html: currentStep.description }} // For adopt the inner HTML formatting in description
                />
            </div>

            {/* Make example support array of strings for multi-line*/}
            <div className="mb-6 bg-gray-50 p-3 rounded-lg text-sm text-gray-800 font-mono overflow-x-auto border border-gray-200">
            {Array.isArray(currentStep.example)
                ? currentStep.example.map((line, idx) => (
                    <div key={idx}>{line}</div>
                ))
                : currentStep.example}
            </div>
            {/* Question */}
            <div className="mb-4">
                <h3 className="text-md font-semibold text-green-700 mb-4">
                {text.question}
                </h3>
                <p className="text-md text-gray-700 font-medium bg-green-50 p-4 rounded-lg border border-green-200">
                {currentStep.question}
                </p>
            </div>


            {/* Hints Area */}
            {currentStep.hints && (
                <div className="mb-6">
                <button
                    onClick={() => setShowHints(!showHints)}
                    className="text-blue-600 hover:text-blue-700 font-medium mb-2"
                >
                    {showHints ? `↑ ${text.hideHints}` : `↓ ${text.showHints}`}
                </button>
                {showHints && (
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h3 className="text-sm font-semibold text-blue-700 mb-2">
                        💡 {text.hints}
                    </h3>
                    <ul className="text-sm list-disc list-inside text-gray-700 space-y-1">
                        {currentStep.hints.map((hint, idx) => (
                        <li key={idx} dangerouslySetInnerHTML={{ __html: hint }} />
                        ))}
                    </ul>
                    </div>
                )}
                </div>
            )}
            </div>

            {/* 2. Right Panel - Goal (Tables) & Work Area (Code) */}
            <div className="flex flex-col gap-6 overflow-hidden">
                
                {/* 2a. Data Comparison Area (Tables Top-Right) */}
                <div className="flex-shrink-0 bg-white rounded-xl shadow-lg p-4 md:p-6 space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-4">
                    
                    {/* Initial Attribute Table */}
                    {currentStep.initialTable && (
                    <AttributeTable
                        title="Initial Attribute Table" 
                        columns={[currentStep.initialTable.id_field, ...currentStep.initialTable.columns]}
                        data={currentStep.initialTable.id_value.map((id, idx) => [
                        id, ...currentStep.initialTable.values[idx]
                        ])}
                        isExpected={false}
                        isComparisonView={true}
                    />
                    )}

                    {/* Expected Attribute Table */}
                    {currentStep.expectedTable && (
                    <AttributeTable 
                        title='Expected Attribute Table'
                        columns={[currentStep.expectedTable.id_field, ...currentStep.expectedTable.columns]}
                        data={currentStep.expectedTable.id_value.map((id, idx) => [
                        id, ...currentStep.expectedTable.values[idx]
                        ])}
                        isExpected={true}
                        isComparisonView={true}
                    />
                    )}
                </div>

                {/* 2b. Code Editor & Submission Area (Work Area Bottom-Right) */}
                <div className="bg-white rounded-xl shadow-lg p-6 flex-1 flex flex-col min-h-0">
                    
                    <h3 className="text-md font-semibold text-gray-700 mb-3">
                    {text.yourCode}
                    </h3>
                    <textarea
                    value={userCode}
                    onChange={(e) => setUserCode(e.target.value)}
                    className="flex-1 w-full p-4 border-2 border-gray-300 rounded-lg font-mono text-sm focus:border-green-500 focus:outline-none resize-none bg-gray-50 text-gray-900 placeholder-gray-500 min-h-[100px]"
                    placeholder={'// Write your code here...'} 
                    spellCheck={false}
                    />
                    <button
                    onClick={handleSubmit}
                    disabled={!userCode.trim()}
                    className="mt-4 w-full py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition"
                    >
                    {text.submit}
                    </button>

                    {/* Feedback Display */}
                    {showFeedback && (
                    <div className={`mt-4 p-4 rounded-lg flex items-start gap-3 ${
                        showFeedback === 'correct' 
                        ? 'bg-green-50 border-2 border-green-200' 
                        : 'bg-red-50 border-2 border-red-200'
                    }`}>
                        {showFeedback === 'correct' ? (
                        <>
                            <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                            <p className="font-semibold text-green-800 mb-2">
                                {text.correct}
                            </p>
                            <button
                                onClick={handleNext}
                                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition"
                            >
                                {stepId < qgisBasicSteps.length ? text.nextStep : text.backToRoadmap}
                            </button>
                            </div>
                        </>
                        ) : (
                        <>
                            <X className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                            <p className="font-semibold text-red-800 mb-2">
                                {text.wrong}
                            </p>
                            <button
                                onClick={() => setShowFeedback(null)}
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition"
                            >
                                {text.tryAgain}
                            </button>
                            </div>
                        </>
                        )}
                    </div>
                    )}
                </div>
            </div>
        </div>
        </div>
    );
}
