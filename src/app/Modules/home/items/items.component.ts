import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ItemService } from './item.service';

@Component({
  selector: 'app-home-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  itemsData: Observable<any> = this.http.getItems().pipe(map((res: any) =>
    res.content
  ));

  constructor(private http: ItemService) {}

  ngOnInit(): void {
  }
  getItemImage(item:string):string{
  return `${environment.serverUrl}images/${item.replace('.jpg', '')}`;
  }
}
