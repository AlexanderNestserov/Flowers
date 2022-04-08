import { HttpClient } from '@angular/common/http';
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
export class SwiperListService {
    public categoriesUrl: string = 'categories'

    constructor(private http: HttpClient) { }

    getCategories(): Observable<any> {
        return this.http.get<any>(this.categoriesUrl);

    }
}