import PanicButton from "@/components/PanicButton";
import BreathingExercise from "@/components/BreathingExercise";
import Visualizations from "@/components/Visualizations";
import Journal from "@/components/Journal";
import ProgressTracker from "@/components/ProgressTracker";
import LessonsLibrary from "@/components/LessonsLibrary";
import { Waves } from "lucide-react";

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-soft-blue to-accent">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <Waves className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary">Wavee</h1>
            <span className="text-sm text-muted-foreground hidden sm:block ml-2">🌊 Your calm companion</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Welcome to Wavee
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your complete mental wellness companion. Take a deep breath - you're in a safe space with access to all features.
          </p>
        </div>

        {/* Immediate Relief Tools */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-foreground mb-4">Immediate Relief</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <PanicButton />
            <BreathingExercise />
            <Visualizations />
          </div>
        </div>

        {/* Daily Wellness Tools */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-foreground mb-4">Daily Wellness</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Journal />
            <LessonsLibrary />
          </div>
        </div>

        {/* Progress Section */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-foreground mb-4">Your Journey</h3>
          <ProgressTracker />
        </div>

        {/* Support Message */}
        <div className="text-center mt-16 p-8 bg-background/60 backdrop-blur rounded-xl border border-border/40">
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Remember: You Are Stronger Than You Think
          </h3>
          <p className="text-muted-foreground">
            Every small step you take towards managing your mental health matters. 
            Be patient and kind to yourself on this journey.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 mt-16">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-xs text-muted-foreground">
            If you're experiencing a mental health emergency, please contact emergency services immediately.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;