
import { cn } from "@/lib/utils";
import { Message } from "@/types";
import { format } from "date-fns";
import { PlatformBadge } from "./PlatformBadge";

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isAgentMessage = message.isAgent;

  return (
    <div
      className={cn(
        "flex mb-4",
        isAgentMessage ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-lg p-3",
          isAgentMessage
            ? "bg-primary text-primary-foreground rounded-br-none"
            : "bg-secondary text-secondary-foreground rounded-bl-none"
        )}
      >
        <div className="flex items-center gap-2 mb-1">
          {!isAgentMessage && <PlatformBadge platform={message.platform} size={14} />}
          <span className="text-xs opacity-70">
            {format(message.timestamp, "MMM d, h:mm a")}
          </span>
        </div>
        <p className="whitespace-pre-wrap">{message.content}</p>
        {message.attachments && message.attachments.length > 0 && (
          <div className="mt-2 space-y-2">
            {message.attachments.map((attachment) => (
              <div key={attachment.id} className="p-2 bg-background/20 rounded">
                <div className="text-xs">{attachment.name}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
