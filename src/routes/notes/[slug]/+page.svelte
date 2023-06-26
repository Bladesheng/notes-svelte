<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<svelte:head>
  <title>About</title>
</svelte:head>

<h1>Note</h1>

<p>{data.note?.body}</p>

<a href="/notes">
  <button>Go back</button>
</a>

<button>Edit</button>

<button>Delete</button>

<style>
</style>
