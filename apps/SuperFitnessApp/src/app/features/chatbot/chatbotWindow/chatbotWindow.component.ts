import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatbotInputComponent } from '../chatbotInput/chatbotInput.component';
import { GoogleGenAI } from '@google/genai';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-chatbot-window',
  imports: [CommonModule, ChatbotInputComponent],
  templateUrl: './chatbotWindow.component.html',
  styleUrl: './chatbotWindow.component.scss',
})
export class ChatbotWindowComponent {
  private readonly geminiApiKey: string = environment.GEMINI_API_KEY;

  initGeminiChatModal() {
    const apiKey = this.geminiApiKey;
    const genAI = new GoogleGenAI({
      apiKey: apiKey,
    });

    // genAI.chats.create();

    const chatModal = genAI.chats.create({
      model: 'gemini-2.0-flash',
      config: {
        temperature: 0.5,
        maxOutputTokens: 1024,
      },
    });

    chatModal
      .sendMessage({
        message: 'Help me with my fitness goals!',
      })
      .then((response) => {
        console.log('Chatbot initialized:', response);
      });

    let res = chatModal.getHistory();
    console.log('Chat history:', res);
  }
}
