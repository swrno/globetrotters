import { z } from "zod";

export const searchPackagesSchema = z.object({
  query: z.string().describe("The search query to find holiday packages (e.g., 'beach', 'Europe', 'mountain')"),
});

export async function searchPackages(args: z.infer<typeof searchPackagesSchema>) {
  try {
    const response = await fetch('/api/packages');
    if (!response.ok) {
      throw new Error('Failed to fetch packages');
    }
    const packages = await response.json();
    
    if (!args.query) return packages.slice(0, 5);

    const query = args.query.toLowerCase();
    const filtered = packages.filter((pkg: any) => 
      pkg.title?.toLowerCase().includes(query) ||
      pkg.location?.toLowerCase().includes(query) ||
      pkg.description?.toLowerCase().includes(query) ||
      pkg.category?.toLowerCase().includes(query)
    );

    return filtered.slice(0, 5).map((pkg: any) => ({
      id: pkg._id || pkg.id,
      title: pkg.title,
      location: pkg.location,
      price: pkg.price,
      duration: `${pkg.nights} Nights / ${pkg.days} Days`
    }));
  } catch (error) {
    console.error("Search error:", error);
    return { error: "Failed to search packages." };
  }
}
