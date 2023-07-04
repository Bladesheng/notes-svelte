<script lang="ts">
  import { enhance } from "$app/forms";
  import { page } from "$app/stores";
  import Register from "$lib/forms/Register.svelte";
  import Login from "$lib/forms/Login.svelte";
  import toast from "svelte-french-toast";
  import { toastOptions } from "$lib/toasts";

  let loginDialog: Login;
  let registerDialog: Register;
</script>

<div class="user-menu">
  {#if $page.data.user}
    <form
      action="/api/session?/destroy"
      method="post"
      use:enhance={() => {
        return async ({ update, result }) => {
          if (result.type === "redirect") {
            toast.success("Bye Felicia", toastOptions.ok);
          } else {
            toast.error("Error has occured", toastOptions.err);
          }
          update();
        };
      }}
    >
      <button type="submit">
        <img src="/icons/logout.svg" alt="logout" />
        Sign out
      </button>
    </form>

    <span>{$page.data.user.name}</span>

    <img class="profilePic" src="/clown.jpg" alt="you" />
  {:else}
    <button on:click={loginDialog.showModal}>
      <img src="/icons/login.svg" alt="logout" />
      Sign in
    </button>
    <button on:click={registerDialog.showModal}>
      <img src="/icons/register.svg" alt="logout" />
      Create account
    </button>
  {/if}
</div>

<Login bind:this={loginDialog} />
<Register bind:this={registerDialog} />

<style>
  .user-menu {
    grid-column: 3 / 4;
    justify-self: end;

    display: flex;
    align-items: center;

    gap: 16px;
    padding: 8px 0px;
  }

  img.profilePic {
    height: 32px;
    border-radius: 50%;
  }
</style>
