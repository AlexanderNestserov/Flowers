import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  TestBed,
  ComponentFixture,
  async,
  waitForAsync,
  getTestBed,
} from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { LoaderInterceptor } from 'src/app/interceptors/spinner.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AccountService } from '../Modules/account/account.service';
import { UrlInterceptor } from './url.interceptor';
import { SpinnerService } from '../Modules/spinner/spinner.service';

describe('Interceptor', () => {
  let service: AccountService;
  let httpMock: HttpTestingController;
  let injector: TestBed;
  const Api_URl = 'http://172.16.16.41:15000/users/user';

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule,
        CommonModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        AccountService,
        SpinnerService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: UrlInterceptor,
          multi: true,
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: LoaderInterceptor,
          multi: true,
        },
      ],
    }).compileComponents();
    injector = getTestBed();
    service = TestBed.inject(AccountService);
    httpMock = TestBed.inject(HttpTestingController);
  }));

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    service.getUserData().subscribe((res) => {
      expect(res).toBeTruthy();
    });
    const httpReq = httpMock.expectOne(Api_URl);
    expect(httpReq.request.url).toEqual('http://172.16.16.41:15000/users/user');
  });
});
