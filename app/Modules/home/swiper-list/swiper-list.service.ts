import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categories } from '../items/items.config';

@Injectable()
export class SwiperListService {
  public categoriesUrl: string = 'categories';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Categories> {
    return this.http.get<Categories>(this.categoriesUrl);
  }
}
