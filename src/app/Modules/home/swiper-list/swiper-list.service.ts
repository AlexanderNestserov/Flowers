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
  public categoriesUrl: string = 'categories';

<<<<<<< HEAD
    constructor(private http: HttpClient) { }

    getCategories(): Observable<any> {
        return this.http.get<any>(this.categoriesUrl);
    }
}
=======
  constructor(private http: HttpClient) {
  }

  getCategories(): Observable<any> {
     return this.http.get<any>(this.categoriesUrl);
  }
}
>>>>>>> af7f5584e7b3d619e5d3f6d915bc0649e434dead
