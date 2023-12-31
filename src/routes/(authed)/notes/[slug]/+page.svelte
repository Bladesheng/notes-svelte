<script lang="ts">
  import { enhance } from "$app/forms";
  import { trimFormField, validateStr } from "$lib/functions";
  import { page } from "$app/stores";
  import toast from "svelte-french-toast";
  import { toastOptions } from "$lib/toasts";

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

<header>
  <a href="/notes" data-sveltekit-preload-data="off">
    <button class="roundIcon">
      <img src="/icons/back.svg" alt="back" />
    </button>
  </a>

  <h1>Note</h1>

  <form
    action="?/delete"
    method="post"
    use:enhance={() => {
      return async ({ result, update }) => {
        if (result.type === "redirect") {
          toast.success("Note deleted", toastOptions.ok);
        } else {
          toast.error("Error has occured", toastOptions.err);
        }
        update();
      };
    }}
  >
    <button type="submit" class="redHover">
      <img src="/icons/delete.svg" alt="delete" />
      Delete note
    </button>
  </form>
</header>

<form
  class="edit"
  action="?/edit"
  method="post"
  use:enhance={({ cancel, formData }) => {
    const bodyTrimmed = trimFormField(formData.get("body"));

    // don't send request if body didn't change
    if (!validateStr(bodyTrimmed) || bodyTrimmed === $page.data.note?.body) {
      cancelEdit();
      cancel();
      toast.success("Note saved (no changes)", toastOptions.ok);
    }

    endEdit();

    return async ({ result, update }) => {
      if (result.type === "success") {
        toast.success("Note created", toastOptions.ok);
      } else {
        toast.error("Error has occured", toastOptions.err);
      }
      update();
    };
  }}
>
  {#if editing}
    <input type="text" name="body" bind:value={currentBody} use:autofocus />
    <div class="controls">
      <button type="submit" class="green">
        <img src="/icons/save.svg" alt="save" />
        Save
      </button>
      <button type="button" on:click={cancelEdit}>
        <img src="/icons/undo.svg" alt="undo" />
        Cancel
      </button>
    </div>
  {:else}
    <p>{currentBody}</p>
    <button on:click={startEdit}>
      <img src="/icons/edit.svg" alt="edit" />
      Edit
    </button>
  {/if}
</form>

<style lang="postcss">
  header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 8px;
  }

  header > :last-child {
    margin-left: auto;
  }

  form.edit {
    display: flex;
    flex-direction: column;
    gap: 16px;

    padding: 16px 0px 16px 40px;
  }

  p {
    padding: 1rem 0rem;
  }
  input {
    background-color: var(--color-secondary);
    color: var(--font-color-primary);
    font-size: 1rem;

    padding: 1rem;
    border: 2px solid var(--color-grey-light);
    border-radius: 4px;
    margin: -2px;
    margin-left: calc(-1rem + -2px);
  }

  .controls {
    display: flex;
    gap: 8px;
  }
</style>
