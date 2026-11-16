'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { loginAdmin } from '@/lib/api';
import { ShieldCheck, Lock, User, ArrowLeft, KeyRound } from 'lucide-react';

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await loginAdmin(username, password);
      router.push('/admin');
    } catch (err) {
      setError(err.message || 'Invalid admin credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink hover:text-sky mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Public Portfolio</span>
        </Link>

        {/* Login Card */}
        <div className="brutal-card bg-white p-8 border-3 border-ink shadow-[8px_8px_0px_#111111]">
          {/* Header */}
          <div className="flex items-center gap-3 pb-4 mb-6 border-b-2 border-ink">
            <div className="w-10 h-10 bg-electric border-2 border-ink flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-ink" />
            </div>
            <div>
              <h1 className="font-display text-3xl uppercase tracking-tight text-ink">
                ADMIN ACCESS
              </h1>
              <p className="text-xs font-mono text-ink/70">
                CHAITANYA MOHARE PORTFOLIO
              </p>
            </div>
          </div>

          {/* Quick Notice Banner with default credentials */}
          <div className="mb-6 p-3 bg-pastelPink/40 border-2 border-ink text-xs font-medium text-ink flex items-start gap-2">
            <KeyRound className="w-4 h-4 text-ink shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold">Default Credentials Pre-Filled:</strong>
              <div className="font-mono text-[11px] mt-0.5">
                Username: <span className="bg-white px-1 border border-ink">admin</span> &bull; Password: <span className="bg-white px-1 border border-ink">admin123</span>
              </div>
            </div>
          </div>

          {/* Error alert */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border-2 border-red-600 text-xs font-bold text-red-800">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-bold uppercase text-ink mb-1">
                Admin Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 pl-9 text-sm border-2 border-ink focus:outline-none focus:bg-electric/15 font-mono"
                  placeholder="admin"
                />
                <User className="w-4 h-4 text-ink/60 absolute left-3 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-ink mb-1">
                Master Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 pl-9 text-sm border-2 border-ink focus:outline-none focus:bg-electric/15 font-mono"
                  placeholder="••••••••"
                />
                <Lock className="w-4 h-4 text-ink/60 absolute left-3 top-2.5" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="brutal-btn w-full mt-2 py-3 bg-electric text-ink text-sm font-extrabold uppercase tracking-wider flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Enter Admin Dashboard</span>
                </>
              )}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
