<script lang="ts">
	/*
		This is an example of using Renderless components to integrate Svelte with Leaflet. Original blog post here: https://imfeld.dev/writing/domless_svelte_component
		
	For comparison, the original REPL that implemented this without Renderless components is here: https://svelte.dev/repl/62271e8fda854e828f26d75625286bc3?version=3.29.7
	
	You can also find a full application implementing these techniques at https://github.com/dimfeld/svelte-leaflet-demo
	
	Any questions? Ask me at dimfeld on Twitter!
	
	Thanks to heroicons.dev for the icons used here.
	*/

	import type { Map } from "leaflet";
	import Leaflet from "./Leaflet.svelte";
	import Control from "./Control.svelte";
	import Popup from "./Popup.svelte";
	import MapToolbar from "./MapToolbar.svelte";

	import { createEventDispatcher, getContext } from "svelte";
	import DraggableMarker from "./DraggableMarker.svelte";
	import Icon from "./components/Icon.svelte";
	import type {MarkerStore} from "./store";
	import { page } from '$app/stores';

	$: {
		console.log('lat lng in url', $page.url.searchParams.get('lat'), $page.url.searchParams.get('lng'));
	}

	const markersStore = getContext("markerStore") as MarkerStore;

	const dispatch = createEventDispatcher<{
		"toggle-marker-comments": {
			markerID: number;
		};
	}>();

	let map: Map;

	// initialize markerInstances with undefined values
	let markerInstances: { [id: number]: DraggableMarker | undefined } = {};
	$markersStore.forEach((_, i) => {
		markerInstances[i] = undefined;
	});

	let initialView = {
		lat: -49.4100,
		lng: -73.0083,
	};
	let initialZoom = 11;

	function updateInitialView() {
		initialView = map.getCenter();
		initialZoom = map.getZoom();
	}

	let eye = true;

	function resizeMap() {
		if (map) {
			map.invalidateSize();
		}
	}

	function resetMapView() {
		map.setView(initialView, initialZoom);
	}
</script>

<svelte:window on:resize={resizeMap} />

<!-- Can just use an import statement for this, when outside the REPL -->
<link
	rel="stylesheet"
	href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
	integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
	crossorigin=""
/>

<Leaflet bind:map view={initialView} zoom={initialZoom}>
	<Control position="bottomleft">
		<MapToolbar
			bind:eye
			on:click-reset={resetMapView}
			on:update-default-loc={updateInitialView}
			on:add-marker={() => {
				markersStore.addNewMarker({
					lat: initialView.lat,
					lng: initialView.lng,
				});
			}}
		/>
	</Control>

	{#if eye}
		{#each $markersStore as marker, i}
			<!-- <Marker latLng={marker.latlng} width={30} height={30}></Marker> -->
			<DraggableMarker
				latLng={marker.latlng}
				bind:this={markerInstances[i]}
				draggable={false}
				on:marker-dragend={(event) => {
					markersStore.updateMarkerPosition(i, event.detail.latlng);
				}}
			>
				<Icon
					name="map-pin"
					size="2em"
					strokeWidth="2px"
					stroke="black"
					translate={["0", "-10px"]}
				></Icon>

				<Popup>
					<div class="popup">
						<button
							on:click={() =>
								dispatch("toggle-marker-comments", {
									markerID: i,
								})}>Toggle comments</button
						>
						<button
							on:click={() =>
								markerInstances[i]?.toggleDraggable()}
						>
							Toggle draggable
						</button>
					</div>
				</Popup>
			</DraggableMarker>
		{/each}
	{/if}
</Leaflet>

<style>
	.popup {
		padding: 5px;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
</style>
