import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Images } from './swiper-list.config';

export interface Obj {
    description: string,
    id: number,
    name: string,
    photo: string,
    thumbnail: string
}

@Injectable()
export class SwiperListService {
    public categoriesUrl: string = 'categories';



    // public imagesUrl: any = this.ima;

    constructor(private http: HttpClient) { }

    getCategories(): Observable<any | object> {

        const headers = new HttpHeaders()
            .set('content-type', 'image/jpeg')
        return this.http.get<any | object>(this.categoriesUrl, {
            headers: headers
        });
    }

    // getImages(): Observable<any | object> {

    //  const headers = new HttpHeaders()
    //    .set('content-type', 'image/jpeg')
    //   return this.http.get<any | object>(this.imagesUrl, {
    //       headers: headers
    //  });
    // }
}