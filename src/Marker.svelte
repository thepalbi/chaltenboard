<script lang="ts">
	import type {Marker, LatLngExpression} from 'leaflet';
  import L from 'leaflet';
  import { getContext, setContext } from 'svelte';
	import { createEventDispatcher } from 'svelte';
    import type { LayerGroupProvider } from './types';
	const dispatch = createEventDispatcher();
  
	let classNames: string = '';
  export { classNames as class };

	export let marker: Marker | undefined = undefined;

	export let width = 30;
	export let height = 30;
	export let latLng: LatLngExpression;
 
	const layerGroup = (getContext('layerGroup') as LayerGroupProvider)();
	setContext('layer', () => marker);
	
  function createMarker(markerElement: HTMLDivElement) {
		let icon = L.divIcon({ 
			html: markerElement, 
			className: 'map-marker',
			iconSize: L.point(width, height)
		});
		marker = L.marker(latLng, { icon, draggable: false}).addTo(layerGroup);

    return {
      destroy() {
        if (marker) {
          marker.remove();
          marker = undefined;
        }
      },
    };
  }
</script>

<div class="hidden">
  <div use:createMarker class={classNames} on:click={() => dispatch('click')}>
		{#if marker}
	    <slot />
		{/if}
  </div>
</div>