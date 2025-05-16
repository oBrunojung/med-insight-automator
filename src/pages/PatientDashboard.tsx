
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Activity, Dna, Bug, Beaker, FileText, Download, Info, CircleArrowDown, CircleArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatsCard } from '@/components/dashboard/StatsCard';
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie, Legend } from 'recharts';

// Roseli's data
const currentPatient = {
  id: 'P-12345',
  name: 'Roseli Aparecida Goncalves Brombim',
  age: 68,
  gender: 'Feminino',
  avatarUrl: '',
  riskLevel: 'medium',
  lastUpdate: '2023-05-10',
  summary: 'Paciente apresenta disbiose intestinal leve e risco aumentado para diabetes tipo 1. Baixa diversidade microbiana com redução da relação Bacteroidetes para Firmicutes.'
};

// Sample lab data
const labData = [
  { date: 'Jan', glucose: 95, cholesterol: 190, reference: 100 },
  { date: 'Fev', glucose: 97, cholesterol: 185, reference: 100 },
  { date: 'Mar', glucose: 96, cholesterol: 195, reference: 100 },
  { date: 'Abr', glucose: 98, cholesterol: 188, reference: 100 },
  { date: 'Mai', glucose: 96, cholesterol: 192, reference: 100 },
];

// Sample genetic risk data
const geneticData = [
  { name: 'Cardiovascular', risk: 50 },
  { name: 'Diabetes Tipo 1', risk: 75 },
  { name: 'Diabetes Tipo 2', risk: 50 },
  { name: 'Hipertensão', risk: 25 },
  { name: 'Obesidade', risk: 25 },
];

// Sample microbiota data
const microbiotaData = [
  { name: 'Firmicutes', value: 60, optimal: 55 },
  { name: 'Bacteroidetes', value: 25, optimal: 30 },
  { name: 'Actinobacteria', value: 5, optimal: 8 },
  { name: 'Proteobacteria', value: 8, optimal: 5 },
  { name: 'Other', value: 2, optimal: 2 },
];

// Sample metabolic pathways data
const metabolicData = [
  { name: 'Glycolysis', efficiency: 75 },
  { name: 'Krebs Cycle', efficiency: 82 },
  { name: 'Fat Metabolism', efficiency: 72 },
  { name: 'Protein Metabolism', efficiency: 85 },
  { name: 'Energy Production', efficiency: 78 },
];

// Sample insights
const insights = [
  { 
    title: 'Intolerância Alimentar', 
    description: 'Presença de intolerância à lactose e ao glúten, podendo contribuir para inflamação intestinal.',
    recommendation: 'Recomenda-se dieta de eliminação para confirmar sensibilidades e suplementação probiótica.',
    severity: 'medium'
  },
  { 
    title: 'Disbiose Intestinal', 
    description: 'Redução da diversidade da flora intestinal com diminuição da relação Bacteroidetes para Firmicutes.',
    recommendation: 'Indicada suplementação probiótica e aumento da ingestão de fibras solúveis.',
    severity: 'low'
  },
  { 
    title: 'Risco Diabetes Tipo 1', 
    description: 'Marcadores genéticos indicam risco elevado para diabetes tipo 1, com glicemia de jejum controlada no momento.',
    recommendation: 'Monitoramento regular da glicemia e avaliação de autoanticorpos pancreáticos.',
    severity: 'high'
  },
];

export default function PatientDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  
  const getRiskColor = (level: string) => {
    switch(level) {
      case 'low': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'high': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };
  
  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'low': return 'border-l-green-500 bg-green-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'high': return 'border-l-red-500 bg-red-50';
      default: return 'border-l-gray-500';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Patient Overview Header */}
      <Card>
        <CardHeader className="flex flex-row items-start justify-between pb-2">
          <div className="flex items-start space-x-4">
            <Avatar className="h-16 w-16 border-2 border-primary">
              <AvatarImage src={currentPatient.avatarUrl} alt={currentPatient.name} />
              <AvatarFallback className="text-lg">{currentPatient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{currentPatient.name}</CardTitle>
              <CardDescription>
                {currentPatient.age} years • {currentPatient.gender} • ID: {currentPatient.id}
              </CardDescription>
              <div className="flex items-center mt-2">
                <span className={`h-3 w-3 rounded-full ${getRiskColor(currentPatient.riskLevel)} mr-2`}></span>
                <span className="text-sm capitalize">{currentPatient.riskLevel} Risk</span>
                <span className="mx-2 text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">Last updated: {currentPatient.lastUpdate}</span>
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{currentPatient.summary}</p>
        </CardContent>
      </Card>

      {/* Main Dashboard Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="w-full justify-start border-b rounded-none p-0 h-auto">
          <TabsTrigger 
            value="overview" 
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none px-4 py-2"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="genetics" 
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none px-4 py-2"
          >
            <Dna className="mr-1 h-4 w-4" />
            Genetics
          </TabsTrigger>
          <TabsTrigger 
            value="lab" 
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none px-4 py-2"
          >
            <FileText className="mr-1 h-4 w-4" />
            Lab Results
          </TabsTrigger>
          <TabsTrigger 
            value="microbiota" 
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none px-4 py-2"
          >
            <Bug className="mr-1 h-4 w-4" />
            Microbiota
          </TabsTrigger>
          <TabsTrigger 
            value="metabolomics" 
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none px-4 py-2"
          >
            <Beaker className="mr-1 h-4 w-4" />
            Metabolomics
          </TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <StatsCard
              title="Overall Health Score"
              value="72/100"
              icon={<Activity className="h-4 w-4" />}
              trend={{ value: 5, positive: true }}
              className="border-l-4 border-l-primary"
            />
            <StatsCard
              title="Biomarkers in Range"
              value="42/57"
              icon={<FileText className="h-4 w-4" />}
              description="73% within normal ranges"
              className="border-l-4 border-l-green-500"
            />
            <StatsCard
              title="Critical Alerts"
              value="2"
              icon={<Info className="h-4 w-4" />}
              className="border-l-4 border-l-red-500"
            />
          </div>
          
          {/* Insights and Recommendations */}
          <div className="pt-4">
            <h3 className="text-lg font-medium mb-3">Insights & Recommendations</h3>
            <div className="grid gap-4 md:grid-cols-3">
              {insights.map((insight, idx) => (
                <Card key={idx} className={`border-l-4 ${getSeverityColor(insight.severity)}`}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-1">
                      {insight.severity === 'high' ? <CircleArrowUp className="h-4 w-4 text-red-500" /> : 
                       insight.severity === 'medium' ? <Info className="h-4 w-4 text-yellow-500" /> :
                       <CircleArrowDown className="h-4 w-4 text-green-500" />}
                      {insight.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{insight.description}</p>
                    <p className="text-sm font-medium mt-2">Recommendation:</p>
                    <p className="text-sm text-muted-foreground">{insight.recommendation}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Recent Lab Trends */}
          <Card className="pt-2">
            <CardHeader>
              <CardTitle>Recent Trends</CardTitle>
              <CardDescription>Key biomarkers over the last 5 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={labData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="glucose" 
                      stroke="#8884d8" 
                      activeDot={{ r: 8 }} 
                      name="Glucose (mg/dL)"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="cholesterol" 
                      stroke="#82ca9d"
                      name="Total Cholesterol (mg/dL)" 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="reference" 
                      stroke="#bbbbbb" 
                      strokeDasharray="5 5"
                      name="Reference Range" 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Genetics Tab */}
        <TabsContent value="genetics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Genetic Risk Assessment</CardTitle>
              <CardDescription>Analysis of genetic predispositions and risks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={geneticData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="name" />
                    <YAxis label={{ value: 'Risk Level (%)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Bar dataKey="risk" fill="#8884d8">
                      {geneticData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.risk > 50 ? '#ef4444' : entry.risk > 30 ? '#eab308' : '#22c55e'} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-4">
                <Card className="overflow-hidden">
                  <div className={`h-2 w-full ${geneticData[0].risk > 50 ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
                  <CardContent className="pt-4">
                    <div className="text-2xl font-bold">{geneticData[0].risk}%</div>
                    <p className="text-xs text-muted-foreground">Cardiovascular Risk</p>
                    <p className="text-xs mt-2">Variants: APOE, LPA, 9p21</p>
                  </CardContent>
                </Card>
                <Card className="overflow-hidden">
                  <div className={`h-2 w-full ${geneticData[1].risk > 50 ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
                  <CardContent className="pt-4">
                    <div className="text-2xl font-bold">{geneticData[1].risk}%</div>
                    <p className="text-xs text-muted-foreground">Metabolic Risk</p>
                    <p className="text-xs mt-2">Variants: FTO, TCF7L2, PPARG</p>
                  </CardContent>
                </Card>
                <Card className="overflow-hidden">
                  <div className="h-2 w-full bg-green-500"></div>
                  <CardContent className="pt-4">
                    <div className="text-2xl font-bold">{geneticData[2].risk}%</div>
                    <p className="text-xs text-muted-foreground">Inflammatory Risk</p>
                    <p className="text-xs mt-2">Variants: IL6, TNF, CRP</p>
                  </CardContent>
                </Card>
                <Card className="overflow-hidden">
                  <div className="h-2 w-full bg-green-500"></div>
                  <CardContent className="pt-4">
                    <div className="text-2xl font-bold">{geneticData[3].risk}%</div>
                    <p className="text-xs text-muted-foreground">Autoimmune Risk</p>
                    <p className="text-xs mt-2">Variants: HLA-DQ, IL23R</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Lab Results Tab */}
        <TabsContent value="lab" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Laboratory Results</CardTitle>
              <CardDescription>Historical data from blood tests and other laboratory measurements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={labData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="glucose" 
                      stroke="#8884d8" 
                      activeDot={{ r: 8 }} 
                      name="Glucose (mg/dL)"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="cholesterol" 
                      stroke="#82ca9d"
                      name="Total Cholesterol (mg/dL)" 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="reference" 
                      stroke="#bbbbbb" 
                      strokeDasharray="5 5"
                      name="Reference Range" 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Microbiota Tab */}
        <TabsContent value="microbiota" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Microbiome Analysis</CardTitle>
              <CardDescription>Gut flora composition and diversity metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={microbiotaData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" name="Current %" />
                    <Bar dataKey="optimal" fill="#82ca9d" name="Optimal %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="grid gap-4 md:grid-cols-2 mt-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Diversity Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">6.8</div>
                      <div className="text-sm text-muted-foreground">(Reference: &gt;7.5)</div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                      <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Reduced microbial diversity indicates potential dysbiosis requiring intervention.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Dysbiosis Assessment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex space-x-2 mb-2">
                      <div className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        Proteobacteria ↑
                      </div>
                      <div className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        Bacteroidetes ↓
                      </div>
                      <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        Firmicutes ✓
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Elevated Proteobacteria and reduced Bacteroidetes suggests inflammation and reduced SCFA production.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Metabolomics Tab */}
        <TabsContent value="metabolomics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Metabolic Pathways</CardTitle>
              <CardDescription>Analysis of metabolic functions and efficiency</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={metabolicData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="efficiency"
                        label
                      >
                        {metabolicData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.efficiency > 75 ? '#22c55e' : entry.efficiency > 60 ? '#eab308' : '#ef4444'} 
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="space-y-4">
                  {metabolicData.map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">{item.name}</span>
                        <span className="text-sm text-muted-foreground">{item.efficiency}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full ${
                            item.efficiency > 75 ? 'bg-green-500' : 
                            item.efficiency > 60 ? 'bg-yellow-500' : 'bg-red-500'
                          }`} 
                          style={{ width: `${item.efficiency}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                  
                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-4">
                      <h4 className="font-medium text-sm mb-2">Metabolic Insights</h4>
                      <p className="text-sm text-muted-foreground">
                        Reduced efficiency in Krebs Cycle and Fat Metabolism points to potential mitochondrial dysfunction. 
                        Consider CoQ10 and L-carnitine supplementation to support metabolic function.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
