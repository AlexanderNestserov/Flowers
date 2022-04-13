import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ItemService } from '../../home/items/item.service';


@Component({
  selector: 'app-catalog-items',
  templateUrl: './catalog-items.component.html',
  styleUrls: ['./catalog-items.component.scss'],
  host: {
    "(window:resize)": "onResize()"
  }
})
export class CatalogItemsComponent implements OnInit {

  itemsData: Observable<any> = this.http.getItems().pipe(map((res: any) =>
    res.content
  ));

  p: number = 1;
  pageSize = 12;
  constructor(private http: ItemService) {

  }
  ngOnInit(): void {
    this.onResize();
  }

  onResize() {
    if (window.innerWidth < 1145) {
      this.pageSize = 5;
    }
    else {
      this.pageSize = 12;
    }
  }

  getItemImage(item:string):string {
     return `${environment.serverUrl}images/${item.replace('.jpg', '')}`;
  }


}
