import { MapsAPILoader } from '@agm/core';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgZone,
  OnInit,
} from '@angular/core';
import { AccountService } from '../account/account.service';
import { BORDER_MAP, STYLES_MAP } from './map.config';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements OnInit {
  alertShow = false;
  addressInput!: ElementRef;
  geoCoder!: google.maps.Geocoder;
  autocomplete!: google.maps.places.Autocomplete;
  place!: google.maps.places.PlaceResult;
  address: string = '';
  placeChanged: string = '';
  notInPolygon = false;

  lat = 53.871;
  lng = 27.55;
  latMap = 53.9;
  lngMap = 27.5667;
  zoom = 10.75;
  mobileZoom = 10.2;
  loopZoom = 14;
  delayPopup = 5000;
  mobileTransition = 920;
  paths: { lng: number; lat: number }[] = BORDER_MAP;
  styles: google.maps.MapTypeStyle[] = STYLES_MAP;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    public zone: NgZone,
    public changeDetector: ChangeDetectorRef,
    private http: AccountService
  ) {}

  ngOnInit(): void {
    this.onResize();
    this.http.addressHTML.subscribe((value: ElementRef) => {
      this.addressInput = value;
    });
    /* if you want create autocomplete:
    ---------------------------------------------
       this.mapsAPILoader.load().then(() => {
        if (value.nativeElement) {
          this.autocomplete = new google.maps.places.Autocomplete(
            value.nativeElement
          );
          this.autocomplete.addListener('place_changed', () => {
            this.zone.run(() => {
              this.place = this.autocomplete.getPlace();
              console.log(this.autocomplete.getPlace());
              if (
                this.place.geometry === undefined ||
                this.place.geometry === null
              ) {
                return;
              }
              this.lat = this.place.geometry.location.lat();
              this.lng = this.place.geometry.location.lng();
              this.latMap = this.lat;
              this.lngMap = this.lng;
              this.zoom =this.loopZoom;
            });
          });
        }
      });*/
    this.http.address.subscribe((value: string) => {
      this.placeChanged = value;
      this.mapsAPILoader.load().then(() => {
        this.geoCoder = new google.maps.Geocoder();
        this.geoCoder.geocode({ address: value }, (res, status) => {
          if (status === 'OK') {
            let lngAndLat = new google.maps.LatLng(
              res[0].geometry.location.lat(),
              res[0].geometry.location.lng()
            );
            let polygon = new google.maps.Polygon({ paths: this.paths });
            if (
              !google.maps.geometry.poly.containsLocation(lngAndLat, polygon)
            ) {
              this.mapReadyHandler();
              this.latMap = res[0].geometry.location.lat();
              this.lngMap = res[0].geometry.location.lng();
            } else {
              this.zoom = this.loopZoom;
              this.lat = res[0].geometry.location.lat();
              this.lng = res[0].geometry.location.lng();
              this.latMap = res[0].geometry.location.lat();
              this.lngMap = res[0].geometry.location.lng();
            }
            this.changeDetector.detectChanges();
          }
        });
      });
    });
  }

  onResize() {
    if (window.innerWidth < this.mobileTransition) {
      this.zoom = this.mobileZoom;
    }
  }

  public mapReadyHandler(): void {
    this.alertShow = true;
    setTimeout(() => {
      this.closeAlert();
      this.changeDetector.detectChanges();
    }, this.delayPopup);
  }

  closeAlert() {
    this.alertShow = false;
  }

  getCoords(event: google.maps.MouseEvent) {
    this.lat = event.latLng.lat();
    this.lng = event.latLng.lng();
    this.getAddress(this.lat, this.lng);
  }

  markerDragEnd(event: google.maps.MouseEvent) {
    let lngAndLat = new google.maps.LatLng(
      event.latLng.lat(),
      event.latLng.lng()
    );
    let polygon = new google.maps.Polygon({ paths: this.paths });
    if (!google.maps.geometry.poly.containsLocation(lngAndLat, polygon)) {
      this.mapReadyHandler();
      this.lat = this.lat;
      this.lng = this.lng;
    } else {
      this.lat = event.latLng.lat();
      this.lng = event.latLng.lng();
      this.getAddress(this.lat, this.lng);
    }
  }

  getAddress(latitude: number, longitude: number) {
    this.geoCoder.geocode(
      { location: { lat: latitude, lng: longitude } },
      (results, status) => {
        if (status === 'OK') {
          if (results[0]) {
            this.zoom = this.loopZoom;
            this.latMap = latitude;
            this.lngMap = longitude;
            this.address = results[0].formatted_address;
            this.http.mapAddress.next(this.address);
            this.changeDetector.detectChanges();
          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
      }
    );
  }
}
