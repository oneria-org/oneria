import { ExternalLink, Heart } from "lucide-react";

export const OrgLink = () => {
  return (
    <div className="mx-4 mb-4 bg-gradient-to-r from-primary/8 via-accent/12 to-secondary/15 border border-primary/25 rounded-xl p-4 shadow-soft backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0 shadow-medium">
            <Heart className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-1 text-base">About Oneria</h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Zeno is powered by Oneria's mission to make quality sleep accessible through research and advocacy.
            </p>
          </div>
        </div>
        <a
          href="https://oneria.org"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-primary hover:text-primary-glow font-medium text-sm transition-all duration-300 group flex-shrink-0 ml-4 px-3 py-2 rounded-lg hover:bg-primary/5"
        >
          Learn More
          <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:scale-110 transition-all duration-300" />
        </a>
      </div>
    </div>
  );
};