
import { z } from "zod";

export const searchPackagesSchema = z.object({
  query: z.string().optional().describe("The search query (keywords, location, etc.)"),
  category: z.enum(['domestic', 'international', 'all']).optional().describe("Filter by category (domestic, international, or all)"),
});

export const searchPackagesAction = async ({ query, category }: { query?: string, category?: 'domestic' | 'international' | 'all' }) => {
  try {
    const res = await fetch('/api/packages');
    if (!res.ok) throw new Error('Failed to fetch');
    const responseData = await res.json();

    if (!responseData.success || !Array.isArray(responseData.data)) {
      throw new Error(responseData.error || "Invalid response format");
    }
    
    let packages = responseData.data;

    // Filter by category if specified and not 'all'
    if (category && category !== 'all') {
      packages = packages.filter((pkg: any) => pkg.category === category);
    }

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
};
