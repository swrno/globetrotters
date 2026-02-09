
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MapPin, CheckCircle2, Navigation, Loader2 } from "lucide-react";

export function LocationPermissionCard() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const requestLocation = () => {
    setStatus('loading');
    setError(null);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setStatus('error');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setStatus('success');
        // Dispatch an event so other components or the agent can know
        window.dispatchEvent(new CustomEvent("tambo:location_granted", { 
          detail: { 
            lat: position.coords.latitude, 
            lng: position.coords.longitude 
          } 
        }));
      },
      (err) => {
        setError(err.message);
        setStatus('error');
      },
      { timeout: 10000 }
    );
  };

  if (status === 'success') {
    return (
      <Card className="w-full max-w-sm my-2 border-green-200 bg-green-50/50">
        <CardContent className="pt-6 flex flex-col items-center text-center space-y-2">
          <CheckCircle2 className="h-8 w-8 text-green-500" />
          <p className="text-sm font-medium text-green-800">Location access granted!</p>
          <p className="text-xs text-green-600">I can now provide personalized recommendations based on your area.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-sm my-2 overflow-hidden border-primary/20 shadow-sm">
      <CardHeader className="bg-primary/5 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <MapPin className="h-4 w-4 text-primary" />
          <CardTitle className="text-sm font-bold">Personalize your experience</CardTitle>
        </div>
        <CardDescription className="text-xs">
          Grant location access to see the best holiday packages from your nearest airport.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4 space-y-3">
        {error && (
          <p className="text-[10px] text-destructive bg-destructive/5 p-2 rounded border border-destructive/10">
            {error}
          </p>
        )}
        <Button 
          onClick={requestLocation} 
          disabled={status === 'loading'}
          className="w-full text-xs font-bold gap-2"
          size="sm"
        >
          {status === 'loading' ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Navigation className="h-3.5 w-3.5" />
          )}
          {status === 'loading' ? 'Requesting...' : 'Share Location'}
        </Button>
      </CardContent>
    </Card>
  );
}
