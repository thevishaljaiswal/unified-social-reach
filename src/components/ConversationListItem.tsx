
import { Conversation } from "@/types";
import { UserAvatar } from "./UserAvatar";
import { PlatformBadge } from "./PlatformBadge";
import { UnreadBadge } from "./UnreadBadge";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { AgentAvatar } from "./AgentAvatar";
import { cn } from "@/lib/utils";

interface ConversationListItemProps {
  conversation: Conversation;
  isActive: boolean;
  onClick: () => void;
}

export const ConversationListItem = ({
  conversation,
  isActive,
  onClick,
}: ConversationListItemProps) => {
  const { user, platform, lastMessage, unreadCount, status, assignedTo, tags } = conversation;

  return (
    <div
      className={cn(
        "p-4 border-b cursor-pointer hover:bg-secondary/50 transition-colors",
        isActive && "bg-secondary"
      )}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <UserAvatar user={user} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <span className="font-medium truncate">{user.name}</span>
              <PlatformBadge platform={platform} size={14} />
            </div>
            {lastMessage && (
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(lastMessage.timestamp, { addSuffix: true })}
              </span>
            )}
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-1 mb-2">
            {lastMessage?.content || "No messages yet"}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1">
              {tags?.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {tags && tags.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{tags.length - 2}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              {assignedTo && <AgentAvatar agent={assignedTo} size="sm" />}
              <UnreadBadge count={unreadCount} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
