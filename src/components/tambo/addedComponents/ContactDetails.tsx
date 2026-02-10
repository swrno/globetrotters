"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, User, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Props for the ContactDetails component
 */
interface ContactDetailsProps {
  fullName?: string;
  phone?: string;
  email?: string;
  className?: string;
}

/**
 * A visually appealing contact details card for the Tambo UI.
 * Consistent with ChatPackageCard styling.
 */
export function ContactDetails({
  fullName = "Subhajit",
  phone = "+91 96740 25615",
  email = "brandsubhajit@gmail.com",
  className,
}: ContactDetailsProps) {
  return (
    <Card className={cn("overflow-hidden border-border shadow-md my-2 max-w-full", className)}>
      <div className="bg-primary/5 p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <User className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-lg font-bold leading-tight">
              Contact Details
            </CardTitle>
            <p className="text-xs text-muted-foreground">Expert assistance for your travels</p>
          </div>
        </div>
      </div>

      <CardContent className="p-4 space-y-4">
        {/* Full Name */}
        <div className="flex items-start gap-3">
          <User className="h-4 w-4 mt-0.5 text-primary shrink-0" />
          <div>
            <div className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Name</div>
            <div className="text-sm font-medium">{fullName}</div>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start gap-3">
          <Phone className="h-4 w-4 mt-0.5 text-primary shrink-0" />
          <div className="flex-1">
            <div className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Phone</div>
            <div className="text-sm font-medium">{phone}</div>
          </div>
          <Button variant="outline" size="sm" className="h-8 text-xs font-bold" asChild>
            <a href={`tel:${phone.replace(/\s+/g, '')}`}>
              Call
            </a>
          </Button>
        </div>

        {/* Email */}
        <div className="flex items-start gap-3">
          <Mail className="h-4 w-4 mt-0.5 text-primary shrink-0" />
          <div className="flex-1">
            <div className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Email</div>
            <div className="text-sm font-medium break-all">{email}</div>
          </div>
          <Button variant="outline" size="sm" className="h-8 text-xs font-bold" asChild>
            <a href={`mailto:${email}`}>
              Email
            </a>
          </Button>
        </div>
      </CardContent>

      <div className="p-4 pt-0">
        <div className="flex flex-wrap gap-2 pt-3 border-t border-border">
          <span className="text-[10px] uppercase tracking-wider font-bold bg-primary/10 text-primary px-2 py-0.5 rounded border border-primary/20">
            Verified Partner
          </span>
          <span className="text-[10px] uppercase tracking-wider font-bold bg-secondary text-secondary-foreground px-2 py-0.5 rounded">
            Globetrotters
          </span>
        </div>
      </div>
    </Card>
  );
}
