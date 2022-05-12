import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactMeDto } from './contacts.model';

@Injectable()
export class ContactsService {
  public getUrl: string = 'contact';
  public postUrl: string = 'mail';
  constructor(private http: HttpClient) {}

  getAdress(): Observable<string | number | object> {
    return this.http.get<string | number | object>(this.getUrl);
  }
  postData(formValue: ContactMeDto): Observable<string> {
    let body: ContactMeDto = { ...formValue };
    return this.http.post(this.postUrl, body, {
      responseType: 'text',
    });
  }
}
