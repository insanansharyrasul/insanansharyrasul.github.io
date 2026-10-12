<script lang="ts">
  export let variant: 'primary' | 'secondary' | 'danger' = 'primary';
  export let disabled: boolean = false;
</script>

<button class="btn {variant}" {disabled} on:click>
  <slot />
</button>

<style>
  .btn {
    padding: var(--space-1) var(--space-2);
    border-radius: var(--radius-md);
    font-weight: 600;
    font-size: 0.95rem;
    cursor: pointer;
    border: 1px solid transparent;
    transition: background-color 0.15s ease, border-color 0.15s ease;
  }

  .btn:focus-visible {
    outline: 2px solid var(--color-blue);
    outline-offset: 2px;
  }

  .primary {
    background-color: var(--color-primary);
    color: var(--color-text-on-accent);
  }

  .primary:hover:not(:disabled) {
    filter: brightness(1.1);
  }

  .secondary {
    background-color: var(--color-surface);
    color: var(--color-text);
    border-color: var(--color-border);
  }

  .secondary:hover:not(:disabled) {
    border-color: var(--color-primary);
  }

  .danger {
    background-color: var(--color-error);
    color: #ffffff;
  }

  .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
