import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FlowbiteService } from './core/services/flowbite.service';
import { MainPageComponent } from "./shared/components/main-page/main-page.component";
declare function initFlowbite(): void;


@Component({
  imports: [RouterModule, ButtonModule, MainPageComponent],
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
