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
  p: number = 1;


  categories: any[] = [{ name: this.items[0].subTitle, key: 'F', checked: false },
  { name: this.items[22].subTitle, key: 'I', checked: false },
  { name: this.items[20].subTitle, key: 'P', checked: false },
  { name: this.items[15].subTitle, key: 'A', checked: false },
  { name: this.items[11].subTitle, key: 'L', checked: false }];




  searchText: string = '';



  getSelected() {
    this.items = this.categories.filter(s => {
      return s.checked;
    });

  }





  constructor() {

  }
  ngOnInit() {

  }



  clearFilter() {
    this.searchText = "";
    this.categories = this.categories.filter(g => {
      g.checked = false;
      return true;
    });

  }


}
