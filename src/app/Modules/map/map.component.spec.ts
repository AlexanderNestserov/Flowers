import {
  AgmCoreModule,
  GoogleMapsAPIWrapper,
  MapsAPILoader,
  PolygonManager,
} from '@agm/core';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  DebugElement,
  ElementRef,
} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AccountService } from '../account/account.service';

import { MapComponent } from './map.component';

describe('MapComponent', () => {
  const myLatlng = { lat: 53.9, lng: 27.56 };
  let map: google.maps.Map;
  let marker: google.maps.Marker;
  let polygon: google.maps.Polygon;
  let geocode!: google.maps.Geocoder;
  let polygonManager: PolygonManager;
  let google: {
    maps: {
      Map?: jasmine.Spy;
      Marker?: jasmine.Spy;
      InfoWindow?: jasmine.Spy;
      Polyline?: jasmine.Spy;
      Polygon: any;
      Rectangle?: jasmine.Spy;
    };
  };
  let polygonOptions: google.maps.PolygonOptions;
  let polygonPath: google.maps.LatLngLiteral[];
  const uluru = { lat: 53, lng: 27 };
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
        GoogleMapsAPIWrapper,
        PolygonManager,
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

    polygonManager = TestBed.inject(PolygonManager);
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
    let sticky = (window.innerWidth = 1100);
    window.resizeTo(900, 50);
    fixture.detectChanges();
    expect(sticky).toBe(1100);
  });
  it('should be created onResize add resize', () => {
    window.dispatchEvent(new Event('resize'));
    let sticky = (window.innerWidth = 500);
    window.resizeTo(1000, 50);
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
});
