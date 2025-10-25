export interface Contact {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  avatar: string;
  online: boolean;
  email?: string;
  phone?: string;
}

export interface Message {
  id: number;
  text: string;
  sender: 'me' | 'other';
  time: string;
  read?: boolean;
  type?: 'text' | 'image' | 'file' | 'audio';
  attachmentUrl?: string;
}

export interface Conversation {
  contactId: number;
  messages: Message[];
  lastActivity: Date;
}

export interface ChatState {
  contacts: Contact[];
  conversations: Record<number, Message[]>;
  selectedChatId: number | null;
  searchQuery: string;
  currentUser: string;
}

export interface SendMessageRequest {
  contactId: number;
  text: string;
  type?: 'text' | 'image' | 'file' | 'audio';
}

export interface TypingStatus {
  contactId: number;
  isTyping: boolean;
}
