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
    <header>
      <h2>Sign in</h2>

      <button
        class="close"
        type="reset"
        on:click={() => {
          dialog.close();
          form = {}; // remove error messages
        }}
      >
        <img src="/icons/close.png" alt="close" />
      </button>
    </header>

    <label for="name">Name</label>
    <input type="text" name="name" value={form?.name ?? ""} />
    <p>{form?.errors?.name ?? ""}</p>

    <label for="password">Password</label>
    <input type="password" name="password" id="password" />
    <p>{form?.errors?.password ?? ""}</p>

    <button type="submit" class="submit">Login</button>
  </form>
</dialog>

<style>
  dialog {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: max(18vw, 250px);
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

  label {
    padding: 8px 16px;
    font-size: 0.9rem;
  }

  input {
    padding: 16px;
    font-size: 1rem;

    border: 2px solid var(--color-grey-light);
    border-radius: 4px;

    background-color: var(--color-primary);
    color: var(--font-color-secondary);
  }
  input:focus {
    border: 2px solid var(--font-color-blue);
  }

  p {
    height: 3rem;

    padding: 8px 16px;
    font-size: 0.8rem;
    color: var(--font-color-red);
  }

  .submit {
    align-self: center;
    width: 100%;

    background-color: var(--font-color-blue);
    color: var(--color-black);
  }
</style>
