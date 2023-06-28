<script lang="ts">
  import { enhance } from "$app/forms";
  import { trimFormField, validateStr } from "$lib/functions";
  import type { PageData } from "./$types";

  export let data: PageData;
  let body = data.note?.body;

  let editing = false;

  function startEdit() {
    editing = true;
  }

  function endEdit() {
    editing = false;
  }

  function cancelEdit() {
    endEdit();
    body = data.note?.body; // reset to previous value
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
    if (!validateStr(bodyTrimmed) || bodyTrimmed === data.note?.body) {
      cancelEdit();
      cancel();
    }

    endEdit();
  }}
>
  {#if editing}
    <input type="text" name="body" bind:value={body} use:autofocus />
    <div>
      <button type="submit">Save</button>
      <button type="button" on:click={cancelEdit}>Cancel</button>
    </div>
  {:else}
    <p>{body}</p>
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
