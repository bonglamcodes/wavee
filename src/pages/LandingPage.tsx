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
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Get Started ✨</Link>
            </Button>
          </div>
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
              <span className="text-primary block">Storm of Anxiety 🌈</span>
            </h2>
          </div>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Wavee provides immediate relief for panic attacks and long-term tools for anxiety management. 
            Start your journey to mental wellness today. 💚
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300" asChild>
              <Link to="/app">
                <Play className="mr-2 h-5 w-5" />
                Try Guest Mode 🚀
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-background/80 backdrop-blur border-primary/30 hover:bg-primary/5" asChild>
              <Link to="/signup">
                Create Free Account 🎯
                <ArrowRight className="ml-2 h-5 w-5" />
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
            No signup required to try essential features • Full access with free account 🌟
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
            Access powerful tools designed by mental health professionals to help you through difficult moments. 💪
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="group p-6 text-center border-border/40 bg-background/60 backdrop-blur hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-0">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
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

          <Card className="group p-6 text-center border-border/40 bg-background/60 backdrop-blur hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-0">
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-2xl overflow-hidden mx-auto mb-4 group-hover:scale-110 transition-transform">
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

          <Card className="group p-6 text-center border-border/40 bg-background/60 backdrop-blur hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-0">
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-2xl overflow-hidden mx-auto mb-4 group-hover:scale-110 transition-transform">
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

      {/* Guest Mode vs Full Access */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Start Immediately or Unlock Full Potential
            </h3>
            <p className="text-muted-foreground">
              Choose the experience that works best for you right now. 🎯
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="group p-8 border-border/40 bg-background/60 backdrop-blur hover:shadow-lg transition-all duration-300">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">🌟</div>
                  <h4 className="text-2xl font-semibold text-foreground">Guest Mode</h4>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    🛡️ Panic Button & Guided Support
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    🌬️ Basic Breathing Exercises
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    📚 One Free Lesson
                  </li>
                </ul>
                <Button className="w-full group-hover:scale-105 transition-transform" variant="outline" asChild>
                  <Link to="/app">Try Now 🚀</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group p-8 border-primary/40 bg-gradient-to-br from-primary/5 to-accent/10 backdrop-blur hover:shadow-xl transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-full blur-2xl"></div>
              <CardContent className="p-0 relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">✨</div>
                  <h4 className="text-2xl font-semibold text-foreground">Full Access</h4>
                  <div className="ml-auto bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                    FREE
                  </div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    🌟 Everything in Guest Mode
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    📝 Personal Journal & Progress Tracking
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    📖 Complete Lessons Library
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    🧘‍♀️ Advanced Visualizations
                  </li>
                </ul>
                <Button className="w-full group-hover:scale-105 transition-transform shadow-lg" asChild>
                  <Link to="/signup">Create Free Account 🎯</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
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
          <div className="text-center p-6">
            <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
            <div className="text-muted-foreground">Users helped 🌈</div>
          </div>
          <div className="text-center p-6">
            <div className="text-3xl font-bold text-primary mb-2">4.9/5</div>
            <div className="text-muted-foreground">User rating ⭐</div>
          </div>
          <div className="text-center p-6">
            <div className="text-3xl font-bold text-primary mb-2">24/7</div>
            <div className="text-muted-foreground">Always available 🕰️</div>
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
          <div className="relative z-10 text-center p-12 bg-background/60 backdrop-blur rounded-3xl border border-border/40 max-w-3xl mx-auto">
            <div className="text-5xl mb-6">🤗</div>
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              You're Not Alone in This Journey
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Millions of people experience anxiety and panic attacks. Wavee is here to provide you with 
              evidence-based tools and support whenever you need them, day or night. 💚
            </p>
            <Button size="lg" className="shadow-lg hover:shadow-xl transition-all duration-300" asChild>
              <Link to="/app">
                Start Your Journey ✨
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 mt-16 bg-background/50 backdrop-blur">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Waves className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold text-primary">Wavee</span>
              <span className="text-sm text-muted-foreground">🌊 Mental wellness companion</span>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">
                🚨 If you're experiencing a mental health emergency, please contact emergency services or a crisis helpline immediately.
              </p>
              <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                <span>🔒 Your privacy matters</span>
                <span>•</span>
                <span>🌟 Evidence-based tools</span>
                <span>•</span>
                <span>💚 Made with care</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;