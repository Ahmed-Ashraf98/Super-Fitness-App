import { Component, ElementRef, input, output, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'primeng/tabs';
import { title } from 'node:process';
import { tabData } from './tab.model';

@Component({
  selector: 'app-custom-tab',
  standalone: true,
  imports: [CommonModule, TabsModule],
  templateUrl: './custom-tab.component.html',
  styleUrl: './custom-tab.component.scss',
})
export class CustomTabComponent implements OnInit {
  tabs = input.required<tabData[]>();
  defaultTab = input<number>(0);
  emitItem = output<string>();

  tabsList: tabData[] = [] as tabData[];
  activeTabIndex = signal<number>(0);

  tabClick(event: MouseEvent) {
    console.log('🖱️ Tab click event:', event);
    const element = event.target as HTMLElement;
    console.log('🎯 Clicked element:', element);
    
    // Find the closest p-tab element or check if the target has the data attribute
    let tabElement = element;
    while (tabElement && !tabElement.hasAttribute('data-itemId')) {
      tabElement = tabElement.parentElement as HTMLElement;
      if (!tabElement) break;
    }
    
    const itemId = tabElement?.getAttribute('data-itemId');
    console.log('🏷️ Found itemId:', itemId);
    
    if (itemId) {
      console.log('📤 Emitting itemId:', itemId);
      this.emitItem.emit(itemId);
      // Update active tab
      const tabIndex = this.tabsList.findIndex(tab => tab.id === itemId);
      if (tabIndex !== -1) {
        this.activeTabIndex.set(tabIndex);
        console.log('✅ Active tab updated to index:', tabIndex);
      }
    } else {
      console.log('❌ No itemId found for clicked element');
    }
  }

  generateTabs() {
    this.tabsList = this.tabs()?.map((item, index) => ({
      id: item.id,
      value: index,
      title: item.title,
    }));
    this.activeTabIndex.set(this.defaultTab());
  }

  ngOnInit() {
    this.generateTabs();
  }
}
