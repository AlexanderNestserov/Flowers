import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { inject, TestBed, fakeAsync, flush, ComponentFixture, async } from '@angular/core/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SpinnerComponent } from './spinner.component';
import { SpinnerService } from './spinner.service';
import { LoaderInterceptor } from '../../interceptors/spinner.interceptor'

import { RouterTestingModule } from '@angular/router/testing';

describe('SpinnerComponent', () => {
  let service: SpinnerService;
  let httpMock: HttpTestingController;

  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpinnerComponent],
      imports: [RouterTestingModule.withRoutes([]), HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [SpinnerService,
        { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
      ],
    })
      .compileComponents();
    service = TestBed.get(SpinnerService);
    httpMock = TestBed.get(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be createed', inject([SpinnerService], (service: SpinnerService) => {
    expect(service).toBeTruthy();
  }));

});


