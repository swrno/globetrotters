"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import ReCAPTCHA from "react-google-recaptcha";

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  captcha: z.string().min(1, { message: "Please complete the CAPTCHA." }),
});

type FormData = z.infer<typeof formSchema>;

interface RegistrationFormProps {
  packageId?: string;
  packageTitle?: string;
}

export function RegistrationForm({ packageId, packageTitle }: RegistrationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      captcha: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage("");

    try {
      const endpoint = packageId 
        ? `/api/packages/${packageId}/register`
        : `/api/register`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          packageId,
          packageTitle,
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

  if (submitStatus === 'success') {
    return (
      <div className="bg-card text-card-foreground p-6 rounded-lg shadow-sm border border-border animate-in fade-in zoom-in-95 duration-300">
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="bg-green-100 text-green-600 p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
          <h3 className="font-semibold text-lg">Registration Successful!</h3>
          <p className="text-muted-foreground text-sm">
            Thank you for your interest in {packageTitle || "our packages"}. We'll be in touch shortly.
          </p>
          <button 
            onClick={() => setSubmitStatus('idle')}
            className="text-primary hover:underline text-sm font-medium mt-2"
          >
            Register another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm bg-card text-card-foreground rounded-xl border border-border shadow-sm overflow-hidden my-2">
      <div className="bg-muted/30 p-4 border-b border-border">
        <h3 className="font-semibold text-base">Register Interest</h3>
        {packageTitle && (
          <p className="text-sm text-muted-foreground truncate">
            For: <span className="font-medium text-foreground">{packageTitle}</span>
          </p>
        )}
      </div>

      <div className="p-4">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="fullName" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Full Name
            </label>
            <input
              id="fullName"
              {...form.register("fullName")}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="John Doe"
            />
            {form.formState.errors.fullName && (
              <p className="text-red-500 text-xs mt-1">{form.formState.errors.fullName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium leading-none">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...form.register("email")}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50"
              placeholder="john@example.com"
            />
            {form.formState.errors.email && (
              <p className="text-red-500 text-xs mt-1">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium leading-none">
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              {...form.register("phone")}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50"
              placeholder="+1 234 567 890"
            />
            {form.formState.errors.phone && (
              <p className="text-red-500 text-xs mt-1">{form.formState.errors.phone.message}</p>
            )}
          </div>

          <div className="flex justify-center py-2">
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
              size="compact"
              onChange={(token) => form.setValue("captcha", token || "")}
            />
          </div>
          {form.formState.errors.captcha && (
            <p className="text-red-500 text-xs text-center">{form.formState.errors.captcha.message}</p>
          )}

          {submitStatus === 'error' && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm border border-red-100 mb-2">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 w-full"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Registering...
              </>
            ) : (
              "Register Interest"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
