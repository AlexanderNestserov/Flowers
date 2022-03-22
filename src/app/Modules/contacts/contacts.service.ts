import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactMeDto } from './contacts.model';

@Injectable(
    {
        providedIn: 'root'
    }
)
export class ContactsService {
    private getUrl: string = 'contact'
    private postUrl: string = 'mail'
    constructor(private http: HttpClient) { }

    getAdress(): Observable<string | number> {
        return this.http.get<string | number>(this.getUrl)
    }
    postData(formValue: ContactMeDto): Observable<any> {
        let body: ContactMeDto = { ...formValue };
        return this.http.post(this.postUrl, body, {
            responseType: 'text'
        })
    }
}