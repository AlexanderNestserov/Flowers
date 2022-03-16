import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterUserDto } from './registration.model';


@Injectable()
export class RegistrationService {

    constructor(private http: HttpClient) { }

    postData(listModelObj: RegisterUserDto): Observable<RegisterUserDto> {
        //  const headerOptions = new HttpHeaders({
        //    'Content-Type': '*/*'
        //});

        // let body: RegisterUserDto = { name: listModelObj.name, phone: listModelObj.phone, text: listModelObj.text };
        return this.http.post<RegisterUserDto>(`http://172.16.16.41:15000/mail`, {})
    }
}