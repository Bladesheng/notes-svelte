<script lang="ts">
  import { enhance } from "$app/forms";
  import type { FormData } from "$api/types";
  import toast from "svelte-french-toast";
  import { toastOptions } from "$lib/toasts";

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
    action="/api/registration?/create"
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
          toast.error("Error has occured", toastOptions.err);
        } else {
          dialog.close();
          toast.success("Account created", toastOptions.ok);
        }
        update();
      };
    }}
  >
    <header>
      <h2>Create new account</h2>

      <button
        class="roundIcon"
        type="reset"
        on:click={() => {
          dialog.close();
          form = {}; // remove error messages
        }}
      >
        <img src="/icons/close.svg" alt="close" />
      </button>
    </header>

    <label for="name">Name</label>
    <input type="text" name="name" value={form?.name ?? ""} />
    <p>{form?.errors?.name ?? ""}</p>

    <label for="password">Password</label>
    <input type="password" name="password" />
    <p>{form?.errors?.password ?? ""}</p>

    <label for="email">Email adress</label>
    <input type="email" name="email" value={form?.email ?? ""} />
    <p>{form?.errors?.email ?? ""}</p>

    <button type="submit" class="blue">Register</button>
  </form>
</dialog>

<style lang="postcss">
  @import "$styles/forms.css";
</style>
