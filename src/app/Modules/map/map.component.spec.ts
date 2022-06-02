import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  DebugElement,
  ElementRef,
} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AccountService } from '../account/account.service';

import { MapComponent } from './map.component';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;
  let hostElement: DebugElement;
  let event = jasmine.createSpyObj('google.maps.event', ['MouseEvent']);
  const loaderServiceStub = {
    load: () => Promise.resolve(),
  };
  let MockAccountService = jasmine.createSpyObj('fakeAccountService', [
    'getUserData',
    'patchData',
    'postChangePassword',
    'mapAddress',
    'addressHTML',
    'address',
  ]);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MapComponent],
      providers: [
        { provide: MapsAPILoader, useValue: loaderServiceStub },
        {
          provide: AccountService,
          useClass: class MockAccountService {
            getUserData(formValue: any): Observable<any> {
              return of({});
            }
            patchData() {
              return of({});
            }
            postChangePassword(formChangePassword: any) {
              return of({});
            }
            mapAddress = new BehaviorSubject('Minsk');
            addressHTML = new BehaviorSubject<ElementRef>({} as ElementRef);
            address = new BehaviorSubject<string>('Brest');
          },
        },
      ],
      imports: [
        AgmCoreModule.forRoot({
          apiKey: 'AIzaSyCf9fC05hA7mkJeR6FkQiIuCcoAMmajefA',
          libraries: ['places'],
        }),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    hostElement = fixture.debugElement.query(By.css('agm-polygon'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be created onResize', () => {
    let resize = component.onResizeChangeZoom.bind(onresize);
    expect(resize).toBeTruthy();
  });
  it('should be created onResize add resize', () => {
    window.dispatchEvent(new Event('resize'));
    window.resizeTo(900, 50);
    let sticky = (window.innerWidth = 1100);
    fixture.detectChanges();
    expect(sticky).toBe(1100);
  });
  it('should be created onResize add resize', () => {
    window.dispatchEvent(new Event('resize'));
    window.resizeTo(1000, 50);
    let sticky = (window.innerWidth = 500);
    fixture.detectChanges();
    expect(sticky).toBe(500);
  });
  it('should be created mapReadyHandler', () => {
    component.alertShow = false;
    component.mapReadyHandler();
    expect(component.alertShow).toBe(true);
  });
  it('should be created mapReadyHandler on setTimeout', () => {
    jasmine.clock().install();
    component.mapReadyHandler();
    jasmine.clock().tick(5000);
    expect(component.closeAlert()).toBeUndefined();
    jasmine.clock().uninstall();
  });
  /* it('should be created getCoords', () => {
    let a = (component.lat = 53);
    fixture.detectChanges();
    component.getCoords(event);
    expect(a).toBe(event.latLng.lat());

     window.dispatchEvent(new Event('resize'));
     window.resizeTo(1000, 50);
     let sticky = (window.innerWidth = 500);
     fixture.detectChanges();
     expect(sticky).toBe(500);
      it('should be created closeMenu error', () => {
        const link = fixture.debugElement.query(By.css('app-popup-error'));
        link.nativeElement.click();
        expect(component.closeMenu).toBeTruthy();
      });
      it('should create an instance directive', () => {
        expect(directive).toBeTruthy();
      });
      it('should create an instance directive cut listener', () => {
        const event = new ClipboardEvent('cut');
        hostElement.nativeElement.dispatchEvent(event);
        expect(hostElement.nativeElement.value).toBeUndefined();
      });
      it('should create an instance directive focusout listener', () => {
        const event = new FocusEvent('focusout');
        hostElement.nativeElement.dispatchEvent(event);
        expect(hostElement.nativeElement.value).toBeUndefined();
      });
  });
  it('should be created getAddress', () => {
    component.zoom = 10;
    let geo = new google.maps.Geocoder();
    geo.geocode({ location: { lat: 53, lng: 27 } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          component.zoom = component.loopZoom;
          component.latMap = 53;
          component.lngMap = 27;
          component.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
    component.getAddress(53, 27);
    expect(component.zoom).toBe(14);
  });*/
});
