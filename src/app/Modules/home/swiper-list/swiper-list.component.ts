import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ITEMS, SWIPER_CONFIG, ADAPTIVE_SWIPER, Item, Config, Adaptive, Images } from './swiper-list.config';
import { async, Observable, map } from 'rxjs';
import { Obj, SwiperListService } from './swiper-list.service';
import { environment } from 'src/environments/environment';
import { HttpParams } from '@angular/common/http';





@Component({
  selector: 'app-home-swiper-list',
  templateUrl: './swiper-list.component.html',
  styleUrls: ['./swiper-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})



export class SwiperListComponent implements OnInit {
  // private _itemPhoto: any;

  // get itemPhoto() {
  //   return this._itemPhoto
  // }

  //set itemPhoto(value) {
  //  this._itemPhoto = value = 'http://172.16.16.41:15000/images/' + this._itemPhoto.split('.')[0];
  // console.log(value);

  // }
  getImage() {

    // ?????????????
    return environment.serverUrl + 'images/plant-photo';

  }


  src: [] = [];
  categoriesData: any = this.http.getCategories().pipe(map((res: any) =>
    res.content
  ));
  // imagesData: Observable<any> = this.http.getImages()
  // itemes: any = this.categoriesData.pipe(map(data => data.photo
  // ))


  category: any[] = [];


  images: any = Images.forEach((element: any) => {
    return element.name;
  });

  items: Array<Item> = ITEMS;
  swiperConfig: Config = SWIPER_CONFIG;
  adaptiveSwiper: Adaptive = ADAPTIVE_SWIPER;

  constructor(private http: SwiperListService) {


  }



  ngOnInit(): void {
    this.src = this.categoriesData
    for (let i = 0; i < this.src.length; i++) {
      let im = this.src[i]


    }


  }

  //getItem() {

  // this.categoriesData.subscribe(res => res.forEach((element: any) => {
  //  console.log(element.photo.split('.')[0]);
  //}));

  //let x = environment.serverUrl + 'images';
  // console.log(x);


  //  }



}
