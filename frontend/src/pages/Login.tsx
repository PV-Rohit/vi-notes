import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { loginUser } from '../services/api';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = await loginUser({ email, password });
            auth?.login(data.token, data.user);
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.error || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md glass-panel p-10 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 -m-8 w-32 h-32 bg-indigo-500 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob"></div>
                <div className="absolute bottom-0 left-0 -m-8 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-2000"></div>

                <h2 className="text-3xl font-extrabold mb-8 text-center gradient-text relative z-10">Welcome Back</h2>

                {error && (
                    <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium relative z-10 shadow-sm transition-all animate-fade-in">
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                            {error}
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 tracking-wide">Email Address</label>
                        <input
                            type="email" required placeholder="you@example.com"
                            className="premium-input"
                            value={email} onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-semibold text-gray-700 tracking-wide">Password</label>
                        </div>
                        <input
                            type="password" required placeholder="••••••••"
                            className="premium-input"
                            value={password} onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="premium-button mt-4">
                        Sign In
                    </button>
                </form>

                <p className="mt-8 text-center text-sm font-medium text-gray-500 relative z-10">
                    New to Vi-Notes? <Link to="/register" className="text-indigo-600 font-semibold hover:text-indigo-500 hover:underline underline-offset-4 transition-colors">Create an account</Link>
                </p>
            </div>

            <p className="mt-8 text-center text-xs text-gray-400 font-medium">
                Authenticity Verification Platform • Keystroke Dynamics
            </p>
        </div>
    );
}
