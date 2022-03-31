import { inject, TestBed } from '@angular/core/testing';
import { RegistrationService } from './registration.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UrlInterceptor } from 'src/environments/environment';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterUserDto } from './registration.model';
import { HttpResponse } from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

describe('ContactsService', () => {
    let service: RegistrationService;
    let httpMock: HttpTestingController;
    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, ReactiveFormsModule, CommonModule],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [RegistrationService,
                { provide: HTTP_INTERCEPTORS, useClass: UrlInterceptor, multi: true }
            ]
        });
        service = TestBed.get(RegistrationService);
        httpMock = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be createed', inject([RegistrationService], (service: RegistrationService) => {
        expect(service).toBeTruthy();
    }));
    it('should add an employee and return it', () => {
        const newEmp: RegisterUserDto = {
            firstName: 'Alex',
            lastName: 'Nest',
            email: 'alex@rem.com',
            phone: '123456789012',
            homeAddress: 'Minsk',
            additionalInformation: 'looser',
            password: 'fuck',
            shippingAddress: 'Minsk'
        };

        service.postData(newEmp).subscribe(
            data => expect(data).toEqual(newEmp, 'should return the employee'),
            fail
        );
        const req = httpMock.expectOne(environment.serverUrl + service.postUrl);
        expect(req.request.method).toEqual('POST');
        expect(req.request.body).toEqual(newEmp);

        const expectedResponse = new HttpResponse({ status: 200, statusText: 'Created', body: newEmp });
        req.event(expectedResponse);
    });

    it('should add an Url post', () => {
        service.postData({
            firstName: 'string',
            lastName: 'string',
            email: 'string',
            phone: 'string',
            homeAddress: 'string',
            additionalInformation: 'string',
            password: 'string',
            shippingAddress: 'string'
        }).subscribe(response => {
            expect(response).toBeTruthy();
        });

        const httpRequest = httpMock.expectOne(`${environment.serverUrl
            }users/registration`);

        expect(httpRequest.request.url).toEqual('http://172.16.16.41:15000/users/registration');
    });
});