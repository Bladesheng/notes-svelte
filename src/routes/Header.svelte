<script lang="ts">
  import { base } from "$app/paths";
  import { page } from "$app/stores";
  import UserMenu from "$lib/UserMenu.svelte";

  $: route = $page.route.id;
</script>

<header>
  <nav>
    <a href="{base}/" class:selected={route === "/"}>
      <span>Home</span>
    </a>
    <a href="{base}/about" class:selected={route === "/about"}>
      <span>About</span>
    </a>
    {#if $page.data.user}
      <a
        href="{base}/notes"
        class:selected={route === "/(authed)/notes" || route === "/(authed)/notes/[slug]"}
      >
        <span>Notes</span>
      </a>
    {/if}
    <a href="{base}/contact" class:selected={route === "/contact"}>
      <span>Contact</span>
    </a>
  </nav>

  <UserMenu />
</header>

<style lang="postcss">
  header {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    place-items: center;

    padding: 0px 16px;

    background-color: var(--color-primary);
  }

  nav {
    grid-column: 2 / 3;

    height: 100%;

    display: flex;
    justify-content: center;
    align-items: stretch;
  }

  /* Unselected */
  a {
    display: flex;
    align-items: center;
    padding: 0px 16px;

    border-bottom: 2px solid transparent; /* stops buttons from moving when mousing over them */

    font-size: 1.1rem;
    color: var(--font-color-primary);

    &.selected {
      border-bottom: 2px solid var(--font-color-secondary) !important;
      color: var(--font-color-secondary);
    }

    &:hover {
      border-bottom: 2px solid var(--font-color-primary);
    }

    &:active {
      border-bottom: 2px solid var(--font-color-blue) !important;
      color: var(--font-color-blue) !important;
    }
  }
</style>
