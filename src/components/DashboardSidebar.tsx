import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarGroup, SidebarGroupContent } from '@/components/ui/sidebar';
import { Edit3, Clock, Heart, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface DashboardSidebarProps {
  activeTab: 'logs' | 'history' | 'favorites';
  onTabChange: (tab: 'logs' | 'history' | 'favorites') => void;
}

export const DashboardSidebar = ({
  activeTab,
  onTabChange
}: DashboardSidebarProps) => {
  const { signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Signed out",
        description: "You have been signed out successfully."
      });
      navigate('/');
    }
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const menuItems = [
    {
      title: 'Logs',
      icon: Edit3,
      key: 'logs' as const
    },
    {
      title: 'History',
      icon: Clock,
      key: 'history' as const
    },
    {
      title: 'Favorites',
      icon: Heart,
      key: 'favorites' as const
    }
  ];

  return (
    <Sidebar className="border-r border-slate-600/30 bg-slate-800/50 backdrop-blur-sm">
      <SidebarHeader className="p-6 border-b border-slate-600/30 bg-zinc-400">
        <button 
          onClick={handleLogoClick}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
        >
          <Heart className="w-6 h-6 text-emerald-400" />
          <span className="text-xl font-medium text-zinc-950">NourishNote</span>
        </button>
      </SidebarHeader>
      <SidebarContent className="bg-zinc-400">
        <SidebarGroup className="bg-zinc-400">
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map(item => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton 
                    isActive={activeTab === item.key} 
                    onClick={() => onTabChange(item.key)} 
                    className={`w-full justify-start gap-3 py-3 px-4 transition-all duration-200 ${
                      activeTab === item.key 
                        ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-600/30' 
                        : 'text-slate-50 hover:bg-white/10 hover:text-slate-50'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium text-base">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              
              {/* Sign Out Button */}
              <SidebarMenuItem className="mt-auto">
                <Button
                  variant="ghost"
                  onClick={handleSignOut}
                  className="w-full justify-start gap-3 py-3 px-4 text-slate-50 hover:bg-red-600/20 hover:text-red-300"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium text-base">Sign Out</span>
                </Button>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
