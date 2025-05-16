
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FileText, Dna, Bug, Beaker, FileChartLine } from "lucide-react";
import { useNavigate } from 'react-router-dom';

// Define types for our patient data
type ContentValue = string | number | { [key: string]: string | number | ContentValue };

interface CardData {
  type: string;
  content: { [key: string]: ContentValue };
}

interface Patient {
  name: string;
  age: number;
  gender: string;
  birthdate: string;
  cards: CardData[];
}

interface PatientDataProps {
  patients: Patient[];
}

export const PatientData: React.FC<PatientDataProps> = ({ patients }) => {
  const [activeTab, setActiveTab] = useState('Basic Info');
  const navigate = useNavigate();
  
  // If no patients provided, show placeholder
  if (!patients || patients.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>No Patient Data Available</CardTitle>
          <CardDescription>No patients have been added to the system yet.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  // For now, we'll just display the first patient
  const patient = patients[0];
  
  // Map card types to icons
  const getCardIcon = (type: string) => {
    switch(type) {
      case 'Exames Laboratoriais':
        return <FileText className="h-5 w-5" />;
      case 'Genética':
        return <Dna className="h-5 w-5" />;
      case 'Microbiota':
        return <Bug className="h-5 w-5" />;
      case 'Metabolômica':
        return <Beaker className="h-5 w-5" />;
      default:
        return <FileChartLine className="h-5 w-5" />;
    }
  };

  // Generate tab triggers from patient card types
  const tabTriggers = patient.cards.map(card => (
    <TabsTrigger 
      key={card.type} 
      value={card.type}
      className="flex items-center gap-2 px-4 py-2"
    >
      {getCardIcon(card.type)}
      {card.type}
    </TabsTrigger>
  ));

  // Display content based on its type
  const renderContent = (content: { [key: string]: ContentValue }) => {
    return Object.entries(content).map(([key, value]) => {
      // Handle nested objects
      if (typeof value === 'object') {
        return (
          <div key={key} className="mb-4">
            <h4 className="text-sm font-medium mb-2">{key}</h4>
            <div className="pl-4 border-l-2 border-muted">
              {renderContent(value as { [key: string]: ContentValue })}
            </div>
          </div>
        );
      }
      
      // Handle simple key-value pairs
      return (
        <div key={key} className="mb-2 flex justify-between">
          <span className="text-sm font-medium">{key}:</span>
          <span className="text-sm">{value as string | number}</span>
        </div>
      );
    });
  };

  // Generate tab content panels from patient card data
  const tabContents = patient.cards.map(card => (
    <TabsContent key={card.type} value={card.type} className="p-4 border rounded-md mt-2">
      {renderContent(card.content)}
    </TabsContent>
  ));

  return (
    <div className="space-y-6">
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="bg-primary text-primary-foreground text-lg">
              {patient.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-xl">{patient.name}</CardTitle>
            <CardDescription>
              {patient.age} anos • {patient.gender} • Nascimento: {patient.birthdate}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full grid grid-cols-5">
              {tabTriggers}
            </TabsList>
            {tabContents}
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={() => navigate('/patient-dashboard')}>
            View Detailed Dashboard
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
