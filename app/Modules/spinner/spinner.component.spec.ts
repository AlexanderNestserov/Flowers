import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  TestBed,
  ComponentFixture,
  async,
  waitForAsync,
} from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { SpinnerComponent } from './spinner.component';
import { SpinnerService } from './spinner.service';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { LoaderInterceptor } from 'src/app/interceptors/spinner.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

describe('SpinnerComponent', () => {
  let service: SpinnerService;
  let httpMock: HttpTestingController;
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SpinnerComponent],
      imports: [
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule,
        CommonModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        SpinnerService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: LoaderInterceptor,
          multi: true,
        },
      ],
    }).compileComponents();
    service = TestBed.inject(SpinnerService);
    httpMock = TestBed.inject(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
