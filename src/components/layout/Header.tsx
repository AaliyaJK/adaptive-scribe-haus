
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Assessment', href: '/assessment' },
    { name: 'Learning', href: '/learning' },
    { name: 'Support', href: '/support' },
    { name: 'Focus Tools', href: '/tools' },
    { name: 'Writing Help', href: '/writing' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-3 bg-white/90 backdrop-blur-md shadow-sm' : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group">
          <Brain className="h-8 w-8 text-primary group-hover:text-primary/80 transition-all duration-300" />
          <div className="flex flex-col">
            <span className="text-xl font-heading font-bold text-foreground">NeuroLearn</span>
            <span className="text-xs text-muted-foreground">where learning goes beyond limits</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`text-sm font-medium transition-all duration-300 hover:text-primary relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-primary after:w-full after:origin-bottom-right after:scale-x-0 hover:after:scale-x-100 hover:after:origin-bottom-left after:transition-transform after:duration-300 ${
                location.pathname === item.href
                  ? 'text-primary after:scale-x-100'
                  : 'text-foreground/80'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            className="text-foreground hover:text-primary transition-colors"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-border animate-slide-down">
          <div className="container mx-auto py-4 px-4 flex flex-col space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`py-2 text-base font-medium transition-all duration-300 hover:text-primary ${
                  location.pathname === item.href
                    ? 'text-primary'
                    : 'text-foreground/80'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
