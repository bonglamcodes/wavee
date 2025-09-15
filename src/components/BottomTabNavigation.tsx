import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Heart, 
  BookOpen, 
  GraduationCap, 
  TrendingUp, 
  Home 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomTabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "relief", label: "Relief", icon: Heart },
  { id: "journal", label: "Journal", icon: BookOpen },
  { id: "learn", label: "Learn", icon: GraduationCap },
  { id: "progress", label: "Progress", icon: TrendingUp },
  { id: "home", label: "Home", icon: Home },
];

export default function BottomTabNavigation({ activeTab, onTabChange }: BottomTabNavigationProps) {
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-t border-border">
      <div className="flex items-center justify-around h-16 px-2 safe-area-pb">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-col items-center justify-center min-w-0 flex-1 h-full transition-colors",
                "touch-manipulation", // Better mobile touch handling
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon 
                className={cn(
                  "h-5 w-5 mb-1 transition-transform",
                  isActive && "scale-110"
                )} 
              />
              <span className={cn(
                "text-xs font-medium leading-none",
                isActive && "text-primary"
              )}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}