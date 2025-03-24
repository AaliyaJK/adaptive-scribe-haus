
import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <Brain className="h-7 w-7 text-primary" />
              <span className="text-lg font-heading font-semibold">AdaptiveScribe</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              AI-powered learning platform personalized for neurodivergent learners.
            </p>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-medium text-base mb-4">Platform</h3>
            <ul className="space-y-2">
              <li><Link to="/assessment" className="text-sm text-muted-foreground hover:text-primary transition-colors">Assessment</Link></li>
              <li><Link to="/learning" className="text-sm text-muted-foreground hover:text-primary transition-colors">Learning</Link></li>
              <li><Link to="/support" className="text-sm text-muted-foreground hover:text-primary transition-colors">Support</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-medium text-base mb-4">Tools</h3>
            <ul className="space-y-2">
              <li><Link to="/tools" className="text-sm text-muted-foreground hover:text-primary transition-colors">Focus Tools</Link></li>
              <li><Link to="/writing" className="text-sm text-muted-foreground hover:text-primary transition-colors">Writing Help</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-medium text-base mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Accessibility</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-10 pt-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground">
            © {currentYear} AdaptiveScribe. All rights reserved.
          </p>
          <div className="flex items-center mt-4 md:mt-0">
            <p className="text-sm text-muted-foreground flex items-center">
              Made with <Heart className="h-4 w-4 text-red-500 mx-1" /> for neurodivergent learners
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
