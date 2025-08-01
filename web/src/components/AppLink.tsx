import { ExternalLink, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export const AppLink = () => {
  return (
    <div className="bg-gradient-to-br from-sleep-dawn/20 via-sleep-warm/15 to-community-warm/20 border border-sleep-dawn/30 rounded-xl p-6 shadow-warm backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-sleep-twilight to-sleep-deep rounded-full flex items-center justify-center flex-shrink-0 shadow-gentle">
            <Moon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-serif text-2xl font-semibold text-sleep-deep mb-2">Meet Zeno</h3>
            <p className="text-foreground/80 leading-relaxed font-light">
              Our companion sleep tracking app that puts Oneria's research into practice. 
              Track your sleep patterns, get personalized AI insights, and join a community 
              committed to better rest.
            </p>
          </div>
        </div>
        <Button 
          asChild
          variant="night" 
          size="lg"
          className="group flex-shrink-0"
        >
          <a
            href="https://app.oneria.org"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            Try Zeno
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-gentle" />
          </a>
        </Button>
      </div>
    </div>
  );
};