import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Waves, Shield, Heart, Brain, Zap, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-soft-blue to-accent">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Waves className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary">Wavee</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" className="text-foreground">
                Log In
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Find Your Calm in the Storm
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Wavee provides immediate relief and long-term tools for anxiety, panic attacks, and stress management. 
            Get instant support whenever you need it, right in your browser.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6">
                Start Your Journey
              </Button>
            </Link>
            <Link to="/demo">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                Try Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Immediate Relief When You Need It
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Access powerful tools designed to help you manage anxiety, panic attacks, and stress in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <Card className="bg-background/60 backdrop-blur border-border/40">
            <CardHeader>
              <Zap className="h-12 w-12 text-panic-red mb-4" />
              <CardTitle>Panic Button</CardTitle>
              <CardDescription>
                Instant guided relief for panic attacks with proven grounding techniques
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-background/60 backdrop-blur border-border/40">
            <CardHeader>
              <Heart className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Breathing Exercises</CardTitle>
              <CardDescription>
                Interactive breathing guides with customizable sessions and calming sounds
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-background/60 backdrop-blur border-border/40">
            <CardHeader>
              <Brain className="h-12 w-12 text-calming-teal mb-4" />
              <CardTitle>Guided Visualizations</CardTitle>
              <CardDescription>
                Immersive relaxation scenarios to transport you to your safe space
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-background/60 backdrop-blur border-border/40">
            <CardHeader>
              <Shield className="h-12 w-12 text-success-green mb-4" />
              <CardTitle>Learning Center</CardTitle>
              <CardDescription>
                Evidence-based lessons on anxiety management and coping strategies
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-background/60 backdrop-blur border-border/40">
            <CardHeader>
              <Users className="h-12 w-12 text-accent mb-4" />
              <CardTitle>Personal Journal</CardTitle>
              <CardDescription>
                Track your mood and progress with private journaling and insights
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-background/60 backdrop-blur border-border/40">
            <CardHeader>
              <Waves className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Progress Tracking</CardTitle>
              <CardDescription>
                Monitor your journey with streaks, achievements, and usage insights
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-background/60 backdrop-blur rounded-xl border border-border/40 p-8">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Ready to Take Control of Your Mental Health?
          </h3>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join thousands who have found peace with Wavee. Start your journey to better mental wellness today.
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6">
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Waves className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold text-foreground">Wavee</span>
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

export default Landing;