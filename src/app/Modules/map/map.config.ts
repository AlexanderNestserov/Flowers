export const BORDER_MAP = [
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

export const STYLES_MAP: google.maps.MapTypeStyle[] = [
  {
    featureType: 'all',
    elementType: 'geometry.fill',
    stylers: [
      {
        saturation: -100,
      },
    ],
  },
  {
    featureType: 'administrative.country',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#afb0b1',
      },
    ],
  },
  {
    featureType: 'administrative.country',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#808080',
      },
    ],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'administrative.neighborhood',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#7d7d7d',
      },
    ],
  },
  {
    featureType: 'administrative.neighborhood',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'administrative.province',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#e9eaed',
      },
    ],
  },

  {
    featureType: 'landscape',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#454545',
      },
    ],
  },
  {
    featureType: 'landscape.man_made',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#f7f7f7',
      },
    ],
  },
  {
    featureType: 'landscape.man_made',
    elementType: 'geometry.stroke',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'landscape.natural',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#f2f2f2',
      },
    ],
  },
  {
    featureType: 'landscape.natural.landcover',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#fafafa',
      },
    ],
  },
  {
    featureType: 'landscape.natural.terrain',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#f0f0f0',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#e8e8e8',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'geometry.stroke',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#454545',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.icon',
    stylers: [
      {
        color: '#9c9c9c',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#ededed',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#ffffff',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#919191',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#f2f2f2',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#f2f2f2',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels',
    stylers: [
      {
        color: '#ffffff',
      },
    ],
  },
];
