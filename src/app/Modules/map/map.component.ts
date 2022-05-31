import { MapsAPILoader } from '@agm/core';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  NgZone,
  OnInit,
} from '@angular/core';
import { map } from 'rxjs';
import { BORDER_MAP, STYLES_MAP } from './map.config';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements OnInit {
  alertShow = false;
  map!: google.maps.Map;

  lat = 53.871;
  lng = 27.55;
  latMap = 53.9;
  lngMap = 27.5667;
  zoom = 10.75;
  paths: { lng: number; lat: number }[] = BORDER_MAP;
  styles: google.maps.MapTypeStyle[] = STYLES_MAP;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    public zone: NgZone,
    public changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.onResize();
  }

  onResize() {
    if (window.innerWidth < 920) {
      this.zoom = 10.2;
    } else {
      this.zoom = 10.75;
    }
  }

  public mapReadyHandler(): void {
    this.alertShow = true;
    setTimeout(() => {
      this.closeAlert();
      this.changeDetector.detectChanges();
    }, 5000);
  }

  closeAlert() {
    this.alertShow = false;
  }

  getCoords(event: any) {
    this.lat = event.latLng.lat();
    this.lng = event.latLng.lng();
    console.log(event.latLng.lat(), event.latLng.lng());

    let a = new google.maps.Geocoder();
    a.geocode({ address: 'Minsk,Slobodskaya street, 149' }, (res, status) => {
      console.log(
        res[0].geometry.location.lat(),
        res[0].geometry.location.lng()
      );
    });
  }
}
