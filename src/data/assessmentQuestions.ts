export interface QuestionOption {
  value: string;
  label: string;
  score: number;
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  options: QuestionOption[];
  category: 'interest' | 'personality' | 'cognitive' | 'motivation';
  construct: string;
}

export const psychometricQuestions: AssessmentQuestion[] = [
  {
    id: "interest_1",
    question: "How excited would you feel about analyzing complex business processes to identify improvement opportunities?",
    category: "interest",
    construct: "Business Process Interest",
    options: [
      { value: "very_excited", label: "Very excited - I love understanding how systems work", score: 5 },
      { value: "excited", label: "Excited - Sounds interesting and valuable", score: 4 },
      { value: "neutral", label: "Neutral - I could see the value but it's not thrilling", score: 3 },
      { value: "not_excited", label: "Not excited - Seems tedious and overwhelming", score: 2 },
      { value: "avoid", label: "I would actively avoid this type of work", score: 1 }
    ]
  },
  {
    id: "personality_1", 
    question: "When working on a complex project, which approach do you naturally prefer?",
    category: "personality",
    construct: "Structure vs Flexibility",
    options: [
      { value: "detailed_plan", label: "Create a detailed plan and follow it step by step", score: 5 },
      { value: "flexible_plan", label: "Make a general plan but adapt as I learn more", score: 4 },
      { value: "balanced", label: "Balance planning with room for creativity", score: 3 },
      { value: "creative_first", label: "Start creating and figure out structure later", score: 2 },
      { value: "completely_flexible", label: "Prefer complete flexibility and spontaneity", score: 1 }
    ]
  },
  {
    id: "cognitive_1",
    question: "A client reports that their sales team can't access customer data efficiently. What's your first instinct?",
    category: "cognitive", 
    construct: "Problem-Solving Approach",
    options: [
      { value: "systematic", label: "Map out the entire customer data flow to understand the system", score: 5 },
      { value: "investigate", label: "Interview users to understand their specific pain points", score: 4 },
      { value: "research", label: "Research common CRM issues and best practices", score: 3 },
      { value: "quick_fix", label: "Look for immediate workarounds to help them now", score: 2 },
      { value: "escalate", label: "Refer them to a technical specialist immediately", score: 1 }
    ]
  },
  {
    id: "motivation_1",
    question: "What aspect of technology work motivates you most?",
    category: "motivation",
    construct: "Intrinsic vs Extrinsic Motivation",
    options: [
      { value: "problem_solving", label: "Solving complex problems and seeing solutions work", score: 5 },
      { value: "helping_people", label: "Helping businesses and people work more efficiently", score: 4 },
      { value: "learning", label: "Continuously learning new technologies and methods", score: 3 },
      { value: "career_growth", label: "Building a stable, well-paying career", score: 2 },
      { value: "recognition", label: "Gaining recognition as an expert in the field", score: 1 }
    ]
  },
  {
    id: "interest_2",
    question: "How interested are you in understanding the financial and operational aspects of businesses?",
    category: "interest",
    construct: "Business Domain Interest", 
    options: [
      { value: "very_interested", label: "Very interested - I enjoy learning about business operations", score: 5 },
      { value: "interested", label: "Interested - It's valuable knowledge to have", score: 4 },
      { value: "somewhat", label: "Somewhat interested - Depends on the specific topic", score: 3 },
      { value: "limited", label: "Limited interest - Prefer to focus on technical aspects", score: 2 },
      { value: "not_interested", label: "Not interested - I prefer pure technology work", score: 1 }
    ]
  },
  {
    id: "personality_2",
    question: "In team meetings, you typically:",
    category: "personality",
    construct: "Communication Style",
    options: [
      { value: "facilitate", label: "Help facilitate discussion and ensure everyone is heard", score: 5 },
      { value: "contribute_ideas", label: "Actively contribute ideas and suggestions", score: 4 },
      { value: "ask_questions", label: "Ask clarifying questions to better understand", score: 3 },
      { value: "listen_mostly", label: "Listen mostly and speak when specifically asked", score: 2 },
      { value: "prefer_written", label: "Prefer to contribute thoughts in writing afterward", score: 1 }
    ]
  },
  {
    id: "cognitive_2",
    question: "When learning a new software system, which method works best for you?",
    category: "cognitive",
    construct: "Learning Style Preference",
    options: [
      { value: "hands_on", label: "Jump in and explore the interface hands-on", score: 4 },
      { value: "documentation", label: "Read documentation and guides thoroughly first", score: 5 },
      { value: "tutorials", label: "Follow step-by-step tutorials and examples", score: 3 },
      { value: "watch_others", label: "Watch others use it and ask questions", score: 2 },
      { value: "trial_error", label: "Learn through trial and error experimentation", score: 1 }
    ]
  },
  {
    id: "motivation_2",
    question: "How important is it for you to see the direct impact of your work?",
    category: "motivation",
    construct: "Impact Orientation",
    options: [
      { value: "essential", label: "Essential - I need to see how my work helps people/business", score: 5 },
      { value: "very_important", label: "Very important - It's a key source of motivation", score: 4 },
      { value: "somewhat", label: "Somewhat important - Nice to have but not crucial", score: 3 },
      { value: "not_crucial", label: "Not crucial - I'm satisfied with doing good work", score: 2 },
      { value: "prefer_abstract", label: "I prefer working on abstract/theoretical problems", score: 1 }
    ]
  }
];

export const calculateScores = (answers: Record<string, string>) => {
  const categoryScores = {
    interest: 0,
    personality: 0,
    cognitive: 0,
    motivation: 0
  };

  const categoryQuestionCounts = {
    interest: 0,
    personality: 0,
    cognitive: 0,
    motivation: 0
  };

  // Calculate average scores for each category
  psychometricQuestions.forEach(question => {
    const answer = answers[question.id];
    if (answer) {
      const option = question.options.find(opt => opt.value === answer);
      if (option) {
        categoryScores[question.category] += option.score;
        categoryQuestionCounts[question.category]++;
      }
    }
  });

  // Convert to percentages
  const finalScores = {
    interest: categoryQuestionCounts.interest > 0 ? Math.round((categoryScores.interest / (categoryQuestionCounts.interest * 5)) * 100) : 0,
    personality: categoryQuestionCounts.personality > 0 ? Math.round((categoryScores.personality / (categoryQuestionCounts.personality * 5)) * 100) : 0,
    cognitive: categoryQuestionCounts.cognitive > 0 ? Math.round((categoryScores.cognitive / (categoryQuestionCounts.cognitive * 5)) * 100) : 0,
    motivation: categoryQuestionCounts.motivation > 0 ? Math.round((categoryScores.motivation / (categoryQuestionCounts.motivation * 5)) * 100) : 0
  };

  // Calculate overall psychological fit score
  const psychologicalFit = Math.round((finalScores.interest + finalScores.personality + finalScores.cognitive + finalScores.motivation) / 4);

  // Generate WISCAR scores (simplified for demo)
  const wiscarScores = {
    will: finalScores.motivation,
    interest: finalScores.interest,
    skill: Math.min(finalScores.cognitive + 10, 100), // Slightly boost cognitive for skill
    cognitive: finalScores.cognitive,
    ability: Math.min(finalScores.personality + finalScores.cognitive, 100) / 2,
    real_world: Math.min(psychologicalFit + 5, 100)
  };

  return {
    categoryScores: finalScores,
    psychologicalFit,
    wiscarScores
  };
};