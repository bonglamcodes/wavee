import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Waves, Shield, Heart, Brain, ArrowRight, Play, Users, Clock, Star } from "lucide-react";
import { Link } from "react-router-dom";
import heroBackground from "@/assets/hero-background.jpg";
import meditationIllustration from "@/assets/meditation-illustration.jpg";
import breathingVisual from "@/assets/breathing-visual.jpg";
import growthIllustration from "@/assets/growth-illustration.jpg";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-soft-blue to-accent relative overflow-hidden">
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-accent/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-24 h-24 bg-primary/8 rounded-full blur-lg animate-pulse delay-2000"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Waves className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary">Wavee</h1>
            <span className="text-sm text-muted-foreground hidden sm:block">🌊 Your calm companion</span>
          </div>
          <Button asChild>
            <Link to="/app">Start Using Wavee ✨</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative container mx-auto px-4 py-16 text-center">
        <div 
          className="absolute inset-0 opacity-30 bg-cover bg-center rounded-3xl"
          style={{ backgroundImage: `url(${heroBackground})` }}
        ></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="text-6xl mb-4">🌸</div>
            <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Find Your Calm in the
              <span className="text-primary block">Storm of Anxiety</span>
            </h2>
          </div>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Wavee provides immediate relief for panic attacks and long-term tools for anxiety management. 
            Start your journey to mental wellness today.
          </p>
          
          <div className="flex justify-center mb-12">
            <Button size="lg" className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-primary to-calming-teal hover:from-primary/90 hover:to-calming-teal/90" asChild>
              <Link to="/app">
                <Play className="mr-2 h-5 w-5" />
                Start Using Wavee
              </Link>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>10,000+ users</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <span>4.9/5 rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-500" />
              <span>100% private</span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mt-6">
            No signup required • Complete access to all features
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="text-4xl mb-4">🧘‍♀️</div>
          <h3 className="text-3xl font-bold text-foreground mb-4">
            Immediate Relief When You Need It Most
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Access powerful tools designed by mental health professionals to help you through difficult moments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="group p-6 text-center border-border/40 bg-background/80 backdrop-blur hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-0">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-calming-teal/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Shield className="h-10 w-10 text-primary" />
                </div>
                <div className="absolute -top-2 -right-2 text-2xl">🛡️</div>
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-2">Panic Button</h4>
              <p className="text-muted-foreground">
                Guided step-by-step support through panic attacks with grounding techniques and breathing exercises.
              </p>
            </CardContent>
          </Card>

          <Card className="group p-6 text-center border-border/40 bg-background/80 backdrop-blur hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-0">
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-2xl overflow-hidden mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <img src={breathingVisual} alt="Breathing exercises" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -top-2 -right-2 text-2xl">🌬️</div>
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-2">Breathing Tools</h4>
              <p className="text-muted-foreground">
                Calming breathing exercises and visualizations to center yourself and reduce anxiety.
              </p>
            </CardContent>
          </Card>

          <Card className="group p-6 text-center border-border/40 bg-background/80 backdrop-blur hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-0">
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-2xl overflow-hidden mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                  <img src={growthIllustration} alt="Learn and grow" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -top-2 -right-2 text-2xl">🧠</div>
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-2">Learn & Grow</h4>
              <p className="text-muted-foreground">
                Educational content about anxiety, coping strategies, and building long-term resilience.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-4xl mb-4">✨</div>
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Complete Access to All Features
            </h3>
            <p className="text-muted-foreground">
              Everything you need for anxiety management, available immediately.
            </p>
          </div>

          <Card className="p-8 border-primary/30 bg-gradient-to-br from-primary/5 via-background/80 to-calming-teal/5 backdrop-blur shadow-xl">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Immediate Relief
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-center text-muted-foreground">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      Panic Button & Guided Support
                    </li>
                    <li className="flex items-center text-muted-foreground">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      Breathing Exercises & Visualizations
                    </li>
                    <li className="flex items-center text-muted-foreground">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      Grounding Techniques
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Heart className="h-5 w-5 text-primary" />
                    Long-term Management
                  </h4>
                  <ul className="space-y-3">
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
                      Educational Resources
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 text-center">
                <Button size="lg" className="shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-primary to-calming-teal hover:from-primary/90 hover:to-calming-teal/90" asChild>
                  <Link to="/app">Start Using Wavee Now</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonial/Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="text-4xl mb-4">💙</div>
          <h3 className="text-3xl font-bold text-foreground mb-4">
            Trusted by Thousands
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-background/60 rounded-xl backdrop-blur border border-border/30">
            <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
            <div className="text-muted-foreground">Users helped</div>
          </div>
          <div className="text-center p-6 bg-background/60 rounded-xl backdrop-blur border border-border/30">
            <div className="text-3xl font-bold text-primary mb-2">4.9/5</div>
            <div className="text-muted-foreground">User rating</div>
          </div>
          <div className="text-center p-6 bg-background/60 rounded-xl backdrop-blur border border-border/30">
            <div className="text-3xl font-bold text-primary mb-2">24/7</div>
            <div className="text-muted-foreground">Always available</div>
          </div>
        </div>
      </section>

      {/* Support Message */}
      <section className="container mx-auto px-4 py-16">
        <div className="relative">
          <div 
            className="absolute inset-0 opacity-20 bg-cover bg-center rounded-3xl"
            style={{ backgroundImage: `url(${meditationIllustration})` }}
          ></div>
          <div className="relative z-10 text-center p-12 bg-background/80 backdrop-blur rounded-3xl border border-border/30 max-w-3xl mx-auto shadow-xl">
            <div className="text-5xl mb-6">🤗</div>
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              You're Not Alone in This Journey
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Millions of people experience anxiety and panic attacks. Wavee is here to provide you with 
              evidence-based tools and support whenever you need them, day or night.
            </p>
            <Button size="lg" className="shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-primary to-calming-teal hover:from-primary/90 hover:to-calming-teal/90" asChild>
              <Link to="/app">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 mt-16 bg-background/80 backdrop-blur">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="flex items-center gap-2">
              <Waves className="h-5 w-5 text-primary" />
              <span className="text-lg font-semibold text-primary">Wavee</span>
            </div>
            <p className="text-xs text-muted-foreground max-w-md">
              If you're experiencing a mental health emergency, please contact emergency services immediately.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;