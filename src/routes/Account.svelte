<script lang="ts">
  import { enhance } from "$app/forms";

  import type { IErrors } from "./registration/+page.server";

  type IForm = {
    name?: string;
    email?: string;

    errors?: IErrors;
  };

  let form: IForm; // form returned from the actionresult

  let registerDialog: HTMLDialogElement;

  let loggedIn = false;
</script>

<div class="account">
  {#if loggedIn}
    <span>Username</span>
    <button>Log Out</button>
  {:else}
    <button
      on:click={() => {
        registerDialog.showModal();
      }}
    >
      Register</button
    >

    <button>Log In</button>
  {/if}
</div>

<dialog class="register" bind:this={registerDialog}>
  <form
    action="/registration?/create"
    method="post"
    use:enhance={() => {
      return async ({ result, update }) => {
        if (result.type === "failure" && result.data !== undefined) {
          // get the errors from server
          form = result.data;
        } else {
          registerDialog.close();
          update();
        }
      };
    }}
  >
    <h1>Create New Account</h1>

    {#if form?.errors?.name}
      <p>{form.errors.name}</p>
    {/if}
    <label for="name">Name</label>
    <input type="text" name="name" id="name" value={form?.name ?? ""} />

    {#if form?.errors?.password}
      <p>{form.errors.password}</p>
    {/if}
    <label for="password">Password</label>
    <input type="password" name="password" id="password" />

    {#if form?.errors?.email}
      <p>{form.errors.email}</p>
    {/if}
    <label for="email">Email adress</label>
    <input type="email" name="email" id="email" value={form?.email ?? ""} />

    <div>
      <button type="submit">Register</button>

      <button
        type="reset"
        on:click={() => {
          registerDialog.close();
        }}
      >
        Cancel
      </button>
    </div>
  </form>
</dialog>

<style>
  .account {
    grid-column: 3 / 4;
    justify-self: end;

    margin-right: 16px;
  }

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
