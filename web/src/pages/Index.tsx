import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import MissionSection from '@/components/MissionSection';
import SleepStatsSection from '@/components/SleepStatsSection';
import WhatWeDoSection from '@/components/WhatWeDoSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <MissionSection />
        <SleepStatsSection />
        <WhatWeDoSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
