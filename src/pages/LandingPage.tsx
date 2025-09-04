import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Waves, Shield, Heart, Brain, ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-soft-blue to-accent">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Waves className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary">Wavee</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Find Your Calm in the
            <span className="text-primary block">Storm of Anxiety</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Wavee provides immediate relief for panic attacks and long-term tools for anxiety management. 
            Start your journey to mental wellness today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <Link to="/app">
                <Play className="mr-2 h-5 w-5" />
                Try Guest Mode
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
              <Link to="/signup">
                Create Free Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            No signup required to try essential features • Full access with free account
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-foreground mb-4">
            Immediate Relief When You Need It Most
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Access powerful tools designed by mental health professionals to help you through difficult moments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="p-6 text-center border-border/40 bg-background/60 backdrop-blur">
            <CardContent className="p-0">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-2">Panic Button</h4>
              <p className="text-muted-foreground">
                Guided step-by-step support through panic attacks with grounding techniques and breathing exercises.
              </p>
            </CardContent>
          </Card>

          <Card className="p-6 text-center border-border/40 bg-background/60 backdrop-blur">
            <CardContent className="p-0">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-2">Breathing Tools</h4>
              <p className="text-muted-foreground">
                Calming breathing exercises and visualizations to center yourself and reduce anxiety.
              </p>
            </CardContent>
          </Card>

          <Card className="p-6 text-center border-border/40 bg-background/60 backdrop-blur">
            <CardContent className="p-0">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-2">Learn & Grow</h4>
              <p className="text-muted-foreground">
                Educational content about anxiety, coping strategies, and building long-term resilience.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Guest Mode vs Full Access */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Start Immediately or Unlock Full Potential
            </h3>
            <p className="text-muted-foreground">
              Choose the experience that works best for you right now.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 border-border/40 bg-background/60 backdrop-blur">
              <CardContent className="p-0">
                <h4 className="text-2xl font-semibold text-foreground mb-4">Guest Mode</h4>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Panic Button & Guided Support
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Basic Breathing Exercises
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    One Free Lesson
                  </li>
                </ul>
                <Button className="w-full" variant="outline" asChild>
                  <Link to="/app">Try Now</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="p-8 border-primary/40 bg-primary/5 backdrop-blur">
              <CardContent className="p-0">
                <h4 className="text-2xl font-semibold text-foreground mb-4">Full Access</h4>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Everything in Guest Mode
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Personal Journal & Progress Tracking
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Complete Lessons Library
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Advanced Visualizations
                  </li>
                </ul>
                <Button className="w-full" asChild>
                  <Link to="/signup">Create Free Account</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Support Message */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center p-8 bg-background/60 backdrop-blur rounded-xl border border-border/40 max-w-3xl mx-auto">
          <h3 className="text-2xl font-semibold text-foreground mb-4">
            You're Not Alone in This Journey
          </h3>
          <p className="text-muted-foreground mb-6">
            Millions of people experience anxiety and panic attacks. Wavee is here to provide you with 
            evidence-based tools and support whenever you need them, day or night.
          </p>
          <Button size="lg" asChild>
            <Link to="/app">
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Waves className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold text-primary">Wavee</span>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              If you're experiencing a mental health emergency, please contact emergency services or a crisis helpline immediately.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;