import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatbotInputComponent } from '../chatbotInput/chatbotInput.component';

@Component({
  selector: 'app-chatbot-window',
  imports: [CommonModule, ChatbotInputComponent],
  templateUrl: './chatbotWindow.component.html',
  styleUrl: './chatbotWindow.component.scss',
})
export class ChatbotWindowComponent {}
