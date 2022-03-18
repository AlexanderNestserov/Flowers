import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { RegisterUserDto } from './registration.model';


@Injectable()
export class RegistrationService {
    private postUrl: string = 'users/registration'
    constructor(private http: HttpClient) { }

    postData(listModelObj: RegisterUserDto): Observable<any> {
        let body: RegisterUserDto = {
            firstName: listModelObj.firstName,
            lastName: listModelObj.lastName,
            email: listModelObj.email,
            phone: listModelObj.phone,
            homeAddress: listModelObj.homeAddress,
            additionalInformation: listModelObj.additionalInformation,
            password: listModelObj.password,
            shippingAddress: listModelObj.shippingAddress
        };
        return this.http.post(this.postUrl, body)
    }
}