
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Brain, 
  ClipboardList, 
  ArrowRight, 
  Lightbulb, 
  BookOpen, 
  Activity,
  Check
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';

type Question = {
  id: number;
  text: string;
  category: string;
  options: string[];
};

const questions: Question[] = [
  {
    id: 1,
    text: "When learning something new, I prefer to:",
    category: "learning_style",
    options: [
      "Read detailed explanations with text",
      "Watch videos or demonstrations",
      "Try it out through hands-on activities",
      "Discuss it with others or listen to explanations"
    ]
  },
  {
    id: 2,
    text: "When focusing on a task, I find it easiest to maintain attention when:",
    category: "focus",
    options: [
      "I'm in a completely quiet environment",
      "There's some background noise or music",
      "I can move around or fidget",
      "I take frequent short breaks"
    ]
  },
  {
    id: 3,
    text: "When I need to remember information, it's easiest when:",
    category: "memory",
    options: [
      "I can visualize it or see images",
      "I organize it into patterns or systems",
      "I associate it with emotions or experiences",
      "I repeat it or say it out loud"
    ]
  },
  {
    id: 4,
    text: "When reading text, I find it most challenging when:",
    category: "reading",
    options: [
      "There are too many words close together",
      "The font is too small or difficult to read",
      "There's not enough visual structure or organization",
      "I can't highlight or interact with the text"
    ]
  },
  {
    id: 5,
    text: "When feeling overwhelmed during learning, what helps most is:",
    category: "emotional",
    options: [
      "Taking a complete break from the task",
      "Getting encouragement or support",
      "Focusing on a simpler part of the task",
      "Using mindfulness or calming techniques"
    ]
  }
];

const AssessmentTool = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const navigate = useNavigate();
  
  const handleNext = () => {
    if (selectedOption === null) return;
    
    // Save the answer
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: selectedOption
    }));
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedOption(null);
    } else {
      // Assessment completed
      setIsComplete(true);
      
      // Simulate analysis delay
      setTimeout(() => {
        navigate('/learning');
      }, 3000);
    }
  };
  
  const handleOptionSelect = (index: number) => {
    setSelectedOption(index);
  };
  
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      {!isComplete ? (
        <Card className="shadow-soft-lg border-border animate-scale-in">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                <ClipboardList className="mr-1 h-4 w-4" />
                <span>Assessment</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {questions.length}
              </div>
            </div>
            <CardTitle className="text-2xl font-heading">Learning Style Assessment</CardTitle>
            <CardDescription>
              This assessment helps us personalize your learning experience
            </CardDescription>
            <Progress value={progress} className="h-2 mt-4" />
          </CardHeader>
          
          <CardContent className="pt-6">
            <div className="mb-6">
              <h3 className="text-xl font-medium mb-6">{questions[currentQuestion].text}</h3>
              
              <RadioGroup className="space-y-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem
                      id={`option-${index}`}
                      value={`${index}`}
                      checked={selectedOption === index}
                      onClick={() => handleOptionSelect(index)}
                      className="h-5 w-5"
                    />
                    <Label
                      htmlFor={`option-${index}`}
                      className={`text-base cursor-pointer ${
                        selectedOption === index ? 'text-primary font-medium' : 'text-foreground'
                      }`}
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </CardContent>
          
          <CardFooter className="justify-between border-t pt-6">
            <Button 
              variant="outline" 
              onClick={() => currentQuestion > 0 && setCurrentQuestion(prev => prev - 1)}
              disabled={currentQuestion === 0}
            >
              Back
            </Button>
            <Button 
              onClick={handleNext}
              disabled={selectedOption === null}
              className="btn-primary"
            >
              {currentQuestion < questions.length - 1 ? (
                <>Next <ArrowRight className="ml-1 h-4 w-4" /></>
              ) : (
                'Complete Assessment'
              )}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="shadow-soft-lg border-border animate-scale-in">
          <CardHeader>
            <CardTitle className="text-2xl font-heading text-primary">Analyzing Your Results</CardTitle>
            <CardDescription>
              We're creating your personalized learning profile
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-4 pb-8">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <Brain className="h-20 w-20 text-primary animate-pulse-slow" />
                <div className="absolute inset-0 bg-primary/10 rounded-full filter blur-xl animate-pulse-slow"></div>
              </div>
            </div>
            
            <Progress value={100} className="h-2 mb-6 animate-pulse-slow" />
            
            <div className="space-y-4">
              <div className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <div>
                  <h4 className="font-medium">Learning Style Analysis</h4>
                  <p className="text-sm text-muted-foreground">Identifying your preferred methods of learning</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <div>
                  <h4 className="font-medium">Focus Pattern Recognition</h4>
                  <p className="text-sm text-muted-foreground">Understanding your attention patterns</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <div>
                  <h4 className="font-medium">Content Personalization</h4>
                  <p className="text-sm text-muted-foreground">Creating your optimal learning environment</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AssessmentTool;
