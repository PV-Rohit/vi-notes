import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import TextEditor from '../components/TextEditor';
import { saveSession } from '../services/api';

export default function Editor() {
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    const auth = useContext(AuthContext);

    const handleSave = async (text: string, keystrokes: any[], pasteCount: number, pastedLength: number) => {
        if (!text.trim()) {
            setMessage('Cannot save empty session.');
            return;
        }

        setSaving(true);
        setMessage('');

        try {
            await saveSession({ text, keystrokes, pasteCount, pastedLength }, auth?.token || '');
            setMessage('Session saved successfully!');
        } catch (err: any) {
            setMessage(err.response?.data?.error || 'Failed to save session');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-transparent flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-60 -z-10 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-60 -z-10 translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

            <header className="glass-panel sticky top-0 z-50 px-6 py-4 flex justify-between items-center border-b border-indigo-100/50 bg-white/70">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 shadow-md flex items-center justify-center">
                        <span className="text-white font-bold text-sm">Vi</span>
                    </div>
                    <h1 className="text-xl font-extrabold text-gray-800 tracking-tight">Vi-Notes</h1>
                </div>

                <div className="flex items-center gap-6">
                    <div className="hidden sm:flex items-center gap-2 px-4 py-1.5 bg-white/50 rounded-full border border-gray-100 shadow-sm">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                        </span>
                        <span className="text-sm font-medium text-gray-700">
                            {auth?.user?.name || auth?.user?.email}
                        </span>
                    </div>
                    <button
                        onClick={auth?.logout}
                        className="text-sm font-semibold text-gray-500 hover:text-indigo-600 transition-colors px-3 py-1.5 rounded-md hover:bg-indigo-50/80"
                    >
                        Sign out
                    </button>
                </div>
            </header>

            <main className="flex-1 flex flex-col p-4 sm:p-8 max-w-5xl mx-auto w-full relative z-10">
                {message && (
                    <div className={`p-4 rounded-xl mb-6 text-sm font-medium shadow-sm transition-all animate-fade-in flex items-center justify-between ${message.includes('success') ? 'bg-emerald-50/90 text-emerald-700 border border-emerald-100' : 'bg-red-50/90 text-red-700 border border-red-100'}`}>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                {message.includes('success')
                                    ? <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    : <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />}
                            </svg>
                            {message}
                        </div>
                        <button onClick={() => setMessage('')} className="opacity-50 hover:opacity-100"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
                    </div>
                )}
                <TextEditor onSave={handleSave} saving={saving} />
            </main>
        </div>
    );
}
