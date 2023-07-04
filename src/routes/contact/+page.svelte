<script lang="ts">
  import toast from "svelte-french-toast";
  import { toastOptions } from "$lib/toasts";

  let dogUrl: string;
</script>

<svelte:head>
  <title>Contact</title>
</svelte:head>

<h1>Contact page</h1>
<button
  on:click={async () => {
    const dogPromise = fetch("https://dog.ceo/api/breeds/image/random");

    const res = await toast.promise(
      dogPromise,
      {
        loading: "Fetching doggo",
        success: "Doggo!",
        error: "Could not fetch doggo :(",
      },
      toastOptions.ok
    );

    const data = await res.json();
    dogUrl = data.message;
  }}
>
  Random dog picture
</button>

<a href="https://dog.ceo/dog-api/" target="_blank">(source)</a>

{#if dogUrl}
  <div class="wrapper">
    <img src={dogUrl} alt="dog" />
  </div>
{/if}

<style>
  button {
    display: inline;
  }

  a {
    color: var(--font-color-blue);
  }

  .wrapper {
    width: 100%;
    height: 60vh;

    display: flex;
    align-items: center;
    justify-content: center;

    & > img {
      max-width: 100%;
      max-height: 100%;
    }
  }
</style>
