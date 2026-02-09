import { RegistrationForm } from "@/components/tambo/addedComponents/RegistrationForm";
import { ChatPackageList } from "@/components/tambo/addedComponents/ChatPackageList";
import { ChatPackageCard } from "@/components/tambo/addedComponents/ChatPackageCard";
import { NavigationTool } from "@/components/tambo/tools/NavigationTool";
import { z } from "zod";
import { TamboTool } from "@tambo-ai/react";
import { navigateSchema, navigateToolAction } from "@/components/tambo/tools/Navigate";
import { getCurrentPageSchema, getCurrentPageAction } from "@/components/tambo/tools/GetCurrentPage";
import { searchPackagesSchema, searchPackagesAction } from "@/components/tambo/tools/SearchTool";
import { getDateTimeSchema, getDateTimeAction } from "@/components/tambo/tools/GetDateTime";

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
];

export const tools: TamboTool[] = [
  {
    name: "search_packages",
    description: "Search for packages. Returns unique 'id' for each package which can be used to show details.",
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
    description: "Retrieves the current URL path context.",
    tool: getCurrentPageAction,
    inputSchema: getCurrentPageSchema,
    outputSchema: z.any(),
  },
  {
    name: "get_date_time",
    description: "Get the current date and time context.",
    tool: getDateTimeAction,
    inputSchema: getDateTimeSchema,
    outputSchema: z.any(),
  },
];
