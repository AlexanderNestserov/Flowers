import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserContacts } from './contacts.model';



@Injectable()
export class ContactsService {

    constructor(private http: HttpClient) { }

    getAdress(): Observable<any> {
        return this.http.get<any>('http://172.16.16.41:15000/contact')
    }
    postData(listModelObj: UserContacts): Observable<any> {
        const headerOptions = new HttpHeaders();

        headerOptions.append('Content-Type', 'application/json');

        let body = { name: listModelObj.name, phone: listModelObj.phone, text: listModelObj.text };
        return this.http.post<any>('http://172.16.16.41:15000/mail', body, {
            responseType: 'json',
            headers: headerOptions
        })
    }
}