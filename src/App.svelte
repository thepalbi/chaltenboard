<script lang="ts">
	import CommentList from "./CommentList.svelte";
	import CommentForm from "./CommentForm.svelte";
	import Map from "./Map.svelte";
	import Sidebar from "./Sidebar.svelte";
	import type { MarkerData } from "./model";
	import { createMarkersStore } from "./store";
	import { setContext } from "svelte";

	export let markers: MarkerData[];
	const markerStore = createMarkersStore();
	setContext("markerStore", markerStore);
	$: markerStore.set(markers);

	let showSidebar = false;
	let currentSelectedMarkerID: number | undefined = undefined;
	let comments: string[] = [];

	$: {
		if (currentSelectedMarkerID !== undefined) {
			comments = $markerStore[currentSelectedMarkerID].comments;
		}
	}
</script>

<Sidebar bind:show={showSidebar}>
	<div class="sidebar-container">
		<div class="sidebar-main-content">
			{#if currentSelectedMarkerID !== undefined}
				<h2>Comments for {currentSelectedMarkerID}</h2>
				<p>lat: {$markerStore[currentSelectedMarkerID].latlng.lat}, lng: {$markerStore[currentSelectedMarkerID].latlng.lng}</p>
			{/if}
			<CommentList bind:comments={comments}></CommentList>
		</div>
		<div>
			<CommentForm
				onSubmit={(text) => {
					if (currentSelectedMarkerID !== undefined) {
						markerStore.addCommentToMaker(currentSelectedMarkerID, text);
					}
				}}
			/>
		</div>
		<button class="delete close-sidebar-btn" on:click={() => showSidebar = false}></button>
	</div>
</Sidebar>
<Map on:toggle-marker-comments={(event) => {
	showSidebar = true;
	currentSelectedMarkerID = event.detail.markerID;
}} />

<style>
	.close-sidebar-btn {
		position: absolute;
		top: 5px;
		right: 5px;
	}

	.sidebar-container {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
	}

	.sidebar-main-content {
		/* TODO(pablo): need to find a way to make this more generic */
		height: 83%; 
		overflow-y: scroll;
	}
</style>
