
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface MealEntry {
  id: string;
  meal: string;
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
  tip: string;
  is_favorite: boolean;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export const useMealEntries = () => {
  const [mealEntries, setMealEntries] = useState<MealEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchMealEntries = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('meal_entries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching meal entries:', error);
        toast({
          title: "Error",
          description: "Failed to fetch meal entries",
          variant: "destructive"
        });
        return;
      }

      setMealEntries(data || []);
    } catch (error) {
      console.error('Error fetching meal entries:', error);
    } finally {
      setLoading(false);
    }
  };

  const addMealEntry = async (entry: {
    meal: string;
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
    tip: string;
  }) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('meal_entries')
        .insert({
          user_id: user.id,
          meal: entry.meal,
          calories: entry.calories,
          protein: entry.protein,
          carbs: entry.carbs,
          fat: entry.fat,
          tip: entry.tip,
          is_favorite: false
        })
        .select()
        .single();

      if (error) {
        console.error('Error adding meal entry:', error);
        toast({
          title: "Error",
          description: "Failed to save meal entry",
          variant: "destructive"
        });
        return;
      }

      setMealEntries(prev => [data, ...prev]);
      toast({
        title: "Meal logged!",
        description: "Your meal has been saved to your history.",
      });
    } catch (error) {
      console.error('Error adding meal entry:', error);
    }
  };

  const toggleFavorite = async (id: string) => {
    if (!user) return;

    const entry = mealEntries.find(e => e.id === id);
    if (!entry) return;

    try {
      const { error } = await supabase
        .from('meal_entries')
        .update({ is_favorite: !entry.is_favorite })
        .eq('id', id);

      if (error) {
        console.error('Error updating favorite:', error);
        toast({
          title: "Error",
          description: "Failed to update favorite",
          variant: "destructive"
        });
        return;
      }

      setMealEntries(prev =>
        prev.map(mealEntry =>
          mealEntry.id === id 
            ? { ...mealEntry, is_favorite: !mealEntry.is_favorite }
            : mealEntry
        )
      );

      toast({
        title: entry.is_favorite ? "Removed from favorites" : "Added to favorites",
        description: entry.is_favorite 
          ? "Meal removed from your favorites." 
          : "Meal added to your favorites!",
      });
    } catch (error) {
      console.error('Error updating favorite:', error);
    }
  };

  useEffect(() => {
    fetchMealEntries();
  }, [user]);

  return {
    mealEntries,
    loading,
    addMealEntry,
    toggleFavorite,
    refetch: fetchMealEntries
  };
};
