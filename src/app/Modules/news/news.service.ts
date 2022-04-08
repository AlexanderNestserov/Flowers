import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class NewsService {
    public getUrl: string = 'news'

    constructor(private http: HttpClient) { }

    getNews(): Observable<string | number> {
        return this.http.get<string | number>(this.getUrl)
    }
}