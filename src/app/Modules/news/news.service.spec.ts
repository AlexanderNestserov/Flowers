import { fakeAsync, inject, TestBed } from '@angular/core/testing';
import { NewsService } from './news.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment'

describe('ContactsService', () => {
    let service: NewsService;
    let httpMock: HttpTestingController;
    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [NewsService,
            ]
        });
        service = TestBed.inject(NewsService);
        httpMock = TestBed.inject(HttpTestingController);
    });
    afterEach(() => {
        httpMock.verify();
    });
    describe('#getAddress', () => {
        let News: any;

        beforeEach(() => {
            News = [{ "id": 1, "title": "some text about flowers which are kidding me.", "text": "Are these flowers kidding me?..", "date": "2022-01-19 16:40" }, { "id": 2, "title": "some plain text about this flower.", "text": "OMG!! This flower...", "date": "2022-01-19 16:40" }, { "id": 3, "title": "some plain text about tulip.", "text": "No way... Red color made this flower looks like...", "date": "2022-01-19 16:40" }, { "id": 4, "title": "scientists said that probably roses are unavailable for shipping in other dimensions, because there the shop like this does not exist! So buy roses here before a long trip!!", "text": "There are no flowers in other dimensions!!!", "date": "2022-01-19 16:40" }]
        })
        it('should be createed', inject([NewsService], (service: NewsService) => {
            expect(service).toBeTruthy();
        }));

        it('should return getAdress ', fakeAsync(inject([NewsService], (service: NewsService) => {
            service.getNews().subscribe(result =>
                expect(result).toBe(News), fail
            );
            const req = httpMock.expectOne(environment.serverUrl + service.getUrl);
            expect(req.request.method).toEqual('GET');
            req.flush(News);
        })));

        it('should add an Url', () => {
            service.getNews().subscribe(response => {
                expect(response).toBeTruthy();
            });
            const httpRequest = httpMock.expectOne(`${environment.serverUrl
                }news`);
            expect(httpRequest.request.url).toEqual('http://172.16.16.41:15000/news');
        });
    });
});


