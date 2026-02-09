
import { z } from "zod";

export const getCurrentPageSchema = z.object({});

export const getCurrentPageAction = async () => {
  if (typeof window !== "undefined") {
    return { 
      path: window.location.pathname,
      full_url: window.location.href,
      timestamp: new Date().toISOString()
    };
  }
  return { error: "Window context not available" };
};
