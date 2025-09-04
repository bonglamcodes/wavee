import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, Save, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface JournalEntry {
  id: string;
  date: string;
  mood: string;
  content: string;
}

const Journal = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState("");
  const [selectedMood, setSelectedMood] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const { toast } = useToast();

  const moods = [
    { emoji: "😄", label: "Great", value: "great" },
    { emoji: "😊", label: "Good", value: "good" },
    { emoji: "😐", label: "Okay", value: "okay" },
    { emoji: "😔", label: "Low", value: "low" },
    { emoji: "😰", label: "Anxious", value: "anxious" }
  ];

  useEffect(() => {
    const savedEntries = localStorage.getItem("wavee-journal-entries");
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  const saveEntry = () => {
    if (!currentEntry.trim() || !selectedMood) {
      toast({
        title: "Incomplete Entry",
        description: "Please write something and select your mood",
        variant: "destructive"
      });
      return;
    }

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      mood: selectedMood,
      content: currentEntry
    };

    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    localStorage.setItem("wavee-journal-entries", JSON.stringify(updatedEntries));
    
    setCurrentEntry("");
    setSelectedMood("");
    
    toast({
      title: "Entry Saved",
      description: "Your journal entry has been saved successfully",
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getMoodEmoji = (mood: string) => {
    return moods.find(m => m.value === mood)?.emoji || "😐";
  };

  if (showHistory) {
    return (
      <Card className="bg-gradient-to-br from-accent to-soft-blue border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <CardTitle>Journal History</CardTitle>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setShowHistory(false)}
            >
              New Entry
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 max-h-96 overflow-y-auto">
          {entries.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No journal entries yet. Start writing to track your journey.
            </div>
          ) : (
            entries.map((entry) => (
              <div key={entry.id} className="p-4 bg-background/50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{getMoodEmoji(entry.mood)}</span>
                  <span className="text-sm text-muted-foreground">
                    {formatDate(entry.date)}
                  </span>
                </div>
                <p className="text-foreground">{entry.content}</p>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-accent to-soft-blue border-primary/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <CardTitle>Daily Journal</CardTitle>
          </div>
          {entries.length > 0 && (
            <Button 
              variant="outline" 
              onClick={() => setShowHistory(true)}
            >
              <Calendar className="h-4 w-4 mr-2" />
              History
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="text-sm font-medium text-foreground mb-3 block">
            How are you feeling today?
          </label>
          <div className="flex gap-2 flex-wrap">
            {moods.map((mood) => (
              <Button
                key={mood.value}
                variant={selectedMood === mood.value ? "default" : "outline"}
                className={`h-auto p-3 flex-col gap-1 ${
                  selectedMood === mood.value ? "bg-primary text-primary-foreground" : ""
                }`}
                onClick={() => setSelectedMood(mood.value)}
              >
                <span className="text-2xl">{mood.emoji}</span>
                <span className="text-xs">{mood.label}</span>
              </Button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            What's on your mind?
          </label>
          <Textarea
            placeholder="Write about your thoughts, feelings, or experiences today. This is your safe space..."
            value={currentEntry}
            onChange={(e) => setCurrentEntry(e.target.value)}
            className="min-h-[120px] resize-none"
          />
        </div>

        <Button 
          onClick={saveEntry}
          className="w-full bg-primary hover:bg-primary/90"
          disabled={!currentEntry.trim() || !selectedMood}
        >
          <Save className="h-4 w-4 mr-2" />
          Save Entry
        </Button>

        <div className="text-center text-sm text-muted-foreground">
          Your entries are private and stored locally on your device
        </div>
      </CardContent>
    </Card>
  );
};

export default Journal;