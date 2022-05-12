import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Items } from '../items/items.config';

@Injectable()
export class SwiperListService {
  public categoriesUrl: string = 'categories';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Items> {
    return this.http.get<Items>(this.categoriesUrl);
  }
}
