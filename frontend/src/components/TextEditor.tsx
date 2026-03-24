import { useState, useRef } from 'react';

interface Keystroke {
    timing: number;
    duration: number;
}

interface TextEditorProps {
    onSave: (text: string, keystrokes: Keystroke[], pasteCount: number, pastedLength: number) => Promise<void>;
    saving: boolean;
}

export default function TextEditor({ onSave, saving }: TextEditorProps) {
    const [text, setText] = useState('');

    const keystrokesRef = useRef<Keystroke[]>([]);
    const lastPressTimeRef = useRef<number | null>(null);
    const activeKeysRef = useRef<Record<string, number>>({});

    const pasteCountRef = useRef(0);
    const pastedLengthRef = useRef(0);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        const now = Date.now();
        const key = e.key;

        if (!activeKeysRef.current[key]) {
            activeKeysRef.current[key] = now;
            let timing = 0;
            if (lastPressTimeRef.current !== null) {
                timing = now - lastPressTimeRef.current;
            }
            lastPressTimeRef.current = now;
            keystrokesRef.current.push({ timing, duration: 0 });
        }
    };

    const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        const now = Date.now();
        const key = e.key;

        if (activeKeysRef.current[key]) {
            const pressTime = activeKeysRef.current[key];
            const duration = now - pressTime;

            for (let i = keystrokesRef.current.length - 1; i >= 0; i--) {
                if (keystrokesRef.current[i].duration === 0) {
                    keystrokesRef.current[i].duration = duration;
                    break;
                }
            }

            delete activeKeysRef.current[key];
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
        pasteCountRef.current += 1;
        const pastedText = e.clipboardData.getData('text');
        pastedLengthRef.current += pastedText.length;
    };

    const handleTriggerSave = async () => {
        await onSave(text, keystrokesRef.current, pasteCountRef.current, pastedLengthRef.current);
        // Reset internal state optionally
        setText('');
        keystrokesRef.current = [];
        pasteCountRef.current = 0;
        pastedLengthRef.current = 0;
        lastPressTimeRef.current = null;
        activeKeysRef.current = {};
    };

    return (
        <div className="flex-1 flex flex-col items-center w-full z-10 h-full">
            <div className="w-full flex justify-between items-end mb-4 px-2">
                <div className="flex items-center gap-2">
                    <span className="bg-indigo-50/80 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-indigo-100 shadow-sm flex items-center gap-2 backdrop-blur-sm">
                        <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
                        Analyzing Keyboard Dynamics
                    </span>
                </div>
                <button
                    onClick={handleTriggerSave}
                    disabled={saving || !text.trim()}
                    className="premium-button w-auto py-2.5 px-6 flex items-center gap-2"
                >
                    {saving ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                            Persisting...
                        </>
                    ) : (
                        <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path></svg>
                            Save Session
                        </>
                    )}
                </button>
            </div>

            <div className="flex-1 w-full glass-panel bg-white/70 rounded-2xl overflow-hidden flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-gray-900/5 transition-all focus-within:ring-indigo-500/50 focus-within:shadow-[0_8px_30px_rgb(99,102,241,0.1)]">
                <textarea
                    className="flex-1 w-full p-8 md:p-12 outline-none text-lg md:text-xl text-gray-800 leading-loose custom-scrollbar bg-transparent resize-none placeholder-gray-400/70 font-medium"
                    placeholder="Start typing your thoughts naturally...&#10;&#10;Our quiet rhythm detection runs entirely in the background without stealing focus."
                    value={text}
                    onChange={e => setText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onKeyUp={handleKeyUp}
                    onPaste={handlePaste}
                    spellCheck={false}
                />
            </div>
        </div>
    );
}
