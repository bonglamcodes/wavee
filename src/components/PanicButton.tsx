import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Heart, ArrowLeft, Volume2, VolumeX, Play, Pause, Phone, MessageCircle, CheckCircle, Music, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { speechService } from "@/lib/speechService";

const PanicButton = () => {
  const [inPanicMode, setInPanicMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [breathingCount, setBreathingCount] = useState(4);
  const [breathingCycles, setBreathingCycles] = useState(0);
  const [targetBreathingCycles] = useState(5); // Complete 5 breathing cycles
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [currentAmbientSound, setCurrentAmbientSound] = useState('ocean');
  const [isServiceInitialized, setIsServiceInitialized] = useState(false);
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
      action: "Continue to grounding",
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

  // Initialize speech service
  useEffect(() => {
    const initializeAudio = async () => {
      try {
        await speechService.initialize();
        setIsServiceInitialized(true);
        
        // Load audio preferences
        const prefs = JSON.parse(localStorage.getItem('wavee-audio-preferences') || '{}');
        setAudioEnabled(prefs.audioEnabled !== false);
        setCurrentAmbientSound(prefs.ambientSound || 'ocean');
        
        // Show initialization status
        if (speechService.isElevenLabsEnabled()) {
          toast({
            title: "🎵 Premium Audio Ready",
            description: "ElevenLabs AI voice is now available for guided sessions!",
          });
        } else {
          toast({
            title: "🔊 Audio System Ready", 
            description: "Using browser text-to-speech for guided sessions.",
          });
        }
      } catch (error) {
        console.error('Failed to initialize audio services:', error);
      }
    };

    initializeAudio();

    // Cleanup on unmount
    return () => {
      speechService.dispose();
    };
  }, []);

  // Auto-play step audio when step changes
  useEffect(() => {
    if (inPanicMode && audioEnabled && isServiceInitialized) {
      const step = panicSteps[currentStep];
      if (step.audioText) {
        playStepAudio(step.audioText);
      }
    }
  }, [currentStep, inPanicMode, audioEnabled, isServiceInitialized]);

  // Start ambient sound when entering panic mode
  useEffect(() => {
    if (inPanicMode && audioEnabled && currentAmbientSound !== 'silence') {
      speechService.playAmbientSound(currentAmbientSound);
    } else {
      speechService.stopAmbientSound();
    }

    return () => {
      speechService.stopAmbientSound();
    };
  }, [inPanicMode, audioEnabled, currentAmbientSound]);

  // Breathing exercise logic with audio cues
  useEffect(() => {
    if (isBreathingActive && currentStep === 1) {
      breathingIntervalRef.current = setInterval(() => {
        setBreathingCount((prev) => {
          // Visual-only countdown - audio causes interruption issues
          
          if (prev <= 1) {
            if (breathingPhase === 'inhale') {
              setBreathingPhase('hold');
              return breathingPattern.hold;
            } else if (breathingPhase === 'hold') {
              setBreathingPhase('exhale');
              return breathingPattern.exhale;
            } else {
              setBreathingPhase('inhale');
              // Complete one breathing cycle
              setBreathingCycles(cycles => {
                const newCycles = cycles + 1;
                // Auto-advance to next step after target cycles
                if (newCycles >= targetBreathingCycles) {
                  setTimeout(() => {
                    handleNextStep();
                  }, 1000); // Small delay to let user see completion
                }
                return newCycles;
              });
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
    setBreathingCycles(0);
    
    // Save panic session start to localStorage for tracking
    const sessions = JSON.parse(localStorage.getItem('wavee-panic-sessions') || '[]');
    sessions.push({ timestamp: new Date().toISOString(), type: 'panic-session-start' });
    localStorage.setItem('wavee-panic-sessions', JSON.stringify(sessions));
  };

  const handleNextStep = () => {
    // Mark current step as completed
    setCompletedSteps(prev => [...prev, currentStep]);
    
    setBreathingCycles(0);
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
    setBreathingCycles(0);
    
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
    setBreathingCycles(0);
    
    // No audio cues to prevent conflicts with step audio
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

  // Audio utility functions
  const playStepAudio = async (text: string) => {
    if (!audioEnabled || !isServiceInitialized) return;
    
    setIsAudioLoading(true);
    try {
      await speechService.speak({
        text,
        rate: 0.9,
        volume: 0.8,
        onStart: () => setIsAudioLoading(false),
        onEnd: () => setIsAudioLoading(false),
        onError: (error) => {
          console.error('Audio playback failed:', error);
          setIsAudioLoading(false);
        }
      });
    } catch (error) {
      console.error('Failed to play step audio:', error);
      setIsAudioLoading(false);
    }
  };

  const toggleAudioEnabled = () => {
    const newState = !audioEnabled;
    setAudioEnabled(newState);
    
    // Save preference
    const prefs = JSON.parse(localStorage.getItem('wavee-audio-preferences') || '{}');
    prefs.audioEnabled = newState;
    localStorage.setItem('wavee-audio-preferences', JSON.stringify(prefs));
    
    if (!newState) {
      speechService.stopSpeech();
      speechService.stopAmbientSound();
    } else if (inPanicMode && currentAmbientSound !== 'silence') {
      speechService.playAmbientSound(currentAmbientSound);
    }
  };

  const handleAmbientSoundChange = (soundId: string) => {
    setCurrentAmbientSound(soundId);
    
    // Save preference
    const prefs = JSON.parse(localStorage.getItem('wavee-audio-preferences') || '{}');
    prefs.ambientSound = soundId;
    localStorage.setItem('wavee-audio-preferences', JSON.stringify(prefs));
    
    if (audioEnabled && inPanicMode) {
      speechService.playAmbientSound(soundId);
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
      <div className="fixed inset-0 bg-gradient-to-br from-soft-blue via-background to-accent z-50 flex items-center justify-center p-2 sm:p-4">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-20 sm:w-40 h-20 sm:h-40 bg-primary rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-16 sm:bottom-32 right-16 sm:right-32 w-16 sm:w-32 h-16 sm:h-32 bg-accent rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-12 sm:w-24 h-12 sm:h-24 bg-primary/50 rounded-full blur-xl animate-pulse delay-2000"></div>
        </div>

        <div className="w-full max-w-lg relative z-10 max-h-screen overflow-y-auto">
          {/* Header with progress and controls */}
          <div className="flex items-center justify-between mb-4 sm:mb-6 sticky top-0 bg-background/80 backdrop-blur-md rounded-lg p-2 sm:p-3">
            <Button
              variant="ghost"
              onClick={handleBackToDashboard}
              className="text-foreground hover:bg-background/20 backdrop-blur text-sm sm:text-base"
              size="sm"
            >
              <ArrowLeft className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Exit Session</span>
              <span className="sm:hidden">Exit</span>
            </Button>
            
            <div className="flex items-center gap-2 sm:gap-3">
              <Badge variant="secondary" className="bg-background/80 backdrop-blur text-xs sm:text-sm">
                {Math.floor(sessionDuration / 60)}:{(sessionDuration % 60).toString().padStart(2, '0')}
              </Badge>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleAudioEnabled}
                className="text-foreground hover:bg-background/20 relative"
              >
                {isAudioLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : audioEnabled ? (
                  <Volume2 className="h-4 w-4" />
                ) : (
                  <VolumeX className="h-4 w-4" />
                )}
                {speechService.isElevenLabsEnabled() && audioEnabled && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></div>
                )}
              </Button>
            </div>
          </div>

          {/* Audio Controls & Ambient Sound Selector */}
          {audioEnabled && isServiceInitialized && (
            <div className="mb-4 p-3 bg-background/80 backdrop-blur rounded-lg border">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Music className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Audio Environment</span>
                  {speechService.isElevenLabsEnabled() && (
                    <Badge variant="secondary" className="text-xs">AI Voice</Badge>
                  )}
                </div>
                {speechService.isSpeaking() && (
                  <div className="flex items-center gap-1 text-xs text-primary">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    Speaking
                  </div>
                )}
              </div>
              <div className="flex gap-2 overflow-x-auto">
                {speechService.getAmbientSounds().map((sound) => (
                  <Button
                    key={sound.id}
                    variant={currentAmbientSound === sound.id ? "default" : "outline"}
                    size="sm"
                    className="flex-shrink-0 text-xs"
                    onClick={() => handleAmbientSoundChange(sound.id)}
                  >
                    <span className="mr-1">{sound.icon}</span>
                    {sound.name}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Progress Bar */}
          <div className="mb-4 sm:mb-6">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Step {currentStep + 1} of {panicSteps.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          <Card className="border-0 shadow-2xl bg-background/95 backdrop-blur-md">
            <CardHeader className="pb-2 sm:pb-4 text-center px-4 sm:px-6">
              <div className="w-16 sm:w-20 h-16 sm:h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 animate-pulse">
                <Heart className="h-8 sm:h-10 w-8 sm:w-10 text-primary" />
              </div>
              <CardTitle className="text-xl sm:text-2xl font-bold text-foreground px-2">
                {step.title}
              </CardTitle>
              <Badge variant="outline" className="w-fit mx-auto mt-2 text-xs sm:text-sm">
                {step.type}
              </Badge>
            </CardHeader>
            
            <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6 pb-4 sm:pb-6">
              {/* Special breathing exercise visualization */}
              {step.type === 'breathing' && (
                <div className="text-center py-4 sm:py-8">
                  <div className="relative w-32 sm:w-40 h-32 sm:h-40 mx-auto mb-4 sm:mb-6">
                    <div 
                      className="w-full h-full rounded-full border-4 border-primary/30 flex items-center justify-center transition-transform duration-1000 ease-in-out"
                      style={{ 
                        transform: `scale(${getBreathingCircleScale()})`,
                        background: 'linear-gradient(135deg, hsl(var(--primary) / 0.1), hsl(var(--accent) / 0.1))'
                      }}
                    >
                      <div className="text-center">
                        <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">{breathingCount}</div>
                        <div className="text-xs sm:text-sm text-muted-foreground px-2">{getBreathingInstruction()}</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress indicator for breathing cycles */}
                  <div className="mb-4">
                    <div className="text-xs sm:text-sm text-muted-foreground mb-2">
                      Breathing cycle {breathingCycles + 1} of {targetBreathingCycles}
                    </div>
                    <Progress 
                      value={(breathingCycles / targetBreathingCycles) * 100} 
                      className="h-1 w-24 sm:w-32 mx-auto" 
                    />
                  </div>
                  
                  <div className="flex justify-center gap-3 mb-4">
                    {!isBreathingActive ? (
                      <Button onClick={startBreathingExercise} size="sm" className="text-xs sm:text-sm">
                        <Play className="h-3 sm:h-4 w-3 sm:w-4 mr-1 sm:mr-2" />
                        Start Breathing
                      </Button>
                    ) : (
                      <Button onClick={stopBreathingExercise} variant="outline" size="sm" className="text-xs sm:text-sm">
                        <Pause className="h-3 sm:h-4 w-3 sm:w-4 mr-1 sm:mr-2" />
                        Pause
                      </Button>
                    )}
                  </div>
                  
                  {breathingCycles >= targetBreathingCycles && (
                    <div className="text-xs sm:text-sm text-success-green font-medium animate-fade-in">
                      ✨ Breathing exercise complete! Moving to next step...
                    </div>
                  )}
                </div>
              )}

              {/* Grounding technique helper */}
              {step.type === 'grounding' && (
                <div className="bg-accent/10 rounded-lg p-3 sm:p-4 mb-4">
                  <h4 className="font-semibold text-foreground mb-3 text-sm sm:text-base">5-4-3-2-1 Technique:</h4>
                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-5 sm:w-6 h-5 sm:h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs font-bold">5</div>
                      <span>Things you can see</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 sm:w-6 h-5 sm:h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs font-bold">4</div>
                      <span>Things you can touch</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 sm:w-6 h-5 sm:h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs font-bold">3</div>
                      <span>Things you can hear</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 sm:w-6 h-5 sm:h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs font-bold">2</div>
                      <span>Things you can smell</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 sm:w-6 h-5 sm:h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs font-bold">1</div>
                      <span>Thing you can taste</span>
                    </div>
                  </div>
                </div>
              )}
              
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed text-center px-2">
                {step.content}
              </p>
              
              {/* Step completion indicators */}
              <div className="flex justify-center gap-1 sm:gap-2 py-2">
                {panicSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 sm:w-3 h-2 sm:h-3 rounded-full transition-colors ${
                      completedSteps.includes(index)
                        ? 'bg-success-green'
                        : index === currentStep
                        ? 'bg-primary'
                        : 'bg-muted'
                    }`}
                  />
                ))}
              </div>
              
              {/* Main action button - ALWAYS VISIBLE */}
              <Button 
                onClick={handleNextStep}
                className="w-full py-4 sm:py-6 text-base sm:text-lg font-medium bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300"
                size="lg"
              >
                {completedSteps.includes(currentStep) && <CheckCircle className="h-4 sm:h-5 w-4 sm:w-5 mr-2" />}
                {step.action}
              </Button>

              {/* Emergency contacts for severe cases - ALWAYS VISIBLE IN FIRST STEP */}
              {currentStep === 0 && (
                <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                  <h4 className="font-semibold text-foreground mb-3 text-center text-sm sm:text-base">If this is a mental health emergency:</h4>
                  <div className="space-y-2">
                    {emergencyContacts.map((contact, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-background/50 rounded text-xs sm:text-sm">
                        <div className="flex items-center gap-2">
                          <contact.icon className="h-3 sm:h-4 w-3 sm:w-4 text-destructive" />
                          <span className="font-medium">{contact.name}</span>
                        </div>
                        <span className="text-muted-foreground">{contact.number}</span>
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
        <div className="absolute top-2 sm:top-4 right-2 sm:right-4 w-8 sm:w-12 h-8 sm:h-12 bg-panic-red/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 w-6 sm:w-8 h-6 sm:h-8 bg-panic-red/5 rounded-full animate-pulse delay-1000"></div>
      </div>
      
      <CardContent className="p-4 sm:p-8 text-center relative z-10">
        <div className="w-16 sm:w-24 h-16 sm:h-24 bg-gradient-to-br from-panic-red/20 to-panic-red/10 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
          <Heart className="h-8 sm:h-12 w-8 sm:w-12 text-panic-red animate-pulse" />
        </div>
        
        <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2 sm:mb-3">Emergency Support</h3>
        <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed px-2">
          Feeling overwhelmed, having a panic attack, or in distress? Get immediate, guided support with proven techniques. 💚
        </p>
        
        {/* Quick stats from previous sessions */}
        <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mb-4 sm:mb-6 text-xs text-muted-foreground">
          <div className="flex items-center justify-center gap-1">
            <CheckCircle className="h-3 w-3 text-success-green" />
            <span>6-step guided process</span>
          </div>
          <div className="flex items-center justify-center gap-1">
            <Heart className="h-3 w-3 text-panic-red" />
            <span>Scientifically proven</span>
          </div>
        </div>
        
        <Button 
          onClick={handlePanicClick}
          className="w-full py-4 sm:py-6 text-lg sm:text-xl font-bold bg-panic-red hover:bg-panic-red/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105"
          size="lg"
        >
          <Heart className="h-5 sm:h-6 w-5 sm:w-6 mr-2 sm:mr-3 animate-pulse" />
          I Need Help Now
        </Button>
        
        <p className="text-xs text-muted-foreground mt-3 sm:mt-4 px-2">
          Available 24/7 • No signup required • Completely private
        </p>
      </CardContent>
    </Card>
  );
};

export default PanicButton;