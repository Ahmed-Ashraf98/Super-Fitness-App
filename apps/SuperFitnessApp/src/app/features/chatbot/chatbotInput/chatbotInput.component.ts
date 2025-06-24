import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
@Component({
  selector: 'app-chatbot-input',
  imports: [CommonModule, IconFieldModule, InputIconModule, InputTextModule],
  templateUrl: './chatbotInput.component.html',
  styleUrl: './chatbotInput.component.scss',
})
export class ChatbotInputComponent {}
