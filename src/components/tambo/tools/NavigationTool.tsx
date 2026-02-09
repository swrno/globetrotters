"use client";

import { z } from "zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const navigationSchema = z.object({
  path: z.string().describe("The path to navigate to (e.g., '/holiday-packages', '/contact')"),
});

export function NavigationTool({ path }: { path?: string }) {
  const router = useRouter();

  useEffect(() => {
    if (path) {
      router.push(path);
    }
  }, [path, router]);

  if (!path) {
    return (
      <div className="p-4 bg-yellow-50 text-yellow-700 rounded-md border border-yellow-200">
        <p>Navigation path missing.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-blue-50 text-blue-700 rounded-md border border-blue-200">
      <p>Navigating to {path}...</p>
    </div>
  );
}
