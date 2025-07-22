import { Button } from '@/components/ui/button';
import { ArrowRight, Heart, Moon } from 'lucide-react';
import heroImage from '@/assets/hero-sleep.jpg';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero">
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Peaceful sleep scene with diverse community members resting peacefully"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-60"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="animate-fade-in-slow">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-semibold text-white mb-6 leading-tight">
              Dream Better.{' '}
              <span className="text-sleep-dawn">Live Brighter.</span>
            </h1>
          </div>

          <div className="animate-fade-in-slow" style={{ animationDelay: '0.3s' }}>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed font-light">
              Oneria is an organization dedicated to improving sleep health through evidence-based research, 
              strategic advocacy, and targeted outreach. We work with institutions, policymakers, and communities 
              to create systemic changes that promote better sleep for all.
            </p>
          </div>

          <div className="animate-fade-in-slow flex flex-col sm:flex-row gap-4 justify-center items-center" style={{ animationDelay: '0.6s' }}>
            <Button variant="warm" size="lg" className="group">
              <a href="mailto:info.oneria@gmail.com">Contact Us</a>
            </Button>
          </div>

          <div className="absolute top-20 left-10 hidden lg:block">
            <div className="w-20 h-20 bg-sleep-stars/20 rounded-full animate-gentle-bounce" style={{ animationDelay: '2s' }}></div>
          </div>
          <div className="absolute bottom-32 right-16 hidden lg:block">
            <div className="w-16 h-16 bg-community-warm/20 rounded-full animate-gentle-bounce" style={{ animationDelay: '4s' }}></div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;