
import React, { useState } from 'react';
import { Bell, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export function Header() {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Critical: Patient John Doe needs follow-up", read: false },
    { id: 2, message: "New lab results for Alice Johnson", read: false },
    { id: 3, message: "Risk alert: Cardiovascular markers elevated for M. Smith", read: false },
  ]);
  
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  return (
    <header className="border-b bg-background sticky top-0 z-10">
      <div className="flex h-16 items-center px-4 md:px-6 justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-medical-blue p-1">
            <div className="h-8 w-8 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
          </div>
          <span className="text-xl font-bold text-medical-dark hidden md:block">MediData Pro</span>
        </div>
        
        {/* Search */}
        <div className="relative w-full max-w-md mx-4">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search patients by name, ID or condition..." 
            className="w-full pl-8 rounded-full bg-secondary/30 border-secondary focus-visible:ring-primary"
          />
        </div>
        
        {/* Notifications */}
        <div className="flex items-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs text-white">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80 p-0">
              <div className="p-2 font-medium border-b">Notifications</div>
              <div className="max-h-80 overflow-auto">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-3 border-b last:border-b-0 cursor-pointer hover:bg-muted/50 ${notification.read ? 'opacity-70' : 'bg-muted/20'}`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <p className="text-sm">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-muted-foreground">
                    No notifications
                  </div>
                )}
              </div>
              {notifications.length > 0 && (
                <div className="p-2 border-t">
                  <Button variant="ghost" size="sm" className="w-full" onClick={() => 
                    setNotifications(notifications.map(n => ({ ...n, read: true })))
                  }>
                    Mark all as read
                  </Button>
                </div>
              )}
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
}
