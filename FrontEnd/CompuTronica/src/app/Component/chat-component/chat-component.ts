import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../Services/chat-service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-component.html',
  styleUrls: ['./chat-component.css']
})
export class ChatComponent {
  messages: any[] = [];
  messageInput: string = '';
  sender: string = 'Estudiante';

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.chatService.connect();
    this.chatService.messages$.subscribe((msg : any) => {
      this.messages.push(msg);
    });
  }

  sendMessage() {
    if (this.messageInput.trim()) {
      this.chatService.sendMessage({
        sender: this.sender,
        content: this.messageInput
      });
      this.messageInput = '';
    }
  }
}
