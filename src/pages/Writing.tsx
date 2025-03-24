
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WritingAssistance from '@/components/writing/WritingAssistance';

const Writing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Writing & Text Assistance
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              AI-powered tools to help with writing, reading, and text processing,
              especially designed for learners with dyslexia and other text-related challenges.
            </p>
          </div>
          
          <WritingAssistance />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Writing;
