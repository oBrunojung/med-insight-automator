
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  Search,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type SidebarProps = {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
};

// Sample patient data
const patients = [
  { 
    id: 'P-12345', 
    name: 'Jane Doe', 
    lastExam: '2023-05-10', 
    risk: 'medium' 
  },
  { 
    id: 'P-23456', 
    name: 'John Smith', 
    lastExam: '2023-05-08', 
    risk: 'high' 
  },
  { 
    id: 'P-34567', 
    name: 'Alice Johnson', 
    lastExam: '2023-05-05', 
    risk: 'low' 
  },
  { 
    id: 'P-45678', 
    name: 'Bob Brown', 
    lastExam: '2023-05-03', 
    risk: 'medium' 
  },
  { 
    id: 'P-56789', 
    name: 'Emma Wilson', 
    lastExam: '2023-04-28', 
    risk: 'high' 
  },
  { 
    id: 'P-67890', 
    name: 'Michael Lee', 
    lastExam: '2023-04-25', 
    risk: 'low' 
  },
  { 
    id: 'P-78901', 
    name: 'Sarah Miller', 
    lastExam: '2023-04-20', 
    risk: 'medium' 
  },
];

export function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const getRiskColor = (risk: string) => {
    switch(risk) {
      case 'low': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'high': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

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
      
      {/* Main Navigation */}
      <div className="flex flex-col gap-1 p-2">
        <NavItem collapsed={collapsed} icon={LayoutDashboard} to="/" label="Dashboard" />
        <NavItem collapsed={collapsed} icon={Users} to="/patients" label="Patients" />
        <NavItem collapsed={collapsed} icon={FileText} to="/patient-dashboard" label="Patient View" />
        <NavItem collapsed={collapsed} icon={Database} to="/integration" label="Integration" />
        <NavItem collapsed={collapsed} icon={BookOpen} to="/documentation" label="Documentation" />
        <NavItem collapsed={collapsed} icon={Settings} to="/settings" label="Settings" />
      </div>
      
      {/* Patient List Section */}
      {!collapsed && (
        <>
          <div className="mt-4 px-3">
            <h2 className="font-medium text-sm px-1 mb-2">Recent Patients</h2>
            <div className="relative">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Search patients..." 
                className="pl-8 h-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="p-2 mt-2 overflow-y-auto max-h-[calc(100vh-250px)]">
            <div className="space-y-1">
              {filteredPatients.map((patient) => (
                <Link
                  key={patient.id}
                  to="/patient-dashboard"
                  className={cn(
                    "flex items-center gap-2 p-2 rounded-md hover:bg-sidebar-accent",
                    location.pathname === `/patient/${patient.id}` && "bg-sidebar-accent"
                  )}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">
                      {patient.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium truncate">{patient.name}</p>
                      <span className={`h-2 w-2 rounded-full ${getRiskColor(patient.risk)}`}></span>
                    </div>
                    <p className="text-xs text-muted-foreground">Last exam: {patient.lastExam}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
      
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
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-2 rounded-md px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        isActive && "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
      )}
    >
      <Icon className="h-5 w-5" />
      {!collapsed && <span>{label}</span>}
    </Link>
  );
}
