import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Heart, ArrowLeft, Volume2, VolumeX, Play, Pause, Phone, MessageCircle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PanicButton = () => {
  const [inPanicMode, setInPanicMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [breathingCount, setBreathingCount] = useState(4);
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const { toast } = useToast();
  const breathingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const panicSteps = [
    {
      title: "🌸 You're Safe Right Now",
      content: "Take a moment to pause. You are in a safe space. This feeling, however intense, is temporary and will pass. You've gotten through difficult moments before, and you will get through this one too.",
      action: "I'm ready to continue",
      type: "reassurance" as const,
      duration: 15,
      audioText: "Take a deep breath with me. You are safe right now. This feeling will pass."
    },
    {
      title: "🌬️ Let's Breathe Together",
      content: "We're going to breathe together using a proven technique. Follow the breathing circle - inhale as it expands, hold, then exhale as it contracts. This will help calm your nervous system.",
      action: "Start breathing exercise",
      type: "breathing" as const,
      duration: 60,
      audioText: "Let's breathe together. Follow my voice and the visual guide."
    },
    {
      title: "🌍 Ground Yourself Here",
      content: "Let's bring your attention to the present moment using your senses. This technique helps interrupt the panic cycle and reconnects you with reality.",
      action: "I'm focusing on my senses",
      type: "grounding" as const,
      duration: 30,
      audioText: "Look around you. Notice 5 things you can see, 4 things you can touch, 3 things you can hear."
    },
    {
      title: "💪 You Are Stronger Than This",
      content: "Notice how you're already feeling more centered. Your breath is slower, your body is beginning to relax. You have the strength and resilience to overcome this moment.",
      action: "I'm feeling more grounded",
      type: "affirmation" as const,
      duration: 20,
      audioText: "You are stronger than your anxiety. You have the power to get through this."
    },
    {
      title: "🧠 Understanding What Happened",
      content: "What you experienced was your body's natural alarm system - designed to protect you. While it felt scary, it wasn't dangerous. Your body is already returning to its natural, calm state.",
      action: "This makes sense",
      type: "education" as const,
      duration: 25,
      audioText: "Your body's alarm system activated to protect you. You're safe and your system is calming down."
    },
    {
      title: "🌟 Moving Forward",
      content: "You've successfully navigated through this moment. Consider what triggered this episode and remember the techniques that helped you. You now have tools for the future.",
      action: "Complete session",
      type: "completion" as const,
      duration: 20,
      audioText: "You did amazing. You have tools now for any future moments like this."
    }
  ];

  const breathingPattern = {
    inhale: 4,
    hold: 4,
    exhale: 6
  };

  // Breathing exercise logic
  useEffect(() => {
    if (isBreathingActive && currentStep === 1) {
      breathingIntervalRef.current = setInterval(() => {
        setBreathingCount((prev) => {
          if (prev <= 1) {
            if (breathingPhase === 'inhale') {
              setBreathingPhase('hold');
              return breathingPattern.hold;
            } else if (breathingPhase === 'hold') {
              setBreathingPhase('exhale');
              return breathingPattern.exhale;
            } else {
              setBreathingPhase('inhale');
              return breathingPattern.inhale;
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (breathingIntervalRef.current) {
        clearInterval(breathingIntervalRef.current);
      }
    }

    return () => {
      if (breathingIntervalRef.current) {
        clearInterval(breathingIntervalRef.current);
      }
    };
  }, [isBreathingActive, breathingPhase, currentStep]);

  const handlePanicClick = () => {
    setInPanicMode(true);
    setCurrentStep(0);
    setSessionStartTime(new Date());
    setCompletedSteps([]);
    setBreathingPhase('inhale');
    setBreathingCount(breathingPattern.inhale);
    setIsBreathingActive(false);
    
    // Save panic session start to localStorage for tracking
    const sessions = JSON.parse(localStorage.getItem('wavee-panic-sessions') || '[]');
    sessions.push({ timestamp: new Date().toISOString(), type: 'panic-session-start' });
    localStorage.setItem('wavee-panic-sessions', JSON.stringify(sessions));
  };

  const handleNextStep = () => {
    // Mark current step as completed
    setCompletedSteps(prev => [...prev, currentStep]);
    
    // Stop breathing exercise when leaving step 1
    if (currentStep === 1) {
      setIsBreathingActive(false);
    }
    
    if (currentStep < panicSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      
      // Auto-start breathing exercise on step 1
      if (currentStep + 1 === 1) {
        setTimeout(() => {
          setIsBreathingActive(true);
        }, 2000);
      }
    } else {
      // Session completed
      const sessionDuration = sessionStartTime ? Date.now() - sessionStartTime.getTime() : 0;
      
      // Save completed session
      const sessions = JSON.parse(localStorage.getItem('wavee-panic-sessions') || '[]');
      sessions.push({
        timestamp: new Date().toISOString(),
        type: 'panic-session-completed',
        duration: sessionDuration,
        stepsCompleted: panicSteps.length
      });
      localStorage.setItem('wavee-panic-sessions', JSON.stringify(sessions));
      
      // Update usage stats
      const stats = JSON.parse(localStorage.getItem('wavee-usage-stats') || '{}');
      stats.panicButton = (stats.panicButton || 0) + 1;
      stats.lastUsed = new Date().toISOString();
      localStorage.setItem('wavee-usage-stats', JSON.stringify(stats));
      
      toast({
        title: "Session Completed ✨",
        description: `You successfully completed a ${Math.round(sessionDuration / 1000 / 60)} minute panic support session.`,
      });
      
      setInPanicMode(false);
      setCurrentStep(0);
    }
  };

  const handleBackToDashboard = () => {
    setInPanicMode(false);
    setCurrentStep(0);
    setIsBreathingActive(false);
    
    if (sessionStartTime) {
      const sessionDuration = Date.now() - sessionStartTime.getTime();
      const sessions = JSON.parse(localStorage.getItem('wavee-panic-sessions') || '[]');
      sessions.push({
        timestamp: new Date().toISOString(),
        type: 'panic-session-incomplete',
        duration: sessionDuration,
        stepsCompleted: completedSteps.length
      });
      localStorage.setItem('wavee-panic-sessions', JSON.stringify(sessions));
    }
  };

  const startBreathingExercise = () => {
    setIsBreathingActive(true);
    setBreathingPhase('inhale');
    setBreathingCount(breathingPattern.inhale);
  };

  const stopBreathingExercise = () => {
    setIsBreathingActive(false);
  };

  const getBreathingCircleScale = () => {
    const baseScale = 0.7;
    const maxScale = 1.3;
    
    if (breathingPhase === 'inhale') {
      const progress = (breathingPattern.inhale - breathingCount) / breathingPattern.inhale;
      return baseScale + (maxScale - baseScale) * progress;
    } else if (breathingPhase === 'exhale') {
      const progress = (breathingPattern.exhale - breathingCount) / breathingPattern.exhale;
      return maxScale - (maxScale - baseScale) * progress;
    }
    return maxScale;
  };

  const getBreathingInstruction = () => {
    switch (breathingPhase) {
      case 'inhale': return 'Breathe In Slowly';
      case 'hold': return 'Hold Your Breath';
      case 'exhale': return 'Breathe Out Gently';
    }
  };

  const emergencyContacts = [
    { name: "Crisis Text Line", number: "Text HOME to 741741", icon: MessageCircle },
    { name: "National Suicide Prevention", number: "988", icon: Phone },
  ];

  if (inPanicMode) {
    const step = panicSteps[currentStep];
    const progress = ((currentStep + 1) / panicSteps.length) * 100;
    const sessionDuration = sessionStartTime ? Math.floor((Date.now() - sessionStartTime.getTime()) / 1000) : 0;
    
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-soft-blue via-background to-accent z-50 flex items-center justify-center p-4">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-40 h-40 bg-primary rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-32 right-32 w-32 h-32 bg-accent rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-primary/50 rounded-full blur-xl animate-pulse delay-2000"></div>
        </div>

        <div className="w-full max-w-lg relative z-10">
          {/* Header with progress and controls */}
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              onClick={handleBackToDashboard}
              className="text-foreground hover:bg-background/20 backdrop-blur"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Exit Session
            </Button>
            
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-background/80 backdrop-blur">
                {Math.floor(sessionDuration / 60)}:{(sessionDuration % 60).toString().padStart(2, '0')}
              </Badge>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setAudioEnabled(!audioEnabled)}
                className="text-foreground hover:bg-background/20"
              >
                {audioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Step {currentStep + 1} of {panicSteps.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          <Card className="border-0 shadow-2xl bg-background/95 backdrop-blur-md">
            <CardHeader className="pb-4 text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Heart className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold text-foreground">
                {step.title}
              </CardTitle>
              <Badge variant="outline" className="w-fit mx-auto mt-2">
                {step.type}
              </Badge>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Special breathing exercise visualization */}
              {step.type === 'breathing' && (
                <div className="text-center py-8">
                  <div className="relative w-40 h-40 mx-auto mb-6">
                    <div 
                      className="w-full h-full rounded-full border-4 border-primary/30 flex items-center justify-center transition-transform duration-1000 ease-in-out"
                      style={{ 
                        transform: `scale(${getBreathingCircleScale()})`,
                        background: 'linear-gradient(135deg, hsl(var(--primary) / 0.1), hsl(var(--accent) / 0.1))'
                      }}
                    >
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary mb-1">{breathingCount}</div>
                        <div className="text-sm text-muted-foreground">{getBreathingInstruction()}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center gap-3 mb-4">
                    {!isBreathingActive ? (
                      <Button onClick={startBreathingExercise} size="sm">
                        <Play className="h-4 w-4 mr-2" />
                        Start Breathing
                      </Button>
                    ) : (
                      <Button onClick={stopBreathingExercise} variant="outline" size="sm">
                        <Pause className="h-4 w-4 mr-2" />
                        Pause
                      </Button>
                    )}
                  </div>
                </div>
              )}

              {/* Grounding technique helper */}
              {step.type === 'grounding' && (
                <div className="bg-accent/10 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-foreground mb-3">5-4-3-2-1 Technique:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs font-bold">5</div>
                      <span>Things you can see</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs font-bold">4</div>
                      <span>Things you can touch</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs font-bold">3</div>
                      <span>Things you can hear</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs font-bold">2</div>
                      <span>Things you can smell</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs font-bold">1</div>
                      <span>Thing you can taste</span>
                    </div>
                  </div>
                </div>
              )}
              
              <p className="text-lg text-muted-foreground leading-relaxed text-center">
                {step.content}
              </p>
              
              {/* Step completion indicators */}
              <div className="flex justify-center gap-2 py-2">
                {panicSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      completedSteps.includes(index)
                        ? 'bg-success-green'
                        : index === currentStep
                        ? 'bg-primary'
                        : 'bg-muted'
                    }`}
                  />
                ))}
              </div>
              
              <Button 
                onClick={handleNextStep}
                className="w-full py-6 text-lg font-medium bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300"
                size="lg"
              >
                {completedSteps.includes(currentStep) && <CheckCircle className="h-5 w-5 mr-2" />}
                {step.action}
              </Button>

              {/* Emergency contacts for severe cases */}
              {currentStep === 0 && (
                <div className="mt-6 p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                  <h4 className="font-semibold text-foreground mb-3 text-center">If this is a mental health emergency:</h4>
                  <div className="space-y-2">
                    {emergencyContacts.map((contact, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-background/50 rounded">
                        <div className="flex items-center gap-2">
                          <contact.icon className="h-4 w-4 text-destructive" />
                          <span className="text-sm font-medium">{contact.name}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{contact.number}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <Card className="group bg-gradient-to-br from-panic-red/10 to-panic-red/5 border-panic-red/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-4 right-4 w-12 h-12 bg-panic-red/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-6 left-6 w-8 h-8 bg-panic-red/5 rounded-full animate-pulse delay-1000"></div>
      </div>
      
      <CardContent className="p-8 text-center relative z-10">
        <div className="w-24 h-24 bg-gradient-to-br from-panic-red/20 to-panic-red/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
          <Heart className="h-12 w-12 text-panic-red animate-pulse" />
        </div>
        
        <h3 className="text-2xl font-bold text-foreground mb-3">Emergency Support</h3>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          Feeling overwhelmed, having a panic attack, or in distress? Get immediate, guided support with proven techniques. 💚
        </p>
        
        {/* Quick stats from previous sessions */}
        <div className="flex justify-center gap-4 mb-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3 text-success-green" />
            <span>6-step guided process</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart className="h-3 w-3 text-panic-red" />
            <span>Scientifically proven</span>
          </div>
        </div>
        
        <Button 
          onClick={handlePanicClick}
          className="w-full py-6 text-xl font-bold bg-panic-red hover:bg-panic-red/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105"
          size="lg"
        >
          <Heart className="h-6 w-6 mr-3 animate-pulse" />
          I Need Help Now
        </Button>
        
        <p className="text-xs text-muted-foreground mt-4">
          Available 24/7 • No signup required • Completely private
        </p>
      </CardContent>
    </Card>
  );
};

export default PanicButton;