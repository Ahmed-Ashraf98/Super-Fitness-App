import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { FlowbiteService } from './core/services/flowbite.service';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./core/layout/navbar/navbar.component";
import { FooterComponent } from "./core/layout/footer/footer.component";
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
declare function initFlowbite(): void;

@Component({
  imports: [RouterModule, RouterOutlet, NavbarComponent, FooterComponent,CommonModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'SuperFitnessApp';
  showLayout = true; // للتحكم في ظهور النافبار والفوتر

  constructor(private flowbiteService: FlowbiteService, private router: Router) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(() => {
      initFlowbite();
    });

    // متابعة تغييرات الراوتر
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        // لو الرابط فيه /auth نخفي النافبار والفوتر
        this.showLayout = !event.url.startsWith('/auth');
      });
  }
}
