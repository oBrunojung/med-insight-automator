
import React from 'react';
import { ExamCategoryCard } from '@/components/dashboard/ExamCategoryCard';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { RecentPatientsList } from '@/components/dashboard/RecentPatientsList';
import { 
  AlertCircle, 
  FileText, 
  FlaskConical, 
  Users,
  Dna,
  Bug,
  Activity,
  Beaker
} from 'lucide-react';

// Updated sample data for Roseli
const samplePatients = [
  {
    id: '1',
    name: 'Roseli Aparecida Goncalves Brombim',
    lastExam: new Date(2023, 4, 15),
    examCount: 4,
    exams: {
      metabolic: true,
      microbiota: true,
      genetic: true,
      laboratory: true,
    },
  }
];

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of patient data, recent exams, and insights
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Patients"
          value="1"
          icon={<Users className="h-4 w-4" />}
        />
        <StatsCard
          title="Total Exams"
          value="4"
          icon={<FileText className="h-4 w-4" />}
        />
        <StatsCard
          title="Pending Insights"
          value="2"
          icon={<AlertCircle className="h-4 w-4" />}
        />
        <StatsCard
          title="Last Update"
          value="May 15, 2023"
          description="Patient: Roseli A. G. Brombim"
          icon={<FlaskConical className="h-4 w-4" />}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <ExamCategoryCard
          category="metabolic"
          title="Metabolic Exams"
          description="Metabolomic analysis for nutritional deficiencies"
          count={1}
          icon={<Activity className="h-4 w-4" />}
        />
        <ExamCategoryCard
          category="microbiota"
          title="Microbiota Exams"
          description="Gut microbiome analysis and diversity assessments"
          count={1}
          icon={<Bug className="h-4 w-4" />}
        />
        <ExamCategoryCard
          category="genetic"
          title="Genetic Exams"
          description="SNP analysis for genetic risk factors"
          count={1}
          icon={<Dna className="h-4 w-4" />}
        />
        <ExamCategoryCard
          category="laboratory"
          title="Laboratory Exams"
          description="Standard clinical laboratory tests"
          count={1}
          icon={<Beaker className="h-4 w-4" />}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <RecentPatientsList patients={samplePatients} />
        
        {/* Insights panel with Roseli's specific data */}
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-medium mb-3">Recent Insights</h3>
          <div className="space-y-3">
            <div className="p-3 border-l-4 border-l-yellow-500 bg-yellow-50 rounded">
              <h4 className="font-medium">Intolerância à Lactose e Glúten</h4>
              <p className="text-sm text-muted-foreground">Confirmados geneticamente, com potencial para inflamação intestinal.</p>
            </div>
            <div className="p-3 border-l-4 border-l-red-500 bg-red-50 rounded">
              <h4 className="font-medium">Risco Elevado para Diabetes Tipo 1</h4>
              <p className="text-sm text-muted-foreground">Recomendado monitoramento regular da glicemia.</p>
            </div>
            <div className="p-3 border-l-4 border-l-green-500 bg-green-50 rounded">
              <h4 className="font-medium">Disbiose Intestinal Leve</h4>
              <p className="text-sm text-muted-foreground">Sugerido aumento de probióticos e ingestão de fibras.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
