import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ItemService } from '../home/items/item.service';
import { Item, ITEMS } from './catalog-items/catalog-items';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogComponent implements OnInit {
  rangeValues: number[] = [0, 300];

  itemsData: any = this.http.getItems().pipe(map((res: any) =>
    res.content.length
  ));

  items: Array<Item> = ITEMS;
  item: string = '';

  checked: boolean = false;

  categories: any[] = [{ name: this.items[0].subTitle, key: 'F' },
  { name: this.items[22].subTitle, key: 'I' },
  { name: this.items[20].subTitle, key: 'P' },
  { name: this.items[15].subTitle, key: 'A' },
  { name: this.items[26].subTitle, key: 'C' },
  { name: this.items[11].subTitle, key: 'L' }];

  searchText: string = '';

  constructor(private http: ItemService, private router: Router, private route: ActivatedRoute) {

  }
  ngOnInit() {

  }
  clearFilter() {
    this.searchText = "";
    this.checked = false;
  }

  filterCategories(event: any) {
    console.log(event);

    this.item = event.checked[0].name;
    this.router.navigate([this.item], { relativeTo: this.route })
  }

}



