"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  Loader2, 
  CheckCircle2, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  ChevronDown 
} from "lucide-react";
import { usePackages } from "@/hooks/usePackages";

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  packageId: z.string().min(1, { message: "Please select a package." }),
});

type FormData = z.infer<typeof formSchema>;

interface RegistrationFormProps {
  packageId?: string;
  packageTitle?: string;
}

export function RegistrationForm({ packageId: initialPackageId, packageTitle: initialPackageTitle }: RegistrationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState("");
  
  const { packages, loading: packagesLoading } = usePackages();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      packageId: initialPackageId || "",
    },
  });

  // Update form default if props change or packages load
  useEffect(() => {
    if (initialPackageId) {
      form.setValue("packageId", initialPackageId);
    }
  }, [initialPackageId, form]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage("");

    try {
      const selectedPackage = packages.find(p => p.id === data.packageId);
      const currentPackageTitle = selectedPackage?.title || initialPackageTitle;
      
      const endpoint = data.packageId 
        ? `/api/packages/${data.packageId}/register`
        : `/api/register`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.fullName,
          email: data.email,
          phone: data.phone,
          packageId: data.packageId,
          packageTitle: currentPackageTitle,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Registration failed');
      }

      setSubmitStatus('success');
      form.reset();
    } catch (error: any) {
      console.error("Registration error:", error);
      setSubmitStatus('error');
      setErrorMessage(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedPackageId = form.watch("packageId");
  const selectedPackage = packages.find(p => p.id === selectedPackageId);
  const displayTitle = selectedPackage?.title || initialPackageTitle;

  if (submitStatus === 'success') {
    return (
      <Card className="w-full max-w-sm my-2 animate-in fade-in zoom-in-95 duration-300">
        <CardContent className="pt-6 flex flex-col items-center text-center space-y-3">
          <div className="bg-green-100 text-green-600 p-2 rounded-full">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h3 className="font-semibold text-lg">Registration Successful!</h3>
          <p className="text-muted-foreground text-sm">
            Thank you for your interest in {displayTitle || "our packages"}. We&apos;ll be in touch shortly.
          </p>
          <Button 
            variant="link" 
            onClick={() => setSubmitStatus('idle')}
            className="mt-2"
          >
            Register another
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-sm my-2 overflow-hidden shadow-sm">
      <CardHeader className="bg-muted/30 pb-4 border-b">
        <CardTitle className="text-base">Register Interest</CardTitle>
        <CardDescription>
          Fill out the form below to book your next adventure.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          
          {/* Package Selection */}
          <div className="space-y-2">
            <Label htmlFor="packageId">Interested Package</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <select
                id="packageId"
                className="flex h-10 w-full rounded-md border border-input bg-background pl-9 pr-8 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                {...form.register("packageId")}
                disabled={isSubmitting || packagesLoading}
              >
                <option value="" disabled>Select a package</option>
                {packages.map((pkg) => (
                  <option key={pkg.id} value={pkg.id}>
                    {pkg.title}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-muted-foreground opacity-50 pointer-events-none" />
            </div>
            {form.formState.errors.packageId && (
              <p className="text-destructive text-xs">{form.formState.errors.packageId.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="fullName"
                placeholder="John Doe"
                className="pl-9"
                {...form.register("fullName")}
                disabled={isSubmitting}
              />
            </div>
            {form.formState.errors.fullName && (
              <p className="text-destructive text-xs">{form.formState.errors.fullName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                className="pl-9"
                {...form.register("email")}
                disabled={isSubmitting}
              />
            </div>
            {form.formState.errors.email && (
              <p className="text-destructive text-xs">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="phone"
                type="tel"
                placeholder="+1 234 567 890"
                className="pl-9"
                {...form.register("phone")}
                disabled={isSubmitting}
              />
            </div>
            {form.formState.errors.phone && (
              <p className="text-destructive text-xs">{form.formState.errors.phone.message}</p>
            )}
          </div>

          {submitStatus === 'error' && (
            <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm border border-destructive/20">
              {errorMessage}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Registering...
              </>
            ) : (
              "Register Interest"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
