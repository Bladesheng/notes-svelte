<script lang="ts">
  import { enhance } from "$app/forms";
  import { page } from "$app/stores";
  import Register from "$lib/forms/Register.svelte";
  import Login from "$lib/forms/Login.svelte";

  let loginDialog: Login;
  let registerDialog: Register;
</script>

<div class="user-menu">
  {#if $page.data.user}
    <span>{$page.data.user.name}</span>

    <form action="/api/session?/destroy" method="post" use:enhance>
      <button type="submit">Log Out</button>
    </form>
  {:else}
    <button on:click={loginDialog.showModal}>Log In</button>

    <button on:click={registerDialog.showModal}>Register</button>
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
    margin-right: 16px;
  }
</style>
