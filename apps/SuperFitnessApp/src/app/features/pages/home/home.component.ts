import { Component } from '@angular/core';
import { HeroComponent } from './components/hero/hero.component';
import { AboutUsComponent } from '../about-us/about-us.component';
import { WhyUsComponent } from './components/why-us/why-us.component';
import { ChatbotFloatingComponent } from '../../chatbot/chatbotFloating/chatbotFloating.component';
import { CustomCardComponent } from '../../../shared/components/cutom-card/custom-card.component';
import { CustomSliderComponent } from '../../../shared/components/custom-slider/custom-slider.component';

@Component({
  selector: 'app-home',
  imports: [
    HeroComponent,
    AboutUsComponent,
    WhyUsComponent,
    ChatbotFloatingComponent,
    CustomCardComponent,
    CustomSliderComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
