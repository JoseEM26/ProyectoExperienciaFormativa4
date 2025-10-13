// src/app/services/chat.service.ts
import { Injectable } from '@angular/core';
import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { BehaviorSubject } from 'rxjs';

export interface ChatMessage {
  sender: string;
  content: string;
  time: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private stompClient: Client | null = null;
  private messageSubject = new BehaviorSubject<ChatMessage | null>(null);
  message$ = this.messageSubject.asObservable();

  connect(): void {
    // crea un cliente STOMP moderno y le damos la fábrica de WebSocket con SockJS
    this.stompClient = new Client({
      // webSocketFactory es llamado por la librería para obtener el WebSocket
      webSocketFactory: () => new SockJS('http://localhost:8080/chat-websocket'),
      reconnectDelay: 5000, 
      debug: (str) => {
        
        console.log('[STOMP]', str);
      }
    });

    this.stompClient.onConnect = (frame) => {
      console.log('✅ Conectado al servidor WebSocket', frame);

      // Suscribirnos al topic donde el servidor publica los mensajes
      this.stompClient?.subscribe('/topic/messages', (message: IMessage | null) => {
        if (!message) return;
        if (message.body) {
          try {
            const msg: ChatMessage = JSON.parse(message.body);
            this.messageSubject.next(msg);
          } catch (err) {
            console.error('Error parseando mensaje STOMP', err);
          }
        }
      });
    };

    this.stompClient.onStompError = (frame) => {
      console.error('STOMP error', frame);
    };

    this.stompClient.activate(); // activa la conexión
  }

  sendMessage(chatMessage: ChatMessage): void {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.publish({
        destination: '/app/sendMessage',
        body: JSON.stringify(chatMessage)
      });
    } else {
      console.warn('STOMP no está conectado — mensaje no enviado', chatMessage);
    }
  }

  // opcional: desconectar limpiamente
  disconnect(): void {
    if (this.stompClient) {
      this.stompClient.deactivate();
      this.stompClient = null;
    }
  }
}
