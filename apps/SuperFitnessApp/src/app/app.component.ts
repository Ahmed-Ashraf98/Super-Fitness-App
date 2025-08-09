import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { FlowbiteService } from './core/services/flowbite.service';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './core/layout/navbar/navbar.component';
import { FooterComponent } from './core/layout/footer/footer.component';
import { filter } from 'rxjs/operators';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { initFlowbite } from 'flowbite';

@Component({
  imports: [
    RouterModule,
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    CommonModule,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'SuperFitnessApp';
  showLayout = true; // للتحكم في ظهور النافبار والفوتر

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private flowbiteService: FlowbiteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      initFlowbite();
    }

    // متابعة تغييرات الراوتر
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        // لو الرابط فيه /auth نخفي النافبار والفوتر
        this.showLayout = !event.url.startsWith('/auth');
      });
  }
}
