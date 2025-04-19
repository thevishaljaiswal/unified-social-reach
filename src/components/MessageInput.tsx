
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Platform } from "@/types";
import { PaperclipIcon, Send, Smile } from "lucide-react";
import { PlatformBadge } from "./PlatformBadge";
import { useState } from "react";

interface MessageInputProps {
  platform: Platform;
  onSendMessage: (content: string) => void;
}

export const MessageInput = ({ platform, onSendMessage }: MessageInputProps) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 border-t">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm font-medium">Replying on:</span>
        <PlatformBadge platform={platform} showLabel />
      </div>
      <div className="flex gap-2">
        <Textarea
          placeholder="Type your message..."
          className="min-h-12 resize-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className="flex flex-col gap-2">
          <Button variant="outline" size="icon">
            <PaperclipIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Smile className="h-4 w-4" />
          </Button>
          <Button size="icon" onClick={handleSend} disabled={!message.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
