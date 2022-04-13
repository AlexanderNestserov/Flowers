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
export class ItemService {
  public categoriesUrl: string = 'items';

<<<<<<< HEAD
    constructor(private http: HttpClient) { }

    getItems(): Observable<any> {
        return this.http.get<any>(this.categoriesUrl);
    }
}
=======
  constructor(private http: HttpClient) {
  }

  getItems(): Observable<any | object> {
    return this.http.get<any | object>(this.categoriesUrl);
  }

}
>>>>>>> af7f5584e7b3d619e5d3f6d915bc0649e434dead
