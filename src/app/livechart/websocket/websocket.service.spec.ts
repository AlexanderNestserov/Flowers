import { inject, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { CommonModule } from '@angular/common';
import { WebsocketService } from './websocket.service';

describe('WebSocketService', () => {
  let service: WebsocketService;
  let httpMock: HttpTestingController;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, CommonModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [WebsocketService],
    });
    service = TestBed.inject(WebsocketService);
    httpMock = TestBed.inject(HttpTestingController);
  }));

  afterEach(() => {
    httpMock.verify();
  });

  describe('#getAddress', () => {
    let Address: Object;

    beforeEach(() => {
      Address = {
        address: ' some street city Minsk 44 ,11',
        email: 'angular@mail.ru',
        phone: '+34534523542355',
      };
    });
    it('should be createed', inject(
      [WebsocketService],
      (service: WebsocketService) => {
        expect(service).toBeTruthy();
      }
    ));
  });
});
