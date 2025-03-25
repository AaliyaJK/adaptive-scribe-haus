import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  X, 
  Brain,
  Clock,
  Trophy,
  Book,
  Cat
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

// MMSE questions with points and proper images
const questions = [
  {
    category: "Orientation",
    question: "What is the month?",
    options: ["February", "March", "April"],
    optionImages: [
      "https://images.unsplash.com/photo-1613336026275-d6d473084e85?auto=format&w=300&h=200&fit=crop&q=80",
      "https://images.unsplash.com/photo-1579113800032-c38bd7635818?auto=format&w=300&h=200&fit=crop&q=80", 
      "https://images.unsplash.com/photo-1615302615263-cb85c44e48f7?auto=format&w=300&h=200&fit=crop&q=80"
    ],
    answer: "March",
    points: 5,
    image: "https://images.unsplash.com/photo-1523920290572-47fc022dfe9e?auto=format&w=600&h=400&fit=crop&q=80"
  },
  {
    category: "Orientation",
    question: "What is the year?",
    options: ["2025", "2024", "2023"],
    optionImages: [
      "https://images.unsplash.com/photo-1603732551658-5fabbafa12f0?auto=format&w=300&h=200&fit=crop&q=80",
      "https://images.unsplash.com/photo-1672906674483-c4bd233e13b4?auto=format&w=300&h=200&fit=crop&q=80",
      "https://images.unsplash.com/photo-1640158615573-cd28feb1bf4e?auto=format&w=300&h=200&fit=crop&q=80"
    ],
    answer: "2024",
    points: 5,
    image: "https://images.unsplash.com/photo-1594322436404-5a0526db4d13?auto=format&w=600&h=400&fit=crop&q=80"
  },
  {
    category: "Orientation",
    question: "Where are we?",
    options: ["USA", "India", "UK"],
    optionImages: [
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&w=300&h=200&fit=crop&q=80",
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&w=300&h=200&fit=crop&q=80",
      "https://images.unsplash.com/photo-1520986606214-8b456906c813?auto=format&w=300&h=200&fit=crop&q=80"
    ],
    answer: "India",
    points: 5,
    image: "https://images.unsplash.com/photo-1566837497312-7be4a63760c6?auto=format&w=600&h=400&fit=crop&q=80"
  },
  {
    category: "Registration",
    question: "Name three objects and repeat them?",
    options: ["Apple, Table, Car", "Dog, Pen, Chair", "Tree, Book, Clock"],
    optionImages: [
      "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?auto=format&w=300&h=200&fit=crop&q=80",
      "https://images.unsplash.com/photo-1583511655826-05700442b0b9?auto=format&w=300&h=200&fit=crop&q=80",
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&w=300&h=200&fit=crop&q=80"
    ],
    answer: "Tree, Book, Clock",
    points: 3,
    image: "https://images.unsplash.com/photo-1523292562811-8fa7962a78c8?auto=format&w=600&h=400&fit=crop&q=80"
  },
  {
    category: "Attention",
    question: "Spell 'WORLD' backwards", 
    options: ["DLROW", "WROLD", "DLOWR"],
    optionImages: [
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&w=300&h=200&fit=crop&q=80",
      "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&w=300&h=200&fit=crop&q=80",
      "https://images.unsplash.com/photo-1594322436404-5a0526db4d13?auto=format&w=300&h=200&fit=crop&q=80"
    ],
    answer: "DLROW",
    points: 5,
    image: "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?auto=format&w=600&h=400&fit=crop&q=80"
  },
  {
    category: "Recall", 
    question: "What were the three objects?", 
    options: ["Tree, Book, Clock", "Pen, Chair, Dog", "Apple, Table, Car"],
    optionImages: [
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&w=300&h=200&fit=crop&q=80",
      "https://images.unsplash.com/photo-1581078426770-6d336e5de7bf?auto=format&w=300&h=200&fit=crop&q=80",
      "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?auto=format&w=300&h=200&fit=crop&q=80"
    ],
    answer: "Tree, Book, Clock", 
    points: 3, 
    image: "https://images.unsplash.com/photo-1606326608602-0fed827d6430?auto=format&w=600&h=400&fit=crop&q=80"
  },
  {
    category: "Language", 
    question: "Say 'No ifs ands or buts'", 
    options: ["No ifs ands or buts", "No ifs or buts", "No ands"], 
    optionImages: [
      "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&w=300&h=200&fit=crop&q=80",
      "https://images.unsplash.com/photo-1526040652367-ac003a0475fe?auto=format&w=300&h=200&fit=crop&q=80",
      "https://images.unsplash.com/photo-1520004434532-668416a08753?auto=format&w=300&h=200&fit=crop&q=80"
    ],
    answer: "No ifs ands or buts", 
    points: 1, 
    image: "https://images.unsplash.com/photo-1570005942124-5a8117b3d86b?auto=format&w=600&h=400&fit=crop&q=80"
  },
  {
    category: "Math",
    question: "What is 7 + 7?",
    options: ["10", "14", "12"],
    optionImages: [
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&w=300&h=200&fit=crop&q=80",
      "https://images.unsplash.com/photo-1635372722656-389f87a941db?auto=format&w=300&h=200&fit=crop&q=80",
      "https://images.unsplash.com/photo-1577374903839-89c0871c14c7?auto=format&w=300&h=200&fit=crop&q=80"
    ],
    answer: "14", 
    points: 5,
    image: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&w=600&h=400&fit=crop&q=80"
  },
  {
    category: "Noun",
    question: "What is a pen and a clock?", 
    options: ["Objects", "Animals", "Food"],
    optionImages: [
      "https://images.unsplash.com/photo-1560785496-3c9d27877182?auto=format&w=300&h=200&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&w=300&h=200&fit=crop&q=80",
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&w=300&h=200&fit=crop&q=80"
    ],
    answer: "Objects", 
    points: 2,
    image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&w=600&h=400&fit=crop&q=80"
  },
  {
    category: "Memory", 
    question: "Listen to these words: Ball, Flag, Tree. Repeat them.",
    options: ["Ball, Flag, Tree", "Ball, Hat, Tree", "Car, Flag, Tree"],
    optionImages: [
      "https://images.unsplash.com/photo-1521731978332-9e9e714bdd20?auto=format&w=300&h=200&fit=crop&q=80",
      "https://images.unsplash.com/photo-1498579809087-ef1e558fd1da?auto=format&w=300&h=200&fit=crop&q=80",
      "https://images.unsplash.com/photo-1528124623334-221cb96fe6e0?auto=format&w=300&h=200&fit=crop&q=80"
    ], 
    answer: "Ball, Flag, Tree", 
    points: 5,
    image: "https://images.unsplash.com/photo-1628414832219-5957b9b91b74?auto=format&w=600&h=400&fit=crop&q=80"
  }
];

interface ResultLevel {
  range: [number, number];
  title: string;
  description: string;
  color: string;
  recommendation: string;
}

const resultLevels: ResultLevel[] = [
  {
    range: [0, 15],
    title: "Elementary Level",
    description: "You may benefit from additional support and simplified learning materials.",
    color: "bg-amber-500",
    recommendation: "We recommend starting with our basic modules with extra visual aids and step-by-step guidance."
  },
  {
    range: [16, 25],
    title: "Intermediate Level",
    description: "You show good cognitive abilities with some opportunities for enhancement.",
    color: "bg-green-500",
    recommendation: "Our adaptive learning modules will adjust to help strengthen specific areas while building on your strengths."
  },
  {
    range: [26, 40],
    title: "Advanced Level",
    description: "You demonstrate strong cognitive processing abilities across multiple domains.",
    color: "bg-blue-500",
    recommendation: "You'll thrive with our challenging content, though we'll still provide adaptive support for your specific learning style."
  }
];

const MMSEAssessment: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<{[key: number]: string}>({});
  const [assessmentComplete, setAssessmentComplete] = useState(false);
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const { toast } = useToast();

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleOptionSelect = (option: string) => {
    if (feedbackVisible) return;
    
    setSelectedAnswer(option);
    const correct = option === currentQuestion.answer;
    setIsCorrect(correct);
    
    // Update score if correct
    if (correct) {
      setScore(prev => prev + currentQuestion.points);
    }
    
    // Save answer
    setAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: option
    }));
    
    // Show feedback
    setFeedbackVisible(true);
    
    // Auto-advance after feedback
    setTimeout(() => {
      setFeedbackVisible(false);
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
      } else {
        setAssessmentComplete(true);
        toast({
          title: "Assessment Complete!",
          description: `You've completed the cognitive assessment with a score of ${score}/${getTotalPossiblePoints()}.`,
        });
      }
    }, 1500);
  };

  const getTotalPossiblePoints = () => {
    return questions.reduce((sum, q) => sum + q.points, 0);
  };

  const getCurrentResultLevel = (): ResultLevel => {
    const totalScore = score;
    for (const level of resultLevels) {
      if (totalScore >= level.range[0] && totalScore <= level.range[1]) {
        return level;
      }
    }
    return resultLevels[0]; // Default to first level
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setFeedbackVisible(false);
    } else if (!assessmentComplete) {
      setAssessmentComplete(true);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setSelectedAnswer(answers[currentQuestionIndex - 1] || null);
      setFeedbackVisible(false);
    }
  };

  // Animation classes for the card
  const getAnimationClass = () => {
    if (feedbackVisible) {
      return isCorrect ? 'animate-success' : 'animate-error';
    }
    return 'animate-in fade-in duration-500';
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-10 px-4 bg-gradient-to-b from-blue-50 to-purple-100">
      <div className="w-full max-w-4xl">
        {!assessmentComplete ? (
          <>
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold tracking-tight mb-2">Cognitive Assessment</h1>
              <p className="text-muted-foreground">
                Answer the questions below to help us personalize your learning experience.
              </p>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Question {currentQuestionIndex + 1} of {totalQuestions}</span>
                <span className="font-medium">Score: {score}/{getTotalPossiblePoints()}</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            
            <Card className={`border-2 shadow-lg overflow-hidden transition-all ${getAnimationClass()} ${feedbackVisible ? (isCorrect ? 'border-green-400' : 'border-red-400') : 'border-border'}`}>
              <CardHeader className="bg-gradient-to-r from-blue-100 to-purple-100 pb-2">
                <div className="flex justify-between items-center">
                  <span className="bg-primary text-white text-xs px-3 py-1 rounded-full">
                    {currentQuestion.category}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    {currentQuestion.points} {currentQuestion.points === 1 ? 'point' : 'points'}
                  </span>
                </div>
                <CardTitle className="text-xl mt-2">{currentQuestion.question}</CardTitle>
              </CardHeader>
              
              <CardContent className="p-6">
                {currentQuestion.image && (
                  <div className="mb-6 flex justify-center">
                    <img 
                      src={currentQuestion.image} 
                      alt={currentQuestion.category} 
                      className="rounded-lg max-h-48 object-cover w-full h-48 border bg-white p-2"
                    />
                  </div>
                )}
                
                <div className="grid grid-cols-1 gap-3">
                  {currentQuestion.options.map((option, index) => (
                    <Button
                      key={index}
                      variant={selectedAnswer === option ? "default" : "outline"}
                      className={`justify-start h-auto py-3 px-4 text-left transition-all hover:bg-primary/10 hover:text-primary-foreground
                        ${selectedAnswer === option ? 'bg-primary text-primary-foreground' : ''}
                        ${feedbackVisible && option === currentQuestion.answer ? 'bg-green-500 text-white border-green-500' : ''}
                        ${feedbackVisible && selectedAnswer === option && option !== currentQuestion.answer ? 'bg-red-500 text-white border-red-500' : ''}
                      `}
                      onClick={() => handleOptionSelect(option)}
                      disabled={feedbackVisible}
                    >
                      <div className="flex items-center w-full">
                        <div className="mr-3 flex-shrink-0">
                          {currentQuestion.optionImages && currentQuestion.optionImages[index] && (
                            <img 
                              src={currentQuestion.optionImages[index]} 
                              alt={option}
                              className="w-10 h-10 object-cover rounded-full border border-current"
                            />
                          )}
                          {(!currentQuestion.optionImages || !currentQuestion.optionImages[index]) && (
                            <div className="w-6 h-6 rounded-full flex items-center justify-center border border-current">
                              {selectedAnswer === option && !feedbackVisible && (
                                <Check className="h-4 w-4" />
                              )}
                              {feedbackVisible && option === currentQuestion.answer && (
                                <Check className="h-4 w-4" />
                              )}
                              {feedbackVisible && selectedAnswer === option && option !== currentQuestion.answer && (
                                <X className="h-4 w-4" />
                              )}
                            </div>
                          )}
                        </div>
                        <span>{option}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between pt-2 pb-4 px-6 border-t bg-secondary/30">
                <Button
                  variant="outline"
                  onClick={handlePrevQuestion}
                  disabled={currentQuestionIndex === 0 || feedbackVisible}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                </Button>
                <Button
                  variant="outline"
                  onClick={handleNextQuestion}
                  disabled={!selectedAnswer || feedbackVisible}
                >
                  {currentQuestionIndex < totalQuestions - 1 ? (
                    <>Next <ChevronRight className="ml-2 h-4 w-4" /></>
                  ) : (
                    <>Complete <Check className="ml-2 h-4 w-4" /></>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </>
        ) : (
          // Results screen
          <div className="animate-in slide-in-from-bottom duration-700">
            <Card className="border-2 shadow-xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-indigo-100 to-purple-100 text-center">
                <div className="mx-auto mb-4 rounded-full bg-primary/10 p-3 w-16 h-16 flex items-center justify-center">
                  <Trophy className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Assessment Complete!</CardTitle>
                <CardDescription>
                  Thanks for completing the cognitive assessment
                </CardDescription>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="mb-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">Your Score:</span>
                    <span className="text-2xl font-bold">{score}/{getTotalPossiblePoints()}</span>
                  </div>
                  
                  <Progress 
                    value={(score / getTotalPossiblePoints()) * 100} 
                    className={`h-3 ${getCurrentResultLevel().color}`} 
                  />
                </div>
                
                <div className="p-4 rounded-lg bg-secondary mb-6">
                  <h3 className="font-bold text-lg mb-2">{getCurrentResultLevel().title}</h3>
                  <p className="text-muted-foreground mb-4">{getCurrentResultLevel().description}</p>
                  <div className="bg-primary/10 p-3 rounded-md">
                    <h4 className="font-semibold mb-1 flex items-center">
                      <Brain className="h-4 w-4 mr-2" />
                      Recommendation
                    </h4>
                    <p className="text-sm">{getCurrentResultLevel().recommendation}</p>
                  </div>
                </div>
                
                <div className="text-center">
                  <h3 className="font-medium text-lg mb-2">Your Personalized Learning Journey</h3>
                  <p className="text-muted-foreground mb-6">
                    Based on your assessment, we've customized your learning experience. 
                    You'll find tailored resources and exercises that match your cognitive profile.
                  </p>
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-center gap-4 pt-2 pb-6 border-t">
                <Button asChild>
                  <Link to="/learning" className="flex items-center">
                    <Book className="mr-2 h-4 w-4" />
                    Start Learning
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/support" className="flex items-center">
                    <Cat className="mr-2 h-4 w-4" />
                    Meet Your Companion
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default MMSEAssessment;
