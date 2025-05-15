
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type Patient = {
  id: string;
  name: string;
  lastExam: Date;
  examCount: number;
  exams: {
    metabolic: boolean;
    microbiota: boolean;
    genetic: boolean;
    laboratory: boolean;
  };
};

type RecentPatientsListProps = {
  patients: Patient[];
};

export function RecentPatientsList({ patients }: RecentPatientsListProps) {
  function getInitials(name: string) {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  }

  function formatDate(date: Date) {
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Patients</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {patients.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-muted-foreground">No recent patients found</p>
            <Button asChild variant="outline" className="mt-4">
              <Link to="/patients/new">Add Patient</Link>
            </Button>
          </div>
        ) : (
          <>
            {patients.map((patient) => (
              <div 
                key={patient.id} 
                className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
              >
                <div className="flex items-center">
                  <Avatar className="h-9 w-9 mr-3">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      {getInitials(patient.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{patient.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Last exam: {formatDate(patient.lastExam)}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-1">
                  {patient.exams.metabolic && (
                    <Badge variant="outline" className="bg-exam-metabolic/10 text-exam-metabolic border-exam-metabolic/20">
                      M
                    </Badge>
                  )}
                  {patient.exams.microbiota && (
                    <Badge variant="outline" className="bg-exam-microbiota/10 text-exam-microbiota border-exam-microbiota/20">
                      MB
                    </Badge>
                  )}
                  {patient.exams.genetic && (
                    <Badge variant="outline" className="bg-exam-genetic/10 text-exam-genetic border-exam-genetic/20">
                      G
                    </Badge>
                  )}
                  {patient.exams.laboratory && (
                    <Badge variant="outline" className="bg-exam-laboratory/10 text-exam-laboratory border-exam-laboratory/20">
                      L
                    </Badge>
                  )}
                </div>
              </div>
            ))}
            <div className="flex justify-center pt-2">
              <Button asChild variant="outline">
                <Link to="/patients">View All Patients</Link>
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
