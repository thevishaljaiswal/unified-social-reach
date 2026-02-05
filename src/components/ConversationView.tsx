
 import { Conversation, Message, Attachment } from "@/types";
import { ConversationHeader } from "./ConversationHeader";
import { MessageInput } from "./MessageInput";
import { MessageList } from "./MessageList";
import { Agent } from "@/types";

interface ConversationViewProps {
  conversation: Conversation;
  messages: Message[];
  agents: Agent[];
   onSendMessage: (conversationId: string, content: string, attachments?: Attachment[]) => void;
  onStatusChange?: (conversationId: string, status: 'open' | 'pending' | 'closed') => void;
}

export const ConversationView = ({
  conversation,
  messages,
  agents,
  onSendMessage,
  onStatusChange,
}: ConversationViewProps) => {
  const agentOptions = agents.map((agent) => ({
    value: agent.id,
    label: agent.name,
  }));

  const handleSendMessage = (content: string) => {
    onSendMessage(conversation.id, content);
  };

   const handleSendMessageWithAttachments = (conversationId: string, content: string, attachments?: Attachment[]) => {
     onSendMessage(conversationId, content, attachments);
   };
 
  const handleStatusChange = (status: 'open' | 'pending' | 'closed') => {
    if (onStatusChange) {
      onStatusChange(conversation.id, status);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <ConversationHeader
        conversation={conversation}
        agents={agentOptions}
        onStatusChange={handleStatusChange}
         onSendMessage={handleSendMessageWithAttachments}
      />
      <MessageList messages={messages} />
      <MessageInput
        platform={conversation.platform}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
};
