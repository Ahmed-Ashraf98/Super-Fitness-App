import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FlowbiteService } from './core/services/flowbite.service';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./core/layout/navbar/navbar.component";
import { FooterComponent } from "./core/layout/footer/footer.component";
declare function initFlowbite(): void;

@Component({
  imports: [RouterModule, ButtonModule, RouterOutlet, NavbarComponent, FooterComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit{
  title = 'SuperFitnessApp';

  constructor(private flowbiteService: FlowbiteService) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(() => {
      initFlowbite();
    });
  }
}
