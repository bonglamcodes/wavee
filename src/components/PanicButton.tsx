import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, ArrowLeft } from "lucide-react";

const PanicButton = () => {
  const [inPanicMode, setInPanicMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const panicSteps = [
    {
      title: "You're Safe",
      content: "Take a deep breath. You are in a safe place right now. This feeling will pass.",
      action: "I understand"
    },
    {
      title: "5-4-3-2-1 Grounding",
      content: "Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste.",
      action: "I'm trying this"
    },
    {
      title: "Breathe with Me",
      content: "Let's breathe together. Inhale for 4 counts, hold for 4, exhale for 6. You're doing great.",
      action: "I'm breathing"
    },
    {
      title: "You're Stronger",
      content: "You've overcome difficult moments before, and you will overcome this one too. You are resilient.",
      action: "I'm feeling better"
    }
  ];

  const handlePanicClick = () => {
    setInPanicMode(true);
    setCurrentStep(0);
  };

  const handleNextStep = () => {
    if (currentStep < panicSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setInPanicMode(false);
      setCurrentStep(0);
    }
  };

  const handleBackToDashboard = () => {
    setInPanicMode(false);
    setCurrentStep(0);
  };

  if (inPanicMode) {
    const step = panicSteps[currentStep];
    
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-soft-blue to-accent z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Button
            variant="ghost"
            onClick={handleBackToDashboard}
            className="mb-4 text-foreground hover:bg-background/20"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <Card className="text-center border-0 shadow-lg bg-background/95 backdrop-blur">
            <CardHeader className="pb-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold text-foreground">
                {step.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {step.content}
              </p>
              
              <div className="text-sm text-muted-foreground">
                Step {currentStep + 1} of {panicSteps.length}
              </div>
              
              <Button 
                onClick={handleNextStep}
                className="w-full py-6 text-lg font-medium bg-primary hover:bg-primary/90"
                size="lg"
              >
                {step.action}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-panic-red/10 to-panic-red/5 border-panic-red/20 hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6 text-center">
        <div className="w-20 h-20 bg-panic-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Heart className="h-10 w-10 text-panic-red" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">Panic Button</h3>
        <p className="text-muted-foreground mb-4">
          Feeling overwhelmed? Get immediate guided support.
        </p>
        <Button 
          onClick={handlePanicClick}
          className="w-full py-4 text-lg font-medium bg-panic-red hover:bg-panic-red/90 text-white"
          size="lg"
        >
          I Need Help Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default PanicButton;