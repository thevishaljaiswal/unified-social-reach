
import { Conversation, Message } from "@/types";
import { ConversationHeader } from "./ConversationHeader";
import { MessageInput } from "./MessageInput";
import { MessageList } from "./MessageList";
import { Agent } from "@/types";

interface ConversationViewProps {
  conversation: Conversation;
  messages: Message[];
  agents: Agent[];
  onSendMessage: (conversationId: string, content: string) => void;
}

export const ConversationView = ({
  conversation,
  messages,
  agents,
  onSendMessage,
}: ConversationViewProps) => {
  const agentOptions = agents.map((agent) => ({
    value: agent.id,
    label: agent.name,
  }));

  const handleSendMessage = (content: string) => {
    onSendMessage(conversation.id, content);
  };

  return (
    <div className="h-full flex flex-col">
      <ConversationHeader
        conversation={conversation}
        agents={agentOptions}
      />
      <MessageList messages={messages} />
      <MessageInput
        platform={conversation.platform}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
};
