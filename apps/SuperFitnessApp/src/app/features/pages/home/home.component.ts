import { Component } from '@angular/core';
import { HeroComponent } from './components/hero/hero.component';
import { AboutUsComponent } from '../about-us/about-us.component';
import { WhyUsComponent } from './components/why-us/why-us.component';

@Component({
  selector: 'app-home',
  imports: [
    HeroComponent,
    AboutUsComponent,
    WhyUsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
