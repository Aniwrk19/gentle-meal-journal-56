
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Brain, Smile, Eye, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface Goal {
  id: string;
  text: string;
  icon: React.ReactNode;
}

const goals: Goal[] = [
  {
    id: 'mindful',
    text: 'Be more mindful about what I eat',
    icon: <Brain className="w-5 h-5" />
  },
  {
    id: 'relationship',
    text: 'Improve my relationship with food',
    icon: <Heart className="w-5 h-5" />
  },
  {
    id: 'wellbeing',
    text: 'Learn what makes me feel good',
    icon: <Smile className="w-5 h-5" />
  },
  {
    id: 'peaceful',
    text: 'Just want to record meals peacefully',
    icon: <Eye className="w-5 h-5" />
  }
];

const DashboardGoalSelection = () => {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasGoal, setHasGoal] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchUserGoal();
  }, [user]);

  const fetchUserGoal = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_goals')
        .select('goal_id')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching user goal:', error);
        return;
      }

      if (data) {
        setSelectedGoal(data.goal_id);
        setHasGoal(true);
      }
    } catch (error) {
      console.error('Error fetching user goal:', error);
    }
  };

  const handleGoalSelect = async (goalId: string) => {
    if (!user) return;

    setLoading(true);
    try {
      if (hasGoal) {
        // Update existing goal
        const { error } = await supabase
          .from('user_goals')
          .update({ 
            goal_id: goalId,
            updated_at: new Date().toISOString()
          })
          .eq('user_id', user.id);

        if (error) throw error;
      } else {
        // Insert new goal
        const { error } = await supabase
          .from('user_goals')
          .insert({
            user_id: user.id,
            goal_id: goalId
          });

        if (error) throw error;
        setHasGoal(true);
      }

      setSelectedGoal(goalId);
      toast({
        title: "Goal saved!",
        description: "Your mindful eating goal has been saved successfully.",
      });

    } catch (error: any) {
      console.error('Error saving goal:', error);
      toast({
        title: "Error",
        description: "Failed to save your goal. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <Card className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg mb-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-light mb-4 text-slate-800">
          {hasGoal ? 'Your mindful eating goal' : "What's your goal with this journal?"}
        </h2>
        {hasGoal && (
          <p className="text-slate-600">
            You can change your goal anytime by selecting a different option below.
          </p>
        )}
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 max-w-2xl mx-auto">
        {goals.map((goal) => (
          <Card
            key={goal.id}
            className={`p-6 cursor-pointer transition-all duration-200 hover:scale-105 border-2 ${
              selectedGoal === goal.id
                ? 'border-emerald-500 bg-emerald-50 shadow-md'
                : 'border-slate-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/50'
            }`}
            onClick={() => handleGoalSelect(goal.id)}
          >
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-full ${
                  selectedGoal === goal.id
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {selectedGoal === goal.id ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  goal.icon
                )}
              </div>
              <span
                className={`text-sm font-medium ${
                  selectedGoal === goal.id ? 'text-emerald-700' : 'text-slate-700'
                }`}
              >
                {goal.text}
              </span>
            </div>
          </Card>
        ))}
      </div>

      {loading && (
        <div className="text-center mt-4">
          <p className="text-slate-600">Saving your goal...</p>
        </div>
      )}
    </Card>
  );
};

export default DashboardGoalSelection;
