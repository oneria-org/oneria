import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, Megaphone, Search, ArrowRight } from 'lucide-react';

const WhatWeDoSection = () => {
  const services = [
    {
      icon: Megaphone,
      title: 'Advocacy',
      description: 'Working with representatives and institutions to create policy changes that support sleep health.',
      image: 'https://images.unsplash.com/photo-1523292562811-8fa7962a78c8?w=400&h=250&fit=crop',
      details: 'Partnering with lawmakers, school boards, and employers to implement sleep-friendly policies.',
    },
    {
      icon: Search,
      title: 'Research',
      description: 'Conducting studies to understand sleep challenges and develop evidence-based solutions.',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=250&fit=crop',
      details: 'Collaborating with universities and health institutions on sleep health research.',
    },
    {
      icon: Users,
      title: 'Outreach',
      description: 'Bringing sleep health education directly to schools, workplaces, and communities.',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=250&fit=crop',
      details: 'Educational presentations, workshops, and training programs for educators and employers.',
    },
  ];

  return (
    <section id="what-we-do" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-primary mb-6">
            What We Do
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our approach is simple: meet people where they are, provide what they need, 
            and create lasting change through community connection.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className="group overflow-hidden bg-card shadow-gentle hover:shadow-warm transition-all duration-500 hover:scale-105 animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={service.image}
                    alt={service.title === 'Advocacy' ? "Capitol building representing advocacy for sleep health policies" : `People engaged in ${service.title.toLowerCase()} activities for sleep health`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <div className="bg-white/90 p-3 rounded-full shadow-soft">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-serif font-semibold text-primary mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <p className="text-sm text-muted-foreground/80 mb-6 leading-relaxed">
                    {service.details}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

        <div id="partner-with-oneria" className="mt-16 pt-8 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <div className="bg-card rounded-2xl p-8 md:p-12 shadow-gentle border border-border/50">
            <h3 className="text-3xl font-serif font-semibold text-primary mb-6 text-center">
              Partner With Oneria
            </h3>
            
            <div className="grid md:grid-cols-12 gap-8">
              <div className="md:col-span-5 flex flex-col items-center justify-center">
                <p className="text-lg text-muted-foreground mb-4 leading-relaxed text-center">
                We collaborate with researchers, policymakers, educators, and community leaders to develop evidence-based approaches that address sleep health disparities and promote well-being for all.
                </p>
                <Button variant="default" size="lg" className="mt-2">
                  <a href="mailto:info.oneria@gmail.com">Contact Us</a>
                </Button>
              </div>
              
              <div className="md:col-span-7 grid md:grid-cols-2 gap-6">
                <div className="bg-background p-6 rounded-lg border border-border/50">
                  <h4 className="text-xl font-serif font-semibold text-primary mb-3">
                    Research
                  </h4>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Collaborate on sleep health studies and evidence-based solutions.
                  </p>
                </div>
                
                <div className="bg-background p-6 rounded-lg border border-border/50">
                  <h4 className="text-xl font-serif font-semibold text-primary mb-3">
                    Advocacy
                  </h4>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Support policy changes for better sleep health in communities.
                  </p>
                </div>
                
                <div className="bg-background p-6 rounded-lg border border-border/50">
                  <h4 className="text-xl font-serif font-semibold text-primary mb-3">
                    Education
                  </h4>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Bring sleep health workshops to your school or organization.
                  </p>
                </div>
                
                <div className="bg-background p-6 rounded-lg border border-border/50">
                  <h4 className="text-xl font-serif font-semibold text-primary mb-3">
                    Community
                  </h4>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    Join our network of sleep health advocates and supporters.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoSection;