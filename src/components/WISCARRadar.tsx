import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface WISCARData {
  will: number;
  interest: number;
  skill: number;
  cognitive: number;
  ability: number;
  real_world: number;
}

interface WISCARRadarProps {
  data: WISCARData;
}

export function WISCARRadar({ data }: WISCARRadarProps) {
  const dimensions = [
    { key: 'will', label: 'Will', description: 'Motivation & Drive' },
    { key: 'interest', label: 'Interest', description: 'Genuine Curiosity' },
    { key: 'skill', label: 'Skill', description: 'Technical Abilities' },
    { key: 'cognitive', label: 'Cognitive', description: 'Problem Solving' },
    { key: 'ability', label: 'Ability', description: 'Learning Capacity' },
    { key: 'real_world', label: 'Real-World', description: 'Career Alignment' }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getBarColor = (score: number) => {
    if (score >= 80) return 'bg-success';
    if (score >= 60) return 'bg-warning';
    return 'bg-destructive';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">WISCAR Framework Analysis</CardTitle>
        <p className="text-sm text-muted-foreground text-center">
          Your comprehensive career readiness profile
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {dimensions.map((dimension) => {
            const score = data[dimension.key as keyof WISCARData];
            return (
              <div key={dimension.key} className="space-y-2">
                <div className="flex justify-between items-end">
                  <div>
                    <div className="font-medium">{dimension.label}</div>
                    <div className="text-sm text-muted-foreground">{dimension.description}</div>
                  </div>
                  <div className={`text-lg font-bold ${getScoreColor(score)}`}>
                    {score}%
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-700 ${getBarColor(score)}`}
                    style={{ width: `${score}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}