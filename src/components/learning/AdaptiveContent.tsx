
import React, { useState } from 'react';
import { 
  BookOpen, 
  ArrowRight, 
  Clock, 
  Star, 
  BarChart, 
  Zap,
  CheckCircle,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const courses = [
  {
    id: 1,
    title: "Mathematics: Visual Fundamentals",
    description: "Math concepts explained through visual metaphors and interactive models.",
    category: "Mathematics",
    level: "Beginner",
    duration: "4 weeks",
    progress: 65,
    modules: [
      { id: 1, title: "Number Visualization", isCompleted: true },
      { id: 2, title: "Spatial Relationships", isCompleted: true },
      { id: 3, title: "Pattern Recognition in Equations", isCompleted: false },
      { id: 4, title: "Visual Problem Solving", isCompleted: false },
    ],
    tags: ["Visual Learning", "Interactive", "Self-paced"]
  },
  {
    id: 2,
    title: "Critical Reading for Dyslexic Learners",
    description: "Strategies for effective reading with dyslexia-friendly text formatting.",
    category: "Language Arts",
    level: "Intermediate",
    duration: "6 weeks",
    progress: 30,
    modules: [
      { id: 1, title: "Reading Fundamentals", isCompleted: true },
      { id: 2, title: "Comprehension Strategies", isCompleted: false },
      { id: 3, title: "Active Reading Techniques", isCompleted: false },
      { id: 4, title: "Text Analysis for Understanding", isCompleted: false },
    ],
    tags: ["Dyslexia-Friendly", "Audio Support", "Interactive"]
  },
  {
    id: 3,
    title: "Focus Mastery for ADHD Minds",
    description: "Techniques to enhance focus and productivity tailored for ADHD learners.",
    category: "Skills Development",
    level: "All Levels",
    duration: "3 weeks",
    progress: 10,
    modules: [
      { id: 1, title: "Understanding Your ADHD Mind", isCompleted: true },
      { id: 2, title: "Environment Optimization", isCompleted: false },
      { id: 3, title: "Task Management Strategies", isCompleted: false },
      { id: 4, title: "Maintaining Long-term Focus", isCompleted: false },
    ],
    tags: ["ADHD Support", "Practical Exercises", "Gamified"]
  },
];

const AdaptiveContent = () => {
  const [activeTab, setActiveTab] = useState("in-progress");
  
  return (
    <div className="w-full">
      <Tabs defaultValue="in-progress" className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="in-progress" onClick={() => setActiveTab("in-progress")}>In Progress</TabsTrigger>
          <TabsTrigger value="recommended" onClick={() => setActiveTab("recommended")}>Recommended</TabsTrigger>
          <TabsTrigger value="completed" onClick={() => setActiveTab("completed")}>Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="in-progress" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="overflow-hidden border-border hover:border-primary/20 transition-all duration-300 animate-scale-in shadow-soft">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-2">
                      <BookOpen className="mr-1 h-3 w-3" />
                      <span>{course.category}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-yellow-500">
                      <Star className="h-4 w-4 fill-yellow-500" />
                      <Star className="h-4 w-4 fill-yellow-500" />
                      <Star className="h-4 w-4 fill-yellow-500" />
                      <Star className="h-4 w-4 fill-yellow-500" />
                      <Star className="h-4 w-4" />
                    </div>
                  </div>
                  
                  <CardTitle className="text-xl font-heading">{course.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <div className="flex items-center">
                      <BarChart className="h-4 w-4 mr-1" />
                      <span>{course.level}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{course.duration}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-1 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-medium">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                  
                  <div className="space-y-2 mt-4">
                    {course.modules.map((module) => (
                      <div key={module.id} className="flex items-center text-sm">
                        {module.isCompleted ? (
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                        ) : (
                          <div className="h-4 w-4 rounded-full border border-muted-foreground/30 mr-2"></div>
                        )}
                        <span className={module.isCompleted ? "text-muted-foreground line-through" : ""}>
                          {module.title}
                        </span>
                        {!module.isCompleted && course.modules.indexOf(module) === course.modules.findIndex(m => !m.isCompleted) && (
                          <div className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                            Next
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
                
                <CardFooter className="bg-secondary/50 pt-4">
                  <Button className="w-full" variant="outline">
                    Continue Learning <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="recommended">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">Personalized Recommendations</h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                Complete your assessment to unlock AI-powered course recommendations tailored to your learning style.
              </p>
              <Button className="btn-primary">View Assessment</Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="completed">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">You're Just Getting Started</h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                Your completed courses will appear here as you progress through the learning paths.
              </p>
              <Button className="btn-primary">Explore Courses</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdaptiveContent;
