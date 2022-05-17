import {
  fakeAsync,
  inject,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ContactsService } from './contacts.service';
import { ReactiveFormsModule } from '@angular/forms';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ContactMeDto } from './contacts.model';
import { CommonModule } from '@angular/common';

describe('ContactsService', () => {
  let service: ContactsService;
  let httpMock: HttpTestingController;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, CommonModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [ContactsService],
    });
    service = TestBed.inject(ContactsService);
    httpMock = TestBed.inject(HttpTestingController);
  }));

  afterEach(() => {
    httpMock.verify();
  });

  describe('#getAddress', () => {
    let Address: Object;

    beforeEach(() => {
      Address = {
        address: ' some street city Minsk 44 ,11',
        email: 'angular@mail.ru',
        phone: '+34534523542355',
      };
    });
    it('should be createed', inject(
      [ContactsService],
      (service: ContactsService) => {
        expect(service).toBeTruthy();
      }
    ));
    it('should return getAdress ', fakeAsync(
      inject([ContactsService], (service: ContactsService) => {
        service
          .getAdress()
          .subscribe((result) => expect(result).toBe('GET'), fail);
        const req = httpMock.expectOne({ method: 'GET' });
        expect(req.request.method).toEqual('GET');
        req.flush('GET');
      })
    ));
  });
  it('should add an user and return it', () => {
    const newEmp: ContactMeDto = {
      name: 'Alex',
      phone: '123456789012',
      text: 'Hello',
    };
    service
      .postData(newEmp)
      .subscribe((data) => expect(data).toEqual(''), fail);
    const req = httpMock.expectOne(service.postUrl);
    expect(req.request.method).toEqual('POST');
    expect(req.request.url).toEqual('mail');
    const expectedResponse = '';
    req.flush(expectedResponse);
  });
});
