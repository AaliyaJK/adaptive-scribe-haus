
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MMSEAssessment from '@/components/assessment/MMSEAssessment';

const Assessment = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto py-12 px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-block mb-4">
              <div className="h-16 w-16 mx-auto bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg animate-pulse-slow">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent animate-pulse-slow">
              Cognitive Assessment
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Complete our interactive assessment to help us understand your cognitive strengths and areas where support might be beneficial.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Memory</div>
              <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">Attention</div>
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Language</div>
              <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">Orientation</div>
              <div className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-medium">Visual-Spatial</div>
            </div>
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg inline-block mb-8">
              <div className="flex items-center text-blue-700 text-sm">
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                </svg>
                This assessment helps create a personalized learning journey based on your specific needs.
              </div>
            </div>
          </div>
          
          <div className="assessment-card animate-fade-in">
            <MMSEAssessment />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Assessment;
