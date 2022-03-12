import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable()
export class ContactsService {

    constructor(private http: HttpClient) { }

    getAdress(): Observable<any> {
        return this.http.get('http://172.16.16.41:15000/contact')
    }
    postData(data: any) {
        return this.http.post<any>('http://172.16.16.41:15000/mail', data)
    }
}