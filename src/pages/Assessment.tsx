
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AssessmentTool from '@/components/assessment/AssessmentTool';

const Assessment = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Personalized Learning Assessment
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Complete this short assessment to help us understand your learning style,
              preferences, and needs. We'll use this information to personalize your learning experience.
            </p>
          </div>
          
          <AssessmentTool />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Assessment;
