
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
 import { Conversation, Attachment } from "@/types";
import { CheckCircle, Clock, Inbox, MoreHorizontal, Phone, UserPlus, XCircle } from "lucide-react";
import { AgentAvatar } from "./AgentAvatar";
import { PlatformBadge } from "./PlatformBadge";
import { UserAvatar } from "./UserAvatar";
import { cn } from "@/lib/utils";
 import { NewMessageDialog } from "./NewMessageDialog";

interface ConversationHeaderProps {
  conversation: Conversation;
  agents: { value: string; label: string }[];
  onStatusChange?: (status: 'open' | 'pending' | 'closed') => void;
   onSendMessage?: (conversationId: string, content: string, attachments?: Attachment[]) => void;
}

 export const ConversationHeader = ({ conversation, agents, onStatusChange, onSendMessage }: ConversationHeaderProps) => {
  const { user, platform, status, assignedTo } = conversation;

  const getStatusColor = (currentStatus: string) => {
    switch (currentStatus) {
      case 'open':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'pending':
        return 'bg-amber-100 text-amber-800 hover:bg-amber-200';
      case 'closed':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  const handleStatusChange = (newStatus: 'open' | 'pending' | 'closed') => {
    if (onStatusChange) {
      onStatusChange(newStatus);
    }
  };

  return (
    <div className="p-4 border-b">
      <div className="flex items-center justify-between mb-3">
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
           {onSendMessage && (
             <NewMessageDialog conversation={conversation} onSendMessage={onSendMessage} />
           )}
          <Button variant="outline" size="icon">
            <Phone className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Status buttons */}
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => handleStatusChange('open')}
          className={cn(
            "border-0",
            status === 'open' ? getStatusColor('open') : 'hover:bg-blue-50'
          )}
        >
          <Inbox className="mr-1 h-4 w-4" />
          Open
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => handleStatusChange('pending')}
          className={cn(
            "border-0",
            status === 'pending' ? getStatusColor('pending') : 'hover:bg-amber-50'
          )}
        >
          <Clock className="mr-1 h-4 w-4" />
          Pending
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => handleStatusChange('closed')}
          className={cn(
            "border-0",
            status === 'closed' ? getStatusColor('closed') : 'hover:bg-green-50'
          )}
        >
          <CheckCircle className="mr-1 h-4 w-4" />
          Closed
        </Button>
      </div>
    </div>
  );
};
