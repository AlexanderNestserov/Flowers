import { inject, TestBed, fakeAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ContactsService } from './contacts.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { UrlInterceptor } from 'src/app/interceptors/url.interceptor';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';
import { ContactMeDto } from './contacts.model';
import { CommonModule } from '@angular/common';

describe('ContactsService', () => {
    let service: ContactsService;
    let httpMock: HttpTestingController;
    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, ReactiveFormsModule, CommonModule],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [ContactsService,
                { provide: HTTP_INTERCEPTORS, useClass: UrlInterceptor, multi: true }
            ]
        });
        service = TestBed.inject(ContactsService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    describe('#getAddress', () => {
        let Address: Object;

        beforeEach(() => {

            Address = {
                address: " some street city Minsk 44 ,11",
                email: "angular@mail.ru",
                phone: "+34534523542355"
            }
        })
        it('should be createed', inject([ContactsService], (service: ContactsService) => {
            expect(service).toBeTruthy();
        }));
        it('should return getAdress ', fakeAsync(inject([ContactsService], (service: ContactsService) => {
            service.getAdress().subscribe(result =>
                expect(result).toBe(Address), fail
            );
            const req = httpMock.expectOne(environment.serverUrl + service.getUrl);
            expect(req.request.method).toEqual('GET');
            req.flush(Address);
        })));
        it('should add an Url', () => {
            service.getAdress().subscribe(response => {
                expect(response).toBeTruthy();
            });
            const httpRequest = httpMock.expectOne(`${environment.serverUrl
                }contact`);
            expect(httpRequest.request.url).toEqual('http://172.16.16.41:15000/contact');
        });
    });
    it('should add an user and return it', () => {
        const newEmp: ContactMeDto = {
            name: 'Alex',
            phone: '123456789012',
            text: 'Hello'
        };
        service.postData(newEmp).subscribe(
            data => expect(data).toEqual(''),
            fail
        );
        const req = httpMock.expectOne(environment.serverUrl + service.postUrl);
        expect(req.request.method).toEqual('POST');
        expect(req.request.body).toEqual(newEmp);
        const expectedResponse = '';
        req.flush(expectedResponse);
    });
});

