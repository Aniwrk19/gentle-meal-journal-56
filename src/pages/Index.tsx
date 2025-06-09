import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Heart, Brain, Smile, Edit3 } from 'lucide-react';
import GoalSelection from '@/components/GoalSelection';
import MealPreview from '@/components/MealPreview';
import { useNavigate } from 'react-router-dom';
const Index = () => {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleGetStarted = () => {
    navigate('/dashboard');
  };
  return <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-6 py-4 bg-transparent">
        <div className="flex items-center gap-2">
          <Heart className="w-6 h-6 text-emerald-400" />
          <span className="text-xl font-medium text-white">NourishNote</span>
        </div>
        
      </nav>

      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-block bg-emerald-600/20 text-emerald-300 px-4 py-2 rounded-full text-sm mb-6 border border-emerald-600/30">
            NourishNote - Mindful eating template
          </div>
          <h1 className="text-5xl md:text-6xl font-light text-white mb-6 leading-tight">
            Start eating mindfully
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Providing gentle guidance and mindful reflections to help you
            achieve a healthier relationship with food.
          </p>
          <Button onClick={handleGetStarted} size="lg" className="bg-white text-slate-900 hover:bg-white/90 px-8 py-3 rounded-full text-lg font-medium transition-all duration-200 hover:scale-105">Get Started </Button>
        </div>

        {/* Goal Selection */}
        <div className="mb-20">
          <GoalSelection selectedGoal={selectedGoal} onGoalSelect={setSelectedGoal} />
        </div>

        {/* Sample Meal Preview */}
        <div className="mb-20">
          <MealPreview />
        </div>

        {/* Features Section */}
        

        {/* CTA Section */}
        <div className="text-center">
          
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-slate-400 text-sm">
          <p>Built with care for mindful eating</p>
        </div>
      </div>
    </div>;
};
export default Index;