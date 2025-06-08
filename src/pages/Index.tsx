
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-6 py-4 bg-transparent">
        <div className="flex items-center gap-2">
          <Heart className="w-6 h-6 text-emerald-400" />
          <span className="text-xl font-medium text-white">NourishNote</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-white/80">
          <a href="#" className="hover:text-white transition-colors">About</a>
          <a href="#" className="hover:text-white transition-colors">Services</a>
          <a href="#" className="hover:text-white transition-colors">Blog</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
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
          <Button 
            onClick={handleGetStarted}
            size="lg" 
            className="bg-white text-slate-900 hover:bg-white/90 px-8 py-3 rounded-full text-lg font-medium transition-all duration-200 hover:scale-105"
          >
            Get Started →
          </Button>
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
        <div className="text-center mb-20">
          <div className="inline-block bg-slate-800/50 text-slate-300 px-4 py-2 rounded-full text-sm mb-6">
            Why us?
          </div>
          <h2 className="text-4xl font-light text-white mb-4">
            Years of experience
          </h2>
          <p className="text-white/70 mb-12">
            This is why we are the best.
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="p-8 bg-slate-800/30 backdrop-blur-sm border-slate-700 text-center">
              <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-medium text-white mb-4">Personalized Approach</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Tailored solutions precisely crafted to meet your specific needs, 
                leveraging our expertise.
              </p>
            </Card>

            <Card className="p-8 bg-slate-800/30 backdrop-blur-sm border-slate-700 text-center">
              <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-medium text-white mb-4">Support and Motivation</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Unwavering support and motivation to guide you towards 
                your goals, ensuring your success.
              </p>
            </Card>

            <Card className="p-8 bg-slate-800/30 backdrop-blur-sm border-slate-700 text-center">
              <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Smile className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-medium text-white mb-4">Visible Results</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Guaranteed visible results with comprehensive support throughout 
                your journey.
              </p>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="p-12 bg-slate-800/40 backdrop-blur-sm border-slate-700 max-w-2xl mx-auto">
            <h3 className="text-3xl font-light text-white mb-4">
              Let's get in touch
            </h3>
            <p className="text-white/70 mb-8">
              Start your healthy journey today. 🍅
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleGetStarted}
                size="lg" 
                className="bg-white text-slate-900 hover:bg-white/90 px-8 py-3 rounded-full text-lg font-medium transition-all duration-200"
              >
                Book a consultation →
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-3 rounded-full text-lg font-medium"
              >
                ✉ email us
              </Button>
            </div>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-slate-400 text-sm">
          <p>Built with care for mindful eating</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
