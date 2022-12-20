import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { LiveChatComponent } from './livechat.component';
import { MessagesWS } from './websocket/websocket.interfaces';
import { WebsocketService } from './websocket/websocket.service';

describe('LiveChatComponent', () => {
  let component: LiveChatComponent;
  let fixture: ComponentFixture<LiveChatComponent>;
  let MockWebsocketService = jasmine.createSpyObj('fakeWebsocketService', [
    'getChat',
    'getChatById',
    'connect',
    'showGreeting',
    'sendMessage',
    'greetings',
  ]);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LiveChatComponent],
      imports: [
        RouterTestingModule.withRoutes([]),
        CommonModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: WebsocketService,
          useClass: class MockWebsocketService {
            getChat(): Observable<MessagesWS> {
              return of({
                id: 1,
                messages: [
                  {
                    date: 'string',
                    id: 2,
                    message: 'hello',
                    sender: {
                      id: 1,
                      firstName: 'string',
                      lastName: 'string',
                      email: 'string',
                      phone: 'string',
                      homeAddress: ' string',
                      additionalInformation: 'string',
                      shippingAddress: 'string',
                    },
                  },
                  {
                    date: 'string',
                    id: 2,
                    message: 'buy',
                    sender: {
                      id: 1,
                      firstName: 'string',
                      lastName: 'string',
                      email: 'string',
                      phone: 'string',
                      homeAddress: ' string',
                      additionalInformation: 'string',
                      shippingAddress: 'string',
                    },
                  },
                ],
                user: {
                  id: 1,
                  firstName: 'string',
                  lastName: 'string',
                  email: 'string',
                  phone: 'string',
                  homeAddress: ' string',
                  additionalInformation: 'string',
                  shippingAddress: 'string',
                },
              });
            }
            getChatById(id: number): Observable<MessagesWS> {
              return of({
                id: 1,
                messages: [],
                user: {
                  id: 1,
                  firstName: 'string',
                  lastName: 'string',
                  email: 'string',
                  phone: 'string',
                  homeAddress: ' string',
                  additionalInformation: 'string',
                  shippingAddress: 'string',
                },
              });
            }
            connect(id: number) {}
            showGreeting(message: string) {}
            public sendMessage(userId: number, text: string, chatId: number) {}
            greetings = new BehaviorSubject(['hello']);
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be created chartShow', () => {
    component.isChartShow = false;
    component.chartShow();
    expect(component.isChartShow).toBe(true);
  });
  it('should be created closeChart', () => {
    component.isChartShow = true;
    component.closeChart();
    expect(component.isChartShow).toBe(false);
  });
  it('should be created chartShow', () => {
    window.innerWidth = 600;
    component.criticalSize = 670;
    component.isChartShow = false;
    component.chartShow();
    fixture.detectChanges();
    expect(document.body.style.overflow).toBe('hidden');
  });
  it('should be created chartShow', () => {
    window.innerWidth = 600;
    component.criticalSize = 670;
    component.isChartShow = true;
    component.chartShow();
    fixture.detectChanges();
    expect(document.body.style.overflow).toBe('scroll');
  });
  it('should be created text', () => {
    const ctrl = component.form.get('text');
    ctrl?.setValue('Alex');
    const result = component.text.value;
    expect(result).toEqual('Alex');
  });
  it('should be created sendText', () => {
    component.greetings;
    component.sendText();
    expect(component.greetings.length).toEqual(2);
  });
});
