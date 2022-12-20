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

  describe('getchat', () => {
    beforeEach(() => {});
    it('should be createed', inject(
      [WebsocketService],
      (service: WebsocketService) => {
        expect(service).toBeTruthy();
      }
    ));
    it('should add an Url getChat', () => {
      service.getChat().subscribe((response) => {
        expect(response).toBeTruthy();
      });
      const httpRequest = httpMock.expectOne(service.getUrl);
      expect(httpRequest.request.url).toEqual('chats/user');
    });
    it('should add an Url getChatById', () => {
      service.getChatById(2).subscribe((response) => {
        expect(response).toBeTruthy();
      });
      const httpRequest = httpMock.expectOne(service.getUrlById + '/2');
      expect(httpRequest.request.url).toEqual('chats/2');
    });
    it('should add connect', () => {
      let a = service.connect(2);
      expect(a).toBeUndefined();
    });
    it('should add connect', () => {
      let a = service.showGreeting('hello');
      expect(a).toBeUndefined();
    });
  });
});
