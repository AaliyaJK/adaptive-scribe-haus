
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AdaptiveContent from '@/components/learning/AdaptiveContent';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart, TrendingUp, Brain } from 'lucide-react';

const Learning = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Your Adaptive Learning Path
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Content that adapts to your unique cognitive style, making learning more 
              accessible and enjoyable for neurodivergent minds.
            </p>
          </div>
          
          {/* Learning Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-white shadow-soft border-border">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-lg mr-4">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm mb-1">Learning Progress</p>
                    <h3 className="text-2xl font-bold">32%</h3>
                    <p className="text-xs text-muted-foreground mt-1">+5% from last week</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-soft border-border">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-lg mr-4">
                    <BarChart className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm mb-1">Focus Sessions</p>
                    <h3 className="text-2xl font-bold">7</h3>
                    <p className="text-xs text-muted-foreground mt-1">This week</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-soft border-border">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-lg mr-4">
                    <Brain className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm mb-1">Learning Style</p>
                    <h3 className="text-lg font-bold">Visual-Kinesthetic</h3>
                    <p className="text-xs text-muted-foreground mt-1">Based on your assessment</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <AdaptiveContent />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Learning;
