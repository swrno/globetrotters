import { RegistrationForm } from "@/components/tambo/addedComponents/RegistrationForm";
import { NavigationTool } from "@/components/tambo/tools/NavigationTool";
import { z } from "zod";
import { TamboTool } from "@tambo-ai/react";

export const components = [
  {
    name: "RegistrationForm",
    description: "A form to register user interest for a holiday package.",
    component: RegistrationForm,
    propsSchema: z.object({
      packageId: z.string().optional().describe("The ID of the package"),
      packageTitle: z.string().optional().describe("The title of the package"),
    }),
  },
  {
    name: "NavigateToPage",
    description: "Navigate the user to a specific page or route in the application.",
    component: NavigationTool,
    propsSchema: z.object({
      path: z.string().optional().nullable().describe("The path to navigate to. Use the 'url' field from search results (e.g., '/package/123')."),
    }),
  },
];

export const tools: TamboTool[] = [
  {
    name: "search_packages",
    description: "Search for available holiday packages by keywords, location, or category.",
    tool: async ({ query }: { query?: string }) => {
      try {
        const res = await fetch('/api/packages');
         if (!res.ok) throw new Error('Failed to fetch');
         const responseData = await res.json();

         if (!responseData.success || !Array.isArray(responseData.data)) {
           throw new Error(responseData.error || "Invalid response format");
         }
         
         const packages = responseData.data;

         const formatPackage = (pkg: any) => ({
            id: pkg.id,
            title: pkg.title,
            location: pkg.location,
            category: pkg.category,
            description: pkg.description ? pkg.description.substring(0, 100) + "..." : "",
            price: pkg.cost_per_person,
            url: `/package/${pkg.id}` 
         });

         if (!query) return packages.slice(0, 5).map(formatPackage);
         
         const q = query.toLowerCase();
         return packages.filter((pkg: any) => 
            pkg.title?.toLowerCase().includes(q) ||
            pkg.location?.toLowerCase().includes(q)
         ).slice(0, 5).map(formatPackage);
      } catch (e: any) {
        console.error("Search tool error:", e);
        return { error: `Search failed: ${e.message || String(e)}` };
      }
    },
    inputSchema: z.object({
      query: z.string().optional().describe("The search query"),
    }),
    outputSchema: z.any(),
  }
];
