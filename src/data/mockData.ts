
import { Agent, Conversation, Message, Platform, User } from "../types";

// Mock Agents
export const agents: Agent[] = [
  {
    id: 'agent-1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatar: 'https://i.pravatar.cc/150?u=agent1',
  },
  {
    id: 'agent-2',
    name: 'Sarah Miller',
    email: 'sarah@example.com',
    avatar: 'https://i.pravatar.cc/150?u=agent2',
  },
];

// Mock Users
export const users: User[] = [
  {
    id: 'user-1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    avatar: 'https://i.pravatar.cc/150?u=user1',
    platformIds: {
      facebook: 'fb-123',
      linkedin: 'li-123',
      whatsapp: 'wa-123',
    },
  },
  {
    id: 'user-2',
    name: 'Emily Smith',
    email: 'emily@example.com',
    avatar: 'https://i.pravatar.cc/150?u=user2',
    platformIds: {
      facebook: 'fb-456',
      linkedin: 'li-456',
      whatsapp: 'wa-456',
    },
  },
  {
    id: 'user-3',
    name: 'Michael Brown',
    phone: '+1987654321',
    avatar: 'https://i.pravatar.cc/150?u=user3',
    platformIds: {
      facebook: 'fb-789',
      linkedin: '',
      whatsapp: 'wa-789',
    },
  },
  {
    id: 'user-4',
    name: 'Jessica Williams',
    email: 'jessica@example.com',
    avatar: 'https://i.pravatar.cc/150?u=user4',
    platformIds: {
      facebook: '',
      linkedin: 'li-012',
      whatsapp: '',
    },
  },
];

// Mock Messages
const createMessages = (): Message[] => {
  const messages: Message[] = [];
  
  // Conversation 1 - Facebook
  messages.push(
    {
      id: 'msg-1',
      conversationId: 'conv-1',
      content: "Hi there! I'm having an issue with my recent order #12345.",
      timestamp: new Date(2023, 3, 15, 10, 30),
      senderId: 'user-1',
      isAgent: false,
      platform: 'facebook',
      read: true,
    },
    {
      id: 'msg-2',
      conversationId: 'conv-1',
      content: "Hello John! I'm sorry to hear that. Could you please provide more details about the issue?",
      timestamp: new Date(2023, 3, 15, 10, 35),
      senderId: 'agent-1',
      isAgent: true,
      platform: 'facebook',
      read: true,
    },
    {
      id: 'msg-3',
      conversationId: 'conv-1',
      content: "The package arrived damaged, and some items are missing.",
      timestamp: new Date(2023, 3, 15, 10, 40),
      senderId: 'user-1',
      isAgent: false,
      platform: 'facebook',
      read: true,
    },
    {
      id: 'msg-4',
      conversationId: 'conv-1',
      content: "I understand. I'll need to create a support ticket for this. Could you send a photo of the damaged package?",
      timestamp: new Date(2023, 3, 15, 10, 45),
      senderId: 'agent-1',
      isAgent: true,
      platform: 'facebook',
      read: true,
    },
  );

  // Conversation 2 - LinkedIn
  messages.push(
    {
      id: 'msg-5',
      conversationId: 'conv-2',
      content: "Hello, I'm interested in your enterprise solution. Could we schedule a demo?",
      timestamp: new Date(2023, 3, 16, 9, 0),
      senderId: 'user-2',
      isAgent: false,
      platform: 'linkedin',
      read: true,
    },
    {
      id: 'msg-6',
      conversationId: 'conv-2',
      content: "Hi Emily! Absolutely, we'd be happy to schedule a demo. What days/times work best for you?",
      timestamp: new Date(2023, 3, 16, 9, 15),
      senderId: 'agent-2',
      isAgent: true,
      platform: 'linkedin',
      read: true,
    },
    {
      id: 'msg-7',
      conversationId: 'conv-2',
      content: "Next Tuesday at 2 PM would work well for our team.",
      timestamp: new Date(2023, 3, 16, 9, 30),
      senderId: 'user-2',
      isAgent: false,
      platform: 'linkedin',
      read: false,
    },
  );

  // Conversation 3 - WhatsApp
  messages.push(
    {
      id: 'msg-8',
      conversationId: 'conv-3',
      content: "Is your customer service available now? I need urgent help.",
      timestamp: new Date(2023, 3, 17, 14, 0),
      senderId: 'user-3',
      isAgent: false,
      platform: 'whatsapp',
      read: true,
    },
    {
      id: 'msg-9',
      conversationId: 'conv-3',
      content: "Yes, we're available! How can I help you today?",
      timestamp: new Date(2023, 3, 17, 14, 5),
      senderId: 'agent-1',
      isAgent: true,
      platform: 'whatsapp',
      read: true,
    },
    {
      id: 'msg-10',
      conversationId: 'conv-3',
      content: "I can't log into my account. I've tried resetting my password but I'm not receiving the email.",
      timestamp: new Date(2023, 3, 17, 14, 10),
      senderId: 'user-3',
      isAgent: false,
      platform: 'whatsapp',
      read: false,
    },
  );

  // Conversation 4 - LinkedIn
  messages.push(
    {
      id: 'msg-11',
      conversationId: 'conv-4',
      content: "I saw your company is hiring for senior developer positions. Are remote candidates considered?",
      timestamp: new Date(2023, 3, 18, 11, 0),
      senderId: 'user-4',
      isAgent: false,
      platform: 'linkedin',
      read: false,
    },
  );

  return messages;
};

export const messages = createMessages();

// Mock Conversations
export const conversations: Conversation[] = [
  {
    id: 'conv-1',
    user: users[0],
    platform: 'facebook',
    lastMessage: messages.find(m => m.id === 'msg-4'),
    unreadCount: 0,
    status: 'open',
    assignedTo: agents[0],
    tags: ['order issue', 'damaged'],
  },
  {
    id: 'conv-2',
    user: users[1],
    platform: 'linkedin',
    lastMessage: messages.find(m => m.id === 'msg-7'),
    unreadCount: 1,
    status: 'open',
    assignedTo: agents[1],
    tags: ['demo request', 'enterprise'],
  },
  {
    id: 'conv-3',
    user: users[2],
    platform: 'whatsapp',
    lastMessage: messages.find(m => m.id === 'msg-10'),
    unreadCount: 1,
    status: 'pending',
    tags: ['login issue', 'urgent'],
  },
  {
    id: 'conv-4',
    user: users[3],
    platform: 'linkedin',
    lastMessage: messages.find(m => m.id === 'msg-11'),
    unreadCount: 1,
    status: 'pending',
    tags: ['job inquiry'],
  },
];
