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
        <img src="/icons/close.svg" alt="close" />
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

<style lang="postcss">
  @import "$styles/forms.css";

  dialog {
    --min-width: 400px;
  }

  form {
    gap: 16px; /* in other forms, the gap is created by the errors paragraphs */
  }
</style>
