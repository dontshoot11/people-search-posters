<script>
  import "../reset.css";
  import "@fontsource-variable/inter";
  import "../app.css";
  let { children } = $props();
</script>

<div class="app">
  <main>
    {@render children?.()}
  </main>
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
</style>
