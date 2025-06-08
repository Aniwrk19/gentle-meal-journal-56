
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Heart, Brain, Smile, Edit3 } from 'lucide-react';
import GoalSelection from '@/components/GoalSelection';
import MealPreview from '@/components/MealPreview';

const Index = () => {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="p-3 bg-emerald-100 rounded-full">
              <Edit3 className="w-8 h-8 text-emerald-600" />
            </div>
            <h1 className="text-2xl font-semibold text-emerald-700">NourishNote</h1>
          </div>
          <h1 className="text-4xl md:text-5xl font-light text-slate-800 mb-6 leading-tight">
            Log what you eat,<br />
            get mindful reflections
          </h1>
          <p className="font-light mb-8 text-slate-800 text-4xl">
            No counting, just clarity.
          </p>
        </div>

        {/* Goal Selection */}
        <div className="mb-16">
          <GoalSelection selectedGoal={selectedGoal} onGoalSelect={setSelectedGoal} />
        </div>

        {/* Sample Meal Preview */}
        <div className="mb-16">
          <MealPreview />
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <h3 className="text-2xl font-light text-slate-800 mb-4">
              Ready to start your mindful journey?
            </h3>
            <p className="text-slate-600 mb-6 max-w-md mx-auto">
              Join others who are discovering a gentler way to understand their relationship with food.
            </p>
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full text-lg font-medium transition-all duration-200 hover:scale-105">
              Get Started
            </Button>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-slate-500 text-sm">
          <p>Built with care for mindful eating</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
