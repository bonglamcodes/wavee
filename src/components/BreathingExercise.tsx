import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wind, Play, Pause, RotateCcw } from "lucide-react";

const BreathingExercise = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [count, setCount] = useState(4);
  const [duration, setDuration] = useState(60); // seconds
  const [timeLeft, setTimeLeft] = useState(duration);
  const [cycleProgress, setCycleProgress] = useState(0);

  const phaseTimings = {
    inhale: 4,
    hold: 4,
    exhale: 6
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setCount((prev) => {
          if (prev <= 1) {
            // Move to next phase
            if (phase === 'inhale') {
              setPhase('hold');
              return phaseTimings.hold;
            } else if (phase === 'hold') {
              setPhase('exhale');
              return phaseTimings.exhale;
            } else {
              setPhase('inhale');
              setCycleProgress(prev => prev + 1);
              return phaseTimings.inhale;
            }
          }
          return prev - 1;
        });
        
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, phase]);

  const handleStart = () => {
    setIsActive(true);
    setPhase('inhale');
    setCount(phaseTimings.inhale);
  };

  const handlePause = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setPhase('inhale');
    setCount(phaseTimings.inhale);
    setTimeLeft(duration);
    setCycleProgress(0);
  };

  const getPhaseText = () => {
    switch (phase) {
      case 'inhale': return 'Breathe In';
      case 'hold': return 'Hold';
      case 'exhale': return 'Breathe Out';
    }
  };

  const getCircleScale = () => {
    const baseScale = 0.8;
    const maxScale = 1.2;
    
    if (phase === 'inhale') {
      return baseScale + (maxScale - baseScale) * (1 - (count / phaseTimings.inhale));
    } else if (phase === 'exhale') {
      return maxScale - (maxScale - baseScale) * (1 - (count / phaseTimings.exhale));
    }
    return maxScale;
  };

  return (
    <Card className="bg-gradient-to-br from-calming-blue/10 to-calming-teal/10 border-primary/20">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Wind className="h-6 w-6 text-primary" />
          <CardTitle>Breathing Exercise</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className="relative w-40 h-40 mx-auto mb-6">
            <div 
              className="w-full h-full rounded-full border-4 border-primary/30 flex items-center justify-center transition-transform duration-1000 ease-in-out"
              style={{ 
                transform: `scale(${getCircleScale()})`,
                background: 'linear-gradient(135deg, hsl(var(--calming-blue) / 0.2), hsl(var(--calming-teal) / 0.2))'
              }}
            >
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">{count}</div>
                <div className="text-sm text-muted-foreground">{getPhaseText()}</div>
              </div>
            </div>
          </div>
          
          {isActive && (
            <div className="text-lg font-medium text-foreground mb-2">
              Time remaining: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </div>
          )}
          
          <div className="text-sm text-muted-foreground">
            Cycles completed: {cycleProgress}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">Duration</label>
            <Select value={duration.toString()} onValueChange={(value) => {
              setDuration(Number(value));
              setTimeLeft(Number(value));
            }}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="60">1 minute</SelectItem>
                <SelectItem value="180">3 minutes</SelectItem>
                <SelectItem value="300">5 minutes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            {!isActive ? (
              <Button 
                onClick={handleStart} 
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                <Play className="h-4 w-4 mr-2" />
                Start
              </Button>
            ) : (
              <Button 
                onClick={handlePause} 
                variant="outline" 
                className="flex-1"
              >
                <Pause className="h-4 w-4 mr-2" />
                Pause
              </Button>
            )}
            
            <Button 
              onClick={handleReset} 
              variant="outline"
              className="flex-1"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BreathingExercise;