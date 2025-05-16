
import React from 'react';
import { PatientData } from '@/components/patients/PatientData';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

// Sample patient data matching the structure from the JSON
const patientData = {
  "patients": [
    {
      "name": "Roseli Aparecida Goncalves Brombim",
      "age": 68,
      "gender": "Feminino",
      "birthdate": "31/07/1956",
      "cards": [
        {
          "type": "Basic Info",
          "content": {
            "Nome": "Roseli Aparecida Goncalves Brombim",
            "Idade": 68,
            "Sexo": "Feminino",
            "Data de Nascimento": "31/07/1956"
          }
        },
        {
          "type": "Exames Laboratoriais",
          "content": {
            "Potássio": "4,0 mEq/L",
            "Sódio": "140 mEq/L",
            "Amilase Total": "30 U/L",
            "Bilirrubina Total": "0,74 mg/dL",
            "Cálcio Ionizado": "1,16 mmol/L",
            "Creatinina": "0,73 mg/dL",
            "Ureia": "21 mg/dL",
            "Glicose Jejum": "96 mg/dL",
            "Ácido Úrico": "4,0 mg/dL",
            "Proteína C Reativa": "0,07 mg/dL"
          }
        },
        {
          "type": "Metabolômica",
          "content": {
            "Glycolysis": "14.9",
            "Krebs Cycle": "221.3",
            "Fatty Acid Oxidation": "72.3",
            "Ketones": "235.7",
            "Amino Acid Metabolism": {
              "Phenylalanine": "37.1",
              "Tyrosine": "41.8",
              "Tryptophan": "16.1"
            },
            "Nutrition": {
              "Vitamin B12": "Normal",
              "Folate": "Normal",
              "Vitamin B6": "Normal",
              "Biotin": "Normal"
            },
            "Microbial Metabolites": {
              "Amino Acid": "11%",
              "Polyphenols": "Moderate",
              "Isoflavones": "Minimal"
            }
          }
        },
        {
          "type": "Microbiota",
          "content": {
            "Flora Protetora": "7 x 10^8",
            "Flora Imunomoduladora": "5 x 10^9",
            "Flora Proteolítica": "1 x 10^8",
            "Bacteroides spp": "8 x 10^8",
            "Bifidobacterium spp": "4 x 10^8",
            "Lactobacillus spp": "3 x 10^4",
            "PH das Fezes": "5.0",
            "Consistência": "Pastosa",
            "Diagnóstico": "Disbiose Intestinal Leve"
          }
        },
        {
          "type": "Genética",
          "content": {
            "Risco Cardiovascular": "Moderado",
            "Risco Diabetes Tipo 1": "Alto",
            "Risco Diabetes Tipo 2": "Moderado",
            "Risco Hipertensão": "Baixo",
            "Risco Obesidade": "Baixo",
            "Intolerância à Lactose": "Sim",
            "Intolerância ao Glúten": "Sim",
            "Inflamação Intestinal": "Moderada"
          }
        }
      ]
    }
  ]
};

const Patients = () => {
  const navigate = useNavigate();

  const viewPatientDashboard = () => {
    navigate('/patient-dashboard');
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Ficha do Paciente</h1>
      <PatientData patients={patientData.patients} />
      <div className="mt-6 flex justify-end">
        <Button onClick={viewPatientDashboard}>
          Ver Dashboard Completo
        </Button>
      </div>
    </div>
  );
};

export default Patients;
