import { Component, OnInit, OnDestroy } from '@angular/core';
import { HealthyServiceService } from '../../../core/services/healthey/healthy-service.service';
import { CommonModule } from '@angular/common';
import { Category, Meals, MealDetails } from '../../../core/models/healthy-Interfaces';
import { ThemeManagerService } from '../../../core/services/ThemeManger/ThemeManagerService.service';
import { TranslateManagerService } from '../../../core/services/TranslateManger/translate-manager-service.service';
import { CustomCardComponent } from '../../../shared/components/cutom-card/custom-card.component';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-healthy-nutri',
  standalone: true,
  imports: [CommonModule, CustomCardComponent],
  templateUrl: './healthy-nutri.component.html',
  styleUrl: './healthy-nutri.component.scss'
})
export class HealthyNutriComponent implements OnInit, OnDestroy {

  categories: Category[] = [];
  meals: Meals[] = [];
  selectedMealDetails: MealDetails | null = null;
  selectedCategory: string | null = null;
  themeVal : boolean = false;
  langVal: boolean = false;
  private themeSubscription?: Subscription;

  constructor(
    private healthyService: HealthyServiceService,
    private themeManager: ThemeManagerService,
    private _translateManager: TranslateManagerService
  ) {}

  getMealCategories() {
    this.healthyService.getCategories().subscribe({
      next: (response) => {
        this.categories = response;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  getMealsByCategory(category: string) {
    this.selectedCategory = category;
    this.healthyService.getMealsByCategory(category).subscribe({
      next: (response) => {
        this.meals = response;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  getMealDetails(mealId: string) {
    this.healthyService.getMealDetails(mealId).subscribe({
      next: (response) => {
        this.selectedMealDetails = response;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  onCategorySelect(category: string) {
    this.getMealsByCategory(category);
    this.selectedMealDetails = null; // Reset meal details when category changes
  }

  onMealSelect(mealId: string | undefined) {
    if (mealId) {
      this.getMealDetails(mealId);
    }
  }

  getUserPrefFromCookies() {
    const theme = this.themeManager.getCurrentTheme();
    const lang = this._translateManager.getCurrentLang();

    if (theme == 'dark') {
      this.themeVal = true;
    } else {
      this.themeVal = false;
    }

    if (lang == 'ar') {
      this.langVal = true;
    }
  }

  ngOnInit() {
    this.getMealCategories();
    this.themeManager.initTheme();
    this.getUserPrefFromCookies();
    
    // Check for theme changes periodically
    this.themeSubscription = interval(1000).subscribe(() => {
      const currentTheme = this.themeManager.getCurrentTheme();
      this.themeVal = currentTheme === 'dark';
    });
  }

  ngOnDestroy() {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }
}



