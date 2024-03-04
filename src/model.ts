import type { LatLngLiteral } from 'leaflet'

export interface Map {
  name: string;
}

export interface MarkerData {
  latlng: LatLngLiteral
  comments: string[]
}
