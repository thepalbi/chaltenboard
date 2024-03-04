<script lang="ts">
  //   function validate() {
  //     console.log("I'm the validate() function")
  //   }
  export let onSubmit: (text: string) => void = () => {}
  let commentContent = ''

  const doSubmit = () => {
    onSubmit(commentContent)
    commentContent = ''
  }
</script>

<div class="media">
  <div class="media-content">
    <div class="field">
      <textarea
        class="textarea"
        placeholder="Add a comment..."
        bind:value={commentContent}
        on:keypress={evt => {
          if (evt.key === 'Enter' && evt.ctrlKey) {
            doSubmit()
          }
        }}
      ></textarea>
    </div>
    <nav class="level">
      <div class="level-left">
        <div class="level-item">
          <button class="button is-info" type="submit" on:click={doSubmit}> Post </button>
        </div>
      </div>
    </nav>
  </div>
</div>
