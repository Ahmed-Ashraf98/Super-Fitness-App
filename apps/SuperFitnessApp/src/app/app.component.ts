import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ChatbotComponent } from './features/chatbot/chatbot.component';

@Component({
  imports: [RouterModule, ButtonModule, ChatbotComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'SuperFitnessApp';
}
