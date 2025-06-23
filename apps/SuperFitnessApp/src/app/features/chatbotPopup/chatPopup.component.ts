import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleGenAI } from '@google/genai';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-chat-popup',
  imports: [CommonModule],
  templateUrl: './chatPopup.component.html',
  styleUrl: './chatPopup.component.scss',
})
export class ChatPopupComponent {
  private readonly geminiApiKey: string = environment.GEMINI_API_KEY;

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
}
