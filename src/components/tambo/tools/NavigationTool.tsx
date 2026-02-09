
"use client";

import { useEffect } from "react";

export interface NavigationToolProps {
  path?: string;
}

/**
 * A silent navigation component that performs a route change 
 * via a custom event and renders absolutely no UI in the chat thread.
 */
export function NavigationTool({ path }: NavigationToolProps) {
  useEffect(() => {
    if (path && typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("tambo:navigate", { detail: { path } }));
    }
  }, [path]);

  // Return null so no tool-call UI is rendered in the chat bubble
  return null;
}
