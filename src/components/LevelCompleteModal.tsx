// LevelCompleteModal.tsx 
import React from 'react';

interface LevelCompleteModalProps {
    level: number;
    onTakeTest: () => void;
    onBackToRoadmap: () => void;
    }

    export const LevelCompleteModal: React.FC<LevelCompleteModalProps> = ({
    level,
    onTakeTest,
    onBackToRoadmap,
    }) => {
    return (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
        {/* Confetti Container */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 50 }).map((_, i) => {
            const colors = ['bg-red-400', 'bg-yellow-400', 'bg-green-400', 'bg-blue-400', 'bg-purple-400'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            const randomDelay = Math.random() * 0.5;
            const randomDuration = 3 + Math.random()*3;
            const randomX = (Math.random() - 0.5) * 1000;
            const randomY = Math.random() * 800 + 400;
            const randomRotate = Math.random() * 360;

            return (
                <div
                key={i}
                className={`absolute top-0 left-1/2 w-3 h-2 ${randomColor} rounded-sm`}
                style={{
                    animation: `confettiFall ${randomDuration}s ease-out ${randomDelay}s forwards`,
                    transform: `translate(-50%, -50%) rotate(${randomRotate}deg)`,
                    '--translate-x': `${randomX}px`,
                    '--translate-y': `${randomY}px`,
                } as React.CSSProperties}
                />
            );
            })}
        </div>

        {/* Modal Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-md w-full mx-4 relative z-10 animate-scaleIn">
            
            
            <h2 className="text-3xl font-bold text-green-600 mb-3">
            Congratulations!
            </h2>
            
            <p className="text-gray-700 text-lg mb-6">
                You have completed <span className="font-semibold text-green-600">Level {level}</span>!
            <br />
            <span className="text-sm text-gray-500 mt-2 block">
                Ready to test your knowledge?
            </span>
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
                onClick={onTakeTest}
                className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 active:scale-95 transition-all shadow-md hover:shadow-lg"
            >
                Take Level {level} Test
            </button>
            <button
                onClick={onBackToRoadmap}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 active:scale-95 transition-all"
            >
                Back to Roadmap
            </button>
            </div>

        </div>

        <style jsx>{`
            @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
            }

            @keyframes scaleIn {
            0% {
                transform: scale(0.8);
                opacity: 0;
            }
            50% {
                transform: scale(1.05);
            }
            100% {
                transform: scale(1);
                opacity: 1;
            }
            }

            @keyframes confettiFall {
            0% {
                transform: translate(-50%, -50%) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translate(
                calc(-50% + var(--translate-x)),
                calc(-50% + var(--translate-y))
                ) rotate(720deg);
                opacity: 0;
            }
            }

            .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
            }

            .animate-scaleIn {
            animation: scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
        `}</style>
        </div>
    );
    };