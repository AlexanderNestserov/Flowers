import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetAllNews } from './news.config';

@Injectable()
export class NewsService {
  public getUrl: string = 'news';

  constructor(private http: HttpClient) {}

  getNews(): Observable<GetAllNews[]> {
    return this.http.get<GetAllNews[]>(this.getUrl);
  }
}
