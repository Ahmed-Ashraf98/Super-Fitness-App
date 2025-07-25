import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HorizonbarComponent } from "apps/SuperFitnessApp/src/app/features/pages/home/components/horizonbar/horizonbar.component";

@Component({
  selector: 'app-hero',
  imports: [CommonModule, HorizonbarComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {}
