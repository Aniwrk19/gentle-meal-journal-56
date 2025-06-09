
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Mail, Lock, User, Chrome } from 'lucide-react';

interface AuthFormProps {
  mode: 'signin' | 'signup';
  onToggleMode: () => void;
}

const AuthForm = ({ mode, onToggleMode }: AuthFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp, signIn, signInWithGoogle } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      let result;
      
      if (mode === 'signup') {
        if (!username.trim()) {
          toast({
            title: "Username required",
            description: "Please enter a username.",
            variant: "destructive"
          });
          setLoading(false);
          return;
        }
        
        if (!email.trim()) {
          toast({
            title: "Email required",
            description: "Please enter an email address.",
            variant: "destructive"
          });
          setLoading(false);
          return;
        }
        
        result = await signUp(email, password, username, fullName);
      } else {
        // For sign in, determine if the username field contains an email or username
        const loginIdentifier = username.trim();
        
        if (!loginIdentifier) {
          toast({
            title: "Username or Email required",
            description: "Please enter your username or email.",
            variant: "destructive"
          });
          setLoading(false);
          return;
        }
        
        // Check if the input looks like an email (contains @)
        const isEmail = loginIdentifier.includes('@');
        
        if (isEmail) {
          // If it's an email, use it directly
          result = await signIn(loginIdentifier, password);
        } else {
          // If it's a username, we need to convert it to email
          // For now, we'll show an error asking for email
          toast({
            title: "Please use your email address",
            description: "Please sign in with your email address instead of username.",
            variant: "destructive"
          });
          setLoading(false);
          return;
        }
      }
      
      if (result.error) {
        toast({
          title: "Authentication Error",
          description: result.error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: mode === 'signup' ? "Account created!" : "Welcome back!",
          description: mode === 'signup' ? "Please check your email to verify your account." : "You've been signed in successfully."
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google') => {
    setLoading(true);
    try {
      const result = await signInWithGoogle();
      if (result.error) {
        toast({
          title: "Authentication Error",
          description: result.error.message,
          variant: "destructive"
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto p-6 bg-white/90 backdrop-blur-sm">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-slate-800">
          {mode === 'signup' ? 'Create Account' : 'Welcome Back'}
        </h2>
        <p className="text-slate-600 mt-2">
          {mode === 'signup' ? 'Start your mindful eating journey' : 'Continue your mindful eating journey'}
        </p>
      </div>

      {/* Social Login Buttons */}
      <div className="space-y-3 mb-6">
        <Button 
          type="button" 
          variant="outline" 
          className="w-full justify-start gap-3" 
          onClick={() => handleSocialLogin('google')} 
          disabled={loading}
        >
          <Chrome className="w-5 h-5" />
          Continue with Google
        </Button>
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-slate-300" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-slate-500">Or continue with email</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username" className="text-slate-700">
            {mode === 'signup' ? 'Username *' : 'Email Address *'}
          </Label>
          <div className="relative">
            {mode === 'signup' ? (
              <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            ) : (
              <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            )}
            <Input 
              id="username" 
              type={mode === 'signup' ? 'text' : 'email'}
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder={mode === 'signup' ? 'Enter your username' : 'Enter your email address'} 
              className="pl-10" 
              required 
            />
          </div>
        </div>

        {mode === 'signup' && (
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-slate-700">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input 
                id="fullName" 
                type="text" 
                value={fullName} 
                onChange={(e) => setFullName(e.target.value)} 
                placeholder="Enter your full name" 
                className="pl-10" 
              />
            </div>
          </div>
        )}

        {mode === 'signup' && (
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-700">Email *</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input 
                id="email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Enter your email" 
                className="pl-10" 
                required 
              />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="password" className="text-slate-700">Password *</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input 
              id="password" 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter your password" 
              className="pl-10" 
              required 
            />
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Loading...' : mode === 'signup' ? 'Create Account' : 'Sign In'}
        </Button>
      </form>

      <div className="text-center mt-6">
        <p className="text-slate-600">
          {mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button 
            onClick={onToggleMode} 
            className="text-emerald-600 hover:text-emerald-700 font-medium"
          >
            {mode === 'signup' ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </Card>
  );
};

export default AuthForm;
