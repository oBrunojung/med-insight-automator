
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Integration from "./pages/Integration";
import Documentation from "./pages/Documentation";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout children={<Dashboard />} />} />
          <Route path="/integration" element={<AppLayout children={<Integration />} />} />
          <Route path="/documentation" element={<AppLayout children={<Documentation />} />} />
          <Route path="/patients" element={<AppLayout children={<ComingSoon title="Patients" />} />} />
          <Route path="/exams" element={<AppLayout children={<ComingSoon title="Exams" />} />} />
          <Route path="/exams/:category" element={<AppLayout children={<ComingSoon title="Exam Category" />} />} />
          <Route path="/settings" element={<AppLayout children={<ComingSoon title="Settings" />} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

// Placeholder component for routes that will be implemented later
function ComingSoon({ title }: { title: string }) {
  return (
    <div className="p-6 flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-3xl font-bold tracking-tight mb-2">{title}</h1>
      <p className="text-muted-foreground mb-6">
        This feature is coming soon. Stay tuned!
      </p>
    </div>
  );
}

export default App;
