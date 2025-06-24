import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatbotWindowComponent } from '../chatbotWindow/chatbotWindow.component';

@Component({
  selector: 'app-chatbot-floating',
  imports: [CommonModule, ChatbotWindowComponent],
  templateUrl: './chatbotFloating.component.html',
  styleUrl: './chatbotFloating.component.scss',
})
export class ChatbotFloatingComponent {
  chatStarted: boolean = false;
  startChat() {
    this.chatStarted = true;
  }
  /**
   * 
   *  private readonly geminiApiKey: string = environment.GEMINI_API_KEY;

  initGeminiChatModal() {
    const apiKey = this.geminiApiKey;
    const genAI = new GoogleGenAI({
      apiKey: apiKey,
    });
    const chatModal = genAI.chats.create({
      model: 'gemini-2.0-flash',
      config: {
        temperature: 0.5,
        maxOutputTokens: 1024,
      },
    });
    chatModal
      .sendMessage({
        message: 'Hello! How can I assist you today?',
      })
      .then((response) => {
        console.log('Chatbot initialized:', response);
      });
  }
   */
}
