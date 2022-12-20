import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { CategoriesSort } from '../../catalog/catalog-categories/product.config';
import { Item, Items } from './items.config';

@Injectable()
export class ItemService {
  public categoriesUrl: string = 'items';

  public searching = new BehaviorSubject<string>('');

  public filteringByCategories = new BehaviorSubject<Array<string>>([]);

  public filteringByCost = new BehaviorSubject<Array<number>>([]);

  public sorting = new BehaviorSubject<CategoriesSort>({} as CategoriesSort);

  constructor(private http: HttpClient) {}

  getItems(): Observable<Item[]> {
    return this.http
      .get<Items>(this.categoriesUrl)
      .pipe(map((res: Items) => res.content));
  }

  getItem(id: number): Observable<Item> {
    return this.http.get<Item>(this.categoriesUrl + `/${id}`);
  }
}
