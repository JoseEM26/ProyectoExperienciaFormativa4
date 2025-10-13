import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService, ChatMessage } from '../../Services/chat-service'; 
import { Subscription } from 'rxjs';

interface Contact {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  avatar: string;
  online: boolean;
}

interface Message {
  id: number;
  text: string;
  sender: 'me' | 'other';
  time: string;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-component.html',
  styleUrls: ['./chat-component.css']
})
export class ChatComponent implements OnInit, OnDestroy {  
  private messageSub?: Subscription;

  constructor(private chatService: ChatService) {} 

  selectedChat = signal<number | null>(null);
  message = signal<string>('');
  searchQuery = signal<string>('');

  contacts = signal<Contact[]>([
    { id: 1, name: 'Jose Angel', lastMessage: 'Hola, ¿cómo estás?', time: '10:30', unread: 2, avatar: 'MG', online: true },
    { id: 2, name: 'Royser Fonce', lastMessage: 'La reunión es a las 3pm', time: '09:15', unread: 0, avatar: 'CR', online: false },
    { id: 3, name: 'Patrick Ronald', lastMessage: 'Perfecto, gracias!', time: 'Ayer', unread: 0, avatar: 'AM', online: true },
    { id: 4, name: 'Nicolas Perez', lastMessage: 'Te envío los documentos', time: 'Ayer', unread: 5, avatar: 'PL', online: false },
    { id: 5, name: 'Laura Sánchez', lastMessage: 'Nos vemos mañana', time: '12/10', unread: 0, avatar: 'LS', online: true },
  ]);

  messagesMap = signal<Record<number, Message[]>>({
    1: [
      { id: 1, text: 'Hola, ¿cómo estás?', sender: 'other', time: '10:30' },
      { id: 2, text: '¡Hola María! Todo bien, gracias. ¿Y tú?', sender: 'me', time: '10:31' },
    ],
  });

  ngOnInit(): void {
    this.chatService.connect(); // 👈 conectamos al backend

    // 👇 Suscribirse para escuchar mensajes en tiempo real
    this.messageSub = this.chatService.message$.subscribe((message) => {
      if (message) {
        const chatId = this.selectedChat();
        if (!chatId) return;

        const currentMessages = this.messagesMap();
        const chatMessages = currentMessages[chatId] || [];

        this.messagesMap.set({
          ...currentMessages,
          [chatId]: [
            ...chatMessages,
            { id: Date.now(), text: message.content, sender: 'other', time: message.time }
          ]
        });
      }
    });
  }

  ngOnDestroy(): void {
      this.chatService.disconnect();
      this.messageSub?.unsubscribe();
  }

  get filteredContacts(): Contact[] {
    const query = this.searchQuery().toLowerCase();
    if (!query) return this.contacts();
    return this.contacts().filter(contact => 
      contact.name.toLowerCase().includes(query)
    );
  }

  get currentMessages(): Message[] {
    const chatId = this.selectedChat();
    if (!chatId) return [];
    return this.messagesMap()[chatId] || [];
  }

  get currentContact(): Contact | undefined {
    const chatId = this.selectedChat();
    if (!chatId) return undefined;
    return this.contacts().find(c => c.id === chatId);
  }

  selectChat(contactId: number): void {
    this.selectedChat.set(contactId);
  }

  updateSearchQuery(query: string): void {
    this.searchQuery.set(query);
  }

  updateMessage(msg: string): void {
    this.message.set(msg);
  }

  sendMessage(): void {
    const chatId = this.selectedChat();
    const msg = this.message().trim();
    if (!msg || !chatId) return;

    const newMessage: ChatMessage = {
      sender: 'me', // 👈 reemplaza por el usuario actual
      content: msg,
      time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    };

    
    this.chatService.sendMessage(newMessage);

    
    const currentMessages = this.messagesMap();
    const chatMessages = currentMessages[chatId] || [];

    this.messagesMap.set({
      ...currentMessages,
      [chatId]: [...chatMessages, { id: Date.now(), text: msg, sender: 'me', time: newMessage.time }]
    });

    this.message.set('');
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') this.sendMessage();
  }
}
