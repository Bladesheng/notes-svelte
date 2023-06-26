<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
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

<button>+ Create Note</button>

<style>
</style>
