
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />
      <main className="flex-grow pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text animate-pulse-slow">
              Virtual Pet Therapy Companions
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your interactive virtual pet provides emotional support, comfort, and 
              a playful way to manage stress during your learning journey.
            </p>
          </div>
          
          <Tabs defaultValue="companions" className="mb-12">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 bg-white/50 p-1 rounded-full">
              <TabsTrigger value="companions" className="rounded-full">Pet Gallery</TabsTrigger>
              <TabsTrigger value="benefits" className="rounded-full">Benefits</TabsTrigger>
            </TabsList>
            
            <TabsContent value="companions" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="shadow-xl border-2 border-purple-200 hover:border-purple-300 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                  <div className="h-40 bg-gradient-to-r from-purple-200 to-indigo-200 flex items-center justify-center overflow-hidden">
                    <div className="h-32 w-32 flex items-center justify-center">
                      <Cat className="h-24 w-24 text-purple-600 animate-float" />
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-center text-purple-700">Luna</CardTitle>
                    <CardDescription className="text-center">
                      Calm & Patient
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm text-muted-foreground mb-4">
                      Luna is a calming presence who helps with stress management and provides gentle guidance.
                    </p>
                    <Button variant="outline" className="w-full bg-gradient-to-r from-purple-100 to-indigo-100 hover:from-purple-200 hover:to-indigo-200 rounded-full border-purple-200">
                      Select Luna
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="shadow-xl border-2 border-orange-200 hover:border-orange-300 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                  <div className="h-40 bg-gradient-to-r from-orange-200 to-amber-200 flex items-center justify-center overflow-hidden">
                    <div className="h-32 w-32 flex items-center justify-center">
                      <Dog className="h-24 w-24 text-orange-600 animate-float" />
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-center text-orange-700">Buddy</CardTitle>
                    <CardDescription className="text-center">
                      Energetic & Motivating
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm text-muted-foreground mb-4">
                      Buddy brings energy and motivation when you need a boost to stay engaged with your learning.
                    </p>
                    <Button variant="outline" className="w-full bg-gradient-to-r from-orange-100 to-amber-100 hover:from-orange-200 hover:to-amber-200 rounded-full border-orange-200">
                      Select Buddy
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="shadow-xl border-2 border-green-200 hover:border-green-300 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                  <div className="h-40 bg-gradient-to-r from-green-200 to-teal-200 flex items-center justify-center overflow-hidden">
                    <div className="h-32 w-32 flex items-center justify-center">
                      <Rabbit className="h-24 w-24 text-green-600 animate-float" />
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-center text-green-700">Milo</CardTitle>
                    <CardDescription className="text-center">
                      Wise & Thoughtful
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm text-muted-foreground mb-4">
                      Milo offers analytical insights and helps break down complex topics into manageable pieces.
                    </p>
                    <Button variant="outline" className="w-full bg-gradient-to-r from-green-100 to-teal-100 hover:from-green-200 hover:to-teal-200 rounded-full border-green-200">
                      Select Milo
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="benefits" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="shadow-xl border-2 border-pink-100 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-200 to-rose-200 flex items-center justify-center">
                        <Heart className="h-8 w-8 text-pink-600" />
                      </div>
                    </div>
                    <CardTitle className="text-center text-pink-700">Emotional Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      <li className="flex items-start bg-white/40 p-2 rounded-lg">
                        <span className="text-pink-500 mr-2">•</span>
                        <span>Reduces anxiety and stress through simulated pet therapy</span>
                      </li>
                      <li className="flex items-start bg-white/40 p-2 rounded-lg">
                        <span className="text-pink-500 mr-2">•</span>
                        <span>Provides comfort during challenging learning moments</span>
                      </li>
                      <li className="flex items-start bg-white/40 p-2 rounded-lg">
                        <span className="text-pink-500 mr-2">•</span>
                        <span>Creates a judgment-free learning environment</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="shadow-xl border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-200 to-indigo-200 flex items-center justify-center">
                        <Brain className="h-8 w-8 text-blue-600" />
                      </div>
                    </div>
                    <CardTitle className="text-center text-blue-700">Sensory Stimulation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      <li className="flex items-start bg-white/40 p-2 rounded-lg">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>Interactive visual and auditory engagement</span>
                      </li>
                      <li className="flex items-start bg-white/40 p-2 rounded-lg">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>Provides sensory breaks during intensive learning</span>
                      </li>
                      <li className="flex items-start bg-white/40 p-2 rounded-lg">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>Helps with focus through sensory regulation</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="shadow-xl border-2 border-amber-100 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-200 to-yellow-200 flex items-center justify-center">
                        <Sparkles className="h-8 w-8 text-amber-600" />
                      </div>
                    </div>
                    <CardTitle className="text-center text-amber-700">Motivation & Joy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      <li className="flex items-start bg-white/40 p-2 rounded-lg">
                        <span className="text-amber-500 mr-2">•</span>
                        <span>Adds playful elements to make learning fun</span>
                      </li>
                      <li className="flex items-start bg-white/40 p-2 rounded-lg">
                        <span className="text-amber-500 mr-2">•</span>
                        <span>Rewards progress with pet interactions</span>
                      </li>
                      <li className="flex items-start bg-white/40 p-2 rounded-lg">
                        <span className="text-amber-500 mr-2">•</span>
                        <span>Builds emotional connection through virtual companionship</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mx-auto max-w-lg p-6 bg-white/30 backdrop-blur-sm rounded-xl shadow-xl text-center border-2 border-purple-100">
            <h3 className="text-xl font-medium mb-3 text-primary">Connect with Your Virtual Pet</h3>
            <p className="text-muted-foreground mb-6">
              Select a pet therapy companion that matches your personality and emotional needs. 
              You can talk to them, play with them, and they'll respond just like a real pet would!
            </p>
            <Button className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full shadow-md hover:shadow-lg px-8 py-6 h-auto text-lg">
              <Heart className="h-5 w-5 mr-2 fill-white" />
              Meet Your Companion
            </Button>
          </div>
        </div>
      </main>
      <Footer />
      <VirtualCompanion />
    </div>
  );
};

export default Support;
