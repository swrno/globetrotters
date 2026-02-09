
"use client";

import { usePackages } from "@/hooks/usePackages";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, MapPin, Sparkles, ChevronRight, Layout } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

interface SmartRecommendationsProps {
  locationStatus?: 'granted' | 'prompt_required' | 'denied';
  currentPath?: string;
  timeContext?: string;
  lat?: number;
  lng?: number;
}

export function SmartRecommendations({ 
  locationStatus, 
  currentPath = "/", 
  timeContext,
  lat,
  lng
}: SmartRecommendationsProps) {
  const { packages, loading } = usePackages();

  const recommendations = useMemo(() => {
    if (!packages.length) return [];
    
    // Simple logic: if on a specific package page, suggest other categories or nearby?
    // For now, let's just pick 3 relevant ones.
    let base = [...packages];
    
    if (currentPath.includes('domestic')) {
      base = base.filter(p => p.category === 'international');
    } else if (currentPath.includes('international')) {
      base = base.filter(p => p.category === 'domestic');
    }

    // If categorized results are empty, fallback to any available packages
    if (base.length === 0) {
      base = [...packages];
    }

    // Mix it up
    return base.sort(() => 0.5 - Math.random()).slice(0, 3);
  }, [packages, currentPath]);

  // Determine season/vibe from timeContext or current date
  const date = new Date();
  const month = date.getMonth();
  const season = (month >= 2 && month <= 5) ? "Summer" : (month >= 6 && month <= 9) ? "Monsoon" : "Winter";

  return (
    <div className="space-y-4 my-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Context Summary */}
      <Card className="border-primary/20 bg-primary/5 overflow-hidden">
        <CardHeader className="py-3 px-4 flex flex-row items-center justify-between space-y-0">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary animate-pulse" />
            <CardTitle className="text-sm font-black uppercase tracking-tight">Smart Suggestions</CardTitle>
          </div>
          <div className="text-[10px] font-bold text-primary/60 bg-white/50 px-2 py-0.5 rounded-full border border-primary/10">
            {season} Vibes
          </div>
        </CardHeader>
        <CardContent className="px-4 pb-3 pt-0">
          <div className="flex flex-wrap gap-3 text-[10px] text-muted-foreground font-medium">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{timeContext || date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <div className="flex items-center gap-1">
              <Layout className="h-3 w-3" />
              <span>Viewing: {currentPath === "/" ? "Home" : currentPath.split('/').pop()}</span>
            </div>
            {locationStatus === 'granted' && (
              <div className="flex items-center gap-1 text-green-600">
                <MapPin className="h-3 w-3" />
                <span>Personalized for you</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations List */}
      <div className="grid grid-cols-1 gap-2">
        {loading ? (
          <div className="h-24 flex items-center justify-center text-xs text-muted-foreground bg-muted/20 rounded-lg border border-dashed">
            Finding the best deals...
          </div>
        ) : recommendations.map((pkg) => (
          <Link key={pkg.id} href={`/package/${pkg.id}`}>
            <Card className="group hover:border-primary/50 transition-all duration-300 overflow-hidden border-border shadow-sm">
              <div className="flex h-20">
                <div className="w-24 flex-none overflow-hidden relative">
                   <img 
                    src={pkg.images[0]} 
                    alt={pkg.title}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div className="absolute top-1 left-1 bg-black/60 text-[8px] text-white px-1.5 py-0.5 rounded-sm backdrop-blur-sm">
                    {pkg.category}
                  </div>
                </div>
                <div className="flex-1 p-3 flex flex-col justify-center min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="text-xs font-bold leading-tight truncate group-hover:text-primary transition-colors">
                      {pkg.title}
                    </h4>
                    <span className="text-xs font-black text-primary">₹{pkg.cost_per_person.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center text-[10px] text-muted-foreground mt-1">
                    <MapPin className="h-2.5 w-2.5 mr-1" />
                    <span className="truncate">{pkg.location}</span>
                  </div>
                </div>
                <div className="w-10 flex items-center justify-center bg-muted/30 group-hover:bg-primary/10 transition-colors">
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
      
      {locationStatus !== 'granted' && locationStatus !== 'denied' && (
        <p className="text-[10px] text-center text-muted-foreground italic">
          Try providing location access for even better suggestions!
        </p>
      )}
    </div>
  );
}
