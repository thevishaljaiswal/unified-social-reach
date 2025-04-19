
export type Platform = 'facebook' | 'linkedin' | 'whatsapp';

export interface User {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  avatar?: string;
  platformIds: Record<Platform, string>;
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Message {
  id: string;
  conversationId: string;
  content: string;
  timestamp: Date;
  senderId: string;
  isAgent: boolean;
  platform: Platform;
  attachments?: Attachment[];
  read: boolean;
}

export interface Attachment {
  id: string;
  type: 'image' | 'video' | 'document';
  url: string;
  name: string;
  size?: number;
}

export interface Conversation {
  id: string;
  user: User;
  platform: Platform;
  lastMessage?: Message;
  unreadCount: number;
  status: 'open' | 'closed' | 'pending';
  assignedTo?: Agent;
  tags?: string[];
}
