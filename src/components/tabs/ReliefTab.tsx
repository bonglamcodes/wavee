import PanicButton from "@/components/PanicButton";
import BreathingExercise from "@/components/BreathingExercise";
import Visualizations from "@/components/Visualizations";

export default function ReliefTab() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Immediate Relief
        </h2>
        <p className="text-muted-foreground">
          Quick tools to help you feel better right now
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        <PanicButton />
        <BreathingExercise />
        <Visualizations />
      </div>
    </div>
  );
}