
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IntegrationGuide } from "@/components/documentation/IntegrationGuide";
import { DataStructureGuide } from "@/components/documentation/DataStructureGuide";

export default function Documentation() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Documentation</h1>
        <p className="text-muted-foreground">
          Guides and reference materials for using MediData with Notion integration
        </p>
      </div>

      <Tabs defaultValue="integration">
        <TabsList>
          <TabsTrigger value="integration">Integration Setup</TabsTrigger>
          <TabsTrigger value="data-structure">Data Structure</TabsTrigger>
          <TabsTrigger value="best-practices">Best Practices</TabsTrigger>
        </TabsList>
        
        <TabsContent value="integration" className="mt-6">
          <IntegrationGuide />
        </TabsContent>
        
        <TabsContent value="data-structure" className="mt-6">
          <DataStructureGuide />
        </TabsContent>
        
        <TabsContent value="best-practices" className="mt-6">
          <div className="border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Best Practices for Medical Data in Notion</h2>
            
            <div className="space-y-6">
              <section>
                <h3 className="text-lg font-medium mb-2">Organization Structure</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Create separate databases for each type of exam for better organization</li>
                  <li>Use relations between databases to connect exams to patients</li>
                  <li>Implement consistent property names across databases for easier querying</li>
                  <li>Utilize tags or select properties for categorizing findings (e.g., "Critical", "Monitor", "Normal")</li>
                </ul>
              </section>
              
              <section>
                <h3 className="text-lg font-medium mb-2">Data Entry</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Enter data promptly after receiving exam results</li>
                  <li>Use consistent units of measurement for all numeric values</li>
                  <li>Include reference ranges for all measurements</li>
                  <li>Document the date when exams were performed, not just when results were received</li>
                  <li>Always include the source/laboratory that performed the analysis</li>
                </ul>
              </section>
              
              <section>
                <h3 className="text-lg font-medium mb-2">Visualization and Insights</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Create a dashboard page that pulls information from all databases</li>
                  <li>Use Notion's timeline view to track changes in key measurements over time</li>
                  <li>Consider color-coding values outside reference ranges</li>
                  <li>Dedicate a section for actionable insights based on exam results</li>
                  <li>Group related markers together for comprehensive analysis</li>
                </ul>
              </section>
              
              <section>
                <h3 className="text-lg font-medium mb-2">Data Security</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Enable 2FA for your Notion account</li>
                  <li>Restrict sharing permissions to only necessary team members</li>
                  <li>Avoid storing directly identifiable patient information when possible</li>
                  <li>Regularly audit access to sensitive data</li>
                  <li>Follow applicable healthcare privacy regulations (HIPAA, GDPR, etc.)</li>
                </ul>
              </section>
              
              <section>
                <h3 className="text-lg font-medium mb-2">Maintenance</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Schedule regular data validation to ensure integrity</li>
                  <li>Create backups of your Notion workspace regularly</li>
                  <li>Document your database schema and any changes made</li>
                  <li>Periodically review and update reference ranges based on latest research</li>
                  <li>Archive outdated or irrelevant data to maintain workspace performance</li>
                </ul>
              </section>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
