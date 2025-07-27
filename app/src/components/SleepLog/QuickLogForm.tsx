import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun, Coffee } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SleepLogData {
  bedtime: string;
  wakeTime: string;
  fatigueLevel: number;
  hadNap: boolean;
  napDuration?: number;
  notes?: string;
}

interface QuickLogFormProps {
  onSubmit: (data: SleepLogData) => Promise<void>;
  isLoading?: boolean;
  existingLog?: SleepLogData;
}

export const QuickLogForm = ({ onSubmit, isLoading, existingLog }: QuickLogFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<SleepLogData>({
    bedtime: existingLog?.bedtime || '',
    wakeTime: existingLog?.wakeTime || '',
    fatigueLevel: existingLog?.fatigueLevel || 3,
    hadNap: existingLog?.hadNap || false,
    napDuration: existingLog?.napDuration || 0,
    notes: existingLog?.notes || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.bedtime || !formData.wakeTime) {
      toast({
        title: "Missing info",
        description: "Please fill in your bedtime and wake time",
        variant: "destructive",
      });
      return;
    }

    try {
      await onSubmit(formData);
      toast({
        title: "Sleep logged! 🌙",
        description: "Your sleep data has been saved",
      });
    } catch (error) {
      toast({
        title: "Error saving",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  const fatigueEmojis = ['😴', '🥱', '😐', '🙂', '😊'];
  const fatigueLabels = ['Exhausted', 'Tired', 'Okay', 'Good', 'Energized'];

  return (
    <div className="p-4 max-w-md mx-auto">
      <Card className="shadow-soft">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Moon className="w-5 h-5 text-primary" />
            How did you sleep?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bedtime" className="flex items-center gap-2">
                <Moon className="w-4 h-4" />
                When did you go to bed?
              </Label>
              <Input
                id="bedtime"
                type="time"
                value={formData.bedtime}
                onChange={(e) => setFormData({ ...formData, bedtime: e.target.value })}
                className="text-center"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="wakeTime" className="flex items-center gap-2">
                <Sun className="w-4 h-4" />
                When did you wake up?
              </Label>
              <Input
                id="wakeTime"
                type="time"
                value={formData.wakeTime}
                onChange={(e) => setFormData({ ...formData, wakeTime: e.target.value })}
                className="text-center"
              />
            </div>

            <div className="space-y-3">
              <Label>How tired do you feel today?</Label>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  {fatigueEmojis.map((emoji, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setFormData({ ...formData, fatigueLevel: index + 1 })}
                      className={`text-2xl p-2 rounded-full transition-all ${
                        formData.fatigueLevel === index + 1
                          ? 'bg-primary/20 scale-110'
                          : 'hover:bg-muted'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-center text-muted-foreground">
                  {fatigueLabels[formData.fatigueLevel - 1]}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="hadNap" className="flex items-center gap-2">
                <Coffee className="w-4 h-4" />
                Did you nap?
              </Label>
              <Switch
                id="hadNap"
                checked={formData.hadNap}
                onCheckedChange={(checked) => setFormData({ ...formData, hadNap: checked })}
              />
            </div>

            {formData.hadNap && (
              <div className="space-y-2">
                <Label htmlFor="napDuration">How long? (minutes)</Label>
                <Input
                  id="napDuration"
                  type="number"
                  min="0"
                  max="240"
                  value={formData.napDuration || ''}
                  onChange={(e) => setFormData({ ...formData, napDuration: parseInt(e.target.value) || 0 })}
                  placeholder="30"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="notes">Anything else?</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Stress, dreams, caffeine..."
                rows={2}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              variant="gradient"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save Sleep Log 🌙'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};