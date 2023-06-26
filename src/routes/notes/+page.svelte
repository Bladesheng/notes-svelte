<script lang="ts">
  import { onMount } from "svelte";
  import type { PageData } from "./$types";

  import NoteForm from "./NoteForm.svelte";

  export let data: PageData;

  let dialog: HTMLDialogElement;
  onMount(() => {
    dialog = document.querySelector("dialog") as HTMLDialogElement;
  });
</script>

<svelte:head>
  <title>About</title>
</svelte:head>

<h1>My notes</h1>

<section>
  <ul>
    {#each data.notes as note (note.id)}
      <li>
        <a href={`/notes/${note.id}`}>{note.body}</a>
      </li>
    {/each}
  </ul>
</section>

<button
  on:click={() => {
    dialog.showModal();
  }}
>
  + Create Note
</button>

<NoteForm />

<style>
</style>
