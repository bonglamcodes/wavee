import Journal from "@/components/Journal";

export default function JournalTab() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Journal
        </h2>
        <p className="text-muted-foreground">
          Express your thoughts and track your emotions
        </p>
      </div>
      
      <Journal />
    </div>
  );
}