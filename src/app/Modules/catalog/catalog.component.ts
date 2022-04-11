import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Item, ITEMS } from './catalog-items/catalog-items';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogComponent implements OnInit {
  rangeValues: number[] = [0, 300];

  items: Array<Item> = ITEMS;
  item: any;

  checked: boolean = false;

  categories: any[] = [{ name: this.items[0].subTitle, key: 'F' },
  { name: this.items[22].subTitle, key: 'I' },
  { name: this.items[20].subTitle, key: 'P' },
  { name: this.items[15].subTitle, key: 'A' },
  { name: this.items[26].subTitle, key: 'C' },
  { name: this.items[11].subTitle, key: 'L' }];

  searchText: string = '';

  constructor() {

  }
  ngOnInit() {

  }
  clearFilter() {
    this.searchText = "";
    this.checked = false;
  }


}



