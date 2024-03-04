<script lang="ts">
  import type { Tooltip } from "leaflet";
  import L from "leaflet";
  import { getContext } from "svelte";
  import type { LayerGroupProvider } from "./types";
  let classNames: string = "";
  export { classNames as class };
  export let tooltip: Tooltip | undefined = undefined;
  let showContents = false;
  let open = false;
  const layer = (getContext("layer") as LayerGroupProvider)();

  function createTooltip(tlement: HTMLDivElement) {
    tooltip = L.tooltip().setContent(tlement);
    layer.bindTooltip(tooltip, {
      direction: "top",
      offset: [0, -10],
    });
    layer.on("tooltipopen", () => {
      open = true;
      showContents = true;
    });
    layer.on("tooltipclose", () => {
      open = false;
      // Wait for the popup to completely fade out before destroying it.
      // Otherwise the fade out looks weird as the contents disappear too early.
      setTimeout(() => {
        if (!open) {
          showContents = false;
        }
      }, 500);
    });
    return {
      destroy() {
        if (tooltip) {
          layer.unbindTooltip();
          tooltip.remove();
          tooltip = undefined;
        }
      },
    };
  }
</script>

<div class="hidden">
  <div use:createTooltip class={classNames}>
    {#if showContents}
      <slot />
    {/if}
  </div>
</div>