import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Utensils, Zap, Activity, Heart } from 'lucide-react';
const MealPreview = () => {
  return <div className="text-center">
      <h2 className="text-2xl font-light text-slate-800 mb-6">
        See how it works
      </h2>
      <Card className="max-w-lg mx-auto p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        {/* Meal Input */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Utensils className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-medium text-slate-600">Your meal</span>
          </div>
          <p className="text-slate-800 bg-slate-50 p-3 rounded-lg text-left">
            "Had dal, rice, and papad"
          </p>
        </div>

        {/* AI Response */}
        <div className="space-y-4">
          {/* Calories */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-medium text-slate-600">Calories</span>
            </div>
            <Badge variant="secondary" className="bg-amber-100 text-amber-700">
              540 kcal
            </Badge>
          </div>

          {/* Macros */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-slate-600">Macros</span>
            </div>
            <div className="flex gap-2 justify-center">
              <Badge variant="outline" className="border-blue-200 text-blue-700">
                Protein 15g
              </Badge>
              <Badge variant="outline" className="border-green-200 text-green-700">
                Carbs 65g
              </Badge>
              <Badge variant="outline" className="border-purple-200 text-purple-700">
                Fat 20g
              </Badge>
            </div>
          </div>

          {/* Gentle Tip */}
          <div className="pt-4 border-t border-slate-100">
            <div className="flex items-start gap-2">
              <Heart className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0" />
              <div>
                <span className="text-sm font-medium text-slate-600 block mb-1 text-left">Gentle tip</span>
                <p className="text-sm text-slate-700 text-left">
                  "Comforting and nourishing! Add some salad next time for more fiber."
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>;
};
export default MealPreview;