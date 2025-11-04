
'use client';
// src/app/qgis/basic/test/[level]/page.tsx
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ChevronRight, Check, X, Trophy, BookOpen } from 'lucide-react';
import { getTestByLevel } from '@/data/qgis/basic-tests';
import { validateAnswer } from '@/utils/validator';

export default function TestPage() {
    const router = useRouter();
    const params = useParams();
    const level = parseInt(params.level as string);
    
    const test = getTestByLevel(level);
    
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<{ [key: number]: string | number }>({});
    const [score, setScore] = useState(0);
    const [isTestComplete, setIsTestComplete] = useState(false);
    const [showResults, setShowResults] = useState(false);
    
    if (!test) {
        return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
            <div className="text-center bg-white rounded-2xl shadow-2xl p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Test not found</h1>
            <button
                onClick={() => router.push('/qgis/basic')}
                className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition font-semibold"
            >
                Back to Roadmap
            </button>
            </div>
        </div>
        );
    }
    
    const currentQuestion = test.questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === test.questions.length - 1;
    const progressPercentage = ((currentQuestionIndex + 1) / test.questions.length) * 100;
    

    const handleMultipleChoiceAnswer = (optionIndex: number) => {
        setUserAnswers({
        ...userAnswers,
        [currentQuestion.id]: optionIndex
        });
    };

    const handleCodeInputAnswer = (code: string) => {
        setUserAnswers({
        ...userAnswers,
        [currentQuestion.id]: code
        });
    };

    const handleNext = () => {
        if (isLastQuestion) {
        let totalScore = 0;
        test.questions.forEach((question) => {
            const userAnswer = userAnswers[question.id];
            
            if (question.type === 'multiple-choice') {
            if (userAnswer === question.correctOption) {
                totalScore += question.points;
            }
            } else if (question.type === 'code-input') {
            if (typeof userAnswer === 'string' && question.correctAnswers) {
                const isCorrect = validateAnswer(userAnswer, question.correctAnswers);
                if (isCorrect) {
                totalScore += question.points;
                }
            }
            }
        });
        
        setScore(totalScore);
        setIsTestComplete(true);
        } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };
    
    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleViewResults = () => {
        setShowResults(true);
    };
    
    const handleRetakeTest = () => {
        setCurrentQuestionIndex(0);
        setUserAnswers({});
        setScore(0);
        setIsTestComplete(false);
        setShowResults(false);
    };

    const isPassed = score >= test.passingScore;


    // Test completion screen
    if (isTestComplete && !showResults) {
        return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 flex items-center justify-center p-6">
            <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-lg w-full text-center relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500"></div>
            
            <div className={`text-7xl mb-6 ${isPassed ? 'animate-bounce' : ''}`}>
                {isPassed ? <Trophy className="w-20 h-20 mx-auto text-amber-500" /> : <BookOpen className="w-20 h-20 mx-auto text-slate-500" />}
            </div>
            
            <h1 className={`text-4xl font-bold mb-4 ${isPassed ? 'text-emerald-600' : 'text-orange-600'}`}>
                {isPassed ? 'Excellent Work!' : 'Keep Practicing!'}
            </h1>
            
            <div className="mb-8">
                <div className={`text-6xl font-bold mb-3 ${isPassed ? 'text-emerald-700' : 'text-slate-700'}`}>
                {score} / {test.totalScore}
                </div>
                <div className="inline-block px-4 py-2 bg-slate-100 rounded-full">
                <p className="text-slate-600 font-medium">
                    Passing Score: {test.passingScore}
                </p>
                </div>
            </div>

            {isPassed ? (
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-300 rounded-xl p-5 mb-8">
                <p className="text-emerald-800 font-semibold text-lg">
                    Congratulations! You can now proceed to Level {level + 1}!
                </p>
                </div>
            ) : (
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-300 rounded-xl p-5 mb-8">
                <p className="text-orange-800 font-semibold text-lg">
                    You need {test.passingScore - score} more point(s) to pass. Review and try again!
                </p>
                </div>
            )}

            <div className="flex flex-col gap-3">
                <button
                onClick={handleViewResults}
                className="px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                >
                View Detailed Results
                </button>
                <button
                onClick={handleRetakeTest}
                className="px-6 py-4 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-xl font-bold hover:from-slate-700 hover:to-slate-800 shadow-md transition-all"
                >
                Retake Test
                </button>
                <button
                onClick={() => router.push('/qgis/basic')}
                className="px-6 py-3 bg-white border-2 border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 hover:border-slate-400 transition-all"
                >
                ← Back to Roadmap
                </button>
            </div>
            </div>
        </div>
        );
    }

    // Results review screen
    if (showResults) {
        return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6">
            <div className="max-w-4xl mx-auto">
            {/* Header Card */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
                <div className="flex items-center justify-between mb-2">
                <h1 className="text-3xl font-bold text-slate-900">Test Results</h1>
                <div className="text-2xl font-bold">
                    Score: <span className={isPassed ? 'text-emerald-600' : 'text-orange-600'}>
                    {score}/{test.totalScore}
                    </span>
                </div>
                </div>
                <p className="text-slate-600 text-lg">{test.title}</p>
            </div>

            {/* Question results */}
            <div className="space-y-5">
                {test.questions.map((question, idx) => {
                const userAnswer = userAnswers[question.id];
                let isCorrect = false;

                if (question.type === 'multiple-choice') {
                    isCorrect = userAnswer === question.correctOption;
                } else if (question.type === 'code-input') {
                    isCorrect = typeof userAnswer === 'string' && 
                            question.correctAnswers ? 
                            validateAnswer(userAnswer, question.correctAnswers) : false;
                }

                return (
                    <div key={question.id} className={`bg-white rounded-2xl shadow-xl p-6 border-l-8 ${
                    isCorrect ? 'border-emerald-500' : 'border-red-500'
                    }`}>
                    <div className="flex items-start gap-4">
                        <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                        isCorrect ? 'bg-emerald-100' : 'bg-red-100'
                        }`}>
                        {isCorrect ? (
                            <Check className="w-7 h-7 text-emerald-600" />
                        ) : (
                            <X className="w-7 h-7 text-red-600" />
                        )}
                        </div>
                        
                        <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                            <div className="font-bold text-slate-900 text-lg">
                            Question {idx + 1}
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                            isCorrect ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                            }`}>
                            {isCorrect ? `+${question.points} pt` : '0 pt'}
                            </span>
                        </div>
                        
                        <p className="text-slate-700 text-lg mb-4">{question.question}</p>
                        
                        {question.type === 'multiple-choice' && (
                            <div className="space-y-3">
                            <div className="text-sm font-medium text-slate-600">
                                Your answer: 
                                <span className={`ml-2 font-bold ${isCorrect ? 'text-emerald-600' : 'text-red-600'}`}>
                                {question.options?.[userAnswer as number] || 'No answer'}
                                </span>
                            </div>
                            {!isCorrect && (
                                <div className="text-sm font-medium text-slate-600">
                                Correct answer: 
                                <span className="ml-2 text-emerald-600 font-bold">
                                    {question.options?.[question.correctOption || 0]}
                                </span>
                                </div>
                            )}
                            </div>
                        )}

                        {question.type === 'code-input' && (
                            <div className="space-y-3">
                            <div>
                                <div className="text-sm font-semibold text-slate-600 mb-2">Your answer:</div>
                                <code className={`block p-3 rounded-lg text-sm font-mono border-2 ${
                                isCorrect 
                                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                                    : 'bg-red-50 text-red-800 border-red-200'
                                }`}>
                                {userAnswer || 'No answer'}
                                </code>
                            </div>
                            {!isCorrect && question.correctAnswers && (
                                <div>
                                <div className="text-sm font-semibold text-slate-600 mb-2">Example correct answer:</div>
                                <code className="block p-3 rounded-lg bg-emerald-50 text-emerald-800 text-sm font-mono border-2 border-emerald-200">
                                    {question.correctAnswers[0]}
                                </code>
                                </div>
                            )}
                            </div>
                        )}

                        {question.explanation && (
                            <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
                            <div className="text-sm text-blue-900">
                                <span className="font-bold">💡 Explanation: </span>
                                {question.explanation}
                            </div>
                            </div>
                        )}
                        </div>
                    </div>
                    </div>
                );
                })}
            </div>

            {/* Action buttons */}
            <div className="mt-8 flex gap-4">
                <button
                onClick={handleRetakeTest}
                className="flex-1 px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold text-lg hover:from-emerald-700 hover:to-teal-700 shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                >
                🔄 Retake Test
                </button>
                <button
                onClick={() => router.push('/qgis/basic')}
                className="flex-1 px-6 py-4 bg-white text-slate-700 rounded-xl font-bold text-lg hover:bg-slate-50 shadow-lg transition-all border-2 border-slate-300"
                >
                ← Back to Roadmap
                </button>
            </div>
            </div>
        </div>
        );
    }

    // Main test interface
    return (
        <div className="h-screen flex flex-col bg-gradient-to-br from-slate-900 to-slate-800">
        {/* Header with gradient */}
        <nav className="bg-white shadow-lg border-b-4 border-emerald-500 flex-shrink-0">
            <div className="max-w-full px-6 py-5">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                <button 
                    onClick={() => router.push('/qgis/basic')} 
                    className="p-2 hover:bg-slate-100 border-2 border-slate-300 rounded-lg transition"
                    title="Back to Roadmap"
                >
                    <ChevronRight className="w-5 h-5 text-slate-700 rotate-180" />
                </button>
                <div>
                    <h1 className="font-bold text-slate-900 text-xl">{test.title}</h1>
                    <p className="text-sm text-slate-600">{test.description}</p>
                </div>
                </div>
                <div className="text-right bg-slate-100 px-4 py-2 rounded-lg border-2 border-slate-300">
                <div className="text-sm font-semibold text-slate-600">Question {currentQuestionIndex + 1} of {test.questions.length}</div>
                <div className="text-sm font-bold text-slate-900">Total: {test.totalScore} pts</div>
                </div>
            </div>
            
            {/* Progress bar with gradient */}
            <div className="w-full bg-slate-200 rounded-full h-3 shadow-inner">
                <div 
                className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 h-3 rounded-full transition-all duration-500 shadow-md"
                style={{ width: `${progressPercentage}%` }}
                />
            </div>
            </div>
        </nav>

        {/* Question content */}
        <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border-t-4 border-emerald-500">
                {/* Question header */}
                <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-slate-900">
                    Question {currentQuestionIndex + 1}
                    </h2>
                    <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full text-sm font-bold shadow-md">
                    {currentQuestion.points} {currentQuestion.points === 1 ? 'point' : 'points'}
                    </span>
                </div>
                <p className="text-xl text-slate-700 font-medium">{currentQuestion.question}</p>
                
                {currentQuestion.fieldContext && (
                    <div 
                    className="mt-4 p-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl text-sm text-slate-700 border-2 border-slate-200"
                    dangerouslySetInnerHTML={{ __html: currentQuestion.fieldContext }}
                    />
                )}
                </div>

                {/* Multiple choice */}
                {currentQuestion.type === 'multiple-choice' && currentQuestion.options && (
                <div className="space-y-4">
                    {currentQuestion.options.map((option, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleMultipleChoiceAnswer(idx)}
                        className={`w-full p-5 text-left rounded-xl border-2 transition-all transform hover:scale-102 ${
                        userAnswers[currentQuestion.id] === idx
                            ? 'border-emerald-500 bg-gradient-to-r from-emerald-50 to-teal-50 shadow-lg'
                            : 'border-slate-300 hover:border-slate-400 bg-white hover:shadow-md'
                        }`}
                    >
                        <div className="flex items-center gap-4">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            userAnswers[currentQuestion.id] === idx
                            ? 'border-emerald-500 bg-emerald-500 shadow-md'
                            : 'border-slate-300'
                        }`}>
                            {userAnswers[currentQuestion.id] === idx && (
                            <Check className="w-4 h-4 text-white" />
                            )}
                        </div>
                        <span className={`text-lg ${
                            userAnswers[currentQuestion.id] === idx ? 'text-slate-900 font-semibold' : 'text-slate-700'
                        }`}>
                            {option}
                        </span>
                        </div>
                    </button>
                    ))}
                </div>
                )}

                {/* Code input */}
                {currentQuestion.type === 'code-input' && (
                <div className="space-y-4">
                    <div>
                    <label className="block text-base font-bold text-slate-700 mb-3">
                        Your Expression:
                    </label>
                    <textarea
                        value={(userAnswers[currentQuestion.id] as string) || ''}
                        onChange={(e) => handleCodeInputAnswer(e.target.value)}
                        placeholder={currentQuestion.placeholder || '// Enter your expression here'}
                        className="w-full p-5 border-2 border-slate-300 rounded-xl font-mono text-base focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 focus:outline-none resize-none bg-slate-50 text-slate-900 placeholder-slate-400 shadow-inner"
                        rows={4}
                        spellCheck={false}
                    />
                    </div>
                </div>
                )}
            </div>

            {/* Navigation */}
            <div className="mt-6 flex justify-between gap-4">
                <button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className="px-8 py-4 bg-white text-slate-700 rounded-xl font-bold text-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg border-2 border-slate-300"
                >
                ← Previous
                </button>
                <button
                onClick={handleNext}
                disabled={userAnswers[currentQuestion.id] === undefined}
                className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold text-lg hover:from-emerald-700 hover:to-teal-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                {isLastQuestion ? 'Submit Test 🚀' : 'Next →'}
                </button>
            </div>
            </div>
        </div>
        </div>
    );
    }