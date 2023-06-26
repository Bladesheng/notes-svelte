<script lang="ts">
  import { onMount } from "svelte";
  import { enhance } from "$app/forms";

  let dialog: HTMLDialogElement;
  onMount(() => {
    dialog = document.querySelector("dialog") as HTMLDialogElement;
  });
</script>

<dialog>
  <form action="?/create" method="post" use:enhance>
    <h1>New note</h1>

    <label for="body">Body</label>
    <textarea name="body" id="body" rows="3" cols="30" placeholder="Here's an idea for a note..." />

    <div>
      <button
        type="submit"
        on:click={() => {
          dialog.close();
        }}
      >
        Save
      </button>

      <button
        type="button"
        on:click={() => {
          dialog.close();
        }}
      >
        Cancel
      </button>
    </div>
  </form>
</dialog>

<style>
  dialog {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    font-family: var(--font-stack);
    color: var(--font-color-primary);
    background-color: var(--color-primary);
  }
  dialog::backdrop {
    background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.9));
    animation: fade-in 200ms;
  }
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  form {
    display: flex;
    flex-direction: column;
  }
</style>
