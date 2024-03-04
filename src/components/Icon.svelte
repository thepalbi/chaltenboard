<!-- https://feathericons.com/ -->
<script lang="ts">
  import feather from 'feather-icons'
  export const directions = ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw']

  export let name: string
  export let direction = 'n'
  export let strokeWidth = '2px'
  export let stroke = 'black'
  export let size = '1em'
  export let translate: [string, string] | undefined = undefined
  let width = size
  let height = size

  $: icon = feather.icons[name]
  $: rotation = directions.indexOf(direction) * 45
  $: if (icon) {
    if (stroke) icon.attrs['stroke'] = stroke
    if (strokeWidth) icon.attrs['stroke-width'] = strokeWidth
  }
  let computedTranslationCSS = ''
  $: if (translate !== undefined) {
    computedTranslationCSS = `transform: translate(${translate[0]}, ${translate[1]})`
  }
</script>

{#if icon}
  <svg
    {...icon.attrs}
    style="width: {width}; height: {height}; transform: rotate({rotation}deg); {computedTranslationCSS}"
  >
    <g>
      {@html icon.contents}
    </g>
  </svg>
{/if}

<style>
  svg {
    width: 1em;
    height: 1em;
    overflow: visible;
    transform-origin: 50% 50%;
  }
</style>
