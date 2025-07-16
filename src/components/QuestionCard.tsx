import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface QuestionOption {
  value: string;
  label: string;
}

interface QuestionCardProps {
  question: string;
  options: QuestionOption[];
  selectedValue?: string;
  onValueChange: (value: string) => void;
  questionNumber: number;
  totalQuestions: number;
}

export function QuestionCard({ 
  question, 
  options, 
  selectedValue, 
  onValueChange, 
  questionNumber, 
  totalQuestions 
}: QuestionCardProps) {
  return (
    <Card className="shadow-lg border-0" style={{ boxShadow: 'var(--card-glow)' }}>
      <CardContent className="p-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Question {questionNumber} of {totalQuestions}</span>
              <span className="px-3 py-1 bg-accent rounded-full text-accent-foreground">
                Psychometric
              </span>
            </div>
            <h3 className="text-xl font-semibold leading-relaxed">
              {question}
            </h3>
          </div>
          
          <RadioGroup value={selectedValue} onValueChange={onValueChange}>
            <div className="space-y-3">
              {options.map((option) => (
                <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label 
                    htmlFor={option.value}
                    className="text-base leading-relaxed cursor-pointer flex-1"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
}