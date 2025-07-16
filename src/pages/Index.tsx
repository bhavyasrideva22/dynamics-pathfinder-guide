import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AssessmentProgress } from "@/components/AssessmentProgress";
import { QuestionCard } from "@/components/QuestionCard";
import { WISCARRadar } from "@/components/WISCARRadar";
import { ResultsCard } from "@/components/ResultsCard";
import { psychometricQuestions, calculateScores } from "@/data/assessmentQuestions";
import { ArrowRight, Target, Brain, Users, TrendingUp, CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-assessment.jpg";

type AssessmentState = "intro" | "assessment" | "results";

const Index = () => {
  const [currentState, setCurrentState] = useState<AssessmentState>("intro");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<any>(null);

  const handleStartAssessment = () => {
    setCurrentState("assessment");
  };

  const handleAnswerChange = (value: string) => {
    const currentQuestion = psychometricQuestions[currentQuestionIndex];
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < psychometricQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Assessment complete - calculate results
      const scores = calculateScores(answers);
      setResults(scores);
      setCurrentState("results");
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const currentQuestion = psychometricQuestions[currentQuestionIndex];
  const currentAnswer = answers[currentQuestion?.id];
  const canProceed = currentAnswer !== undefined;

  if (currentState === "intro") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-accent">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl font-bold leading-tight">
                  Is Microsoft Dynamics 365 the Right{" "}
                  <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                    Career Fit
                  </span>{" "}
                  for You?
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Discover your compatibility with Microsoft Dynamics 365 careers through our comprehensive 
                  psychometric and technical assessment. Get personalized insights and career guidance.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full shadow-sm">
                  <Brain className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Psychometric Analysis</span>
                </div>
                <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full shadow-sm">
                  <Target className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">WISCAR Framework</span>
                </div>
                <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full shadow-sm">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Career Guidance</span>
                </div>
              </div>

              <Button size="lg" onClick={handleStartAssessment} className="text-lg px-8 py-6">
                Start Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4" />
                <span>20-30 minutes • Comprehensive analysis • Personalized results</span>
              </div>
            </div>

            <div className="relative">
              <img 
                src={heroImage} 
                alt="Career Assessment" 
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What You'll Discover</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive assessment evaluates multiple dimensions of career fit
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Brain className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Psychological Fit</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Assess your personality traits, cognitive style, and motivation patterns against Dynamics 365 role requirements.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Target className="h-8 w-8 text-primary mb-2" />
                <CardTitle>WISCAR Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Comprehensive evaluation of Will, Interest, Skill, Cognitive readiness, Ability to learn, and Real-world alignment.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Career Guidance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get specific role recommendations, learning paths, and next steps tailored to your unique profile.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (currentState === "assessment") {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="space-y-8">
            <AssessmentProgress 
              currentStep={currentQuestionIndex + 1}
              totalSteps={psychometricQuestions.length}
              stepName="Psychometric Assessment"
            />

            <QuestionCard
              question={currentQuestion.question}
              options={currentQuestion.options}
              selectedValue={currentAnswer}
              onValueChange={handleAnswerChange}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={psychometricQuestions.length}
            />

            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </Button>
              <Button 
                onClick={handleNextQuestion}
                disabled={!canProceed}
              >
                {currentQuestionIndex === psychometricQuestions.length - 1 ? "Complete Assessment" : "Next"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentState === "results" && results) {
    const getRecommendation = (score: number) => {
      if (score >= 75) return "Yes";
      if (score >= 50) return "Maybe";
      return "No";
    };

    const getInsight = (score: number) => {
      if (score >= 75) {
        return "You show strong alignment with Microsoft Dynamics 365 careers. Your personality traits, cognitive style, and interests match well with typical role requirements in this field.";
      }
      if (score >= 50) {
        return "You have moderate alignment with Dynamics 365 careers. Some aspects of your profile are well-suited, while others might benefit from development or alternative approaches.";
      }
      return "Your current profile suggests limited alignment with traditional Dynamics 365 roles. Consider exploring related fields or developing specific competencies before pursuing this path.";
    };

    const getNextSteps = (score: number) => {
      if (score >= 75) {
        return [
          "Start with Microsoft Learn modules on Dynamics 365 Fundamentals",
          "Consider pursuing MB-900 certification as a foundation",
          "Join Dynamics 365 community forums and user groups",
          "Look for entry-level positions or internships in consulting firms"
        ];
      }
      if (score >= 50) {
        return [
          "Strengthen business process understanding through courses",
          "Practice with Dynamics 365 trial environments",
          "Develop technical skills in Power Platform",
          "Consider starting with adjacent roles like Business Analyst"
        ];
      }
      return [
        "Explore related fields like Business Analytics or Project Management",
        "Develop foundational business and technical skills",
        "Consider informational interviews with Dynamics professionals",
        "Reassess after gaining more business or technical experience"
      ];
    };

    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold">Your Assessment Results</h1>
              <p className="text-lg text-muted-foreground">
                Based on your responses, here's your comprehensive career fit analysis
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <ResultsCard
                title="Microsoft Dynamics 365 Career Fit"
                score={results.psychologicalFit}
                recommendation={getRecommendation(results.psychologicalFit)}
                insight={getInsight(results.psychologicalFit)}
                nextSteps={getNextSteps(results.psychologicalFit)}
              />

              <WISCARRadar data={results.wiscarScores} />
            </div>

            <div className="text-center">
              <Button 
                onClick={() => {
                  setCurrentState("intro");
                  setCurrentQuestionIndex(0);
                  setAnswers({});
                  setResults(null);
                }}
                variant="outline"
              >
                Take Assessment Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Index;
