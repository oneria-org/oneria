import { Clock, MessageCircle, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface TabNavigationProps {
  activeTab: 'log' | 'chat' | 'stats';
  onTabChange: (tab: 'log' | 'chat' | 'stats') => void;
}

export const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
  const tabs = [
    { id: 'log' as const, label: 'Quick Log', icon: Clock },
    { id: 'chat' as const, label: 'AI Chat', icon: MessageCircle },
    { id: 'stats' as const, label: 'Stats', icon: BarChart3 },
  ];

  return (
    <nav className="bg-card border-t border-border px-4 py-2">
      <div className="flex justify-center max-w-md mx-auto">
        <div className="flex bg-muted rounded-lg p-1 w-full">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "flex-1 flex flex-col items-center py-2 px-1 rounded-md transition-all duration-200",
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                )}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};