import {
  fakeAsync,
  inject,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { NewsService } from './news.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { GetAllNews } from './news.config';

describe('NewsService', () => {
  let service: NewsService;
  let httpMock: HttpTestingController;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NewsService],
    });
    service = TestBed.inject(NewsService);
    httpMock = TestBed.inject(HttpTestingController);
  }));
  afterEach(() => {
    httpMock.verify();
  });
  describe('#getNews', () => {
    let News: GetAllNews[];
    beforeEach(() => {
      News = [
        {
          id: 1,
          title: 'some text about flowers which are kidding me.',
          text: 'Are these flowers kidding me?..',
          date: '2022-01-19 16:40',
        },
        {
          id: 2,
          title: 'some plain text about this flower.',
          text: 'OMG!! This flower...',
          date: '2022-01-19 16:40',
        },
        {
          id: 3,
          title: 'some plain text about tulip.',
          text: 'No way... Red color made this flower looks like...',
          date: '2022-01-19 16:40',
        },
        {
          id: 4,
          title:
            'scientists said that probably roses are unavailable for shipping in other dimensions, because there the shop like this does not exist! So buy roses here before a long trip!!',
          text: 'There are no flowers in other dimensions!!!',
          date: '2022-01-19 16:40',
        },
      ];
    });
    it('should be createed', inject([NewsService], (service: NewsService) => {
      expect(service).toBeTruthy();
    }));
    it('should return getNews ', fakeAsync(
      inject([NewsService], (service: NewsService) => {
        service
          .getNews()
          .subscribe((result) => expect(result).toEqual(News), fail);
        const req = httpMock.expectOne({ method: 'GET' });
        expect(req.request.method).toEqual('GET');
        req.flush(News);
      })
    ));
    it('should add an Url with news', fakeAsync(() => {
      service.getNews().subscribe((response) => {
        expect(response).toBeTruthy();
      });
      const httpRequest = httpMock.expectOne(service.getUrl);
      expect(httpRequest.request.url).toEqual('news');
      httpRequest.flush({});
      tick();
    }));
  });
});
