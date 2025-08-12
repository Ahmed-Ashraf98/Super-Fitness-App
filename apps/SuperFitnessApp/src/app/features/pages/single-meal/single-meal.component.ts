// SingleMealComponent.ts
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Component, Inject, OnInit, OnDestroy, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, catchError, of, interval } from 'rxjs';
import { MealDetails, Meals } from '../../../core/models/healthy-Interfaces';
import { HealthyServiceService } from '../../../core/services/healthey/healthy-service.service';
import { ThemeManagerService } from '../../../core/services/ThemeManger/ThemeManagerService.service';
import { TranslateManagerService } from '../../../core/services/TranslateManger/translate-manager-service.service';
import { tabData } from '../../../shared/components/custom-tab/tab.model';

@Component({
  selector: 'app-single-meal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './single-meal.component.html',
  styleUrls: ['./single-meal.component.scss']
})
export class SingleMealComponent implements OnInit, OnDestroy {
  mealDetails: MealDetails | null = null;
  mealsList: Meals[] = [] ;
  mealId: string | null = null;
  themeVal = false;
  langVal = false;
  isLoading = false;
  showSidebar = false;

  currentFilter: string = 'breakfast';

  private themeSubscription?: Subscription;
  private routeSubscription?: Subscription;

  constructor(
    private healthyService: HealthyServiceService,
    private themeManager: ThemeManagerService,
    private _translateManager: TranslateManagerService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private route: ActivatedRoute
  ) {}

  
  filterTabs: tabData[] = [
    { id: 'all', title: 'All Meals' },
    { id: 'breakfast', title: 'Breakfast' },
    { id: 'lunch', title: 'Lunch' },
    { id: 'dinner', title: 'Dinner' }
  ];

  mealTypeFilters: { [key: string]: string[] } = {
    breakfast: ['Breakfast', 'Cereal', 'Eggs', 'Pancakes', 'Waffles', 'Oatmeal', 'Toast', 'Bacon', 'Sausage', 'Yogurt', 'Fruit', 'Granola'],
    lunch: ['Sandwich', 'Salad', 'Soup', 'Pasta', 'Rice', 'Chicken', 'Fish', 'Beef', 'Vegetarian', 'Burger', 'Pizza', 'Wrap'],
    dinner: ['Steak', 'Seafood', 'Pasta', 'Rice', 'Chicken', 'Fish', 'Beef', 'Vegetarian', 'Dessert', 'Roast', 'Grill']
  };

  ngOnInit(): void {
    this.themeManager.initTheme();
    this.getUserPrefFromCookies();
  
    // استمع للباراميتر من الرابط
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      this.mealId = params.get('id'); // اسم الباراميتر في الروت لازم يكون 'id'
      if (this.mealId) {
        this.displayMealDetails(this.mealId);
      }
    });
  
    this.getAllMeals();
  }
  
  getUserPrefFromCookies(): void {
    const theme = this.themeManager.getCurrentTheme();
    const lang = this._translateManager.getCurrentLang();

    this.themeVal = theme === 'dark';
    this.langVal = lang === 'ar';
  }

  displayMealDetails(mealId: string): void {
    this.isLoading = true;
    this.healthyService.getMealDetails(mealId).pipe(
      catchError(() => of(null))
    ).subscribe({
      next: (response) => {
        this.mealDetails = response;
        this.isLoading = false;
      }
    });
  }
  getAllMeals(): void {
    this.isLoading = true;
    // جلب كل الوجبات من category عام (مثلاً 'Misc' أو 'Seafood' لو API تسمح)
    this.healthyService.getMealsByCategory('Seafood').pipe( // استبدل الكاتيجوري حسب API
      catchError(() => of([]))
    ).subscribe({
      next: (response) => {
        if (this.currentFilter === 'all') {
          this.mealsList = response || [];
        } else {
          const keywords = this.mealTypeFilters[this.currentFilter.toLowerCase()] || [];
          this.mealsList = (response || []).filter(meal => 
            keywords.some(keyword => meal.strMeal.toLowerCase().includes(keyword.toLowerCase()))
          );
        }
        this.isLoading = false;
        console.log('Filtered mealsList:', this.mealsList);
      }
    });
  }

  changeFilter(filter: string): void {
    this.currentFilter = filter.toLowerCase();
    this.getAllMeals();
  }

  getIngredients(meal: MealDetails | null): { name: string; measure: string }[] {
    if (!meal) return [];
  
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = (meal as any)[`strIngredient${i}`];
      const measure = (meal as any)[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== '') {
        ingredients.push({ name: ingredient, measure: measure || '' });
      }
    }
    return ingredients;
  }
  
  

  ngOnDestroy(): void {
    this.themeSubscription?.unsubscribe();
    this.routeSubscription?.unsubscribe();
  }
}


