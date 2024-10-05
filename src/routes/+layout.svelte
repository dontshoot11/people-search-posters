<script>
  import "../reset.css";
  import "@fontsource-variable/inter";
  import "../app.css";
</script>

<div class="app">
  <main>
    <slot />
  </main>
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
</style>
