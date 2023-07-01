<script lang="ts">
  import { enhance } from "$app/forms";
  import { trimFormField, validateStr } from "$lib/functions";

  let dialog: HTMLDialogElement;

  // to allow opening dialog from outside
  export function showModal() {
    dialog.showModal();
  }
</script>

<dialog bind:this={dialog}>
  <form
    action="?/create"
    method="post"
    use:enhance={({ cancel, formData, formElement }) => {
      const bodyTrimmed = trimFormField(formData.get("body"));

      if (!validateStr(bodyTrimmed)) {
        formElement.reset();
        cancel();
      }
    }}
  >
    <header>
      <h2>New note</h2>

      <button
        class="close"
        type="reset"
        on:click={() => {
          dialog.close();
        }}
      >
        <img src="/icons/close.png" alt="close" />
      </button>
    </header>

    <textarea name="body" rows="3" cols="30" placeholder="Here's an idea for a note..." />

    <button
      class="submit"
      type="submit"
      on:click={() => {
        dialog.close();
      }}
    >
      Save
    </button>
  </form>
</dialog>

<style>
  dialog {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: max(18vw, 400px);
    border: none;
    border-radius: 16px;

    font-family: var(--font-stack);
    color: var(--font-color-primary);
    background-color: var(--color-secondary);
  }
  dialog::backdrop {
    background: rgba(0, 0, 0, 0.6);
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 16px;

    padding: 16px;
  }

  header {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    justify-items: center;
    align-items: center;
  }

  h2 {
    grid-column: 2 / 3;
    font-size: 1.2rem;
  }

  header > button {
    justify-self: end;
    width: 1rem;

    background-color: transparent;
  }
  header > button:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }

  textarea {
    padding: 16px;
    font-size: 1rem;

    border: 2px solid var(--color-grey-light);
    border-radius: 4px;

    background-color: var(--color-primary);
    color: var(--font-color-secondary);

    resize: none;
  }
  textarea:focus {
    border: 2px solid var(--font-color-blue);
  }

  .submit {
    align-self: center;
    width: 100%;

    background-color: var(--font-color-blue);
    color: var(--color-black);
  }
</style>
