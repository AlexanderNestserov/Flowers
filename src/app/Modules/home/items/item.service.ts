import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

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

  public searching = new BehaviorSubject<string>('');

  public filteringByCategories = new BehaviorSubject<Array<string>>([]);

  public filteringByCost = new BehaviorSubject<Array<number>>([]);

  public sorting = new BehaviorSubject<Object>({});

  constructor(private http: HttpClient) {}

  getItems(): Observable<any> {
    return this.http.get<any>(this.categoriesUrl);
  }
}
