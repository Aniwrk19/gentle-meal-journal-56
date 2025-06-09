
import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { DashboardSidebar } from '@/components/DashboardSidebar';
import { LogsView } from '@/components/LogsView';
import { HistoryView } from '@/components/HistoryView';
import { FavoritesView } from '@/components/FavoritesView';
import DashboardGoalSelection from '@/components/DashboardGoalSelection';

export interface MealEntry {
  id: string;
  meal: string;
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
  tip: string;
  timestamp: Date;
  isFavorite: boolean;
}

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<'logs' | 'history' | 'favorites'>('logs');
  const [mealEntries, setMealEntries] = useState<MealEntry[]>([]);

  const addMealEntry = (entry: Omit<MealEntry, 'id' | 'timestamp' | 'isFavorite'>) => {
    const newEntry: MealEntry = {
      ...entry,
      id: Date.now().toString(),
      timestamp: new Date(),
      isFavorite: false,
    };
    setMealEntries(prev => [newEntry, ...prev]);
  };

  const toggleFavorite = (id: string) => {
    setMealEntries(prev => 
      prev.map(entry => 
        entry.id === id ? { ...entry, isFavorite: !entry.isFavorite } : entry
      )
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'logs':
        return (
          <div>
            <DashboardGoalSelection />
            <LogsView onAddMeal={addMealEntry} />
          </div>
        );
      case 'history':
        return <HistoryView entries={mealEntries} onToggleFavorite={toggleFavorite} />;
      case 'favorites':
        return <FavoritesView entries={mealEntries.filter(entry => entry.isFavorite)} onToggleFavorite={toggleFavorite} />;
      default:
        return (
          <div>
            <DashboardGoalSelection />
            <LogsView onAddMeal={addMealEntry} />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">
      <SidebarProvider>
        <div className="flex w-full">
          <DashboardSidebar activeTab={activeTab} onTabChange={setActiveTab} />
          <main className="flex-1 p-8">
            {renderContent()}
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Dashboard;
