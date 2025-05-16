
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Copy, CheckCircle, Send } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";

export default function Webhooks() {
  const [copied, setCopied] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  
  const webhookUrl = "https://lovable.app/webhooks/lab-exams";
  const webhookMethod = "POST";
  const contentType = "application/json";
  const payloadTemplate = {
    "patient_id": "P-12345",
    "exam_type": "Laboratory",
    "exam_data": {
      "glucose": 98,
      "cholesterol": 180,
      "triglycerides": 140
    },
    "timestamp": "2025-05-16T17:45:00Z"
  };
  
  const handleCopy = () => {
    navigator.clipboard.writeText(webhookUrl);
    setCopied(true);
    toast.success("Webhook URL copied to clipboard");
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  
  const handleTest = async () => {
    setIsTesting(true);
    try {
      toast.info("Sending test payload to webhook endpoint");
      
      // Using no-cors mode since we're sending to an external URL
      await fetch(webhookUrl, {
        method: webhookMethod,
        headers: {
          "Content-Type": contentType,
        },
        mode: "no-cors",
        body: JSON.stringify({
          ...payloadTemplate,
          timestamp: new Date().toISOString(), // Update timestamp to current
        }),
      });
      
      // Since we're using no-cors, we can't check response status
      // Just show a success message
      toast.success("Test webhook sent successfully");
    } catch (error) {
      console.error("Error testing webhook:", error);
      toast.error("Failed to send test webhook");
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Webhooks</h1>
        <p className="text-muted-foreground">
          Manage and test webhook integrations for automated data processing
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>webhook_lab_exams</CardTitle>
          <CardDescription>
            Integration to receive laboratory exam results automatically
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">URL</span>
              <div className="flex items-center gap-2">
                <code className="bg-muted px-3 py-1 rounded text-sm">{webhookUrl}</code>
                <Button 
                  size="icon" 
                  variant="outline" 
                  onClick={handleCopy}
                >
                  {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="font-medium">Method</span>
              <code className="bg-muted px-3 py-1 rounded text-sm">{webhookMethod}</code>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="font-medium">Content-Type</span>
              <code className="bg-muted px-3 py-1 rounded text-sm">{contentType}</code>
            </div>
          </div>
          
          <div className="space-y-2">
            <span className="font-medium">Payload Template</span>
            <pre className="bg-muted p-4 rounded-md text-sm overflow-auto max-h-60">
              {JSON.stringify(payloadTemplate, null, 2)}
            </pre>
          </div>
        </CardContent>
        
        <CardFooter>
          <Button 
            onClick={handleTest} 
            disabled={isTesting} 
            className="ml-auto"
          >
            {isTesting ? (
              <>Testing Webhook...</>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Send Test Request
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
