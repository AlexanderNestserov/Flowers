import { inject, TestBed, fakeAsync } from '@angular/core/testing';
import { ContactsService } from './contacts.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UrlInterceptor } from 'src/environments/environment';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';

describe('ContactsService', () => {
    let service: ContactsService;
    let httpMock: HttpTestingController;
    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
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
        let Address: any;

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
});