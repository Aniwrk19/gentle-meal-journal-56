
import React from 'react';
import { Card } from '@/components/ui/card';
import { Heart, Brain, Smile, Eye } from 'lucide-react';

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

interface GoalSelectionProps {
  selectedGoal: string | null;
  onGoalSelect: (goalId: string) => void;
}

const GoalSelection = ({ selectedGoal, onGoalSelect }: GoalSelectionProps) => {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-light text-slate-800 mb-8">
        What's your goal with this journal?
      </h2>
      <div className="grid gap-4 md:grid-cols-2 max-w-2xl mx-auto">
        {goals.map((goal) => (
          <Card
            key={goal.id}
            className={`p-6 cursor-pointer transition-all duration-200 hover:scale-105 border-2 ${
              selectedGoal === goal.id
                ? 'border-emerald-500 bg-emerald-50 shadow-md'
                : 'border-slate-200 bg-white/60 hover:border-emerald-300 hover:bg-white/80'
            }`}
            onClick={() => onGoalSelect(goal.id)}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${
                selectedGoal === goal.id ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                {goal.icon}
              </div>
              <span className={`text-sm font-medium ${
                selectedGoal === goal.id ? 'text-emerald-700' : 'text-slate-700'
              }`}>
                {goal.text}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GoalSelection;
