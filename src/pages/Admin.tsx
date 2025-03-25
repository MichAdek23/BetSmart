
import React, { useState } from 'react';
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, SidebarSeparator, SidebarInset } from '@/components/ui/sidebar';
import { Calendar, Users, Trophy, LineChart, Settings, PanelLeft, Layout, Home } from 'lucide-react';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import AdminDashboard from '@/components/admin/AdminDashboard';
import AdminEvents from '@/components/admin/AdminEvents';
import AdminUsers from '@/components/admin/AdminUsers';
import AdminBets from '@/components/admin/AdminBets';
import AdminSettings from '@/components/admin/AdminSettings';
import { useToast } from '@/hooks/use-toast';

const Admin = () => {
  const [isAdmin, setIsAdmin] = useState(true); // In a real app, this would be determined by auth
  const { toast } = useToast();

  if (!isAdmin) {
    toast({
      title: "Access Denied",
      description: "You don't have permission to access the admin area.",
      variant: "destructive"
    });
    return <Navigate to="/" replace />;
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-muted/20">
        <AdminSidebar />
        <SidebarInset className="p-4 md:p-6">
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/events" element={<AdminEvents />} />
            <Route path="/users" element={<AdminUsers />} />
            <Route path="/bets" element={<AdminBets />} />
            <Route path="/settings" element={<AdminSettings />} />
          </Routes>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

const AdminSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center px-2 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
            <span className="text-white font-semibold text-lg">B</span>
          </div>
          <span className="ml-2 text-lg font-semibold">BetSmart Admin</span>
        </div>
        <SidebarSeparator />
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Dashboard">
                  <Link to="/admin">
                    <Layout className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Events">
                  <Link to="/admin/events">
                    <Calendar className="h-4 w-4" />
                    <span>Events</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Users">
                  <Link to="/admin/users">
                    <Users className="h-4 w-4" />
                    <span>Users</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Bets">
                  <Link to="/admin/bets">
                    <Trophy className="h-4 w-4" />
                    <span>Bets</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Settings">
                  <Link to="/admin/settings">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Go to Site">
                  <Link to="/">
                    <Home className="h-4 w-4" />
                    <span>Go to Site</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <div className="px-3 py-2 text-xs text-muted-foreground">
          BetSmart Admin v1.0
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default Admin;
