import { Component, input, output, OnInit, OnDestroy, Inject, PLATFORM_ID, OnChanges, SimpleChanges } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { CustomCardComponent } from '../cutom-card/custom-card.component';
import { Meals } from '../../../core/models/healthy-Interfaces';

@Component({
  selector: 'app-custom-slider',
  standalone: true,
  imports: [CommonModule, CarouselModule, CustomCardComponent],
  templateUrl: './custom-slider.component.html',
  styleUrl: './custom-slider.component.scss',
})
export class CustomSliderComponent implements OnInit, OnDestroy, OnChanges {
  numOfRows = input<number>(2);
  numOfColumns = input<number>(3);
  autoplayInterval = input<number>(0);
  itemsList = input<Meals[]>([]);
  
  // Output event for meal selection
  mealSelected = output<string>();

  closNum = 0;
  rowsNum = 0;

  groupedItems: Meals[][] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  onMealSelect(mealId: string): void {
    this.mealSelected.emit(mealId);
  }

  getRows() {
    return Array(this.numOfRows())
      .fill(0)
      .map((_, i) => i);
  }

  groupItems(items: Meals[], perPage: number): Meals[][] {
    const grouped = [];
    for (let i = 0; i < items.length; i += perPage) {
      grouped.push(items.slice(i, i + perPage));
    }
    return grouped;
  }

  onResize = () => {
    if (isPlatformBrowser(this.platformId)) {
      this.updateGrouping(window.innerWidth);
    }
  };

  updateGrouping(width: number) {
    let columns = 3;
    if (width <= 575) columns = 1;
    else if (width <= 767) columns = 2;
    else if (width <= 1199) columns = 2;
    else if (width <= 1400) columns = 3;
    const rows = 2;
    const perPage = rows * columns;
    this.groupedItems = this.groupItems(this.itemsList() || [], perPage);
    this.closNum = columns;
    this.rowsNum = rows;
  }

  setColAndRow() {
    this.closNum = this.numOfColumns();
    this.rowsNum = this.numOfRows();
  }

  ngOnInit() {
    this.setColAndRow();
    this.updateSliderData();
    
    if (isPlatformBrowser(this.platformId)) {
      this.updateGrouping(window.innerWidth);
      window.addEventListener('resize', this.onResize);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['itemsList'] && !changes['itemsList'].firstChange) {
      this.updateSliderData();
    }
  }

  private updateSliderData() {
    const perPage = this.numOfRows() * this.numOfColumns();
    this.groupedItems = this.groupItems(this.itemsList() || [], perPage);
    
    if (isPlatformBrowser(this.platformId)) {
      this.updateGrouping(window.innerWidth);
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('resize', this.onResize);
    }
  }
}
