import { inject, TestBed, waitForAsync } from '@angular/core/testing';
import { RegistrationService } from './registration.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

describe('RegistrationService', () => {
  let service: RegistrationService;
  let httpMock: HttpTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, CommonModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [RegistrationService],
    });
    service = TestBed.inject(RegistrationService);
    httpMock = TestBed.inject(HttpTestingController);
  }));

  afterEach(() => {
    httpMock.verify();
  });

  it('should be createed', inject(
    [RegistrationService],
    (service: RegistrationService) => {
      expect(service).toBeTruthy();
    }
  ));
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
