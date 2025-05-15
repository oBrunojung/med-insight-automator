
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

type NotionIntegrationFormProps = {
  onConnect: (token: string, options: NotionOptions) => void;
  isConnected: boolean;
  isLoading: boolean;
};

export type NotionOptions = {
  syncMetabolic: boolean;
  syncMicrobiota: boolean;
  syncGenetic: boolean;
  syncLaboratory: boolean;
  createDashboards: boolean;
};

export function NotionIntegrationForm({ 
  onConnect, 
  isConnected,
  isLoading 
}: NotionIntegrationFormProps) {
  const { toast } = useToast();
  const [token, setToken] = useState("");
  const [options, setOptions] = useState<NotionOptions>({
    syncMetabolic: true,
    syncMicrobiota: true,
    syncGenetic: true,
    syncLaboratory: true,
    createDashboards: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!token.trim()) {
      toast({
        title: "Error",
        description: "Please enter your Notion integration token",
        variant: "destructive",
      });
      return;
    }

    // In a real app, we would validate the token before proceeding
    onConnect(token, options);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Connect to Notion</CardTitle>
        <CardDescription>
          Set up integration with your Notion workspace to automatically sync patient exam data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="token">Notion Integration Token</Label>
            <Input
              id="token"
              type="password"
              placeholder="secret_..."
              value={token}
              onChange={(e) => setToken(e.target.value)}
              disabled={isConnected}
            />
            <p className="text-xs text-muted-foreground">
              You can find your integration token in the Notion Integrations dashboard
            </p>
          </div>

          <div className="border rounded-md p-4 space-y-3">
            <h4 className="font-medium">Sync Options</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="syncMetabolic"
                  checked={options.syncMetabolic}
                  onCheckedChange={(checked) => 
                    setOptions({ ...options, syncMetabolic: !!checked })
                  }
                  disabled={isConnected}
                />
                <Label htmlFor="syncMetabolic">Metabolic exams</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="syncMicrobiota"
                  checked={options.syncMicrobiota}
                  onCheckedChange={(checked) => 
                    setOptions({ ...options, syncMicrobiota: !!checked })
                  }
                  disabled={isConnected}
                />
                <Label htmlFor="syncMicrobiota">Microbiota exams</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="syncGenetic"
                  checked={options.syncGenetic}
                  onCheckedChange={(checked) => 
                    setOptions({ ...options, syncGenetic: !!checked })
                  }
                  disabled={isConnected}
                />
                <Label htmlFor="syncGenetic">Genetic exams</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="syncLaboratory"
                  checked={options.syncLaboratory}
                  onCheckedChange={(checked) => 
                    setOptions({ ...options, syncLaboratory: !!checked })
                  }
                  disabled={isConnected}
                />
                <Label htmlFor="syncLaboratory">Laboratory exams</Label>
              </div>
              <div className="flex items-center space-x-2 pt-2 border-t mt-2">
                <Checkbox
                  id="createDashboards"
                  checked={options.createDashboards}
                  onCheckedChange={(checked) => 
                    setOptions({ ...options, createDashboards: !!checked })
                  }
                  disabled={isConnected}
                />
                <Label htmlFor="createDashboards">
                  Create dashboards and visualizations
                </Label>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isConnected || isLoading}>
            {isLoading ? "Connecting..." : isConnected ? "Connected" : "Connect to Notion"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
