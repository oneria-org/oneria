import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Moon, Sun } from 'lucide-react';

const scrollToSection = (e, id) => {
  e.preventDefault();
  const element = document.getElementById(id);
  if (element) {
    window.scrollTo({
      behavior: 'smooth',
      top: element.offsetTop - 80
    });
  }
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [donateHovered, setDonateHovered] = useState(false);
  const joinBtnRef = useRef(null);
  const donateBtnRef = useRef(null);
  const mobileBtnsRef = useRef(null);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = scrollTop / docHeight;
      setScrollPercent(scrollPercentage);
      
      if (joinBtnRef.current && donateBtnRef.current && mobileBtnsRef.current) {
        const h = 20 - (scrollPercentage * (20 - 245));
        const s = 40 - (scrollPercentage * (40 - 25));
        const l = 70 - (scrollPercentage * (70 - 45));
        
        const color = `hsl(${h}, ${s}%, ${l}%)`;
        joinBtnRef.current.style.backgroundColor = color;
        donateBtnRef.current.style.backgroundColor = color;
        
        const mobileButtons = mobileBtnsRef.current.querySelectorAll('button');
        mobileButtons.forEach(btn => {
          btn.style.backgroundColor = color;
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Mission', href: '#mission' },
    { name: 'Why', href: '#why-sleep-matters' },
    { name: 'What We Do', href: '#what-we-do' },
    { name: 'Get Involved', href: '#partner-with-oneria' },
  ];

  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50 shadow-gentle">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-serif font-semibold text-primary">
                Oneria
              </h1>
              <p className="text-xs text-muted-foreground -mt-1">
                Sleep Health Community
              </p>
            </div>
          </div>

          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href.substring(1))}
                  className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-accent/50"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </nav>

          <div className="hidden md:block space-x-2">
            <Button 
              ref={joinBtnRef}
              className="text-white border-none transition-none" 
              size="sm"
              onClick={(e) => scrollToSection(e, 'partner-with-oneria')}
              style={{ backgroundColor: 'hsl(20, 40%, 70%)' }}
            >
              <a href="#partner-with-oneria">Join Us</a>
            </Button>
            <Button 
              ref={donateBtnRef}
              className="text-white border-none transition-none" 
              size="sm"
              onMouseEnter={() => setDonateHovered(true)}
              onMouseLeave={() => setDonateHovered(false)}
              style={{ backgroundColor: 'hsl(20, 40%, 70%)' }}
            >
              <a href="https://hcb.hackclub.com/donations/start/oneria" target="_blank" rel="noopener noreferrer">
                {donateHovered ? "$1k+ raised" : "Donate"}
              </a>
            </Button>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-card/95 backdrop-blur-sm border-t border-border mt-4 rounded-lg shadow-gentle">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 hover:bg-accent/50"
                  onClick={(e) => {
                    scrollToSection(e, item.href.substring(1));
                    setIsMenuOpen(false);
                  }}
                >
                  {item.name}
                </a>
              ))}
              <div ref={mobileBtnsRef} className="pt-4 pb-2 space-y-2">
                <Button 
                  className="w-full text-white border-none transition-none"
                  onClick={(e) => {
                    scrollToSection(e, 'partner-with-oneria');
                    setIsMenuOpen(false);
                  }}
                  style={{ backgroundColor: 'hsl(20, 40%, 70%)' }}
                >
                  <a href="#partner-with-oneria">Join Us</a>
                </Button>
                <Button 
                  className="w-full text-white border-none transition-none"
                  onMouseEnter={() => setDonateHovered(true)}
                  onMouseLeave={() => setDonateHovered(false)}
                  style={{ backgroundColor: 'hsl(20, 40%, 70%)' }}
                >
                  <a href="https://hcb.hackclub.com/donations/start/oneria" target="_blank" rel="noopener noreferrer">
                    {donateHovered ? "$1k+ raised" : "Donate"}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;