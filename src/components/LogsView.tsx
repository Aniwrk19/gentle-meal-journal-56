
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Heart, Zap, Activity } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface LogsViewProps {
  onAddMeal: (entry: {
    meal: string;
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
    tip: string;
  }) => void;
}

export const LogsView = ({ onAddMeal }: LogsViewProps) => {
  const [mealInput, setMealInput] = useState('');
  const [showResponse, setShowResponse] = useState(false);
  const [currentResponse, setCurrentResponse] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  const fetchUserGoal = async () => {
    if (!user) return null;
    
    try {
      const { data, error } = await supabase
        .from('user_goals')
        .select('goal_id')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching user goal:', error);
        return null;
      }

      return data?.goal_id || null;
    } catch (error) {
      console.error('Error fetching user goal:', error);
      return null;
    }
  };

  const handleSubmit = async () => {
    if (!mealInput.trim()) return;

    setIsSubmitting(true);
    
    try {
      // Get user's goal
      const goalId = await fetchUserGoal();
      
      // Call OpenAI analysis
      const { data: analysisData, error } = await supabase.functions.invoke('analyze-meal', {
        body: { 
          mealDescription: mealInput,
          goalId: goalId 
        }
      });

      if (error) {
        console.error('Error calling analyze-meal function:', error);
        throw error;
      }

      const aiResponse = {
        meal: mealInput,
        calories: analysisData.calories,
        protein: analysisData.protein,
        carbs: analysisData.carbs,
        fat: analysisData.fat,
        tip: analysisData.tip
      };

      setCurrentResponse(aiResponse);
      setShowResponse(true);
      
      // Save to database
      await onAddMeal(aiResponse);
      
      setMealInput('');
    } catch (error) {
      console.error('Error analyzing meal:', error);
      // Show error but don't break the UI
      const fallbackResponse = {
        meal: mealInput,
        calories: "Unable to analyze",
        protein: "N/A",
        carbs: "N/A", 
        fat: "N/A",
        tip: "We couldn't analyze your meal right now, but great job logging it! Keep up the mindful eating practice."
      };
      
      setCurrentResponse(fallbackResponse);
      setShowResponse(true);
      setMealInput('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-light mb-2 text-slate-50">
          Log your meals here
        </h1>
        <p className="text-gray-300">
          Share what you're eating in your own words
        </p>
      </div>

      {/* Meal Input */}
      <Card className="p-6 mb-6 backdrop-blur-sm border-0 shadow-lg bg-zinc-400">
        <div className="space-y-4">
          <Input 
            placeholder="Tell us about your meal... (e.g., 'Had oatmeal with almond butter and coffee')" 
            value={mealInput} 
            onChange={e => setMealInput(e.target.value)} 
            className="text-lg p-4 border-slate-200 focus:border-emerald-300" 
            onKeyPress={e => e.key === 'Enter' && !isSubmitting && handleSubmit()} 
            disabled={isSubmitting}
          />
          <Button 
            onClick={handleSubmit} 
            disabled={!mealInput.trim() || isSubmitting} 
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-full text-lg font-medium transition-all duration-200"
          >
            {isSubmitting ? 'Analyzing with AI...' : 'Submit'}
          </Button>
        </div>
      </Card>

      {/* AI Response */}
      {showResponse && currentResponse && <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-slate-800 mb-2">Your meal:</h3>
            <p className="text-slate-700 bg-slate-50 p-3 rounded-lg">
              "{currentResponse.meal}"
            </p>
          </div>

          <div className="space-y-4">
            {/* Calories */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                <span className="text-sm font-medium text-slate-600">Calories</span>
              </div>
              <Badge variant="secondary" className="bg-amber-100 text-amber-700">
                {currentResponse.calories}
              </Badge>
            </div>

            {/* Macros */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium text-slate-600">Macros</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="outline" className="border-blue-200 text-blue-700">
                  Protein {currentResponse.protein}
                </Badge>
                <Badge variant="outline" className="border-green-200 text-green-700">
                  Carbs {currentResponse.carbs}
                </Badge>
                <Badge variant="outline" className="border-purple-200 text-purple-700">
                  Fat {currentResponse.fat}
                </Badge>
              </div>
            </div>

            {/* Gentle Tip */}
            <div className="pt-4 border-t border-slate-100">
              <div className="flex items-start gap-2">
                <Heart className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-sm font-medium text-slate-600 block mb-1">AI-powered mindful tip</span>
                  <p className="text-sm text-slate-700">
                    {currentResponse.tip}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>}
    </div>
  );
};
