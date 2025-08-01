import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import MissionSection from '@/components/MissionSection';
import SleepStatsSection from '@/components/SleepStatsSection';
import WhatWeDoSection from '@/components/WhatWeDoSection';
import Footer from '@/components/Footer';
import { AppLink } from '@/components/AppLink';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <div className="container mx-auto px-4 py-8">
          <AppLink />
        </div>
        <MissionSection />
        <SleepStatsSection />
        <WhatWeDoSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
