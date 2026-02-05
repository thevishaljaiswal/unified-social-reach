 import { Button } from "@/components/ui/button";
 import { NewTicketDialog } from "@/components/NewTicketDialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { agents, conversations, messages } from "../data/mockData";
import { useEffect, useState } from "react";
import { Conversation, Message, Platform } from "@/types";
import { ConversationList } from "@/components/ConversationList";
import { ConversationView } from "@/components/ConversationView";
import { EmptyConversation } from "@/components/EmptyConversation";
import { PlatformBadge } from "@/components/PlatformBadge";
 import { Facebook, Inbox, Linkedin, Menu, MessageSquare, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UnreadBadge } from "@/components/UnreadBadge";

const Index = () => {
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [conversationsList, setConversationsList] = useState<Conversation[]>(conversations);
  const [messagesList, setMessagesList] = useState<Message[]>(messages);
  const { toast } = useToast();

  const handleSelectConversation = (conversationId: string) => {
    setActiveConversationId(conversationId);
    
    // Mark messages as read
    const updatedMessages = messagesList.map((message) => {
      if (message.conversationId === conversationId && !message.read) {
        return { ...message, read: true };
      }
      return message;
    });
    
    // Update unread count for the conversation
    const updatedConversations = conversationsList.map((conversation) => {
      if (conversation.id === conversationId && conversation.unreadCount > 0) {
        return { ...conversation, unreadCount: 0 };
      }
      return conversation;
    });
    
    setMessagesList(updatedMessages);
    setConversationsList(updatedConversations);
  };

 const handleSendMessage = (conversationId: string, content: string, attachments?: import("@/types").Attachment[]) => {
    const conversation = conversationsList.find((c) => c.id === conversationId);
    
    if (!conversation) return;
    
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      conversationId,
      content,
      timestamp: new Date(),
      senderId: "agent-1", // Using the first agent for demo
      isAgent: true,
      platform: conversation.platform,
      read: true,
       attachments,
    };
    
    // Add the new message
    setMessagesList([...messagesList, newMessage]);
    
    // Update the conversation's last message
    const updatedConversations = conversationsList.map((c) => {
      if (c.id === conversationId) {
        return {
          ...c,
          lastMessage: newMessage,
        };
      }
      return c;
    });
    
    setConversationsList(updatedConversations);

    toast({
      title: "Message Sent",
      description: `Message sent on ${conversation.platform}`,
    });
  };

  const handleStatusChange = (conversationId: string, status: 'open' | 'pending' | 'closed') => {
     setConversationsList((prev) =>
       prev.map((c) => {
      if (c.id === conversationId) {
        return {
          ...c,
          status,
        };
      }
      return c;
       })
     );
 
    const statusMessages = {
      open: 'Conversation marked as Open',
      pending: 'Conversation marked as Pending',
      closed: 'Conversation marked as Closed',
    };
    
    toast({
      title: 'Status Updated',
      description: statusMessages[status],
    });
  };

   const handleCreateTicket = (conversation: Conversation, initialMessage: Message) => {
     setConversationsList((prev) => [conversation, ...prev]);
     setMessagesList((prev) => [...prev, initialMessage]);
     setActiveConversationId(conversation.id);
 
     toast({
       title: "Ticket Created",
       description: `New ticket created for ${conversation.user.name} on ${conversation.platform}`,
     });
   };
 
  const activeConversation = conversationsList.find(
    (c) => c.id === activeConversationId
  );
  
  const conversationMessages = messagesList.filter(
    (m) => m.conversationId === activeConversationId
  ).sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

  const getTotalUnreadCount = () => {
    return conversationsList.reduce((total, conv) => total + conv.unreadCount, 0);
  };

  const getPlatformUnreadCount = (platform: Platform) => {
    return conversationsList
      .filter((conv) => conv.platform === platform)
      .reduce((total, conv) => total + conv.unreadCount, 0);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Social Helpdesk</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Users className="mr-2 h-4 w-4" />
            Agents
          </Button>
           <NewTicketDialog agents={agents} onCreateTicket={handleCreateTicket} />
        </div>
      </header>
      
      <div className="flex-1 flex">
        <aside className="w-16 border-r bg-secondary/30 hidden md:block">
          <div className="flex flex-col items-center py-4 gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Inbox className="h-5 w-5" />
              {getTotalUnreadCount() > 0 && (
                <UnreadBadge count={getTotalUnreadCount()} className="absolute -top-1 -right-1" />
              )}
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <Facebook className="h-5 w-5 text-facebook" />
              {getPlatformUnreadCount('facebook') > 0 && (
                <UnreadBadge count={getPlatformUnreadCount('facebook')} className="absolute -top-1 -right-1" />
              )}
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <Linkedin className="h-5 w-5 text-linkedin" />
              {getPlatformUnreadCount('linkedin') > 0 && (
                <UnreadBadge count={getPlatformUnreadCount('linkedin')} className="absolute -top-1 -right-1" />
              )}
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <MessageSquare className="h-5 w-5 text-whatsapp" /> {/* Changed from Whatsapp to MessageSquare */}
              {getPlatformUnreadCount('whatsapp') > 0 && (
                <UnreadBadge count={getPlatformUnreadCount('whatsapp')} className="absolute -top-1 -right-1" />
              )}
            </Button>
          </div>
        </aside>
        
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4">
          <div className="md:col-span-1 border-r overflow-auto">
            <ConversationList
              conversations={conversationsList}
              activeConversationId={activeConversationId}
              onSelectConversation={handleSelectConversation}
            />
          </div>
          <div className="md:col-span-2 xl:col-span-3 flex flex-col">
            {activeConversation ? (
              <ConversationView
                conversation={activeConversation}
                messages={conversationMessages}
                agents={agents}
                onSendMessage={handleSendMessage}
                onStatusChange={handleStatusChange}
              />
            ) : (
              <EmptyConversation />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
