
import { Message } from "@/types";
import { MessageBubble } from "./MessageBubble";
import { useRef, useEffect } from "react";

interface MessageListProps {
  messages: Message[];
}

export const MessageList = ({ messages }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Group messages by date
  const groupedMessages: { [date: string]: Message[] } = {};
  
  messages.forEach((message) => {
    const date = message.timestamp.toISOString().split("T")[0];
    if (!groupedMessages[date]) {
      groupedMessages[date] = [];
    }
    groupedMessages[date].push(message);
  });

  const dates = Object.keys(groupedMessages).sort();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="flex-1 p-4 overflow-y-auto">
      {dates.map((date) => (
        <div key={date}>
          <div className="flex justify-center mb-4">
            <div className="bg-muted px-4 py-1 rounded-full text-xs text-muted-foreground">
              {formatDate(date)}
            </div>
          </div>
          {groupedMessages[date].map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};
