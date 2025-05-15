
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type SyncRecord = {
  examType: string;
  status: "completed" | "pending" | "failed";
  timestamp: Date;
  details?: string;
};

type NotionSyncStatusProps = {
  isConnected: boolean;
  lastSync?: Date;
  syncProgress: number;
  syncRecords: SyncRecord[];
};

export function NotionSyncStatus({ 
  isConnected, 
  lastSync, 
  syncProgress, 
  syncRecords 
}: NotionSyncStatusProps) {
  
  function formatDate(date?: Date) {
    if (!date) return "Never";
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  }

  function getStatusColor(status: SyncRecord["status"]) {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-600 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-600 border-yellow-200";
      case "failed":
        return "bg-red-100 text-red-600 border-red-200";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Notion Sync Status</CardTitle>
          <Badge
            variant={isConnected ? "default" : "outline"}
            className={isConnected ? "bg-green-600" : ""}
          >
            {isConnected ? "Connected" : "Disconnected"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Last synced: {formatDate(lastSync)}</span>
            <span>{Math.round(syncProgress)}%</span>
          </div>
          <Progress value={syncProgress} className="h-2" />
        </div>

        <div className="border rounded-md p-3">
          <h4 className="text-sm font-medium mb-3">Recent Sync Activities</h4>
          <div className="space-y-2">
            {syncRecords.length > 0 ? (
              syncRecords.map((record, index) => (
                <div 
                  key={index} 
                  className="text-sm border-b pb-2 last:border-0 last:pb-0"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">{record.examType}</span>
                    <Badge 
                      variant="outline" 
                      className={cn(getStatusColor(record.status))}
                    >
                      {record.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{record.details || "No details available"}</span>
                    <span>{formatDate(record.timestamp)}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-2 text-sm text-muted-foreground">
                No sync records available
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
