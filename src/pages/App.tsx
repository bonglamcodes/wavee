import { useState } from "react";
import { Waves } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import BottomTabNavigation from "@/components/BottomTabNavigation";
import ReliefTab from "@/components/tabs/ReliefTab";
import JournalTab from "@/components/tabs/JournalTab";
import LearnTab from "@/components/tabs/LearnTab";
import ProgressTab from "@/components/tabs/ProgressTab";
import HomeTab from "@/components/tabs/HomeTab";

const App = () => {
  const [activeTab, setActiveTab] = useState("relief"); // Start with relief for crisis accessibility
  const isMobile = useIsMobile();

  const renderTabContent = () => {
    switch (activeTab) {
      case "relief":
        return <ReliefTab />;
      case "journal":
        return <JournalTab />;
      case "learn":
        return <LearnTab />;
      case "progress":
        return <ProgressTab />;
      case "home":
        return <HomeTab />;
      default:
        return <HomeTab />;
    }
  };

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
      <main className={`container mx-auto px-4 py-8 ${isMobile ? 'pb-20' : ''}`}>
        {isMobile ? (
          // Mobile: Tab-based content
          renderTabContent()
        ) : (
          // Desktop: Original full layout
          <>
            {/* Welcome Section */}
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Welcome to Wavee
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Your complete mental wellness companion. Take a deep breath - you're in a safe space with access to all features.
              </p>
            </div>

            <HomeTab />
          </>
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomTabNavigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />

      {/* Footer - only show on desktop */}
      {!isMobile && (
        <footer className="border-t border-border/40 mt-16">
          <div className="container mx-auto px-4 py-6 text-center">
            <p className="text-xs text-muted-foreground">
              If you're experiencing a mental health emergency, please contact emergency services immediately.
            </p>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;