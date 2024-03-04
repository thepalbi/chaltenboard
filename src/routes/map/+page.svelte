<script lang="ts">
    import App from '../../App.svelte';
	import type { PageServerData } from "./$types";
    export let data: PageServerData;
</script>

<svelte:head>
    <title>Map</title>
</svelte:head>

<App
    markers={data.markers}
></App>