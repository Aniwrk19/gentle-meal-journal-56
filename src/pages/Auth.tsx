
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import AuthForm from '@/components/AuthForm';
import { useAuth } from '@/hooks/useAuth';

const Auth = () => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !loading) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  const toggleMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">
      {/* Header */}
      <nav className="flex justify-between items-center px-6 py-4">
        <button 
          onClick={handleLogoClick}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
        >
          <Heart className="w-6 h-6 text-emerald-400" />
          <span className="text-xl font-medium text-white">NourishNote</span>
        </button>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-md">
          <AuthForm mode={mode} onToggleMode={toggleMode} />
        </div>
      </div>
    </div>
  );
};

export default Auth;
