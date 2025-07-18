import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatbotInputComponent } from '../chatbotInput/chatbotInput.component';
import { GoogleGenAI, Chat } from '@google/genai';
import { environment } from '../../../environments/environment.development';
import * as ChatbotSelectors from '../../../store/chatbot/chatbot.selectors';
import * as ChatbotActions from '../../../store/chatbot/chatbot.actions';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ChatMessage } from '../../../store/chatbot/chatbot.state';
import { MessageCardComponent } from '../messageCard/messageCard.component';

@Component({
  selector: 'app-chatbot-window',
  imports: [CommonModule, ChatbotInputComponent, MessageCardComponent],
  templateUrl: './chatbotWindow.component.html',
  styleUrl: './chatbotWindow.component.scss',
})
export class ChatbotWindowComponent implements OnInit {
  private readonly geminiApiKey: string = environment.GEMINI_API_KEY;
  private readonly geminiModel: string = 'gemini-2.0-flash';
  private readonly geminiConfig = {
    temperature: 0.5,
    maxOutputTokens: 1024,
  };

  private chatModal!: Chat;
  chatHistory$!: Observable<ChatMessage[]>;
  isLoading$!: Observable<boolean>;
  isOpen: boolean = false;
  sub$ = new Subject();

  private readonly _store = inject(Store);
  private readonly _apiKey = this.geminiApiKey;
  private readonly genAI = new GoogleGenAI({ apiKey: this._apiKey });

  initGeminiChatModal() {
    this.chatModal = this.getChat();
  }

  getChat(): Chat {
    return this.genAI.chats.create({
      model: this.geminiModel,
      config: this.geminiConfig,
      history: [],
    });
  }

  startChat() {
    setTimeout(() => {
      this.sendMessage('Hello');
    }, 2000);
  }

  sendMessage(message: string) {
    // 1- save user message in history
    this._store.dispatch(ChatbotActions.sendMessage({ content: message }));
    // 2- send user message to AI
    this.chatModal
      .sendMessage({
        message: message,
      })
      .then((response) => {
        // 3- save AI response
        if (response.text) {
          this.setAIResponse(response.text);
        }
      });
  }

  setAIResponse(res: string) {
    this._store.dispatch(ChatbotActions.aiResponse({ content: res }));
  }

  trackChatHistory() {
    this.chatHistory$ = this._store.select(ChatbotSelectors.chatHistory);
  }

  trackLoading() {
    this.isLoading$ = this._store.select(ChatbotSelectors.loadingStatus);
  }

  trackChatStatus() {
    this._store
      .select(ChatbotSelectors.isOpen)
      .pipe(takeUntil(this.sub$))
      .subscribe({
        next: (val) => {
          this.isOpen = val;
          if (this.isOpen) {
            this.initGeminiChatModal();
            this.startChat();
          }
        },
      });
  }

  ngOnInit(): void {
    this.initGeminiChatModal();
    this.trackChatHistory();
    this.trackLoading();
    this.trackChatStatus();
  }
}
