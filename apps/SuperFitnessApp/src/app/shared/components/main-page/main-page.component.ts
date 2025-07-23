import { Component } from '@angular/core';
import { NavbarComponent } from '../../../core/layout/navbar/navbar.component';
import { HorizonbarComponent } from '../horizonbar/horizonbar.component';
import { WhyUsComponent } from '../why-us/why-us.component';
import { FooterComponent } from '../../../core/layout/footer/footer.component';
import { HomeComponent } from '../../../features/pages/home/home.component';
import { AboutUsComponent } from '../../../features/pages/about-us/about-us.component';
import { ChatbotFloatingComponent } from '../../../features/chatbot/chatbotFloating/chatbotFloating.component';

@Component({
  selector: 'app-main-page',
  imports: [
    HomeComponent,
    HorizonbarComponent,
    AboutUsComponent,
    WhyUsComponent,
    ChatbotFloatingComponent,
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
})
export class MainPageComponent {}
