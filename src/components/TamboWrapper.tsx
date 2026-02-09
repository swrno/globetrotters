import { TamboProvider } from "@tambo-ai/react";
import { MessageThreadCollapsible } from "./tambo/message-thread-collapsible";
import { components, tools } from "@/lib/tambo";

interface TamboWrapperProps {
  children: React.ReactNode;
}

export default function TamboWrapper({ children }: TamboWrapperProps) {
  return (
    <TamboProvider
      apiKey={process.env.NEXT_PUBLIC_TAMBO_API_KEY!}
      components={components}
      tools={tools}
    >
      {children}
      <MessageThreadCollapsible className="z-50" />
    </TamboProvider>
  );
}
