import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HealthyServiceService } from '../../../core/services/healthey/healthy-service.service';
import { CommonModule } from '@angular/common';
import { Meals, MealDetails } from '../../../core/models/healthy-Interfaces';
import { ThemeManagerService } from '../../../core/services/ThemeManger/ThemeManagerService.service';
import { TranslateManagerService } from '../../../core/services/TranslateManger/translate-manager-service.service';
import { CustomCardComponent } from '../../../shared/components/cutom-card/custom-card.component';
import { CustomTabComponent } from '../../../shared/components/custom-tab/custom-tab.component';
import { CustomSliderComponent } from '../../../shared/components/custom-slider/custom-slider.component';
import { Subscription, interval, forkJoin, of, catchError, map } from 'rxjs';
import { tabData } from '../../../shared/components/custom-tab/tab.model';

@Component({
  selector: 'app-healthy-nutri',
  standalone: true,
  imports: [CommonModule, CustomCardComponent, CustomTabComponent, CustomSliderComponent],
  templateUrl: './healthy-nutri.component.html',
  styleUrl: './healthy-nutri.component.scss'
})
export class HealthyNutriComponent implements OnInit, OnDestroy {

  allMeals: Meals[] = [];
  filteredMeals: Meals[] = [];
  displayedMeals: Meals[] = [];
  selectedMealDetails: MealDetails | null = null;
  selectedFilter: string = 'all';
  themeVal: boolean = false;
  langVal: boolean = false;
  private themeSubscription?: Subscription;
  private mealsSubscription?: Subscription;

  // Filter tabs for meal types
  filterTabs: tabData[] = [
    { id: 'all', title: 'All Meals' },
    { id: 'breakfast', title: 'Breakfast' },
    { id: 'lunch', title: 'Lunch' },
    { id: 'dinner', title: 'Dinner' }
  ];

  // Optimized meal type mappings for faster filtering
  mealTypeFilters = {
    breakfast: ['Breakfast', 'Cereal', 'Eggs', 'Pancakes', 'Waffles', 'Oatmeal', 'Toast', 'Bacon', 'Sausage', 'Yogurt', 'Fruit', 'Granola'],
    lunch: ['Sandwich', 'Salad', 'Soup', 'Pasta', 'Rice', 'Chicken', 'Fish', 'Beef', 'Vegetarian', 'Burger', 'Pizza', 'Wrap'],
    dinner: ['Steak', 'Seafood', 'Pasta', 'Rice', 'Chicken', 'Fish', 'Beef', 'Vegetarian', 'Dessert', 'Roast', 'Grill']
  };

  constructor(
    private healthyService: HealthyServiceService,
    private themeManager: ThemeManagerService,
    private _translateManager: TranslateManagerService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  getAllMeals(): void {
    // Reduced categories for better performance - focus on most relevant ones
    const selectedCategories = ['Chicken', 'Beef', 'Seafood', 'Vegetarian'];

    const categoryObservables = selectedCategories.map(category =>
      this.healthyService.getMealsByCategory(category).pipe(
        catchError(() => of([]))
      )
    );

    this.mealsSubscription = forkJoin(categoryObservables).pipe(
      map(results => {
        const allMeals = results.flat();

        // Remove duplicates based on meal ID
        const uniqueMeals = allMeals.filter(
          (meal, index, self) => index === self.findIndex(m => m.idMeal === meal.idMeal)
        );

        return uniqueMeals.slice(0, 60);
      })
    ).subscribe({
      next: (meals) => {
        this.allMeals = meals;
        this.filterMealsByType(this.selectedFilter);
      },
      error: () => {
        this.allMeals = [];
        this.filterMealsByType(this.selectedFilter);
      }
    });
  }
 
  filterMealsByType(filterType: string): void {
    console.log('🔍 Filtering meals by type:', filterType);
    this.selectedFilter = filterType;
  
    // لو لسه مفيش داتا، نرجع فورًا
    if (!this.allMeals.length) {
      console.log('⚠️ No meals available for filtering');
      this.filteredMeals = [];
      this.displayedMeals = [];
      return;
    }
  
    if (filterType === 'all') {
      this.filteredMeals = [...this.allMeals];
      console.log('✅ All meals selected:', this.filteredMeals.length);
    } else {
      const allowedKeywords =
        this.mealTypeFilters[filterType as keyof typeof this.mealTypeFilters] || [];
      console.log('🔑 Keywords for', filterType, ':', allowedKeywords);
  
      this.filteredMeals = this.allMeals.filter(meal => {
        const mealName = meal.strMeal?.toLowerCase() || '';
        const hasMatch = allowedKeywords.some(keyword =>
          mealName.includes(keyword.toLowerCase())
        );
        
        if (hasMatch) {
          console.log('🍽️ Meal matched:', meal.strMeal, 'for filter:', filterType);
        }
        
        return hasMatch;
      });
      
      console.log('📊 Filtered meals count for', filterType, ':', this.filteredMeals.length);
    }
  
    // التحديث الفوري للقائمة
    this.displayedMeals = [...this.filteredMeals];
    console.log('🔄 Updated displayedMeals:', this.displayedMeals.length);
    this.selectedMealDetails = null;
  }
  

  onFilterChange(filterId: string): void {
    console.log('🎯 Filter change event received:', filterId);
    this.filterMealsByType(filterId);
  }

  getMealDetails(mealId: string): void {
    this.healthyService.getMealDetails(mealId).pipe(
      catchError(() => of(null))
    ).subscribe({
      next: (response) => {
        this.selectedMealDetails = response;
      }
    });
  }

  onMealSelect(mealId: string | undefined): void {
    if (mealId) {
      this.getMealDetails(mealId);
    }
  }

  getUserPrefFromCookies(): void {
    const theme = this.themeManager.getCurrentTheme();
    const lang = this._translateManager.getCurrentLang();

    this.themeVal = theme === 'dark';
    this.langVal = lang === 'ar';
  }

  ngOnInit(): void {
    this.getAllMeals();
    this.themeManager.initTheme();
    this.getUserPrefFromCookies();

    if (isPlatformBrowser(this.platformId)) {
      this.themeSubscription = interval(1000).subscribe(() => {
        const currentTheme = this.themeManager.getCurrentTheme();
        this.themeVal = currentTheme === 'dark';
      });
    }
  }

  ngOnDestroy(): void {
    this.themeSubscription?.unsubscribe();
    this.mealsSubscription?.unsubscribe();
  }
}
