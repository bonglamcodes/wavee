import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Waves, ArrowLeft, Check } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeToTerms) return;
    
    // Simple demo signup - in a real app, you'd create the account
    localStorage.setItem('wavee-auth-status', 'authenticated');
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-soft-blue to-accent flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Waves className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary">Wavee</h1>
          </div>
          <h2 className="text-3xl font-bold text-foreground">Join Wavee Today</h2>
          <p className="text-muted-foreground mt-2">Start your journey to better mental wellness with full access to all features</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Sign Up Form */}
          <Card className="border-border/40 bg-background/80 backdrop-blur">
            <CardHeader>
              <CardTitle>Create Your Account</CardTitle>
              <CardDescription>
                100% free - no credit card required
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a secure password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={agreeToTerms}
                    onCheckedChange={(checked) => setAgreeToTerms(!!checked)}
                  />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the Terms of Service and Privacy Policy
                  </Label>
                </div>
                
                <Button type="submit" className="w-full" disabled={!agreeToTerms}>
                  Create Account
                </Button>
              </form>
              
              <div className="mt-6 text-center space-y-4">
                <div className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary hover:underline">
                    Sign in here
                  </Link>
                </div>
                
                <div className="pt-4 border-t border-border/40">
                  <Link to="/app" className="text-sm text-primary hover:underline">
                    Continue as Guest instead
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card className="border-primary/40 bg-primary/5 backdrop-blur">
            <CardHeader>
              <CardTitle>What You'll Get</CardTitle>
              <CardDescription>
                Unlock the full power of Wavee with your free account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Personal Journal</h4>
                    <p className="text-sm text-muted-foreground">Track your thoughts, feelings, and progress over time</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Progress Tracking</h4>
                    <p className="text-sm text-muted-foreground">See your growth and celebrate achievements</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Complete Lessons Library</h4>
                    <p className="text-sm text-muted-foreground">Access all anxiety management and coping strategies</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Advanced Tools</h4>
                    <p className="text-sm text-muted-foreground">Unlock all breathing exercises and visualizations</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Cross-Device Sync</h4>
                    <p className="text-sm text-muted-foreground">Access your data from any device, anywhere</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Signup;