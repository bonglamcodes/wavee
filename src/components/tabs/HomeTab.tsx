import PanicButton from "@/components/PanicButton";
import BreathingExercise from "@/components/BreathingExercise";
import Visualizations from "@/components/Visualizations";
import Journal from "@/components/Journal";
import ProgressTracker from "@/components/ProgressTracker";
import LessonsLibrary from "@/components/LessonsLibrary";

export default function HomeTab() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Welcome to Wavee
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Your complete mental wellness companion. Take a deep breath - you're in a safe space.
        </p>
      </div>

      {/* Quick Relief Section */}
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-4">Quick Relief</h3>
        <div className="grid grid-cols-1 gap-4">
          <PanicButton />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <BreathingExercise />
            <Visualizations />
          </div>
        </div>
      </div>

      {/* Daily Tools Section */}
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-4">Daily Tools</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Journal />
          <LessonsLibrary />
        </div>
      </div>

      {/* Progress Section */}
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-4">Your Journey</h3>
        <ProgressTracker />
      </div>

      {/* Support Message */}
      <div className="text-center p-6 bg-background/60 backdrop-blur rounded-xl border border-border/40">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Remember: You Are Stronger Than You Think
        </h3>
        <p className="text-muted-foreground text-sm">
          Every small step matters. Be patient and kind to yourself.
        </p>
      </div>
    </div>
  );
}