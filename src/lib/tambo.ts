import { RegistrationForm } from "@/components/tambo/addedComponents/RegistrationForm";
import { ChatPackageList } from "@/components/tambo/addedComponents/ChatPackageList";
import { ChatPackageCard } from "@/components/tambo/addedComponents/ChatPackageCard";
import { LocationPermissionCard } from "@/components/tambo/addedComponents/LocationPermissionCard";
import { SmartRecommendations } from "@/components/tambo/addedComponents/SmartRecommendations";
import { PackageCustomizer } from "@/components/tambo/addedComponents/PackageCustomizer";
import { NavigationTool } from "@/components/tambo/tools/NavigationTool";
import { z } from "zod";
import { TamboTool } from "@tambo-ai/react";
import { navigateSchema, navigateToolAction } from "@/components/tambo/tools/Navigate";
import { getCurrentPageSchema, getCurrentPageAction } from "@/components/tambo/tools/GetCurrentPage";
import { searchPackagesSchema, searchPackagesAction } from "@/components/tambo/tools/SearchTool";
import { getDateTimeSchema, getDateTimeAction } from "@/components/tambo/tools/GetDateTime";
import { getLocationSchema, getLocationAction } from "@/components/tambo/tools/GetLocation";

export const components = [
  {
    name: "RegistrationForm",
    description: "ESSENTIAL: Show this form immediately whenever a user says they want to book, register interest, or inquire about a package. DO NOT just ask for details in text; show this form.",
    component: RegistrationForm,
    propsSchema: z.object({
      packageId: z.string().optional().describe("The ID of the package"),
      packageTitle: z.string().optional().describe("The title of the package"),
    }),
  },
  {
    name: "PackageCustomizer",
    description: "Show this specifically when a user asks to CUSTOMIZE, change, or modify a package. This is a rich interactive tool for personalization.",
    component: PackageCustomizer,
    propsSchema: z.object({
      packageId: z.string().describe("The ID of the package to customize."),
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
  {
    name: "ChatPackageList",
    description: "Display a list of available holiday packages directly in the chat.",
    component: ChatPackageList,
    propsSchema: z.object({
      limit: z.number().optional().describe("Number of packages to display (default: 5)"),
      category: z.enum(['domestic', 'international', 'all']).optional().describe("Filter by category (default: all)"),
    }),
  },
  {
    name: "ChatPackageCard",
    description: "Display rich details for a single package. Use ONLY when the user asks for details about a specific package from search results. DO NOT USE if the user is already on the individual package page unless they explicitly ask for a search-result style card.",
    component: ChatPackageCard,
    propsSchema: z.object({
      id: z.string().optional().describe("The unique ID of the package to display. Required for showing details."),
    }),
  },
  {
    name: "LocationPermissionCard",
    description: "UI to request location permission from the user. Use this if 'get_location' tool returns 'prompt_required'.",
    component: LocationPermissionCard,
    propsSchema: z.object({}),
  },
  {
    name: "SmartRecommendations",
    description: "A premium dashboard showing personalized recommendations based on time, page context, and location.",
    component: SmartRecommendations,
    propsSchema: z.object({
      locationStatus: z.enum(['granted', 'prompt_required', 'denied']).optional(),
      currentPath: z.string().optional(),
      timeContext: z.string().optional(),
      lat: z.number().optional(),
      lng: z.number().optional()
    }),
  },
];

export const tools: TamboTool[] = [
  {
    name: "search_packages",
    description: "Search for packages. Supports filtering by keywords (query) and category (domestic/international). Returns unique 'id' for each package.",
    tool: searchPackagesAction,
    inputSchema: searchPackagesSchema,
    outputSchema: z.array(z.object({
      id: z.string(),
      title: z.string(),
      location: z.string(),
      price: z.number(),
      url: z.string()
    })),
  },
  {
    name: "navigate",
    description: "Silent navigation to a specific route.",
    tool: navigateToolAction,
    inputSchema: navigateSchema,
    outputSchema: z.any(),
  },
  {
    name: "get_current_page",
    description: "Retrieves the current URL path. ESSENTIAL for providing relevant suggestions or help based on what the user is currently viewing (e.g., if they are on a package page).",
    tool: getCurrentPageAction,
    inputSchema: getCurrentPageSchema,
    outputSchema: z.any(),
  },
  {
    name: "get_date_time",
    description: "Get the current date/time context. Use this to provide timely suggestions, relevant season-based travel advice, or check for current offers.",
    tool: getDateTimeAction,
    inputSchema: getDateTimeSchema,
    outputSchema: z.any(),
  },
  {
    name: "get_location",
    description: "Check for user location. If it returns 'prompt_required', you MUST render the 'LocationPermissionCard' component to ask the user.",
    tool: getLocationAction,
    inputSchema: getLocationSchema,
    outputSchema: z.any(),
  },
];
