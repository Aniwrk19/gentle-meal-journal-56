import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Heart, Zap, Activity } from 'lucide-react';

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

  const handleSubmit = async () => {
    if (!mealInput.trim()) return;

    setIsSubmitting(true);
    
    // Generate a mock AI response
    const mockResponse = {
      meal: mealInput,
      calories: `${Math.floor(Math.random() * 400) + 200} kcal`,
      protein: `${Math.floor(Math.random() * 20) + 5}g`,
      carbs: `${Math.floor(Math.random() * 60) + 20}g`,
      fat: `${Math.floor(Math.random() * 25) + 5}g`,
      tip: generateMockTip(mealInput)
    };

    setCurrentResponse(mockResponse);
    setShowResponse(true);
    
    // Save to database
    await onAddMeal(mockResponse);
    
    setMealInput('');
    setIsSubmitting(false);
  };

  const generateMockTip = (meal: string) => {
    const tips = [
      "Great choice! Consider adding some leafy greens next time for extra nutrients.",
      "Wonderful! Your meal looks balanced - the fiber will keep you satisfied.",
      "Nice work! Adding a bit of healthy fat like avocado could enhance nutrient absorption.",
      "Looking good! Try pairing this with some herbal tea for better digestion.",
      "Excellent! This combination provides steady energy throughout the day."
    ];
    return tips[Math.floor(Math.random() * tips.length)];
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
            {isSubmitting ? 'Analyzing...' : 'Submit'}
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
                  <span className="text-sm font-medium text-slate-600 block mb-1">Gentle tip</span>
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
