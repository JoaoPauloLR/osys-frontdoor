import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  BarChart3, 
  Settings,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";

const menuItems = [
  {
    title: "Painel Principal",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Clientes",
    url: "/clientes",
    icon: Users,
  },
  {
    title: "Ordens de Serviço",
    url: "/ordens-servico",
    icon: FileText,
  },
  {
    title: "Relatórios",
    url: "/relatorios",
    icon: BarChart3,
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;

  const handleLogout = () => {
    localStorage.removeItem("osys-user");
    window.location.href = "/";
  };

  const user = JSON.parse(localStorage.getItem("osys-user") || '{"name": "Usuário"}');

  return (
    <Sidebar className="border-r border-border bg-white">
      <SidebarHeader className="border-b border-border">
        <div className="flex items-center gap-3 px-2 py-4">
          <div className="bg-gradient-primary p-2 rounded-lg">
            <Settings className="h-6 w-6 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="text-xl font-bold text-corporate-blue">OSys</h2>
              <p className="text-xs text-muted-foreground">Sistema de OS</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink to={item.url} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border">
        <div className="p-2 space-y-2">
          {!collapsed && (
            <div className="px-2 py-1">
              <p className="text-sm font-medium text-neutral-dark">{user.name}</p>
              <p className="text-xs text-muted-foreground">Logado como: {user.login}</p>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="w-full justify-start text-error-red hover:text-error-red hover:bg-error-red/10"
          >
            <LogOut className="h-4 w-4" />
            {!collapsed && <span className="ml-2">Sair</span>}
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}