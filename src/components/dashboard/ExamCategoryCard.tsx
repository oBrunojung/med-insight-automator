
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export type ExamCategory = 'metabolic' | 'microbiota' | 'genetic' | 'laboratory';

type ExamCategoryCardProps = {
  category: ExamCategory;
  title: string;
  description: string;
  count: number;
  icon: React.ReactNode;
};

export function ExamCategoryCard({
  category,
  title,
  description,
  count,
  icon,
}: ExamCategoryCardProps) {
  const colorMap = {
    metabolic: "bg-exam-metabolic/10 text-exam-metabolic",
    microbiota: "bg-exam-microbiota/10 text-exam-microbiota",
    genetic: "bg-exam-genetic/10 text-exam-genetic",
    laboratory: "bg-exam-laboratory/10 text-exam-laboratory",
  };

  const borderColorMap = {
    metabolic: "border-l-exam-metabolic",
    microbiota: "border-l-exam-microbiota",
    genetic: "border-l-exam-genetic",
    laboratory: "border-l-exam-laboratory",
  };

  return (
    <Card className={cn("overflow-hidden border-l-4", borderColorMap[category])}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div
            className={cn(
              "rounded-full p-1.5 w-9 h-9 flex items-center justify-center",
              colorMap[category]
            )}
          >
            {icon}
          </div>
          <Badge
            variant="outline"
            className={cn("font-normal", colorMap[category])}
          >
            {count} exams
          </Badge>
        </div>
        <CardTitle className="mt-4">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Link to={`/exams/${category}`}>
          <Button
            variant="ghost"
            className="p-0 h-8 font-normal"
          >
            View details
            <ArrowRight className="h-3.5 w-3.5 ml-1" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
