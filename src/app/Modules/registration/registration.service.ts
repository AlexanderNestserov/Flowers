import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterUserDto } from './registration.model';


@Injectable()
export class RegistrationService {
    public postUrl: string = 'users/registration'
    constructor(private http: HttpClient) { }

    postData(formValue: RegisterUserDto): Observable<any> {
        let body: RegisterUserDto = { ...formValue };
        return this.http.post(this.postUrl, body)
    }
}