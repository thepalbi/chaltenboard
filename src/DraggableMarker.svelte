<script lang="ts">
	import type { Marker, LatLngExpression } from 'leaflet';
	import type { LayerGroupProvider } from './types';
	import L from 'leaflet';
	import { getContext, setContext } from 'svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{
		click: object;
		'marker-dragend': {
			latlng: L.LatLng;
		};
	}>();

	let classNames: string = '';
	export { classNames as class };

	export let marker: Marker | undefined = undefined;

	export let width = 30;
	export let height = 30;
	export let latLng: LatLngExpression;
	export const toggleDraggable = () => {
		draggable = !draggable;
	};

	export let draggable = false;
	$: if (marker) {
		if (draggable) {
			marker.dragging?.enable();
		} else {
			marker.dragging?.disable();
		}
	}

	const layerGroup = (getContext('layerGroup') as LayerGroupProvider)();
	setContext('layer', () => marker);

	function createMarker(markerElement: HTMLDivElement) {
		let icon = L.divIcon({
			html: markerElement,
			className: 'map-marker',
			iconSize: L.point(width, height)
		});
		marker = L.marker(latLng, { icon, draggable })
			.addTo(layerGroup)
			.on('dragend', function (event) {
				let marker = event.target;
				let position = marker.getLatLng();
				dispatch('marker-dragend', {
					latlng: position
				});
			});
		marker.on('mouseover', () => {
			marker?.openTooltip();
		});

		return {
			destroy() {
				if (marker) {
					marker.remove();
					marker = undefined;
				}
			}
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
