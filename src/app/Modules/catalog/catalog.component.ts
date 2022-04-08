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










  constructor() {

  }
  ngOnInit() {
    //  this.getItems();
  }



  clearFilter() {
    this.searchText = "";
    this.categories = this.categories.filter(g => {
      g.checked = false;
      return true;
    });

  }


  itemsArray: any = [];

  getItems() {
    this.itemsArray = this.items;
  }


  tempArray: any = [];
  newArray: any = [];

  getSelected(event: any) {
    // console.log(event);
    //  if (event.checked.length == 1) {
    // for (let i = 0; i < this.items.length; i++) {
    //  let obj = this.items[i];
    //  if (obj.subTitle == event.checked[0].name && event.checked.length == 1) {
    //  this.tempArray.push(obj);
    // } else if (event.checked.length == 0) {
    //   this.tempArray.pop(obj);
    //  }
    // }

    // } else {
    // for (let i = 0; i < this.items.length; i++) {
    //let obj = this.items[i];
    // if (obj.subTitle != event.checked[0].name) {
    //  this.tempArray.push(obj);
    //  this.newArray.push(this.tempArray)
    //  console.log(this.newArray);

    // }
    // this.items = this.tempArray
  }

}
    // console.log(event.checked[0]);


