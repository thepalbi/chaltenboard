<script lang="ts">
  export let comments: string[] = []
</script>

<div>
  {#each comments as comment}
    <div class="media">
      <div class="media-content">
        <p>
            <small><strong>Pablo</strong></small><br />
            {comment}
        </p>
      </div>
    </div>
  {/each}
</div>

<style>
</style>
