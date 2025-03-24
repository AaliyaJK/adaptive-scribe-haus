
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MMSEAssessment from '@/components/assessment/MMSEAssessment';

const Assessment = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <MMSEAssessment />
      </main>
      <Footer />
    </div>
  );
};

export default Assessment;
