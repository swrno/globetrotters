
"use client";

import { usePackages } from "@/hooks/usePackages";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, MapPin, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

// Initial check for UI components:
// I know Card exists. Button exists.

interface ChatPackageListProps {
  limit?: number;
  category?: 'domestic' | 'international' | 'all';
}

export function ChatPackageList({ limit = 5, category = 'all' }: ChatPackageListProps) {
  const { packages, loading, error } = usePackages();

  if (loading) {
    return (
      <div className="flex justify-center p-4">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-sm text-destructive p-2 border border-destructive/20 rounded bg-destructive/10">
        Failed to load packages completely.
      </div>
    );
  }

  let displayPackages = packages;
  
  if (category !== 'all') {
    displayPackages = displayPackages.filter(p => p.category === category);
  }
  
  if (limit > 0) {
    displayPackages = displayPackages.slice(0, limit);
  }

  if (displayPackages.length === 0) {
    return <div className="text-sm text-muted-foreground p-2">No packages found.</div>;
  }

  return (
    <div className="space-y-4 my-2 w-full">
      <div className="flex items-center justify-between px-1">
        <h4 className="text-sm font-medium text-muted-foreground">Available Packages</h4>
        <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
          {displayPackages.length} items
        </span>
      </div>
      
      {/* Horizontal scroll container for packages */}
      <div className="flex gap-4 overflow-x-auto pb-4 px-1 snap-x">
        {displayPackages.map((pkg) => (
          <Card key={pkg.id} className="min-w-[240px] max-w-[240px] snap-center flex-shrink-0 overflow-hidden flex flex-col">
            <div className="aspect-[4/3] relative w-full overflow-hidden bg-muted">
              {pkg.images && pkg.images.length > 0 ? (
                <img 
                  src={pkg.images[0]} 
                  alt={pkg.title}
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-300" 
                />
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  No Image
                </div>
              )}
              <div className="absolute top-2 right-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full backdrop-blur-sm">
                {pkg.days}D / {pkg.nights}N
              </div>
            </div>
            
            <CardHeader className="p-3 pb-0">
              <CardTitle className="text-base line-clamp-1" title={pkg.title}>
                {pkg.title}
              </CardTitle>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <MapPin className="h-3 w-3 mr-1" />
                <span className="truncate">{pkg.location}</span>
              </div>
            </CardHeader>
            
            <CardContent className="p-3 pt-2 flex-grow">
               <div className="flex flex-wrap gap-1 mb-2">
                 {pkg.tags.slice(0, 2).map((tag, i) => (
                   <span key={i} className="text-[10px] bg-secondary px-1.5 py-0.5 rounded border border-secondary-foreground/10">
                     {tag}
                   </span>
                 ))}
               </div>
            </CardContent>
            
            <CardFooter className="p-3 pt-0 mt-auto">
              <Link href={`/package/${pkg.id}`} className="w-full">
                <Button variant="secondary" size="sm" className="w-full text-xs h-8">
                  View Details <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
