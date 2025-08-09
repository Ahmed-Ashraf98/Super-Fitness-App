import { Component, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CustomCardComponent } from '../cutom-card/custom-card.component';

@Component({
  selector: 'app-custom-slider',
  imports: [
    CommonModule,
    CarouselModule,
    ButtonModule,
    TagModule,
    CustomCardComponent,
  ],
  templateUrl: './custom-slider.component.html',
  styleUrl: './custom-slider.component.scss',
})
export class CustomSliderComponent implements OnInit {
  numOfRows = input<number>(2);
  numOfColumns = input<number>(3);
  autoplayInterval = input<number>(0);

  closNum = 0;
  rowsNum = 0;

  items = [
    { name: 'A', age: 23 },
    { name: 'B', age: 23 },
    { name: 'C', age: 23 },
    { name: 'D', age: 23 },
    { name: 'vvvvvvvvvvvvvvv', age: 3 },
    { name: 'aaaaaaaaaaa', age: 443 },
  ];

  groupedItems: any[][] = [];

  getRows() {
    return Array(this.numOfRows())
      .fill(0)
      .map((_, i) => i);
  }

  groupItems(items: any[], perPage: number): any[][] {
    const grouped = [];
    for (let i = 0; i < items.length; i += perPage) {
      grouped.push(items.slice(i, i + perPage));
    }
    return grouped;
  }

  onResize = () => {
    this.updateGrouping(window.innerWidth);
  };

  updateGrouping(width: number) {
    let columns = 3;
    if (width <= 575) columns = 1;
    else if (width <= 767) columns = 2;
    else if (width <= 1199) columns = 2;
    else if (width <= 1400) columns = 3;

    console.log(columns);

    const rows = 2;
    const perPage = rows * columns;
    this.groupedItems = this.groupItems(this.items, perPage);
    this.closNum = columns;
    this.rowsNum = rows;

    console.log(this.groupedItems);
  }

  setColAndRow() {
    this.closNum = this.numOfColumns();
    this.rowsNum = this.numOfRows();
  }

  ngOnInit() {
    this.setColAndRow();
    const perPage = this.numOfRows() * this.numOfColumns();
    this.groupedItems = this.groupItems(this.items, perPage);
    this.updateGrouping(window.innerWidth);
    window.addEventListener('resize', this.onResize);
  }
}
