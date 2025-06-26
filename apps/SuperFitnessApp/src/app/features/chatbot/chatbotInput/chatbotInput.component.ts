import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-chatbot-input',
  imports: [
    CommonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
  ],
  templateUrl: './chatbotInput.component.html',
  styleUrl: './chatbotInput.component.scss',
})
export class ChatbotInputComponent {
  userMessage: string = '';
  onSend = output<string>();

  sendMessage() {
    this.onSend.emit(this.userMessage);
    this.userMessage = '';
  }
}
