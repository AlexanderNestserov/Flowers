import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactMeDto } from './contacts.model';

@Injectable()
export class ContactsService {

    constructor(private http: HttpClient) { }

    getAdress(): Observable<any> {
        return this.http.get<any>('http://172.16.16.41:15000/contact')
    }
    postData(listModelObj: ContactMeDto): Observable<any> {
        let body: ContactMeDto = { name: listModelObj.name, phone: listModelObj.phone, text: listModelObj.text };
        return this.http.post(`http://172.16.16.41:15000/mail`, body, {
            responseType: 'text'
        })
    }
}