import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterUserDto } from './registration.model';


@Injectable()
export class RegistrationService {

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
        return this.http.post(`http://172.16.16.41:15000/users/registration`, body)
    }
}