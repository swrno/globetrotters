
"use client";

import { usePackages } from "@/hooks/usePackages";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, MapPin, Calendar, Clock, CheckCircle2, Info } from "lucide-react";
import Link from "next/link";

interface ChatPackageCardProps {
  id: string;
}

export function ChatPackageCard({ id }: ChatPackageCardProps) {
  const { packages, loading, error } = usePackages();

  const pkg = packages.find(p => p.id === id);

  if (loading) {
    return (
      <div className="flex justify-center p-8 bg-muted/20 rounded-lg border border-border">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !pkg) {
    return (
      <div className="text-sm text-destructive p-4 border border-destructive/20 rounded bg-destructive/5 flex items-center gap-2">
        <Info className="h-4 w-4" />
        <span>Could not find package details. It might have been removed.</span>
      </div>
    );
  }

  return (
    <Card className="overflow-hidden border-border shadow-md my-2 max-w-full">
      {/* Hero Image Section */}
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        {pkg.images && pkg.images.length > 0 ? (
          <img 
            src={pkg.images[0]} 
            alt={pkg.title}
            className="object-cover w-full h-full" 
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-muted text-muted-foreground">
            No Preview Available
          </div>
        )}
        <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full shadow-lg">
          {pkg.days}D / {pkg.nights}N
        </div>
      </div>

      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start gap-2">
          <div>
            <CardTitle className="text-xl font-bold leading-tight">
              {pkg.title}
            </CardTitle>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <MapPin className="h-3.5 w-3.5 mr-1 text-primary" />
              <span>{pkg.location}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground line-through">₹{(pkg.cost_per_person * 1.2).toLocaleString()}</div>
            <div className="text-xl font-black text-primary">₹{pkg.cost_per_person.toLocaleString()}</div>
            <div className="text-[10px] text-muted-foreground">per person</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-0 space-y-4">
        {/* Description Snippet */}
        <div 
          className="text-sm text-foreground/80 leading-relaxed italic border-l-2 border-primary/30 pl-3"
          dangerouslySetInnerHTML={{ __html: pkg.description || "Embark on an unforgettable journey with our premium travel package." }}
        />

        {/* Highlights/Tags */}
        <div className="grid grid-cols-2 gap-2">
          {pkg.tags.slice(0, 4).map((tag, i) => (
            <div key={i} className="flex items-center text-xs text-muted-foreground">
              <CheckCircle2 className="h-3 w-3 mr-1.5 text-green-500" />
              <span className="truncate">{tag}</span>
            </div>
          ))}
        </div>

        {/* Categories/Badges */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
          <span className="text-[10px] uppercase tracking-wider font-bold bg-secondary text-secondary-foreground px-2 py-0.5 rounded">
            {pkg.category}
          </span>
          <span className="text-[10px] uppercase tracking-wider font-bold bg-primary/10 text-primary px-2 py-0.5 rounded border border-primary/20">
            Premium
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
        <Link href={`/package/${pkg.id}`} className="flex-1">
          <Button variant="default" className="w-full font-bold">
            View Full Package
          </Button>
        </Link>
        <Button 
          variant="outline" 
          onClick={() => {
            const el = document.querySelector('[data-slot="message-input-textarea"]');
            if (el instanceof HTMLTextAreaElement) {
              el.value = `I'm interested in the ${pkg.title} package. Can you tell me more about it?`;
              el.focus();
              // Trigger input event to resize/update state if needed
              el.dispatchEvent(new Event('input', { bubbles: true }));
            }
          }}
        >
          Inquire
        </Button>
      </CardFooter>
    </Card>
  );
}
