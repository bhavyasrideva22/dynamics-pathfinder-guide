import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AssessmentProgress } from "@/components/AssessmentProgress";
import { QuestionCard } from "@/components/QuestionCard";
import { WISCARRadar } from "@/components/WISCARRadar";
import { ResultsCard } from "@/components/ResultsCard";
import { psychometricQuestions, calculateScores } from "@/data/assessmentQuestions";
import { ArrowRight, Target, Brain, Users, TrendingUp, CheckCircle, Zap, Cloud, Building, Activity, BarChart3, Workflow, Briefcase, Settings, MessageSquare, PenTool, Monitor } from "lucide-react";

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
      <div className="min-h-screen bg-background">
        {/* Progress Header */}
        <div className="border-b bg-card">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Is Microsoft Dynamics 365 the Right Career Fit for You?</h1>
                <p className="text-muted-foreground">Comprehensive Career Assessment & Guidance</p>
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-medium">20% Complete</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Steps */}
        <div className="border-b bg-muted/30">
          <div className="container mx-auto px-4 py-4">
            <div className="flex gap-4 overflow-x-auto">
              <Badge variant="default" className="whitespace-nowrap">
                <Monitor className="w-4 h-4 mr-2" />
                Introduction
              </Badge>
              <Badge variant="outline" className="whitespace-nowrap">
                <Brain className="w-4 h-4 mr-2" />
                Psychological Fit
              </Badge>
              <Badge variant="outline" className="whitespace-nowrap">
                <Activity className="w-4 h-4 mr-2" />
                Technical Aptitude
              </Badge>
              <Badge variant="outline" className="whitespace-nowrap">
                <BarChart3 className="w-4 h-4 mr-2" />
                WISCAR Analysis
              </Badge>
              <Badge variant="outline" className="whitespace-nowrap">
                <TrendingUp className="w-4 h-4 mr-2" />
                Your Results
              </Badge>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Main Hero Card */}
          <div className="mb-12">
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-card to-primary/5">
              <CardContent className="p-8 text-center">
                <h2 className="text-3xl font-bold mb-4">Discover Your Microsoft Dynamics 365 Career Potential</h2>
                <p className="text-lg text-muted-foreground mb-6 max-w-3xl mx-auto">
                  Take our comprehensive assessment to evaluate your psychological fit, technical readiness, 
                  and career alignment for a future in Microsoft Dynamics 365 development and administration.
                </p>
                
                <div className="flex items-center justify-center gap-8 mb-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>25-30 minutes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    <span>Personalized Results</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    <span>Career Guidance</span>
                  </div>
                </div>

                <Button size="lg" onClick={handleStartAssessment} className="text-lg px-8 py-6">
                  Start Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* What is Microsoft Dynamics 365 */}
          <div className="mb-12">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  <CardTitle className="text-xl">What is Microsoft Dynamics 365?</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Microsoft Dynamics 365 is a powerful <strong>cloud-based platform</strong> that specializes in <strong>Enterprise Resource Planning (ERP)</strong> and Customer Relationship Management (CRM). It empowers organizations to streamline business processes and drive digital transformation across various departments and functions.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Cloud className="h-6 w-6 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-blue-600 mb-2">Cloud Platform</h4>
                    <p className="text-sm text-muted-foreground">Scalable, secure, and accessible from anywhere</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Workflow className="h-6 w-6 text-green-600" />
                    </div>
                    <h4 className="font-semibold text-green-600 mb-2">Business Integration</h4>
                    <p className="text-sm text-muted-foreground">Streamline processes and reduce manual work</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Building className="h-6 w-6 text-purple-600" />
                    </div>
                    <h4 className="font-semibold text-purple-600 mb-2">Enterprise Scale</h4>
                    <p className="text-sm text-muted-foreground">Used by Fortune 500 companies worldwide</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Career Opportunities */}
          <div className="mb-12">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-primary" />
                  <CardTitle className="text-xl">Career Opportunities</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Dynamics 365 Functional Consultant</h4>
                    <p className="text-sm text-muted-foreground">Configure solutions and optimize business processes</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Dynamics 365 Developer</h4>
                    <p className="text-sm text-muted-foreground">Build custom solutions and integrations</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Solution Architect</h4>
                    <p className="text-sm text-muted-foreground">Design enterprise system architecture</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Business Analyst</h4>
                    <p className="text-sm text-muted-foreground">Bridge technical and business requirements</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">CRM Administrator</h4>
                    <p className="text-sm text-muted-foreground">Manage platform and user configurations</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">ERP Analyst</h4>
                    <p className="text-sm text-muted-foreground">Optimize enterprise resource planning</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Ideal Traits */}
          <div className="mb-12">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  <CardTitle className="text-xl">Ideal Traits & Skills</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    "Strong analytical thinking",
                    "Process-oriented mindset", 
                    "Business acumen",
                    "Problem-solving skills",
                    "Communication skills",
                    "Attention to detail"
                  ].map((trait, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm">{trait}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* What You'll Discover */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">What You'll Discover</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold mb-4">Assessment Modules:</h4>
                    <div className="space-y-3">
                      {[
                        { num: "1", title: "Psychological Fit Evaluation" },
                        { num: "2", title: "Technical Aptitude Testing" },
                        { num: "3", title: "WISCAR Framework Analysis" }
                      ].map((module, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                            {module.num}
                          </div>
                          <span className="text-sm">{module.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-4">Your Results Include:</h4>
                    <div className="space-y-2">
                      {[
                        "Personalized fit score (0-100)",
                        "Detailed trait analysis", 
                        "Technical readiness assessment",
                        "Career pathway recommendations",
                        "Next steps and learning resources"
                      ].map((result, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                          <span className="text-sm">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
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
