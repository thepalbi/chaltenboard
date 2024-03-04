<!-- TODO(pablo): add support for the sidebar to be resizable -->
<script lang="ts">
  import { fly } from "svelte/transition";

  export let show = false;
</script>

{#if show}
  <nav transition:fly={{ x: 250, opacity: 1 }}>
    <slot />
  </nav>
{/if}

<style>
  nav {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    padding: 1rem 1rem 0.6rem;
    border-left: 1px solid #aaa;
    background: #fff;
    overflow-y: auto;
    width: 20rem;
    z-index: 2000;
  }
</style>
