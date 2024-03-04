import type { LatLngLiteral } from 'leaflet'

export interface MarkerData {
  latlng: LatLngLiteral
  comments: string[]
}
