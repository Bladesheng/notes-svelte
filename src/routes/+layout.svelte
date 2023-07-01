<script lang="ts">
  import "./styles.css";

  import Header from "./Header.svelte";
  import Footer from "./Footer.svelte";
</script>

<div class="app">
  <Header />

  <main>
    <slot />
  </main>

  <Footer />
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;

    width: 100vw;
    max-width: 100vw;
    overflow-x: hidden;

    height: 100vh;
    max-height: 100vh;
    overflow-y: auto;

    font-family: var(--font-stack);
    color: var(--font-color-primary);
    background-color: var(--color-secondary);
  }

  main {
    flex: 1 1 auto;
    padding: 4vw;
  }

  @media (max-width: 680px) {
  }
</style>
