import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ItemService } from './item.service';
import { Item, ITEMS } from './items.config'

@Component({
  selector: 'app-home-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  itemsData: Observable<any> = this.http.getItems().pipe(map((res: any) =>
    res.content
  ));
  items: Array<Item> = ITEMS

  constructor(private http: ItemService) {

  }

  ngOnInit(): void {

  }
}
