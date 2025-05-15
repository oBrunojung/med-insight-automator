
import { useState } from "react";
import { 
  NotionIntegrationForm, 
  NotionOptions 
} from "@/components/notion/NotionIntegrationForm";
import { NotionSyncStatus } from "@/components/notion/NotionSyncStatus";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Integration() {
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lastSync, setLastSync] = useState<Date | undefined>(undefined);
  const [syncProgress, setSyncProgress] = useState(0);

  // Sample sync records - would be populated from API responses in a real application
  const [syncRecords, setSyncRecords] = useState([
    {
      examType: "Metabolic Exams",
      status: "completed" as const,
      timestamp: new Date(),
      details: "34 records synced successfully",
    },
    {
      examType: "Microbiota Exams",
      status: "completed" as const,
      timestamp: new Date(),
      details: "28 records synced successfully",
    },
    {
      examType: "Genetic Exams", 
      status: "completed" as const,
      timestamp: new Date(),
      details: "15 records synced successfully",
    },
    {
      examType: "Laboratory Exams",
      status: "completed" as const,
      timestamp: new Date(),
      details: "17 records synced successfully",
    },
  ]);

  const handleConnect = async (token: string, options: NotionOptions) => {
    setIsLoading(true);
    
    // Simulate API call for connecting to Notion
    // In a real application, this would be an actual API call
    try {
      // Simulating network delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulating successful connection
      setIsConnected(true);
      setLastSync(new Date());
      setSyncProgress(100);
      
      toast({
        title: "Connected successfully",
        description: "Your Notion workspace is now connected with MediData",
      });
    } catch (error) {
      toast({
        title: "Connection failed",
        description: "Failed to connect to Notion. Please check your token and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForceSync = async () => {
    if (!isConnected) return;
    
    setSyncProgress(0);
    setIsLoading(true);
    
    // Simulate sync process
    const interval = setInterval(() => {
      setSyncProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLoading(false);
          setLastSync(new Date());
          return 100;
        }
        return prev + 20;
      });
    }, 500);
    
    // Update records
    setTimeout(() => {
      const newRecords = [...syncRecords];
      newRecords.unshift({
        examType: "Full Database",
        status: "completed" as const,
        timestamp: new Date(),
        details: "Manual sync completed successfully",
      });
      setSyncRecords(newRecords);
      
      toast({
        title: "Sync completed",
        description: "All data has been synchronized with Notion",
      });
    }, 3000);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Notion Integration</h1>
        <p className="text-muted-foreground">
          Connect and manage your Notion workspace integration
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <NotionIntegrationForm 
          onConnect={handleConnect} 
          isConnected={isConnected} 
          isLoading={isLoading}
        />
        
        <div className="space-y-4">
          <NotionSyncStatus 
            isConnected={isConnected} 
            lastSync={lastSync} 
            syncProgress={syncProgress} 
            syncRecords={syncRecords}
          />
          
          <div className="flex space-x-4">
            <Button 
              onClick={handleForceSync} 
              disabled={!isConnected || isLoading}
              className="flex-1"
            >
              {isLoading ? "Syncing..." : "Force Sync Now"}
            </Button>
            <Button variant="outline" asChild className="flex-1">
              <Link to="/documentation">
                View Documentation
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="border rounded-md">
        <Tabs defaultValue="database">
          <TabsList className="bg-muted/50 p-0 w-full justify-start rounded-b-none">
            <TabsTrigger value="database" className="rounded-none data-[state=active]:bg-background">
              Database Structure
            </TabsTrigger>
            <TabsTrigger value="automation" className="rounded-none data-[state=active]:bg-background">
              Automation Settings
            </TabsTrigger>
            <TabsTrigger value="templates" className="rounded-none data-[state=active]:bg-background">
              Notion Templates
            </TabsTrigger>
          </TabsList>
          <TabsContent value="database" className="p-4 border-t">
            <div className="space-y-4">
              <h3 className="font-medium">Notion Database Structure</h3>
              <p className="text-sm text-muted-foreground">
                MediData creates the following structure in your Notion workspace:
              </p>
              
              <div className="space-y-2 text-sm">
                <div className="border rounded-md p-2 flex items-center">
                  <div className="h-5 w-5 rounded bg-medical-blue mr-2"></div>
                  <span>Patients Database</span>
                </div>
                <div className="pl-7 space-y-2">
                  <div className="border rounded-md p-2 flex items-center">
                    <div className="h-5 w-5 rounded bg-exam-metabolic mr-2"></div>
                    <span>Metabolic Exams</span>
                  </div>
                  <div className="border rounded-md p-2 flex items-center">
                    <div className="h-5 w-5 rounded bg-exam-microbiota mr-2"></div>
                    <span>Microbiota Exams</span>
                  </div>
                  <div className="border rounded-md p-2 flex items-center">
                    <div className="h-5 w-5 rounded bg-exam-genetic mr-2"></div>
                    <span>Genetic Exams</span>
                  </div>
                  <div className="border rounded-md p-2 flex items-center">
                    <div className="h-5 w-5 rounded bg-exam-laboratory mr-2"></div>
                    <span>Laboratory Exams</span>
                  </div>
                  <div className="border rounded-md p-2 flex items-center">
                    <div className="h-5 w-5 rounded bg-gray-200 mr-2"></div>
                    <span>Insights Dashboard</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="automation" className="p-4 border-t">
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Automation settings will be available after connecting to Notion
              </p>
            </div>
          </TabsContent>
          <TabsContent value="templates" className="p-4 border-t">
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Template management will be available after connecting to Notion
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
