<script lang="ts">
  import { enhance } from "$app/forms";
  import { trimFormField, validateStr } from "$lib/functions";
  import { page } from "$app/stores";

  let currentBody = $page.data.note?.body;

  let editing = false;

  function startEdit() {
    editing = true;
  }

  function endEdit() {
    editing = false;
  }

  function cancelEdit() {
    endEdit();
    currentBody = $page.data.note?.body; // reset to previous value
  }

  function autofocus(element: HTMLInputElement) {
    element.focus();
  }
</script>

<svelte:head>
  <title>About</title>
</svelte:head>

<h1>Note</h1>

<form
  action="?/edit"
  method="post"
  use:enhance={({ cancel, formData }) => {
    const bodyTrimmed = trimFormField(formData.get("body"));

    // don't send request if body didn't change
    if (!validateStr(bodyTrimmed) || bodyTrimmed === $page.data.note?.body) {
      cancelEdit();
      cancel();
    }

    endEdit();
  }}
>
  {#if editing}
    <input type="text" name="body" bind:value={currentBody} use:autofocus />
    <div>
      <button type="submit">Save</button>
      <button type="button" on:click={cancelEdit}>Cancel</button>
    </div>
  {:else}
    <p>{currentBody}</p>
    <button on:click={startEdit}>Edit</button>
  {/if}
</form>

<div class="controls">
  <a href="/notes" data-sveltekit-preload-data="off">
    <button>Go back</button>
  </a>

  <form action="?/delete" method="post" use:enhance>
    <button type="submit">Delete</button>
  </form>
</div>

<style>
  .controls {
    display: flex;
  }
</style>
