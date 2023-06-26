<script lang="ts">
  import type { PageData } from "./$types";
  import { enhance } from "$app/forms";

  export let data: PageData;
</script>

<svelte:head>
  <title>About</title>
</svelte:head>

<h1>Note</h1>

<p>{data.note?.body}</p>

<a href="/notes" data-sveltekit-preload-data="off">
  <button>Go back</button>
</a>

<button>Edit</button>

<form action="?/delete" method="post" use:enhance>
  <button type="submit">Delete</button>
</form>

<style>
</style>
