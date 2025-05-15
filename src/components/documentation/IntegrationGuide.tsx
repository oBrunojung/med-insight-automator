
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function IntegrationGuide() {
  const steps = [
    {
      title: "Create a Notion Integration",
      description:
        "Go to https://www.notion.so/my-integrations and create a new integration. Make sure to give it the required capabilities.",
      details: [
        "Click on 'New integration'",
        "Name it 'MediData Integration'",
        "Select the capabilities: Read content, Update content, Insert content",
        "Submit the form to create your integration",
      ],
    },
    {
      title: "Copy the Integration Token",
      description:
        "After creating the integration, you'll get an 'Internal Integration Token'. Copy this token as you'll need it in the next step.",
      details: [
        "Find the 'Internal Integration Token' section",
        "Click 'Show' to reveal the token",
        "Copy the token that starts with 'secret_'",
        "Keep this token secure - it provides access to your Notion workspace",
      ],
    },
    {
      title: "Share a Database with the Integration",
      description:
        "Create a new database in Notion or use an existing one. Then share it with your integration.",
      details: [
        "Open the database you want to use",
        "Click on the '...' menu in the top right",
        "Choose 'Add connections'",
        "Find your 'MediData Integration' and select it",
        "The integration now has access to this database",
      ],
    },
    {
      title: "Configure the Integration in MediData",
      description:
        "Enter your integration token and configure sync options in the Integration page.",
      details: [
        "Navigate to the Integration page",
        "Paste your integration token",
        "Select which exam types to sync",
        "Choose whether to create dashboards automatically",
        "Click 'Connect to Notion' to finalize the setup",
      ],
    },
    {
      title: "Verify the Connection",
      description:
        "After configuring the integration, MediData will attempt to connect to your Notion workspace and verify access.",
      details: [
        "Check the 'Notion Sync Status' section",
        "If connected successfully, the status will show 'Connected'",
        "If there are any issues, review the error message and check your token and database permissions",
      ],
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notion Integration Guide</CardTitle>
        <CardDescription>
          Follow these steps to connect MediData with your Notion workspace
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {steps.map((step, index) => (
          <div key={index} className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                {index + 1}
              </div>
              <div className="space-y-1">
                <h3 className="font-medium">{step.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
            <div className="ml-11 space-y-2 rounded-md bg-muted p-3">
              <ul className="list-disc space-y-2 pl-4 text-sm">
                {step.details.map((detail, detailIndex) => (
                  <li key={detailIndex}>{detail}</li>
                ))}
              </ul>
            </div>
            {index < steps.length - 1 && <Separator className="my-4" />}
          </div>
        ))}
        <div className="flex flex-col gap-2 pt-4">
          <Button asChild>
            <Link to="/integration">Go to Integration Setup</Link>
          </Button>
          <Button variant="outline" asChild>
            <a 
              href="https://www.notion.so/my-integrations" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Open Notion Integrations Page
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
