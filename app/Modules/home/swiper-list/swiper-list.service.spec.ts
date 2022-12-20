import { inject, TestBed, waitForAsync } from '@angular/core/testing';
import { SwiperListService } from './swiper-list.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('ContactsService', () => {
  let service: SwiperListService;
  let httpMock: HttpTestingController;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SwiperListService],
    });
    service = TestBed.inject(SwiperListService);
    httpMock = TestBed.inject(HttpTestingController);
  }));
  afterEach(() => {
    httpMock.verify();
  });
  describe('#getAddress', () => {
    let News: any;

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
    it('should be createed', inject(
      [SwiperListService],
      (service: SwiperListService) => {
        expect(service).toBeTruthy();
      }
    ));
  });
});
