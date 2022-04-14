import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Obj {
  description: string;
  id: number;
  name: string;
  photo: string;
  thumbnail: string;
}

@Injectable()
export class ItemService {
  public categoriesUrl: string = 'items';

  constructor(private http: HttpClient) {}

  getItems(): Observable<any> {
    return this.http.get<any>(this.categoriesUrl);
  }
}
