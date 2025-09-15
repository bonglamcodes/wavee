import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Play, Pause, Volume2 } from "lucide-react";

const Visualizations = () => {
  const [activeVisualization, setActiveVisualization] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const visualizations = {
    beach: {
      title: "Beach Relaxation",
      description: "Imagine yourself on a peaceful beach",
      steps: [
        "Close your eyes and take three deep breaths",
        "Picture yourself sitting on soft, warm sand",
        "Feel the gentle ocean breeze on your skin",
        "Listen to the rhythmic sound of waves",
        "Notice the warm sun gently warming your body",
        "Let all your worries wash away with the tide"
      ]
    },
    forest: {
      title: "Forest Walk",
      description: "Take a peaceful walk through nature",
      steps: [
        "Breathe deeply and imagine standing at a forest entrance",
        "Step onto a soft, moss-covered path",
        "Notice the tall trees creating a natural canopy above",
        "Hear birds singing and leaves rustling gently",
        "Feel the cool, fresh air filling your lungs",
        "Experience the deep peace of nature surrounding you"
      ]
    },
    mountain: {
      title: "Mountain Peak",
      description: "Find strength and perspective on a mountain",
      steps: [
        "Imagine yourself standing on a peaceful mountain peak",
        "Feel the solid ground beneath your feet",
        "Look out at the vast, beautiful landscape below",
        "Breathe in the crisp, clean mountain air",
        "Feel your inner strength and resilience",
        "Know that you can overcome any challenge"
      ]
    }
  };

  const handleStartVisualization = (key: string) => {
    setActiveVisualization(key);
    setCurrentStep(0);
  };

  const handleNextStep = () => {
    const visualization = visualizations[activeVisualization as keyof typeof visualizations];
    if (currentStep < visualization.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setActiveVisualization(null);
      setCurrentStep(0);
    }
  };

  const handleStopVisualization = () => {
    setActiveVisualization(null);
    setCurrentStep(0);
  };

  if (activeVisualization) {
    const visualization = visualizations[activeVisualization as keyof typeof visualizations];
    
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-accent to-soft-blue z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <Card className="text-center border-0 shadow-lg bg-background/95 backdrop-blur">
            <CardHeader className="pb-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold text-foreground">
                {visualization.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="text-lg text-muted-foreground leading-relaxed min-h-[4rem] flex items-center justify-center px-4">
                {visualization.steps[currentStep]}
              </div>
              
              <div className="text-sm text-muted-foreground">
                Step {currentStep + 1} of {visualization.steps.length}
              </div>
              
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-500"
                  style={{ width: `${((currentStep + 1) / visualization.steps.length) * 100}%` }}
                />
              </div>
              
              <div className="flex gap-4">
                <Button 
                  onClick={handleStopVisualization}
                  variant="outline" 
                  className="flex-1"
                >
                  <Pause className="h-4 w-4 mr-2" />
                  Stop
                </Button>
                <Button 
                  onClick={handleNextStep}
                  className="flex-1 py-4 text-lg font-medium bg-primary hover:bg-primary/90"
                >
                  {currentStep < visualization.steps.length - 1 ? 'Next' : 'Complete'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-accent to-calming-blue/10 border-primary/20">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Eye className="h-6 w-6 text-primary" />
          <CardTitle>Guided Visualizations</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="beach" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="beach">Beach</TabsTrigger>
            <TabsTrigger value="forest">Forest</TabsTrigger>
            <TabsTrigger value="mountain">Mountain</TabsTrigger>
          </TabsList>
          
          {Object.entries(visualizations).map(([key, visualization]) => (
            <TabsContent key={key} value={key} className="space-y-4">
              <div className="text-center p-6 bg-background/50 rounded-lg">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {visualization.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {visualization.description}
                </p>
                <Button 
                  onClick={() => handleStartVisualization(key)}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Start Visualization
                </Button>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Volume2 className="h-4 w-4" />
                <span>Best experienced in a quiet environment</span>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default Visualizations;