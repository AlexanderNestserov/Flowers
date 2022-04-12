import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface Obj {
    description: string,
    id: number,
    name: string,
    photo: string,
    thumbnail: string
}

@Injectable()
export class ItemService {
    public categoriesUrl: string = 'items';



    // public imagesUrl: any = this.ima;

    constructor(private http: HttpClient) { }

    getItems(): Observable<any | object> {


        return this.http.get<any | object>(this.categoriesUrl);
    }

    // getImages(): Observable<any | object> {

    //  const headers = new HttpHeaders()
    //    .set('content-type', 'image/jpeg')
    //   return this.http.get<any | object>(this.imagesUrl, {
    //       headers: headers
    //  });
    // }
}