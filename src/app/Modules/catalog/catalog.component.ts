import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router, RouterEvent } from '@angular/router';
import { filter, map, Observable, Subscription } from 'rxjs';
import { ItemService } from '../home/items/item.service';
import { SwiperListService } from '../home/swiper-list/swiper-list.service';


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogComponent implements OnInit {

obs!: Subscription;

  rangeValues: number[] = [0, 300];

  itemsData: Observable<any> = this.http.getItems().pipe(map((res: any) =>
    res.content
  ));

  categoriesData: Observable<any> = this.httpCategories.getCategories().pipe(map((res: any) =>
    res.content
  ));
  
categoriesFilterName:string='';

item:any;
  checked: boolean = false;
  

  categories: any[] = [{ name: 'Max Price' },
  { name: 'Min Price' }
  ];

  searchText: string = '';

  constructor(private http: ItemService, private router: Router, private route: ActivatedRoute,private httpCategories: SwiperListService) {}

  ngOnInit() {
    this.categoriesFilterName = this.route.snapshot.queryParams['name'];
    this.route.queryParams.subscribe((params: Params) => {
        this.categoriesFilterName = params['name'];
        
    })
  }

  clearFilter() {
    this.searchText = "";
    this.checked = false;
  }

 filterCategories(event: any) {
 //  if(event.checked.length===0){
// this.router.navigate(['/catalog'])
 //  }else{
 //this.item = event.checked[0].name;
 //  this.router.navigate(['/catalog'],{queryParams:{name:this.item}});
  // }
if(this.categoriesFilterName==''){
this.checked=false;
}else{
  this.checked=event.checked
}

} 

  ngOnDestroy(){
 if (this.obs) {
      this.obs.unsubscribe();
    }
  }

}



