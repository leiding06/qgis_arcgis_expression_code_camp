//src/components/ShowAnswer.tsx
'use client';
import { useState } from 'react';

interface ShowAnswerHintProps {
    correctAnswers: (string | number)[];
    wrongCount: number;
    threshold?: number; 
}

export function ShowAnswerHint({ correctAnswers, wrongCount, threshold = 3 }: ShowAnswerHintProps) {
    const [showAnswer, setShowAnswer] = useState(false);

    if (wrongCount < threshold) return null;

    return (
        <div className="mt-3">
            {!showAnswer ? (
                <button
                    onClick={() => setShowAnswer(true)}
                    className="w-full py-2 border border-dashed border-orange-400/60 text-orange-400 hover:bg-orange-400/10 rounded-lg text-sm font-medium transition-all duration-200"
                >
                    Show me Answer!
                </button>
            ) : (
                <div className="p-4 bg-orange-950/40 border border-orange-400/30 rounded-lg">
                    <p className="text-orange-300 text-xs font-semibold uppercase tracking-wide mb-2">
                        One of the correct answer:
                    </p>
                    <code className="block text-orange-100 text-sm font-mono bg-black/30 px-3 py-2 rounded mb-2">
                        {correctAnswers[0]}
                    </code>
                    {correctAnswers.length > 1 && (
                        <p className="text-gray-500 text-xs">
                            * Other valid answers exist
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}