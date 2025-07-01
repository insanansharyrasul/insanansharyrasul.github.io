<script lang="ts">
    export let name: string;
    export let icon: string;
    export let iconType: "svg" | "text" = "svg";
    export let iconColor: string = "bg-primary";
    export let link: string | null = null; // Add this line
</script>

{#if link}
<a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    class="block"
>
    <div
        class="skill-card bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-6 text-center transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/20 hover:border-primary/40 cursor-pointer"
    >
        {#if iconType === "svg"}
            <img src={icon} alt={name} class="w-12 h-12 mx-auto mb-3" />
        {:else}
            <div
                class="w-12 h-12 {iconColor} rounded-lg flex items-center justify-center font-bold text-xs text-white mx-auto mb-3"
            >
                {icon}
            </div>
        {/if}
        <span class="text-primary text-lg font-semibold block">{name}</span>
    </div>
</a>
{:else}
<div
    class="skill-card bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-6 text-center transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/20 hover:border-primary/40"
>
    {#if iconType === "svg"}
        <img src={icon} alt={name} class="w-12 h-12 mx-auto mb-3" />
    {:else}
        <div
            class="w-12 h-12 {iconColor} rounded-lg flex items-center justify-center font-bold text-xs text-white mx-auto mb-3"
        >
            {icon}
        </div>
    {/if}
    <span class="text-primary text-lg font-semibold block">{name}</span>
</div>
{/if}