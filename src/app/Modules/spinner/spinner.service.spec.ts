import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  fakeAsync,
  inject,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { SpinnerService } from './spinner.service';
import { LoaderInterceptor } from '../../interceptors/spinner.interceptor';
import { RouterTestingModule } from '@angular/router/testing';
import { UrlInterceptor } from 'src/app/interceptors/url.interceptor';

describe('SpinnerComponent', () => {
  let service: SpinnerService;
  let httpMock: HttpTestingController;
  let interceptor: LoaderInterceptor;
  let interceptorUrl: UrlInterceptor;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([]), HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],

      providers: [SpinnerService, LoaderInterceptor, UrlInterceptor],
    });
    service = TestBed.inject(SpinnerService);
    httpMock = TestBed.inject(HttpTestingController);
    interceptor = TestBed.inject(LoaderInterceptor);
    interceptorUrl = TestBed.inject(UrlInterceptor);
  }));

  afterEach(() => {
    httpMock.verify();
  });

  it('should be createed', inject(
    [SpinnerService],
    (service: SpinnerService) => {
      expect(service).toBeTruthy();
    }
  ));

  it('should be created show', inject(
    [SpinnerService],
    (service: SpinnerService) => {
      const show = service.show();
      expect(show).toBeUndefined();
    }
  ));
  it('should be created hide', inject(
    [SpinnerService],
    (service: SpinnerService) => {
      const hide = service.hide();
      expect(hide).toBeUndefined();
    }
  ));

  it('should be create interceptor', fakeAsync(() => {
    expect(interceptor).toBeDefined();
  }));
  it('should be create interceptor', fakeAsync(() => {
    expect(interceptorUrl).toBeDefined();
  }));
});
