
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function DataStructureGuide() {
  const examTypes = [
    {
      id: "metabolic",
      name: "Metabolic",
      description: "Metabolomic exams tracking nutritional deficiencies and metabolic markers",
      markers: [
        {
          name: "Vitamin B12",
          description: "Essential for nerve tissue health, brain function and red blood cell production",
          type: "Nutritional",
          unit: "pg/mL",
          referenceRange: "200-900",
        },
        {
          name: "Folate",
          description: "Necessary for DNA synthesis and red blood cell maturation",
          type: "Nutritional",
          unit: "ng/mL",
          referenceRange: "2.7-17.0",
        },
        {
          name: "Magnesium",
          description: "Important for muscle and nerve function, blood glucose control",
          type: "Mineral",
          unit: "mg/dL",
          referenceRange: "1.7-2.2",
        },
        {
          name: "Zinc",
          description: "Essential for immune function, protein synthesis and wound healing",
          type: "Mineral",
          unit: "μg/dL",
          referenceRange: "70-120",
        },
        {
          name: "Vitamin D",
          description: "Vital for bone health, immune function and inflammation reduction",
          type: "Nutritional",
          unit: "ng/mL",
          referenceRange: "30-100",
        },
      ],
    },
    {
      id: "microbiota",
      name: "Microbiota",
      description: "Analysis of gut microbiome balance and diversity",
      markers: [
        {
          name: "Total Bacterial Load",
          description: "Measure of overall bacterial concentration in the gut",
          type: "Quantitative",
          unit: "16S copies/g",
          referenceRange: "10^10 - 10^12",
        },
        {
          name: "Firmicutes/Bacteroidetes Ratio",
          description: "Balance between two dominant bacterial phyla, associated with metabolic health",
          type: "Ratio",
          unit: "ratio",
          referenceRange: "0.5-2.0",
        },
        {
          name: "Lactobacillus spp.",
          description: "Beneficial probiotic bacteria important for gut health",
          type: "Protective Flora",
          unit: "CFU/g",
          referenceRange: "10^5 - 10^9",
        },
        {
          name: "Bifidobacterium spp.",
          description: "Beneficial probiotic bacteria associated with gut barrier integrity",
          type: "Protective Flora",
          unit: "CFU/g",
          referenceRange: "10^8 - 10^10",
        },
        {
          name: "Pathogenic Bacteria",
          description: "Detection of potentially harmful bacterial species",
          type: "Pathogenic",
          unit: "Present/Absent",
          referenceRange: "Absent",
        },
      ],
    },
    {
      id: "genetic",
      name: "Genetic",
      description: "SNP analysis for genetic predispositions and risk factors",
      markers: [
        {
          name: "MTHFR (C677T)",
          description: "Affects folate metabolism and homocysteine levels",
          type: "SNP",
          unit: "Genotype",
          referenceRange: "CC, CT, or TT",
        },
        {
          name: "APOE",
          description: "Associated with cardiovascular health and Alzheimer's risk",
          type: "SNP",
          unit: "Genotype",
          referenceRange: "E2/E2, E2/E3, E3/E3, E3/E4, E4/E4",
        },
        {
          name: "FTO",
          description: "Associated with obesity and weight regulation",
          type: "SNP",
          unit: "Genotype",
          referenceRange: "AA, AT, or TT",
        },
        {
          name: "VDR (Vitamin D Receptor)",
          description: "Affects vitamin D metabolism and bone health",
          type: "SNP",
          unit: "Genotype",
          referenceRange: "Multiple variants",
        },
        {
          name: "COMT",
          description: "Influences neurotransmitter metabolism and stress response",
          type: "SNP",
          unit: "Genotype",
          referenceRange: "Val/Val, Val/Met, Met/Met",
        },
      ],
    },
    {
      id: "laboratory",
      name: "Laboratory",
      description: "Standard clinical laboratory tests and panels",
      markers: [
        {
          name: "Complete Blood Count (CBC)",
          description: "Analysis of red cells, white cells and platelets",
          type: "Panel",
          unit: "Multiple",
          referenceRange: "Varies by component",
        },
        {
          name: "Comprehensive Metabolic Panel",
          description: "Assessment of kidney function, electrolyte balance, liver function",
          type: "Panel",
          unit: "Multiple",
          referenceRange: "Varies by component",
        },
        {
          name: "Lipid Panel",
          description: "Measurement of cholesterol levels and triglycerides",
          type: "Panel",
          unit: "mg/dL",
          referenceRange: "Varies by component",
        },
        {
          name: "Hemoglobin A1c",
          description: "Reflects average blood sugar control over past 3 months",
          type: "Glycemic",
          unit: "%",
          referenceRange: "< 5.7%",
        },
        {
          name: "TSH (Thyroid Stimulating Hormone)",
          description: "Assesses thyroid function",
          type: "Hormonal",
          unit: "mIU/L",
          referenceRange: "0.4-4.0",
        },
      ],
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Structure Guide</CardTitle>
        <CardDescription>
          Overview of exam categories and key markers synchronized with Notion
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="metabolic">
          <TabsList className="grid grid-cols-4 mb-4">
            {examTypes.map((type) => (
              <TabsTrigger key={type.id} value={type.id}>
                {type.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {examTypes.map((type) => (
            <TabsContent key={type.id} value={type.id} className="space-y-4">
              <p className="text-sm text-muted-foreground">{type.description}</p>
              <Table>
                <TableCaption>Key markers for {type.name.toLowerCase()} exams</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Marker</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>Reference Range</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {type.markers.map((marker) => (
                    <TableRow key={marker.name}>
                      <TableCell className="font-medium">{marker.name}</TableCell>
                      <TableCell>{marker.description}</TableCell>
                      <TableCell>{marker.type}</TableCell>
                      <TableCell>{marker.unit}</TableCell>
                      <TableCell>{marker.referenceRange}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
