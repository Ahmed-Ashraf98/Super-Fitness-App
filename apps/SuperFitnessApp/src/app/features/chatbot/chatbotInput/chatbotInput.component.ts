import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-chatbot-input',
  imports: [
    CommonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    ButtonModule,
  ],
  templateUrl: './chatbotInput.component.html',
  styleUrl: './chatbotInput.component.scss',
})
export class ChatbotInputComponent {
  sendMessage() {
    throw new Error('Method not implemented.');
  }
}
