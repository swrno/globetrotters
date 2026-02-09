"use client";

import { useState, useMemo, useEffect, ChangeEvent } from "react";
import { usePackages } from "@/hooks/usePackages";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../../ui/textarea";
import { 
  Loader2, 
  CheckCircle2, 
  Sparkles, 
  Settings2, 
  Plus, 
  Minus, 
  User, 
  Mail, 
  Phone,
  ArrowRight
} from "lucide-react";

interface PackageCustomizerProps {
  packageId?: string;
}

export function PackageCustomizer({ packageId: propPackageId }: PackageCustomizerProps) {
  const [packageId, setPackageId] = useState<string | undefined>(propPackageId);
  const { packages, loading } = usePackages();

  // Try to detect packageId from URL if not provided
  useEffect(() => {
    if (!packageId && typeof window !== "undefined") {
      const match = window.location.pathname.match(/\/package\/([^/]+)/);
      if (match && match[1]) {
        setPackageId(match[1]);
      }
    }
  }, [packageId]);

  const pkg = useMemo(() => packages.find(p => p.id === packageId), [packages, packageId]);

  const [step, setStep] = useState(1);
  const [selectedInclusions, setSelectedInclusions] = useState<string[]>([]);
  const [days, setDays] = useState(0);
  const [nights, setNights] = useState(0);
  const [userInfo, setUserInfo] = useState({ name: "", email: "", phone: "" });
  const [customRequests, setCustomRequests] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Initialize values when package loads
  useEffect(() => {
    if (pkg) {
      setDays(prev => prev === 0 ? pkg.days : prev);
      setNights(prev => prev === 0 ? pkg.nights : prev);
      if (selectedInclusions.length === 0 && pkg.inclusions_exclusions?.inclusions) {
        setSelectedInclusions(pkg.inclusions_exclusions.inclusions);
      }
    }
  }, [pkg, selectedInclusions.length]);

  const handleInclusionToggle = (item: string) => {
    setSelectedInclusions(prev => 
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/customized-packages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageId,
          userName: userInfo.name,
          userEmail: userInfo.email,
          userPhone: userInfo.phone,
          selectedInclusions,
          customDays: days,
          customNights: nights,
          customRequests,
          priceSnapshot: pkg?.cost_per_person || 0,
        }),
      });

      if (!response.ok) throw new Error("Failed to save customization");
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return (
    <Card className="w-full my-2 border-dashed flex items-center justify-center p-8">
      <Loader2 className="h-6 w-6 animate-spin text-primary" />
    </Card>
  );

  if (!pkg) return (
    <Card className="w-full my-4 border-dashed bg-muted/20">
      <CardContent className="pt-6 text-center space-y-3">
        <Sparkles className="h-8 w-8 text-primary mx-auto opacity-50" />
        <div className="space-y-1">
          <h3 className="font-bold text-sm">Which package should we customize?</h3>
          <p className="text-xs text-muted-foreground px-4">
            Navigate to a specific holiday package page, or ask me for details about a package first.
          </p>
        </div>
      </CardContent>
    </Card>
  );

  if (status === 'success') {
    return (
      <Card className="w-full my-2 border-green-200 bg-green-50/30 animate-in zoom-in-95">
        <CardContent className="pt-6 text-center space-y-4">
          <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="h-6 w-6 text-green-600" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-green-900">Personalization Saved!</h3>
            <p className="text-sm text-green-700">Our travel experts will review your custom plan for {pkg.title} and reach out shortly.</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => setStatus('idle')} className="text-xs">
            Make more changes
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full my-4 overflow-hidden shadow-lg border-primary/20 bg-gradient-to-b from-white to-primary/5">
      <CardHeader className="pb-4 relative border-b bg-white">
        <div className="absolute top-4 right-4 bg-primary/10 p-2 rounded-full text-primary">
          <Settings2 className="h-5 w-5" />
        </div>
        <CardTitle className="text-lg font-black tracking-tight">{pkg.title}</CardTitle>
        <CardDescription className="text-xs font-medium">Design your perfect itinerary</CardDescription>
        
        {/* Progress Dots */}
        <div className="flex gap-1 mt-4">
          {[1, 2, 3].map(s => (
            <div key={s} className={`h-1 flex-1 rounded-full transition-colors ${step >= s ? 'bg-primary' : 'bg-muted'}`} />
          ))}
        </div>
      </CardHeader>

      <CardContent className="pt-6 space-y-6">
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
            <div className="space-y-3">
              <Label className="text-sm font-bold flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                Customize Inclusions
              </Label>
              <div className="grid grid-cols-1 gap-2">
                {pkg.inclusions_exclusions?.inclusions.map((item: string, i: number) => (
                  <div 
                    key={i} 
                    onClick={() => handleInclusionToggle(item)}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                      selectedInclusions.includes(item) 
                        ? 'bg-primary/5 border-primary/40 shadow-sm' 
                        : 'bg-white border-border hover:border-primary/20'
                    }`}
                  >
                    <span className="text-xs font-medium">{item}</span>
                    <div className={`h-5 w-5 rounded-full border flex items-center justify-center transition-colors ${
                      selectedInclusions.includes(item) ? 'bg-primary border-primary text-white' : 'bg-white border-muted'
                    }`}>
                      {selectedInclusions.includes(item) && <CheckCircle2 className="h-3 w-3" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <Label className="text-sm font-bold">Adjust Duration</Label>
              <div className="flex items-center justify-center gap-8 bg-white p-4 rounded-2xl border border-muted shadow-sm">
                <div className="text-center space-y-1">
                  <div className="flex items-center gap-3">
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => setDays(Math.max(1, days-1))}>
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-xl font-black w-8">{days}</span>
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => setDays(days+1)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Days</span>
                </div>
                <div className="text-center space-y-1">
                  <div className="flex items-center gap-3">
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => setNights(Math.max(1, nights-1))}>
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-xl font-black w-8">{nights}</span>
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => setNights(nights+1)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Nights</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
            <Label className="text-sm font-bold">Special Requirements</Label>
            <Textarea 
              placeholder="E.g. Vegetarian meals only, room with a view, specific dates..."
              className="min-h-[120px] text-sm resize-none"
              value={customRequests}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setCustomRequests(e.target.value)}
            />
            <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 flex gap-3">
                <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center flex-none">
                    <Sparkles className="h-4 w-4 text-primary" />
                </div>
                <p className="text-xs text-muted-foreground">
                    &quot;I&apos;d love to add a private dinner experience or upgrade to a sea-view room.&quot;
                </p>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
            <Label className="text-sm font-bold">Contact Details</Label>
            <div className="space-y-3">
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Full Name" 
                  className="pl-9" 
                  value={userInfo.name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setUserInfo({...userInfo, name: e.target.value})}
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Email Address" 
                  className="pl-9" 
                  value={userInfo.email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setUserInfo({...userInfo, email: e.target.value})}
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Phone Number" 
                  className="pl-9" 
                  value={userInfo.phone}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setUserInfo({...userInfo, phone: e.target.value})}
                />
              </div>
            </div>
            
            {/* Quick Summary */}
            <div className="mt-6 p-4 rounded-2xl bg-white border shadow-inner space-y-2">
                <h5 className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Plan Summary</h5>
                <div className="flex justify-between items-end">
                    <span className="text-xs font-bold">{days}D / {nights}N {pkg.title}</span>
                    <span className="text-[10px] text-primary font-bold">{selectedInclusions.length} Inclusions</span>
                </div>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-2 pb-6 flex gap-2">
        {step > 1 && (
          <Button variant="ghost" onClick={() => setStep(step - 1)} className="flex-1 font-bold">
            Back
          </Button>
        )}
        <Button 
          className="flex-[2] font-black group"
          disabled={isSubmitting || (step === 3 && (!userInfo.name || !userInfo.email))}
          onClick={() => {
            if (step === 3) handleSubmit();
            else setStep(step + 1);
          }}
        >
          {step === 3 ? (
            isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Request Custom Plan"
          ) : (
            <>Next Step <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" /></>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
