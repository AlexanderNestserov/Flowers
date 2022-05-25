import { Injectable, OnDestroy, Inject } from '@angular/core';
import {
  Observable,
  SubscriptionLike,
  Subject,
  Observer,
  interval,
} from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { WebSocketSubject, WebSocketSubjectConfig } from 'rxjs/webSocket';

import { share, distinctUntilChanged, takeWhile } from 'rxjs/operators';
import { MessagesWS } from './websocket.interfaces';
import { config } from './websocket.config';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  public getUrl: string = 'chats/user';
  public getUrlById: string = 'chats';
  constructor(private http: HttpClient) {}

  getChat(): Observable<MessagesWS> {
    return this.http.get<MessagesWS>(this.getUrl);
  }

  getChatById(id: number): Observable<MessagesWS> {
    return this.http.get<MessagesWS>(this.getUrlById + `/${id}`);
  }
}
