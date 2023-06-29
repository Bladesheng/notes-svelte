<script lang="ts">
  import { enhance } from "$app/forms";
  import type { FormData } from "$api/types";

  // form data returned from server form action
  let form: FormData;

  let dialog: HTMLDialogElement;

  // to allow opening dialog from outside
  export function showModal() {
    dialog.showModal();
  }
</script>

<dialog bind:this={dialog}>
  <form
    action="/api/session?/create"
    method="post"
    use:enhance={() => {
      return async ({ result, update }) => {
        if (result.type === "failure" && result.data !== undefined) {
          // The server form action always returns the form data to it's coresponding +page.svelte where
          // you can use $page.form to acces the form data.
          //
          // However this form's server action is in /api/.../+page.server.ts which means the form data
          // is also sent to /api/.../+page.svelte which is the only place where you can use $page.form.
          // This is the only way to acces form data from anywhere else.
          form = result.data;
        } else {
          dialog.close();
          update();
        }
      };
    }}
  >
    <h1>Log In</h1>

    {#if form?.errors?.name}
      <p>{form.errors.name}</p>
    {/if}
    <label for="name">Name</label>
    <input type="text" name="name" value={form?.name ?? ""} />

    {#if form?.errors?.password}
      <p>{form.errors.password}</p>
    {/if}
    <label for="password">Password</label>
    <input type="password" name="password" id="password" />

    <div>
      <button type="submit">Log In</button>

      <button
        type="reset"
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
