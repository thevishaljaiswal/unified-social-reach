
import { Button } from "@/components/ui/button";
import { Inbox } from "lucide-react";

export const EmptyConversation = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center p-8">
      <div className="flex flex-col items-center max-w-md text-center">
        <div className="p-4 rounded-full bg-secondary mb-4">
          <Inbox className="h-10 w-10 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-semibold mb-2">No conversation selected</h2>
        <p className="text-muted-foreground mb-6">
          Select a conversation from the inbox to view messages and respond to your customers.
        </p>
        <div className="flex gap-4">
          <Button variant="outline">View Documentation</Button>
          <Button>Create New Message</Button>
        </div>
      </div>
    </div>
  );
};
