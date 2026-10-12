<script lang="ts">
    export let name: string;
    export let icon: string;
    export let iconType: "svg" | "text" = "svg";
    export let iconColor: string = "bg-primary";
    export let link: string | null = null;
</script>

<!-- ponytail: single body, was duplicated {#if link} branches -->
<svelte:element
    this={link ? "a" : "div"}
    href={link ?? undefined}
    target={link ? "_blank" : undefined}
    rel={link ? "noopener noreferrer" : undefined}
    class="block"
>
    <div class="skill-card" class:cursor-pointer={!!link}>
        {#if iconType === "svg"}
            <img src={icon} alt={name} class="w-12 h-12 mx-auto mb-3" />
        {:else}
            <div
                class="w-12 h-12 {iconColor} rounded-lg flex items-center justify-center font-bold text-xs text-text-on-accent mx-auto mb-3"
            >
                {icon}
            </div>
        {/if}
        <span class="text-primary text-lg font-semibold block">{name}</span>
    </div>
</svelte:element>
