
import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
} from '@/components/ui/sidebar';
import { Edit3, Clock, Heart } from 'lucide-react';

interface DashboardSidebarProps {
  activeTab: 'logs' | 'history' | 'favorites';
  onTabChange: (tab: 'logs' | 'history' | 'favorites') => void;
}

export const DashboardSidebar = ({ activeTab, onTabChange }: DashboardSidebarProps) => {
  const menuItems = [
    {
      title: 'Logs',
      icon: Edit3,
      key: 'logs' as const,
    },
    {
      title: 'History',
      icon: Clock,
      key: 'history' as const,
    },
    {
      title: 'Favorites',
      icon: Heart,
      key: 'favorites' as const,
    },
  ];

  return (
    <Sidebar className="border-r border-slate-200">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-2">
          <Edit3 className="w-6 h-6 text-emerald-600" />
          <span className="text-xl font-semibold text-emerald-700">NourishNote</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton
                    isActive={activeTab === item.key}
                    onClick={() => onTabChange(item.key)}
                    className="w-full justify-start gap-3 py-3 px-4"
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
