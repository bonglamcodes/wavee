import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Target, Award, Calendar } from "lucide-react";

interface UsageStats {
  panicButton: number;
  breathing: number;
  visualizations: number;
  journal: number;
  streak: number;
  lastUsed: string;
}

const ProgressTracker = () => {
  const [stats, setStats] = useState<UsageStats>({
    panicButton: 0,
    breathing: 0,
    visualizations: 0,
    journal: 0,
    streak: 0,
    lastUsed: ""
  });

  useEffect(() => {
    const savedStats = localStorage.getItem("wavee-usage-stats");
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  }, []);

  const totalUsage = stats.panicButton + stats.breathing + stats.visualizations + stats.journal;
  
  const achievements = [
    {
      title: "First Steps",
      description: "Used Wavee for the first time",
      unlocked: totalUsage > 0,
      icon: "🌟"
    },
    {
      title: "Breathing Master",
      description: "Completed 5 breathing exercises",
      unlocked: stats.breathing >= 5,
      icon: "🫁"
    },
    {
      title: "Mindful Explorer",
      description: "Tried all visualization types",
      unlocked: stats.visualizations >= 3,
      icon: "🧘"
    },
    {
      title: "Self-Reflector",
      description: "Made 7 journal entries",
      unlocked: stats.journal >= 7,
      icon: "📖"
    },
    {
      title: "Streak Keeper",
      description: "Used Wavee for 3 consecutive days",
      unlocked: stats.streak >= 3,
      icon: "🔥"
    }
  ];

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const progressToNext = achievements.find(a => !a.unlocked);

  const getProgressColor = (usage: number) => {
    if (usage >= 10) return "bg-success-green";
    if (usage >= 5) return "bg-primary";
    return "bg-muted-foreground";
  };

  const getDaysSinceLastUse = () => {
    if (!stats.lastUsed) return null;
    const lastUse = new Date(stats.lastUsed);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - lastUse.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Card className="bg-gradient-to-br from-success-green/10 to-calming-teal/10 border-primary/20">
      <CardHeader>
        <div className="flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-primary" />
          <CardTitle>Your Progress</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Usage Overview */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-background/50 rounded-lg">
            <div className="text-2xl font-bold text-primary">{totalUsage}</div>
            <div className="text-sm text-muted-foreground">Total Sessions</div>
          </div>
          <div className="text-center p-4 bg-background/50 rounded-lg">
            <div className="text-2xl font-bold text-success-green">{stats.streak}</div>
            <div className="text-sm text-muted-foreground">Day Streak</div>
          </div>
        </div>

        {/* Tool Usage Breakdown */}
        <div className="space-y-3">
          <h4 className="font-semibold text-foreground">Tool Usage</h4>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Panic Button</span>
              <span className="text-sm font-medium">{stats.panicButton}</span>
            </div>
            <Progress value={(stats.panicButton / Math.max(totalUsage, 1)) * 100} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Breathing</span>
              <span className="text-sm font-medium">{stats.breathing}</span>
            </div>
            <Progress value={(stats.breathing / Math.max(totalUsage, 1)) * 100} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Visualizations</span>
              <span className="text-sm font-medium">{stats.visualizations}</span>
            </div>
            <Progress value={(stats.visualizations / Math.max(totalUsage, 1)) * 100} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Journal</span>
              <span className="text-sm font-medium">{stats.journal}</span>
            </div>
            <Progress value={(stats.journal / Math.max(totalUsage, 1)) * 100} className="h-2" />
          </div>
        </div>

        {/* Achievements */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            <h4 className="font-semibold text-foreground">Achievements</h4>
          </div>
          
          <div className="grid grid-cols-1 gap-2">
            {unlockedAchievements.map((achievement, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-success-green/10 rounded-lg border border-success-green/20">
                <span className="text-xl">{achievement.icon}</span>
                <div className="flex-1">
                  <div className="font-medium text-foreground">{achievement.title}</div>
                  <div className="text-xs text-muted-foreground">{achievement.description}</div>
                </div>
                <Badge variant="secondary" className="bg-success-green/20 text-success-green">
                  Unlocked
                </Badge>
              </div>
            ))}
            
            {progressToNext && (
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg border border-muted">
                <span className="text-xl opacity-50">{progressToNext.icon}</span>
                <div className="flex-1">
                  <div className="font-medium text-muted-foreground">{progressToNext.title}</div>
                  <div className="text-xs text-muted-foreground">{progressToNext.description}</div>
                </div>
                <Badge variant="outline">
                  Locked
                </Badge>
              </div>
            )}
          </div>
        </div>

        {/* Last Activity */}
        {stats.lastUsed && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>
              Last active: {getDaysSinceLastUse() === 1 ? 'Yesterday' : `${getDaysSinceLastUse()} days ago`}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProgressTracker;