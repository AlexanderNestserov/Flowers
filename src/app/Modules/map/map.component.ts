import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  lat = 53.871;
  lng = 27.55;
  latMap = 53.9;
  lngMap = 27.5667;
  zoom = 10.75;
  paths = [
    { lat: 53.9715, lng: 27.585 },
    { lat: 53.9675, lng: 27.49 },
    { lat: 53.9671, lng: 27.481 },
    { lat: 53.9658, lng: 27.47 },
    { lat: 53.9619, lng: 27.46 },
    { lat: 53.94, lng: 27.431 },
    { lat: 53.93, lng: 27.421 },
    { lat: 53.915, lng: 27.411 },
    { lat: 53.905, lng: 27.407 },
    { lat: 53.899, lng: 27.4079 },
    { lat: 53.855, lng: 27.4303 },
    { lat: 53.85, lng: 27.4365 },
    { lat: 53.8463, lng: 27.444 },
    { lat: 53.8438, lng: 27.455 },
    { lat: 53.8335, lng: 27.55 },
    { lat: 53.8329, lng: 27.557 },
    { lat: 53.8338, lng: 27.644 },
    { lat: 53.8345, lng: 27.648 },
    { lat: 53.8365, lng: 27.6552 },
    { lat: 53.84, lng: 27.662 },
    { lat: 53.8595, lng: 27.6818 },
    { lat: 53.8695, lng: 27.647 },
    { lat: 53.871, lng: 27.648 },
    { lat: 53.872, lng: 27.6493 },
    { lat: 53.879, lng: 27.6556 },
    { lat: 53.881, lng: 27.6562 },
    { lat: 53.8824, lng: 27.6554 },
    { lat: 53.886, lng: 27.651 },
    { lat: 53.8944, lng: 27.6439 },
    { lat: 53.9015, lng: 27.661 },
    { lat: 53.9019, lng: 27.665 },
    { lat: 53.9016, lng: 27.675 },
    { lat: 53.9018, lng: 27.681 },
    { lat: 53.9029, lng: 27.6888 },
    { lat: 53.924, lng: 27.68 },
    { lat: 53.925, lng: 27.7 },
    { lat: 53.9353, lng: 27.7 },
    { lat: 53.9364, lng: 27.7033 },
    { lat: 53.9445, lng: 27.698 },
    { lat: 53.948, lng: 27.709 },
    { lat: 53.9437, lng: 27.7185 },
    { lat: 53.95, lng: 27.7237 },
    { lat: 53.9578, lng: 27.7256 },
    { lat: 53.9598, lng: 27.72 },
    { lat: 53.9612, lng: 27.705 },
    { lat: 53.961, lng: 27.692 },
    { lat: 53.9646, lng: 27.67 },
    { lat: 53.9668, lng: 27.645 },
    { lat: 53.963, lng: 27.641 },
    { lat: 53.96, lng: 27.627 },
    { lat: 53.967, lng: 27.607 },
    { lat: 53.969, lng: 27.601 },
    { lat: 53.9712, lng: 27.59 },
  ];
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
}
