import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ChatbotFloatingComponent } from './features/chatbot/chatbotFloating/chatbotFloating.component';

@Component({
  imports: [RouterModule, ButtonModule, ChatbotFloatingComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'SuperFitnessApp';
}
