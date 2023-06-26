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
    {#each data.notes as note}
      <li>
        <a href="/">{note.body}</a>
      </li>
    {/each}
  </ul>
</section>

<button>+ Create Note</button>

<style>
</style>
