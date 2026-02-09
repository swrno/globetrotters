
import { z } from "zod";

export const navigateSchema = z.object({
  path: z.string().describe("The path to navigate to (e.g., '/package/123')"),
});

export const navigateToolAction = async ({ path }: { path: string }) => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("tambo:navigate", { detail: { path } }));
    return { success: true, message: `Navigating to ${path}` };
  }
  return { success: false, error: "Window context not available" };
};
