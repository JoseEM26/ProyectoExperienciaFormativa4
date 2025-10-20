import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import SockJS from 'sockjs-client';
import * as StompJs from '@stomp/stompjs';

const Stomp: any = (StompJs as any).Stomp ? (StompJs as any).Stomp : StompJs;

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private stompClient: any;
  private messagesSubject = new Subject<any>();
  public messages$ = this.messagesSubject.asObservable();
  private connected = false;

  connect(): void {
    if (this.connected) return;

    // ✅ Usa directamente SockJS (ya no necesitas el constructor alternativo)
    const socket = new SockJS('http://localhost:8080/chat-websocket');

    // ✅ Crear cliente STOMP
    this.stompClient = Stomp.over(() => socket);

    // Desactivar logs (opcional)
    this.stompClient.debug = () => {};

    this.stompClient.connect({}, (frame: any) => {
      this.connected = true;
      console.log('✅ Conectado al WebSocket');

      this.stompClient.subscribe('/topic/messages', (message: any) => {
        if (message && message.body) {
          try {
            const body = JSON.parse(message.body);
            this.messagesSubject.next(body);
          } catch {
            this.messagesSubject.next(message.body);
          }
        }
      });
    });
  }

  sendMessage(message: any): void {
    if (this.stompClient && this.connected) {
      this.stompClient.send('/app/sendMessage', {}, JSON.stringify(message));
    } else {
      console.warn('⚠️ WebSocket no conectado');
    }
  }

  getMessages(): Observable<any> {
    return this.messages$;
  }
}
