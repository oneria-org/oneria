import { Moon, Sun, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AppHeaderProps {
  userName?: string;
  onLogout?: () => void;
}

export const AppHeader = ({ userName, onLogout }: AppHeaderProps) => {
  return (
    <header className="bg-gradient-primary px-4 py-3 shadow-soft">
      <div className="flex items-center justify-between max-w-md mx-auto">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center">
            <Moon className="w-4 h-4 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-semibold text-primary-foreground">Zeno</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          {userName && (
            <span className="text-sm text-primary-foreground/80">
              Hey, {userName}!
            </span>
          )}
          {onLogout && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onLogout}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};