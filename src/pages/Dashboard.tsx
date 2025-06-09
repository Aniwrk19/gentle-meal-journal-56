
import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { DashboardSidebar } from '@/components/DashboardSidebar';
import { LogsView } from '@/components/LogsView';
import { HistoryView } from '@/components/HistoryView';
import { FavoritesView } from '@/components/FavoritesView';
import DashboardGoalSelection from '@/components/DashboardGoalSelection';
import { useMealEntries } from '@/hooks/useMealEntries';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<'logs' | 'history' | 'favorites'>('logs');
  const { mealEntries, loading, addMealEntry, toggleFavorite } = useMealEntries();

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
        return <HistoryView entries={mealEntries} onToggleFavorite={toggleFavorite} loading={loading} />;
      case 'favorites':
        return <FavoritesView entries={mealEntries.filter(entry => entry.is_favorite)} onToggleFavorite={toggleFavorite} loading={loading} />;
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
