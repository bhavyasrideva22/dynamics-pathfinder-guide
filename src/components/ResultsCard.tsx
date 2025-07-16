import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, XCircle } from "lucide-react";

interface ResultsCardProps {
  title: string;
  score: number;
  recommendation: "Yes" | "Maybe" | "No";
  insight: string;
  nextSteps: string[];
}

export function ResultsCard({ title, score, recommendation, insight, nextSteps }: ResultsCardProps) {
  const getRecommendationIcon = () => {
    switch (recommendation) {
      case "Yes":
        return <CheckCircle className="h-5 w-5 text-success" />;
      case "Maybe":
        return <AlertCircle className="h-5 w-5 text-warning" />;
      case "No":
        return <XCircle className="h-5 w-5 text-destructive" />;
    }
  };

  const getRecommendationColor = () => {
    switch (recommendation) {
      case "Yes":
        return "bg-success text-white";
      case "Maybe":
        return "bg-warning text-white";
      case "No":
        return "bg-destructive text-white";
    }
  };

  const getScoreColor = () => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{title}</CardTitle>
          <Badge className={getRecommendationColor()}>
            <div className="flex items-center gap-2">
              {getRecommendationIcon()}
              {recommendation}
            </div>
          </Badge>
        </div>
        <div className="text-center">
          <div className={`text-4xl font-bold ${getScoreColor()}`}>
            {score}%
          </div>
          <div className="text-sm text-muted-foreground">Overall Fit Score</div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h4 className="font-semibold mb-2">Assessment Insight</h4>
          <p className="text-muted-foreground leading-relaxed">{insight}</p>
        </div>
        
        <div>
          <h4 className="font-semibold mb-3">Next Steps</h4>
          <ul className="space-y-2">
            {nextSteps.map((step, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span className="text-sm leading-relaxed">{step}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}