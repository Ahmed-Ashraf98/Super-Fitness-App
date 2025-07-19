import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { HorizonbarComponent } from '../horizonbar/horizonbar.component';
import { WhyUsComponent } from '../why-us/why-us.component';
import { FooterComponent } from '../footer/footer.component';
import { HomeComponent } from '../../../core/components/home/home.component';
import { AboutUsComponent } from '../../../core/components/about-us/about-us.component';
import { ChatbotFloatingComponent } from '../../../features/chatbot/chatbotFloating/chatbotFloating.component';

@Component({
  selector: 'app-main-page',
  imports: [
    NavbarComponent,
    HomeComponent,
    HorizonbarComponent,
    AboutUsComponent,
    WhyUsComponent,
    FooterComponent,
    ChatbotFloatingComponent,
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
})
export class MainPageComponent {}
