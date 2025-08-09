import { Component, ElementRef, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'primeng/tabs';
import { title } from 'node:process';
import { tabData } from './tab.model';

@Component({
  selector: 'app-custom-tab',
  imports: [CommonModule, TabsModule],
  templateUrl: './custom-tab.component.html',
  styleUrl: './custom-tab.component.scss',
})
export class CustomTabComponent {
  tabs = input.required<tabData[]>();
  defaultTab = input<number>(0);
  emitItem = output<string>();

  tabsList: tabData[] = [] as tabData[];

  tabClick(event: MouseEvent) {
    const element = event.target as HTMLElement;
    const itemId = element.getAttribute('data-itemId');
    // console.log(itemId);
    this.emitItem.emit(itemId!);
  }

  generateTabs() {
    this.tabsList = this.tabs()?.map((item, index) => ({
      id: item.id,
      value: index,
      title: item.title,
    }));
  }

  ngOnInit() {
    this.generateTabs();
  }
}
