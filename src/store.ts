import type { LatLngLiteral } from 'leaflet';
import { writable } from 'svelte/store';
import type { Readable } from 'svelte/store';
import type { MarkerData } from './model';

export interface MarkerStore extends Readable<MarkerData[]> {
  set: (markers: MarkerData[]) => void;
  addNewMarker: (latlng: LatLngLiteral) => void;
  updateMarkerPosition: (index: number, latlng: LatLngLiteral) => void;
  addCommentToMaker: (index: number, comment: string) => void;
};

export const createMarkersStore = () => {
  const { subscribe, set, update } = writable<MarkerData[]>();

  return {
    subscribe,
    set: (markers: MarkerData[]) => set(markers),
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
