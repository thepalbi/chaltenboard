<script lang="ts">
	import { createEventDispatcher, setContext } from 'svelte';
	import L from 'leaflet';
	import type { Map, LatLngExpression } from 'leaflet';
	// Uncomment this for use outside the REPL
	//import 'leaflet/dist/leaflet.css';
	export let height = '100%';
	export let width = '100%';

	export let view: LatLngExpression;
	export let zoom: number;
	let mapProp = undefined;
	export { mapProp as map };

	export const invalidateSize = () => map?.invalidateSize();

	const dispatch = createEventDispatcher();

	let map: Map | undefined;
	$: mapProp = map;

	export const getMap = () => map;
	setContext('layerGroup', getMap);
	setContext('layer', getMap);
	setContext('map', getMap);

	function createLeaflet(node: HTMLDivElement) {
		map = L.map(node).on('zoom', (e) => dispatch('zoom', e));
		map.setView(view, zoom);

		// https://leaflet-extras.github.io/leaflet-providers/preview/
		let esriWorldImaginery = L.tileLayer(
			'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
			{
				attribution:
					'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
				opacity: 0.4,
			}
		);
		esriWorldImaginery.addTo(map);

		return {
			destroy() {
				map?.remove();
				map = undefined;
			}
		};
	}

	$: if (map) {
		map.setView(view, zoom);
	}
</script>

<div style="height:{height};width:{width}" use:createLeaflet>
	{#if map}
		<slot {map} />
	{/if}
</div>

<style>
	:global(.leaflet-control-container) {
		position: static;
	}
</style>
