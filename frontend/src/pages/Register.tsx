import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/api';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await registerUser({ email, password, name });
            navigate('/login');
        } catch (err: any) {
            setError(err.response?.data?.error || 'Registration failed');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md glass-panel p-10 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 -m-8 w-32 h-32 bg-indigo-500 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob"></div>

                <h2 className="text-3xl font-extrabold mb-8 text-center gradient-text relative z-10">Create Account</h2>

                {error && (
                    <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium relative z-10 shadow-sm transition-all">
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                            {error}
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 tracking-wide">Full Name</label>
                        <input
                            type="text" placeholder="John Doe"
                            className="premium-input"
                            value={name} onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 tracking-wide">Email Address</label>
                        <input
                            type="email" required placeholder="you@example.com"
                            className="premium-input"
                            value={email} onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 tracking-wide">Password</label>
                        <input
                            type="password" required placeholder="••••••••"
                            className="premium-input"
                            value={password} onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="premium-button mt-6 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400">
                        Create Account
                    </button>
                </form>

                <p className="mt-8 text-center text-sm font-medium text-gray-500 relative z-10">
                    Already have an account? <Link to="/login" className="text-indigo-600 font-semibold hover:text-indigo-500 hover:underline underline-offset-4 transition-colors">Sign in</Link>
                </p>
            </div>

            <p className="mt-8 text-center text-xs text-gray-400 font-medium">
                Authenticity Verification Platform • Your privacy protected
            </p>
        </div>
    );
}
