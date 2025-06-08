import React from 'react';
import { Link } from 'react-router-dom';
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarGroup, SidebarGroupContent } from '@/components/ui/sidebar';
import { Edit3, Clock, Heart } from 'lucide-react';
interface DashboardSidebarProps {
  activeTab: 'logs' | 'history' | 'favorites';
  onTabChange: (tab: 'logs' | 'history' | 'favorites') => void;
}
export const DashboardSidebar = ({
  activeTab,
  onTabChange
}: DashboardSidebarProps) => {
  const menuItems = [{
    title: 'Logs',
    icon: Edit3,
    key: 'logs' as const
  }, {
    title: 'History',
    icon: Clock,
    key: 'history' as const
  }, {
    title: 'Favorites',
    icon: Heart,
    key: 'favorites' as const
  }];
  return <Sidebar className="border-r border-slate-600/30 bg-slate-800/50 backdrop-blur-sm">
      <SidebarHeader className="p-6 border-b border-slate-600/30">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Heart className="w-6 h-6 text-emerald-400" />
          <span className="text-xl font-medium text-zinc-950">NourishNote</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="bg-zinc-400">
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map(item => <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton isActive={activeTab === item.key} onClick={() => onTabChange(item.key)} className={`w-full justify-start gap-3 py-3 px-4 transition-all duration-200 ${activeTab === item.key ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-600/30' : 'text-slate-50 hover:bg-white/10 hover:text-slate-50'}`}>
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>;
};