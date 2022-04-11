import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Item, ITEMS } from './catalog-items';

@Component({
  selector: 'app-catalog-items',
  templateUrl: './catalog-items.component.html',
  styleUrls: ['./catalog-items.component.scss'],
  host: {
    "(window:resize)": "onResize()"
  }
})
export class CatalogItemsComponent implements OnInit {

  items: Array<Item> = ITEMS;
  item: any;
  p: number = 1;
  pageSize = 12;
  constructor() {

  }
  ngOnInit(): void {
  }

  onResize() {
    if (window.innerWidth <= 1145) {
      this.pageSize = 5;
    }
    else {
      this.pageSize = 12;
    }
  }

}
