import { Button } from '@/components/ui/button';
import { Heart, Mail, Instagram, Moon, Star } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'Mission', href: '#mission' },
    { name: 'Why Sleep Matters', href: '#why-sleep-matters' },
    { name: 'What We Do', href: '#what-we-do' },
    { name: 'Get Involved', href: '#partner-with-oneria' },
  ];

  const resources = [
    { name: 'Research', href: '#what-we-do' },
    { name: 'Advocacy', href: '#what-we-do' },
    { name: 'Educational Outreach', href: '#what-we-do' },
    { name: 'Donate', href: 'https://hcb.hackclub.com/donations/start/oneria', target: '_blank' },
  ];

  return (
    <footer className="bg-gradient-night text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10">
          <Star className="h-4 w-4 text-sleep-stars animate-gentle-bounce" style={{ animationDelay: '0s' }} />
        </div>
        <div className="absolute top-20 right-20">
          <Star className="h-3 w-3 text-sleep-stars animate-gentle-bounce" style={{ animationDelay: '2s' }} />
        </div>
        <div className="absolute bottom-32 left-1/4">
          <Star className="h-2 w-2 text-sleep-stars animate-gentle-bounce" style={{ animationDelay: '4s' }} />
        </div>
        <div className="absolute bottom-20 right-1/3">
          <Star className="h-3 w-3 text-sleep-stars animate-gentle-bounce" style={{ animationDelay: '6s' }} />
        </div>
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center mb-6">
                <Moon className="h-8 w-8 text-sleep-dawn mr-3" />
                <div>
                  <h3 className="text-2xl font-serif font-semibold">Oneria</h3>
                  <p className="text-sm text-white/70">Sleep Health Community</p>
                </div>
              </div>
              <p className="text-white/90 leading-relaxed mb-6 max-w-md">
                Creating a world where quality sleep is accessible to everyone. 
                Join our community of dreamers working toward brighter, well-rested days.
              </p>
              
              <div className="flex space-x-4">
                <a 
                  href="https://instagram.com/oneriaorg" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-sleep-dawn transition-colors duration-200"
                >
                  <Instagram className="h-6 w-6" />
                  <span className="sr-only">Follow us on Instagram</span>
                </a>
                <a 
                  href="mailto:info.oneria@gmail.com"
                  className="text-white/70 hover:text-sleep-dawn transition-colors duration-200"
                >
                  <Mail className="h-6 w-6" />
                  <span className="sr-only">Email us</span>
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-4">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href} 
                      className="text-white/80 hover:text-sleep-dawn transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-4">Resources</h4>
              <ul className="space-y-3">
                {resources.map((resource) => (
                  <li key={resource.name}>
                    <a 
                      href={resource.href} 
                      className="text-white/80 hover:text-sleep-dawn transition-colors duration-200 text-sm"
                      {...(resource.target ? { target: resource.target, rel: "noopener noreferrer" } : {})}
                    >
                      {resource.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-white/60">
              <div className="mb-4 md:mb-0">
                <p className="flex items-center">
                  © 2025 Oneria. Made with{' '}
                  <Heart className="h-4 w-4 mx-1 text-community-warm" />{' '}
                  for better sleep.
                </p>
              </div>
              <div>
                <span className="text-white/40">
                  501(c)(3) Nonprofit Organization
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;