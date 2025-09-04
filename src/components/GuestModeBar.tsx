import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Info, ArrowRight } from "lucide-react";

const GuestModeBar = () => {
  return (
    <div className="bg-primary/10 border-b border-primary/20">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <Info className="h-5 w-5 text-primary" />
            <span className="text-sm text-foreground">
              You're in <strong>Guest Mode</strong> with access to essential tools.
            </span>
          </div>
          <Button size="sm" variant="outline" asChild>
            <Link to="/signup" className="whitespace-nowrap">
              Get Full Access
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GuestModeBar;