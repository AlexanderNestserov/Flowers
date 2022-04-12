import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ItemService } from '../../home/items/item.service';
import { SwiperListService } from '../../home/swiper-list/swiper-list.service';
import { Item, ITEMS } from '../catalog-items/catalog-items';

@Component({
  selector: 'app-catalog-categories',
  templateUrl: './catalog-categories.component.html',
  styleUrls: ['./catalog-categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogCategoriesComponent implements OnInit {

  rangeValues: number[] = [0, 300];

  itemsData: any = this.http.getItems().pipe(map((res: any) =>
    res.content.length
  ));

  categoriesData: Observable<any> = this.httpCategories.getCategories().pipe(map((res: any) =>
    res.content
  ));

  itemCategories: any;

  items: Array<Item> = ITEMS;
  item: any;

  checked: boolean = false;

  categories: any[] = [{ name: 'Max Price' },
  { name: 'Min Price' }
  ];

  searchText: string = '';

  constructor(private http: ItemService, private httpCategories: SwiperListService, private route: ActivatedRoute, private cd: ChangeDetectorRef) {

  }
  ngOnInit() {
    this.itemCategories = this.route.snapshot.params['name'];
    this.route.params.subscribe((params: Params) => {
      this.itemCategories = params['name']
    })


  }
  clearFilter() {
    this.searchText = "";
    this.checked = false;
  }
  label(event: any) {
    //  this.item = event;
    // console.log(this.item.checked[0].name);


    //if (this.itemCategories !== 'Fresh flowers') {
    //  this.cd.detectChanges();

    //}
  }

}
