import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { MessagesWS, SendMessage } from './websocket.interfaces';

import { HttpClient } from '@angular/common/http';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Client } from 'stompjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  public getUrl: string = 'chats/user';
  public getUrlById: string = 'chats';
  private stompClient!: Client;
  public sendMessagesFromBackend: string[] = [];
  public greetings = new BehaviorSubject<Array<string>>([]);

  user: SendMessage = {
    sender: {
      id: 0,
    },
    message: '',
    chatRoom: {
      id: 0,
    },
  };
  constructor(private http: HttpClient) {}

  getChat(): Observable<MessagesWS> {
    return this.http.get<MessagesWS>(this.getUrl);
  }

  getChatById(id: number): Observable<MessagesWS> {
    return this.http.get<MessagesWS>(this.getUrlById + `/${id}`);
  }

  connect(id: number) {
    const socket = new SockJS('http://172.16.16.41:15000/ws');
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe(
        `/topic/chat/${id}/messages`,
        (hello: Stomp.Message) => {
          this.showGreeting(JSON.parse(hello.body));
        }
      );
    });
  }

  showGreeting(message: string) {
    this.sendMessagesFromBackend.push(message);
    this.greetings.next(this.sendMessagesFromBackend);
  }

  public sendMessage(userId: number, text: string, chatId: number): void {
    this.user = {
      sender: { id: userId },
      message: text,
      chatRoom: { id: chatId },
    };
    this.stompClient.send('/app/message', {}, JSON.stringify(this.user));
  }
}
