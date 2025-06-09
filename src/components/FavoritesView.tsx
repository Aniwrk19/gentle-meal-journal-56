
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Zap, Activity } from 'lucide-react';
import { MealEntry } from '@/hooks/useMealEntries';

interface FavoritesViewProps {
  entries: MealEntry[];
  onToggleFavorite: (id: string) => void;
  loading?: boolean;
}

export const FavoritesView = ({ entries, onToggleFavorite, loading = false }: FavoritesViewProps) => {
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-light text-slate-50 mb-2">
            Your favorite meals
          </h1>
          <p className="text-slate-300">
            Meals you've marked as favorites for easy reference
          </p>
        </div>
        <Card className="p-12 text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <p className="text-slate-500 text-lg">Loading your favorites...</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-light text-slate-50 mb-2">
          Your favorite meals
        </h1>
        <p className="text-slate-300">
          Meals you've marked as favorites for easy reference
        </p>
      </div>

      {entries.length === 0 ? (
        <Card className="p-12 text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <Heart className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500 text-lg mb-2">
            No favorite meals yet
          </p>
          <p className="text-slate-400">
            Heart meals in your logs or history to see them here.
          </p>
        </Card>
      ) : (
        <div className="space-y-6">
          {entries.map((entry) => (
            <Card key={entry.id} className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-slate-800 mb-1">
                    {new Date(entry.created_at).toLocaleDateString()} at {new Date(entry.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </h3>
                  <p className="text-slate-700 bg-slate-50 p-3 rounded-lg">
                    "{entry.meal}"
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onToggleFavorite(entry.id)}
                  className="ml-4 text-rose-500 hover:text-rose-600"
                >
                  <Heart className="w-5 h-5 fill-current" />
                </Button>
              </div>

              <div className="space-y-4">
                {/* Calories */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-500" />
                    <span className="text-sm font-medium text-slate-600">Calories</span>
                  </div>
                  <Badge variant="secondary" className="bg-amber-100 text-amber-700">
                    {entry.calories}
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
                      Protein {entry.protein}
                    </Badge>
                    <Badge variant="outline" className="border-green-200 text-green-700">
                      Carbs {entry.carbs}
                    </Badge>
                    <Badge variant="outline" className="border-purple-200 text-purple-700">
                      Fat {entry.fat}
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
                        {entry.tip}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
