import { inject, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AccountService } from './account.service';
import { ReactiveFormsModule } from '@angular/forms';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { CommonModule } from '@angular/common';

describe('AccountService', () => {
  let service: AccountService;
  let httpMock: HttpTestingController;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, CommonModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [AccountService],
    });
    service = TestBed.inject(AccountService);
    httpMock = TestBed.inject(HttpTestingController);
  }));

  afterEach(() => {
    httpMock.verify();
  });

  it('should be createed', inject(
    [AccountService],
    (service: AccountService) => {
      expect(service).toBeTruthy();
    }
  ));
  it('should add an Url patchData', () => {
    service
      .patchData({
        id: 0,
        firstName: 'string',
        lastName: 'string',
        email: 'string',
        phone: 'string',
        homeAddress: 'string',
        additionalInformation: 'string',
        shippingAddress: 'string',
      })
      .subscribe((response) => {
        expect(response).toBeTruthy();
      });
    const httpRequest = httpMock.expectOne(service.patchUserUrl);
    expect(httpRequest.request.url).toEqual('users');
  });
  it('should add an Url postChangePassword', () => {
    service
      .postChangePassword({
        newPassword: '',
        oldPassword: '',
      })
      .subscribe((response) => {
        expect(response).toBeTruthy();
      });
    const httpRequest = httpMock.expectOne(service.postChangepassword);
    expect(httpRequest.request.url).toEqual('users/change_password');
  });
  it('should add an Url getUserData', () => {
    service.getUserData().subscribe((response) => {
      expect(response).toBeTruthy();
    });
    const httpRequest = httpMock.expectOne(service.getUserUrl);
    expect(httpRequest.request.url).toEqual('users/user');
  });
  it('should add an Url getTempId', () => {
    service.getTempId().subscribe((response) => {
      expect(response).toBeTruthy();
    });
    const httpRequest = httpMock.expectOne(service.getTempIdUrl);
    expect(httpRequest.request.url).toEqual('users/tempid');
  });
});
