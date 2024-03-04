import type { LatLngLiteral } from 'leaflet'
import { writable } from 'svelte/store'
import type { MarkerData } from './model'

const testLocation: LatLngLiteral[] = [
  { lat: 29.8283, lng: -96.5796 },
  { lat: 39.8283, lng: -98.5795 },
  { lat: 49.8283, lng: -100.5795 },
  { lat: 59.8283, lng: -102.5795 },
  { lat: 69.8283, lng: -104.5795 },
];

const createMarkersStore = () => {
  const { subscribe, update } = writable<MarkerData[]>(
    testLocation.map(latlng => ({ latlng, comments: [] }))
  )

  return {
    subscribe,
    addNewMarker: (latlng: LatLngLiteral) =>
      update(markers => [...markers, { latlng, comments: [] }]),
    updateMarkerPosition: (index: number, latlng: LatLngLiteral) =>
      update(markers => {
        const newMarkers = [...markers]
        newMarkers[index].latlng = latlng
        return newMarkers
      }),
    addCommentToMaker: (index: number, comment: string) =>
      update(markers => {
        const newMarkers = [...markers]
        const markerComments = newMarkers[index].comments
        newMarkers[index].comments = [...markerComments, comment]
        return newMarkers
      })
  }
}

export const markersStore = createMarkersStore()
