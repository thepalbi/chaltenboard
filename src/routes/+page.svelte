<script lang="ts">
	import type { PageServerData } from "./$types";

    export let data: PageServerData;
</script>

<h1>Chaltenboard</h1>
<ul>
    {#each data.maps as m}
        <li>{m.name}</li>
    {/each}
</ul>