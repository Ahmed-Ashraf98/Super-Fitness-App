import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Component, Inject, OnInit, OnDestroy, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, catchError, of, interval } from 'rxjs';
import { MealDetails } from '../../../core/models/healthy-Interfaces';
import { HealthyServiceService } from '../../../core/services/healthey/healthy-service.service';
import { ThemeManagerService } from '../../../core/services/ThemeManger/ThemeManagerService.service';
import { TranslateManagerService } from '../../../core/services/TranslateManger/translate-manager-service.service';

@Component({
  selector: 'app-single-meal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './single-meal.component.html',
  styleUrls: ['./single-meal.component.scss']
})
export class SingleMealComponent implements OnInit, OnDestroy {
  mealDetails: MealDetails | null = null;
  mealId: string | null = null;
  themeVal: boolean = false;
  langVal: boolean = false;
  isLoading: boolean = false;
  private themeSubscription?: Subscription;
  private routeSubscription?: Subscription;

  constructor(
    private healthyService: HealthyServiceService,
    private themeManager: ThemeManagerService,
    private _translateManager: TranslateManagerService,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  getMealDetails(mealId: string): void {
    this.isLoading = true;
    this.healthyService.getMealDetails(mealId).pipe(
      catchError(() => of(null))
    ).subscribe({
      next: (response) => {
        this.mealDetails = response;
        this.isLoading = false;
      },
      error: () => {
        this.mealDetails = null;
        this.isLoading = false;
      }
    });
  }
 
  goBack(): void {
    this.router.navigate(['/healthy-nutri']);
  }

  getUserPrefFromCookies(): void {
    const theme = this.themeManager.getCurrentTheme();
    const lang = this._translateManager.getCurrentLang();

    this.themeVal = theme === 'dark';
    this.langVal = lang === 'ar';
  }

  ngOnInit(): void {
    this.themeManager.initTheme();
    this.getUserPrefFromCookies();

    // Get meal ID from route parameters
    this.routeSubscription = this.route.params.subscribe(params => {
      this.mealId = params['id'];
      if (this.mealId) {
        this.getMealDetails(this.mealId);
      }
    });

    if (isPlatformBrowser(this.platformId)) {
      this.themeSubscription = interval(1000).subscribe(() => {
        const currentTheme = this.themeManager.getCurrentTheme();
        this.themeVal = currentTheme === 'dark';
        
        const currentLang = this._translateManager.getCurrentLang();
        this.langVal = currentLang === 'ar';
      });
    }
  }

  ngOnDestroy(): void {
    this.themeSubscription?.unsubscribe();
    this.routeSubscription?.unsubscribe();
  }

}
