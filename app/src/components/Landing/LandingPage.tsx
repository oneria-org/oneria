import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Moon, MessageCircle, BarChart3, Clock, Users, Shield } from "lucide-react";
import heroImage from "@/assets/hero-sleep.jpg";

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage = ({ onGetStarted }: LandingPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-secondary">
      <section className="px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
              <Moon className="w-10 h-10 text-primary" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Sleep Better, Study Smarter
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Zeno is your personal sleep wellness companion designed for students. 
            Track your sleep, chat with AI, and build healthier habits—all in under 30 seconds a day.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              variant="gradient" 
              onClick={onGetStarted}
              className="px-8 py-3 text-lg"
            >
              Get Started Free
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-3 text-lg">
              Learn More
            </Button>
          </div>
          
          <div className="relative max-w-2xl mx-auto">
            <img 
              src={heroImage} 
              alt="Peaceful sleep illustration" 
              className="w-full rounded-lg shadow-glow"
            />
          </div>
        </div>
      </section>

      <section className="px-4 py-16 bg-card/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything you need for better sleep
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-soft hover:shadow-medium transition-shadow">
              <CardContent className="p-6 text-center">
                <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Quick Sleep Log</h3>
                <p className="text-muted-foreground">
                  Log your sleep in under 30 seconds. Perfect for busy students on the go.
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-soft hover:shadow-medium transition-shadow">
              <CardContent className="p-6 text-center">
                <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">AI Sleep Buddy</h3>
                <p className="text-muted-foreground">
                  Chat with a friendly AI that understands your sleep patterns and offers personalized tips.
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-soft hover:shadow-medium transition-shadow">
              <CardContent className="p-6 text-center">
                <BarChart3 className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Smart Analytics</h3>
                <p className="text-muted-foreground">
                  Visualize your sleep trends and discover patterns that impact your energy and focus.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Built for Student Life</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-1">
                    <Users className="w-3 h-3 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Organization Support</h4>
                    <p className="text-muted-foreground text-sm">
                      Schools and organizations can track aggregate wellness data while keeping individual data private.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-1">
                    <Shield className="w-3 h-3 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Privacy First</h4>
                    <p className="text-muted-foreground text-sm">
                      Your sleep data is yours. We use industry-standard security and never share personal information.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-1">
                    <Clock className="w-3 h-3 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Quick & Easy</h4>
                    <p className="text-muted-foreground text-sm">
                      Designed for busy students. Log your sleep during your morning commute in just 30 seconds.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-accent p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Start Your Journey</h3>
                <p className="text-muted-foreground mb-6">
                  Join students worldwide who are improving their sleep wellness and academic performance.
                </p>
                <Button 
                  variant="gradient" 
                  size="lg" 
                  onClick={onGetStarted}
                  className="w-full"
                >
                  Get Started Today
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="px-4 py-8 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Moon className="w-6 h-6 text-primary" />
            <span className="font-semibold text-lg">Zeno</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Empowering students with better sleep, one night at a time.
          </p>
        </div>
      </footer>
    </div>
  );
};