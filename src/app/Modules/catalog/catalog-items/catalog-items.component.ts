import { Component, OnInit } from '@angular/core';
import { Item, ITEMS } from './catalog-items';

@Component({
  selector: 'app-catalog-items',
  templateUrl: './catalog-items.component.html',
  styleUrls: ['./catalog-items.component.scss']
})
export class CatalogItemsComponent implements OnInit {
  items: Array<Item> = ITEMS;
  item: any;
  p: number = 1;
  ngOnInit(): void {
  }
}
