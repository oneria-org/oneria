import { Card } from '@/components/ui/card';

const SleepStatsSection = () => {
  const stats = [
    { number: '1 in 3', label: 'Adults suffer from insomnia symptoms' },
    { number: '50-70M', label: 'Americans have chronic sleep disorders' },
    { number: '26%', label: 'Increase in cognitive performance with proper sleep' },
    { number: '35%', label: 'Of children have inadequate sleep habits' },
  ];

  return (
    <section id="why-sleep-matters" className="py-20 bg-gradient-section">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-primary mb-6">
            Why Sleep Matters
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Sleep is vital to health, affecting cognitive function and emotional wellbeing. 
            These statistics show why our work matters.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className="p-6 text-center bg-card shadow-gentle hover:shadow-soft transition-shadow duration-300 animate-fade-in" 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-3xl lg:text-4xl font-bold text-community-warm mb-2">
                {stat.number}
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {stat.label}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SleepStatsSection;