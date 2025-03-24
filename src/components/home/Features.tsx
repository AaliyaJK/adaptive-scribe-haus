
import React from 'react';
import { 
  Brain, 
  BookOpen, 
  PenTool, 
  Clock, 
  VolumeX, 
  Volume, 
  ArrowRight, 
  ScanText, 
  Mic,
  Sparkles,
  Cat
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Features = () => {
  const features = [
    {
      title: "AI Assessment",
      description: "Personalized assessments that analyze your cognitive abilities and learning style preferences.",
      icon: <Brain className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-xl" />,
      link: "/assessment"
    },
    {
      title: "Adaptive Learning",
      description: "Content that adjusts in real-time based on your interaction patterns and preferences.",
      icon: <BookOpen className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-xl" />,
      link: "/learning"
    },
    {
      title: "Virtual Companion",
      description: "AI-driven companions providing emotional support throughout your learning journey.",
      icon: <Cat className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-xl" />,
      link: "/support"
    },
    {
      title: "Focus Tools",
      description: "Specialized tools to enhance focus and manage attention for ADHD learners.",
      icon: <Clock className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-xl" />,
      link: "/tools"
    },
    {
      title: "Sound Environment",
      description: "Customizable audio environments to create the perfect study atmosphere.",
      icon: <Volume className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-xl" />,
      link: "/tools"
    },
    {
      title: "Mindfulness Breaks",
      description: "Guided mindfulness exercises to reduce stress and improve focus.",
      icon: <Sparkles className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-xl" />,
      link: "/tools"
    },
    {
      title: "Text Assistance",
      description: "AI-powered writing help with real-time spelling and grammar suggestions.",
      icon: <ScanText className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-xl" />,
      link: "/writing"
    },
    {
      title: "Speech-to-Text",
      description: "Convert your spoken words to text for easier content creation.",
      icon: <Mic className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-xl" />,
      link: "/writing"
    },
  ];

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tight">
            Features Designed for Neurodivergent Minds
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our platform offers specialized tools to support different cognitive styles, 
            making learning more accessible and enjoyable.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="bg-white rounded-2xl p-6 transition-all duration-300 hover:shadow-soft border border-border hover:border-primary/20 animate-in"
              style={{ animationDelay: `${0.1 * (index + 1)}s` }}
            >
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
              <p className="text-muted-foreground mb-4">{feature.description}</p>
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary/90 hover:bg-primary/5 p-0 h-auto" asChild>
                <Link to={feature.link}>
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Button size="lg" className="btn-primary" asChild>
            <Link to="/assessment">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Features;
