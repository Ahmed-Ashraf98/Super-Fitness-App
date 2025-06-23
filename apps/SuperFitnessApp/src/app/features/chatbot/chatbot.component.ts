import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment.development';
import { GoogleGenAI } from '@google/genai';

@Component({
  selector: 'app-chatbot',
  imports: [CommonModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss',
})
export class ChatbotComponent {
  chatStarted: boolean = false;
  startChat() {
    this.chatStarted = true;
  }
}
