import LessonsLibrary from "@/components/LessonsLibrary";

export default function LearnTab() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Learn & Grow
        </h2>
        <p className="text-muted-foreground">
          Explore mental wellness resources and build resilience
        </p>
      </div>
      
      <LessonsLibrary />
    </div>
  );
}