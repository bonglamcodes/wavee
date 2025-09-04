const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-soft-blue to-accent">
      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-primary rounded"></div>
            <h1 className="text-2xl font-bold text-primary">Wavee</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-foreground px-4 py-2 rounded">
              Log In
            </button>
            <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded">
              Get Started
            </button>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Find Your Calm in the Storm
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Wavee provides immediate relief and long-term tools for anxiety, panic attacks, and stress management. 
            Get instant support whenever you need it, right in your browser.
          </p>
          <button className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6 rounded">
            Start Your Journey
          </button>
        </div>
      </section>
    </div>
  );
};

export default App;
