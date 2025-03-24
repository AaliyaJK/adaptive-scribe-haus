
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FocusTools from '@/components/tools/FocusTools';

const Tools = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Focus-Enhancing Tools
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Specialized tools designed to help neurodivergent learners maintain focus,
              manage time effectively, and create optimal learning environments.
            </p>
          </div>
          
          <FocusTools />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Tools;
