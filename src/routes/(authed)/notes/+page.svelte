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

<button class="green" on:click={newNoteDialog.showModal}>
  <img src="/icons/add.svg" alt="add" />
  New note
</button>

<NewNote bind:this={newNoteDialog} />

<style lang="postcss">
  ul {
    display: flex;
    flex-direction: column;
    gap: 16px;

    padding: 16px;
  }

  li {
    border-radius: 8px;
    background-color: var(--color-primary);

    &:hover {
      filter: brightness(1.1);
    }

    &:active {
      filter: brightness(1.3) !important;
    }
  }

  a {
    display: block;
    padding: 16px;

    color: var(--font-color-primary);
    font-weight: 500;
  }

  button {
    position: fixed;
    bottom: 2.5rem;
    left: 50%;
    transform: translate(-50%);

    border-radius: 8px;
    padding: 20px 16px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
</style>
