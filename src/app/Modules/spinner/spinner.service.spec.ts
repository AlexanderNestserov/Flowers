import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { inject, TestBed, fakeAsync, async } from '@angular/core/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SpinnerService } from './spinner.service';
import { LoaderInterceptor } from '../../interceptors/spinner.interceptor';
import { RouterTestingModule } from '@angular/router/testing';

describe('SpinnerComponent', () => {
    let service: SpinnerService;
    let httpMock: HttpTestingController;
    let interceptor: LoaderInterceptor;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes([]), HttpClientTestingModule],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [SpinnerService,
                LoaderInterceptor,
                { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },

            ],
        })
        service = TestBed.inject(SpinnerService);
        httpMock = TestBed.inject(HttpTestingController);
        interceptor = TestBed.inject(LoaderInterceptor);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be createed', inject([SpinnerService], (service: SpinnerService) => {
        expect(service).toBeTruthy();
    }));

    it('should be created show', inject([SpinnerService], (service: SpinnerService) => {
        const show = service.show();
        expect(show).toBe();
    }));
    it('should be created hide', inject([SpinnerService], (service: SpinnerService) => {
        const hide = service.hide();
        expect(hide).toBe();
    }));

    it('should be create interceptor', fakeAsync(() => {
        expect(interceptor).toBeDefined();
    }));
});

