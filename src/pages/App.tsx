import { useState, useEffect } from "react";
import PanicButton from "@/components/PanicButton";
import BreathingExercise from "@/components/BreathingExercise";
import Visualizations from "@/components/Visualizations";
import Journal from "@/components/Journal";
import ProgressTracker from "@/components/ProgressTracker";
import LessonsLibrary from "@/components/LessonsLibrary";
import GuestModeBar from "@/components/GuestModeBar";
import { Waves, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const App = () => {
  const [isGuest, setIsGuest] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated (you can implement proper auth logic here)
    const authStatus = localStorage.getItem('wavee-auth-status');
    if (authStatus === 'authenticated') {
      setIsAuthenticated(true);
      setIsGuest(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-soft-blue to-accent">
      {/* Guest Mode Notification */}
      {isGuest && <GuestModeBar />}

      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Waves className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary">Wavee</h1>
          </div>
          
          <div className="flex items-center gap-4">
            {isGuest ? (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/signup">Get Full Access</Link>
                </Button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Welcome back!</span>
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Button>
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            {isGuest ? "Welcome to Wavee" : "Welcome Back"}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {isGuest 
              ? "You're in Guest Mode with access to essential tools. Take a deep breath - you're in a safe space."
              : "Your personal mental wellness dashboard. We're here to support you every step of the way."
            }
          </p>
        </div>

        {/* Emergency Tools - Always Available */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-foreground mb-4">Immediate Relief</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <PanicButton />
            <BreathingExercise isGuest={isGuest} />
            <Visualizations isGuest={isGuest} />
          </div>
        </div>

        {/* Conditional Content Based on Auth Status */}
        {!isGuest && (
          <>
            {/* Self-Care Tools - Full Access Only */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-foreground mb-4">Daily Wellness</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Journal />
                <LessonsLibrary isGuest={false} />
              </div>
            </div>

            {/* Progress Section - Full Access Only */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-foreground mb-4">Your Journey</h3>
              <ProgressTracker />
            </div>
          </>
        )}

        {/* Guest Mode Limited Access */}
        {isGuest && (
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-foreground mb-4">Learn & Grow</h3>
            <LessonsLibrary isGuest={true} />
          </div>
        )}

        {/* Support Message */}
        <div className="text-center mt-16 p-8 bg-background/60 backdrop-blur rounded-xl border border-border/40">
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Remember: You Are Stronger Than You Think
          </h3>
          <p className="text-muted-foreground mb-4">
            Every small step you take towards managing your mental health matters. 
            Be patient and kind to yourself on this journey.
          </p>
          {isGuest && (
            <Button asChild>
              <Link to="/signup">Unlock Full Features</Link>
            </Button>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 mt-16">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-sm text-muted-foreground">
            If you're experiencing a mental health emergency, please contact emergency services or a crisis helpline immediately.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;