import ProgressTracker from "@/components/ProgressTracker";

export default function ProgressTab() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Your Progress
        </h2>
        <p className="text-muted-foreground">
          Track your wellness journey and celebrate milestones
        </p>
      </div>
      
      <ProgressTracker />
    </div>
  );
}