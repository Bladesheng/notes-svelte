<script lang="ts">
  import { base } from "$app/paths";
  import { page } from "$app/stores";
</script>

<header>
  <nav>
    <ol>
      <li>
        <a class:selected={$page.route.id === "/"} href="{base}/">Home</a>
      </li>
      <li>
        <a class:selected={$page.route.id === "/about"} href="{base}/about">About</a>
      </li>
      <li>
        <a class:selected={$page.route.id === "/notes"} href="{base}/notes">Notes</a>
      </li>
      <li>
        <a class:selected={$page.route.id === "/contact"} href="{base}/contact">Contact</a>
      </li>
    </ol>
  </nav>
</header>

<style>
  header {
    padding-top: 1rem;
  }

  ol {
    display: flex;

    justify-content: center;
    gap: 16px;
  }

  a {
    font-size: 1.1rem;
    text-decoration: none;

    color: var(--font-color-primary);
    border-bottom: 2px solid transparent; /* stops buttons from moving when mousing over them */
  }
  a.selected {
    color: var(--font-color-secondary);
    border-bottom: 2px solid var(--font-color-secondary) !important;
  }
  a:hover {
    border-bottom: 2px solid var(--font-color-primary);
  }
  a:active {
    color: var(--font-color-blue) !important;
    border-bottom: 2px solid var(--font-color-blue) !important;
  }
</style>
