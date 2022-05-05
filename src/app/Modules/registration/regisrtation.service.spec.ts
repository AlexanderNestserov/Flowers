import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { RegistrationService } from './registration.service';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterUserDto } from './registration.model';
import { HttpResponse } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

describe('RegistrationService', () => {
  let service: RegistrationService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, CommonModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [RegistrationService],
    });
    service = TestBed.inject(RegistrationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be createed', inject(
    [RegistrationService],
    (service: RegistrationService) => {
      expect(service).toBeTruthy();
    }
  ));
  /*  it('should add an employee and return it', fakeAsync(() => {
    const newEmp: RegisterUserDto = {
      firstName: 'Alex',
      lastName: 'Nest',
      email: 'alex@rem.com',
      phone: '123456789012',
      homeAddress: 'Minsk',
      additionalInformation: 'looser',
      password: 'fuck',
      shippingAddress: 'Minsk',
    };
    service
      .postData(newEmp)
      .subscribe((data) => expect(data).toEqual({}), fail);
    const req = httpMock.expectOne(environment.serverUrl + service.postUrl);
    console.log(req);

    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(newEmp);
    const expectedResponse = new HttpResponse({
      status: 200,
      statusText: 'Created',
      body: newEmp,
    });
    req.event(expectedResponse);
    tick();
  }));*/

  it('should add an Url post', () => {
    service
      .postData({
        firstName: 'string',
        lastName: 'string',
        email: 'string',
        phone: 'string',
        homeAddress: 'string',
        additionalInformation: 'string',
        password: 'string',
        shippingAddress: 'string',
      })
      .subscribe((response) => {
        expect(response).toBeTruthy();
      });
    const httpRequest = httpMock.expectOne(service.postUrl);
    expect(httpRequest.request.url).toEqual('users/registration');
  });
});
