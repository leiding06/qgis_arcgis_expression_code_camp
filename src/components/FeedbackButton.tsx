'use client';
import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Bug, User } from 'lucide-react';

export default function FeedbackButton() {
    const [open, setOpen] = useState(false);
    const [pos, setPos] = useState({ x: 24, y: 24 });
    const dragging = useRef(false);
    const hasDragged = useRef(false);
    const offset = useRef({ x: 0, y: 0 });

    const handleMouseDown = (e: React.MouseEvent) => {
        dragging.current = true;
        hasDragged.current = false;
        offset.current = {
            x: e.clientX + pos.x,
            y: e.clientY + pos.y,
        };
        e.preventDefault();
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!dragging.current) return;
            hasDragged.current = true;
            setOpen(false);
            setPos({
                x: offset.current.x - e.clientX,
                y: offset.current.y - e.clientY,
            });
        };
        const handleMouseUp = () => {
            dragging.current = false;
        };
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    return (
        <div
            style={{ position: 'fixed', right: pos.x, bottom: pos.y, zIndex: 1000 }}
        >
            {open && (
                <div
                    className="absolute bottom-0 right-0"
                    style={{ paddingBottom: '56px' }}
                    onMouseLeave={() => setOpen(false)}
                >
                    <div className="bg-green-150 border  border-green-200 rounded-xl shadow-lg p-2 flex flex-col gap-1 w-44">
                        <a
                            href="https://github.com/leiding06/qgis_arcgis_expression_code_camp/issues"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-green-200 transition"
                        >
                            <Bug className="w-4 h-4 text-red-500" />
                            Report Issue
                        </a>
                        <a
                            href="https://9700km.vercel.app/members/lei-ding"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-green-200 transition"
                        >
                            <User className="w-4 h-4 text-green-600" />
                            Contact Author
                        </a>
                    </div>
                </div>
            )}

            <button
                onMouseDown={handleMouseDown}
                onClick={() => { if (!hasDragged.current) setOpen(prev => !prev); }}
                onMouseEnter={() => setOpen(true)}
                className="w-12 h-12 border-white bg-green-600 hover:bg-green-800 text-white rounded-full shadow-lg flex items-center justify-center transition cursor-grab active:cursor-grabbing"
            >
                <MessageCircle className="w-5 h-5" />
            </button>
        </div>
    );
}