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

    getAdress(): Observable<any> {
        return this.http.get<any>(this.getUrl)
    }
    postData(listModelObj: ContactMeDto): Observable<any> {
        let body: ContactMeDto = { name: listModelObj.name, phone: listModelObj.phone, text: listModelObj.text };
        return this.http.post(this.postUrl, body, {
            responseType: 'text'
        })
    }
}