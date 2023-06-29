<script lang="ts">
  import NewNote from "$lib/forms/NewNote.svelte";
  import { page } from "$app/stores";

  let newNoteDialog: NewNote;
</script>

<svelte:head>
  <title>About</title>
</svelte:head>

<h1>My notes</h1>

<section>
  <ul>
    {#each $page.data.notes as note (note.id)}
      <li>
        <a href={`/notes/${note.id}`}>{note.body}</a>
      </li>
    {/each}
  </ul>
</section>

<button on:click={newNoteDialog.showModal}> + Create Note </button>

<NewNote bind:this={newNoteDialog} />

<style>
</style>
