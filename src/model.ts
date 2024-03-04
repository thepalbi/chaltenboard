import type { LatLngLiteral } from 'leaflet'

export interface Map {
  name: string;
}

export interface MarkerData {
  id: number,
  name: string,
  latlng: LatLngLiteral
  comments: string[]
}
