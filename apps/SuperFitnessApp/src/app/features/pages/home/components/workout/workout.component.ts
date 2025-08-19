import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Carousel, CarouselModule } from 'primeng/carousel';
import { TranslateModule } from '@ngx-translate/core';
import { CustomSliderComponent } from 'apps/SuperFitnessApp/src/app/shared/components/custom-slider/custom-slider.component';
import { MusclesGroup } from 'apps/SuperFitnessApp/src/app/core/models/allMuscles';
import { tabData } from 'apps/SuperFitnessApp/src/app/shared/components/custom-tab/tab.model';
import { MusclesService } from 'apps/SuperFitnessApp/src/app/core/services/muscles/muscles.service';
import { ThemeManagerService } from 'apps/SuperFitnessApp/src/app/core/services/ThemeManger/ThemeManagerService.service';

@Component({
  selector: 'app-workout',
  imports: [
    CommonModule,
    CarouselModule,
    CustomSliderComponent,
    TranslateModule,
    Carousel,
  ],
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss'],
})
export class WorkoutComponent implements OnInit {
  muscleGroups: MusclesGroup[] = [];
  displayedMuscleGroups: MusclesGroup[] = [];
  selectedGroupId = 'full_body';
  themeVal = false;
  filterTabs: tabData[] = [];

  tabResponsiveOptions = [
    { breakpoint: '1400px', numVisible: 6, numScroll: 3 },
    { breakpoint: '1200px', numVisible: 5, numScroll: 3 },
    { breakpoint: '992px', numVisible: 4, numScroll: 2 },
    { breakpoint: '768px', numVisible: 3, numScroll: 2 },
    { breakpoint: '576px', numVisible: 2, numScroll: 1 },
    { breakpoint: '420px', numVisible: 1, numScroll: 1 },
  ];

  get muscleSliderItems() {
    return this.displayedMuscleGroups.map((g) => ({
      idMeal: g._id,
      strMeal: g.name,
      strMealThumb: this.getMuscleGroupImage(g._id),
    }));
  }

  constructor(
    private _MusclesService: MusclesService,
    private router: Router,
    private themeService: ThemeManagerService
  ) {}

  ngOnInit() {
    this._MusclesService.getAllmuscles().subscribe((response) => {
      this.muscleGroups = response.musclesGroup;
      this.generateFilterTabs();
      this.updateDisplayedMuscleGroups();
    });

    this.themeVal = this.themeService.getCurrentTheme() === 'dark';
  }

  shouldShow(group: MusclesGroup): boolean {
    return (
      this.selectedGroupId === 'full_body' || this.selectedGroupId === group._id
    );
  }

  updateDisplayedMuscleGroups() {
    this.displayedMuscleGroups = this.muscleGroups.filter((group) =>
      this.shouldShow(group)
    );
  }

  generateFilterTabs() {
    this.filterTabs = [
      { id: 'full_body', title: 'fitnessClass.full_body' },
      ...this.muscleGroups
        .filter(group => group._id !== 'full_body')
        .map(group => ({
          id: group._id,
          title: group.name,
        })),
    ];
  }
  
  onFilterChange(selectedId: string) {
    this.selectedGroupId = selectedId;
    this.updateDisplayedMuscleGroups();
  }

  onReadMore(id?: string) {
    if (id) {
      this.router.navigate(['/class', id]);
    }
  }

  getMuscleGroupImage(muscleGroupId: string): string {
    return 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop';
  }
}
