
import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, ArrowRight, BookOpen, Sparkles, PenTool, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-4 md:pt-40 md:pb-32 overflow-hidden bg-gradient-to-br from-background to-secondary/30">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="w-full lg:w-1/2 space-y-6 animate-fade-in">
            <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-2 animate-pulse-slow">
              <Brain className="mr-1 h-4 w-4" />
              <span>AI-Powered Learning</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight text-foreground">
              <span className="text-primary">NeuroLearn</span>: Where Learning Goes <span className="text-gradient bg-gradient-to-r from-primary to-teal-500">Beyond Limits</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
              An adaptive learning platform that understands and responds to the unique needs of neurodivergent learners.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button className="bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 transition-all" asChild>
                <Link to="/assessment">
                  Start Assessment <ArrowRight className="ml-2 h-4 w-4 animate-pulse-slow" />
                </Link>
              </Button>
              <Button variant="outline" className="border-primary/30 hover:bg-primary/5" asChild>
                <Link to="/learning">
                  Explore Learning Paths
                </Link>
              </Button>
            </div>
            
            <div className="pt-6 flex items-center space-x-4">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-teal-400 flex items-center justify-center text-white text-xs shadow-md">MK</div>
                <div className="w-8 h-8 rounded-full bg-mint-500 flex items-center justify-center text-white text-xs shadow-md">JD</div>
                <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-white text-xs shadow-md">AR</div>
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">500+</span> neurodivergent learners helped
              </p>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/5 rounded-full filter blur-3xl"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-teal-400/10 rounded-full filter blur-3xl"></div>
              
              <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 shadow-soft-lg border border-white/20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="feature-card bg-white/5 p-5 rounded-xl hover:bg-white/10 transition-all hover:scale-105 cursor-pointer border border-white/10 shadow-md animate-fade-in" style={{ animationDelay: '0.3s' }}>
                    <BookOpen className="h-6 w-6 text-primary mb-3" />
                    <h3 className="text-lg font-medium mb-2">Adaptive Learning</h3>
                    <p className="text-sm text-muted-foreground">Content that adapts to your unique learning style.</p>
                  </div>
                  
                  <div className="feature-card bg-white/5 p-5 rounded-xl hover:bg-white/10 transition-all hover:scale-105 cursor-pointer border border-white/10 shadow-md animate-fade-in" style={{ animationDelay: '0.4s' }}>
                    <Sparkles className="h-6 w-6 text-primary mb-3" />
                    <h3 className="text-lg font-medium mb-2">AI Assessment</h3>
                    <p className="text-sm text-muted-foreground">Understand your cognitive strengths and preferences.</p>
                  </div>
                  
                  <div className="feature-card bg-white/5 p-5 rounded-xl hover:bg-white/10 transition-all hover:scale-105 cursor-pointer border border-white/10 shadow-md animate-fade-in" style={{ animationDelay: '0.5s' }}>
                    <PenTool className="h-6 w-6 text-primary mb-3" />
                    <h3 className="text-lg font-medium mb-2">Writing Support</h3>
                    <p className="text-sm text-muted-foreground">Real-time assistance for dyslexic users.</p>
                  </div>
                  
                  <div className="feature-card bg-white/5 p-5 rounded-xl hover:bg-white/10 transition-all hover:scale-105 cursor-pointer border border-white/10 shadow-md animate-fade-in" style={{ animationDelay: '0.6s' }}>
                    <Brain className="h-6 w-6 text-primary mb-3" />
                    <h3 className="text-lg font-medium mb-2">Virtual Support</h3>
                    <p className="text-sm text-muted-foreground">Emotional and focus assistance when you need it.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
