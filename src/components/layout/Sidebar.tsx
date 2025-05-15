
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  FileText,
  Database,
  Settings,
  ChevronLeft,
  ChevronRight,
  Users,
  BookOpen,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

type SidebarProps = {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
};

export function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  return (
    <div
      className={cn(
        "h-screen sticky top-0 border-r bg-sidebar transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-16 items-center border-b px-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-medical-blue p-1">
              <div className="h-6 w-6 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
            </div>
            <span className="text-lg font-bold text-medical-dark">MediData</span>
          </div>
        )}
        {collapsed && (
          <div className="flex w-full justify-center">
            <div className="rounded-full bg-medical-blue p-1">
              <div className="h-6 w-6 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1 p-2">
        <NavItem collapsed={collapsed} icon={LayoutDashboard} to="/" label="Dashboard" />
        <NavItem collapsed={collapsed} icon={Users} to="/patients" label="Patients" />
        <NavItem collapsed={collapsed} icon={FileText} to="/exams" label="Exams" />
        <NavItem collapsed={collapsed} icon={Database} to="/integration" label="Integration" />
        <NavItem collapsed={collapsed} icon={BookOpen} to="/documentation" label="Documentation" />
        <NavItem collapsed={collapsed} icon={Settings} to="/settings" label="Settings" />
      </div>
      <div className="absolute bottom-4 flex w-full items-center justify-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-full"
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>
    </div>
  );
}

type NavItemProps = {
  collapsed: boolean;
  icon: React.ElementType;
  to: string;
  label: string;
};

function NavItem({ collapsed, icon: Icon, to, label }: NavItemProps) {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-2 rounded-md px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        to === window.location.pathname && "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
      )}
    >
      <Icon className="h-5 w-5" />
      {!collapsed && <span>{label}</span>}
    </Link>
  );
}
