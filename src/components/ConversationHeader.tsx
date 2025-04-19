
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Conversation } from "@/types";
import { Inbox, MoreHorizontal, Phone, Reply, UserPlus } from "lucide-react";
import { AgentAvatar } from "./AgentAvatar";
import { PlatformBadge } from "./PlatformBadge";
import { UserAvatar } from "./UserAvatar";

interface ConversationHeaderProps {
  conversation: Conversation;
  agents: { value: string; label: string }[];
}

export const ConversationHeader = ({ conversation, agents }: ConversationHeaderProps) => {
  const { user, platform, status, assignedTo } = conversation;

  return (
    <div className="p-4 border-b flex items-center justify-between">
      <div className="flex items-center gap-3">
        <UserAvatar user={user} />
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-semibold">{user.name}</h2>
            <PlatformBadge platform={platform} />
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {user.email && <span>{user.email}</span>}
            {user.email && user.phone && <span>•</span>}
            {user.phone && <span>{user.phone}</span>}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Select defaultValue={assignedTo?.id || "unassigned"}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Assign to..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="unassigned">Unassigned</SelectItem>
            {agents.map((agent) => (
              <SelectItem key={agent.value} value={agent.value}>
                {agent.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon">
          <Phone className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
