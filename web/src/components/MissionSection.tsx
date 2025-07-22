import { Card } from '@/components/ui/card';
import { Quote } from 'lucide-react';
// Using Unsplash images instead of local assets
const restfulSleepImage = "https://images.unsplash.com/photo-1493612276216-ee3925520721?w=800&h=600&fit=crop";
const researchImage = "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=600&fit=crop";

const MissionSection = () => {

  return (
    <section id="mission" className="py-20 bg-gradient-section">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-primary mb-6">
            Our Mission & Vision
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Oneria works to improve sleep health through systematic change. We use advocacy, research, 
            and targeted outreach to address the root causes of poor sleep, creating lasting improvements 
            in public health outcomes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="space-y-8">
            <div className="animate-fade-in">
              <img 
                src={restfulSleepImage} 
                alt="Sunrise over mountains representing a fresh start with quality sleep"
                className="w-full h-80 object-cover rounded-2xl shadow-soft"
              />
              <div className="mt-6 p-6 bg-card rounded-xl shadow-gentle">
                <h3 className="text-2xl font-serif font-semibold text-primary mb-3">
                  Quality Sleep, Better Life
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Quality sleep is the foundation of health and wellbeing. We're dedicated to helping everyone 
                  achieve restorative rest that leads to more productive, fulfilling, and healthy lives.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="animate-fade-in" style={{ animationDelay:'0.2s' }}>
              <img 
                src={researchImage} 
                alt="Researchers analyzing sleep data and charts representing evidence-based approach"
                className="w-full h-80 object-cover rounded-2xl shadow-soft"
              />
              <div className="mt-6 p-6 bg-card rounded-xl shadow-gentle">
                <h3 className="text-2xl font-serif font-semibold text-primary mb-3">
                  Impact-Driven Research & Advocacy
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  We're committed to creating real change through targeted advocacy and research. By working with 
                  policymakers and institutions, we drive meaningful policy changes that improve sleep health for all.
                </p>
              </div>
            </div>
          </div>
        </div>



      </div>
    </section>
  );
};

export default MissionSection;