import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { fakeAsync, inject, TestBed } from '@angular/core/testing';
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
<<<<<<< HEAD
            providers: [SpinnerService, LoaderInterceptor],
=======
            providers: [SpinnerService,
                LoaderInterceptor,
            ],
>>>>>>> af7f5584e7b3d619e5d3f6d915bc0649e434dead
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

