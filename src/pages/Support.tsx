
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import VirtualCompanion from '@/components/support/VirtualCompanion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Brain, Sparkles, Cat, Dog, Rabbit } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Support = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              AI Emotional Support Companions
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your virtual learning companions provide emotional support, motivation, 
              and guidance throughout your learning journey.
            </p>
          </div>
          
          <Tabs defaultValue="companions" className="mb-12">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="companions">Companion Gallery</TabsTrigger>
              <TabsTrigger value="benefits">Benefits</TabsTrigger>
            </TabsList>
            
            <TabsContent value="companions" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="shadow-soft border-border hover:border-primary/20 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                        <Cat className="h-10 w-10 text-primary" />
                      </div>
                    </div>
                    <CardTitle className="text-center">Luna</CardTitle>
                    <CardDescription className="text-center">
                      Calm & Patient
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm text-muted-foreground mb-4">
                      Luna is a calming presence who helps with stress management and provides gentle guidance.
                    </p>
                    <Button variant="outline" className="w-full">
                      Select Luna
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="shadow-soft border-border hover:border-primary/20 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                        <Dog className="h-10 w-10 text-primary" />
                      </div>
                    </div>
                    <CardTitle className="text-center">Spark</CardTitle>
                    <CardDescription className="text-center">
                      Energetic & Motivating
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm text-muted-foreground mb-4">
                      Spark brings energy and motivation when you need a boost to stay engaged with your learning.
                    </p>
                    <Button variant="outline" className="w-full">
                      Select Spark
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="shadow-soft border-border hover:border-primary/20 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                        <Rabbit className="h-10 w-10 text-primary" />
                      </div>
                    </div>
                    <CardTitle className="text-center">Echo</CardTitle>
                    <CardDescription className="text-center">
                      Wise & Thoughtful
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm text-muted-foreground mb-4">
                      Echo offers analytical insights and helps break down complex topics into manageable pieces.
                    </p>
                    <Button variant="outline" className="w-full">
                      Select Echo
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="benefits" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="shadow-soft border-border">
                  <CardHeader>
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <Heart className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <CardTitle className="text-center">Emotional Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Provides encouragement during challenging tasks</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Helps manage learning-related anxiety</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Creates a judgment-free learning environment</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="shadow-soft border-border">
                  <CardHeader>
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <Brain className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <CardTitle className="text-center">Learning Assistance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Suggests personalized learning strategies</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Provides clarification on complex topics</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Adapts explanations to your learning style</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="shadow-soft border-border">
                  <CardHeader>
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <Sparkles className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <CardTitle className="text-center">Motivation & Growth</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Celebrates achievements and progress</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Helps establish and maintain learning routines</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>Builds confidence through positive reinforcement</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mx-auto max-w-lg p-6 bg-secondary/50 rounded-xl text-center">
            <h3 className="text-xl font-medium mb-3">Get Started with AI Companions</h3>
            <p className="text-muted-foreground mb-4">
              Select a companion that matches your personality and learning needs. 
              Your companion will be available to chat with at any time.
            </p>
            <Button>Explore Companions</Button>
          </div>
        </div>
      </main>
      <Footer />
      <VirtualCompanion />
    </div>
  );
};

export default Support;
