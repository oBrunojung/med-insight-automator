
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

// Sample data for demonstration
const samplePatients = [
  {
    id: '1',
    name: 'John Doe',
    lastExam: new Date(2023, 4, 15),
    examCount: 3,
    exams: {
      metabolic: true,
      microbiota: false,
      genetic: true,
      laboratory: true,
    },
  },
  {
    id: '2',
    name: 'Jane Smith',
    lastExam: new Date(2023, 4, 10),
    examCount: 2,
    exams: {
      metabolic: false,
      microbiota: true,
      genetic: true,
      laboratory: false,
    },
  },
  {
    id: '3',
    name: 'Alice Johnson',
    lastExam: new Date(2023, 4, 5),
    examCount: 4,
    exams: {
      metabolic: true,
      microbiota: true,
      genetic: true,
      laboratory: true,
    },
  },
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
          value="27"
          icon={<Users className="h-4 w-4" />}
          trend={{ value: 12, positive: true }}
        />
        <StatsCard
          title="Total Exams"
          value="94"
          icon={<FileText className="h-4 w-4" />}
          trend={{ value: 8, positive: true }}
        />
        <StatsCard
          title="Pending Insights"
          value="5"
          icon={<AlertCircle className="h-4 w-4" />}
        />
        <StatsCard
          title="Notion Sync"
          value="Active"
          description="Last sync: 2 hours ago"
          icon={<FlaskConical className="h-4 w-4" />}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <ExamCategoryCard
          category="metabolic"
          title="Metabolic Exams"
          description="Metabolomic analysis for nutritional deficiencies"
          count={34}
          icon={<Activity className="h-4 w-4" />}
        />
        <ExamCategoryCard
          category="microbiota"
          title="Microbiota Exams"
          description="Gut microbiome analysis and diversity assessments"
          count={28}
          icon={<Bug className="h-4 w-4" />}
        />
        <ExamCategoryCard
          category="genetic"
          title="Genetic Exams"
          description="SNP analysis for genetic risk factors"
          count={15}
          icon={<Dna className="h-4 w-4" />}
        />
        <ExamCategoryCard
          category="laboratory"
          title="Laboratory Exams"
          description="Standard clinical laboratory tests"
          count={17}
          icon={<Beaker className="h-4 w-4" />}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <RecentPatientsList patients={samplePatients} />
        
        {/* Placeholder for insights component - would be expanded in future iterations */}
        <div className="border rounded-lg h-[400px] flex items-center justify-center bg-muted/10">
          <div className="text-center p-6">
            <h3 className="text-lg font-medium mb-2">Recent Insights</h3>
            <p className="text-muted-foreground">
              Insights visualization will appear here based on collected data
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
