<script lang="ts">
  export let title: string = '';
</script>

<div class="card">
  {#if title}
    <h3 class="card-title">{title}</h3>
  {/if}
  <slot />
</div>

<style>
  .card {
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--space-3);
  }

  .card-title {
    margin-top: 0;
    margin-bottom: var(--space-2);
    color: var(--color-text);
  }
</style>
