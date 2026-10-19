<script lang="ts">
    import { ArrowRight } from "@lucide/svelte";

    export let title: string;
    export let description: string;
    export let githubUrl: string;
    export let technologies: string[] = [];
    export let category: string = "";
    export let index: string = "";
    $: label = (
        category ||
        technologies[1] ||
        technologies[0] ||
        ""
    ).toUpperCase();

    $: repoTag = "// " + title.toUpperCase().replace(/[^A-Z0-9]+/g, "_");
</script>

<a
    href={githubUrl}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="View {title} on GitHub"
    class="project-card"
>
    {#if index || label}
        <p class="font-mono text-xs tracking-[0.2em] text-primary mb-4">
            {#if index}{index} /
            {/if}{label}
        </p>
    {/if}
    <div class="flex items-center gap-4 mb-4">
        <span
            class="inline-flex items-center justify-center w-12 h-12 rounded-md border border-primary shrink-0"
            aria-hidden="true"
        >
            <img
                src="icons/icons8-github.svg"
                alt=""
                width="24"
                height="24"
                class="w-6 h-6 filter invert sepia saturate-[5] hue-rotate-[25deg]"
            />
        </span>
        <h3 class="text-text text-xl font-monda font-bold">
            {title}
        </h3>
    </div>
    <p class="text-text-muted text-sm leading-relaxed">
        {description}
    </p>
    <div class="project-tech flex flex-wrap gap-2 mt-5 mb-6">
        {#each technologies as tech}
            <span class="pill">
                {tech}
            </span>
        {/each}
    </div>
    <div
        class="flex items-center justify-between gap-3 border-t border-border mt-auto pt-4"
    >
        <span class="inline-flex items-center gap-2 text-primary text-sm font-medium">
            View on GitHub
            <ArrowRight class="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
        </span>
        <span class="font-mono text-[0.65rem] tracking-[0.1em] text-text-muted"
            >{repoTag}</span
        >
    </div>
</a>

<style>
    .project-card {
        display: flex;
        flex-direction: column;
        position: relative;
        background-color: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        overflow: hidden;
        transition: all 0.3s ease;
        text-decoration: none;
        color: inherit;
        padding: var(--space-3);
    }

    .project-card:hover {
        transform: translateY(-8px);
        border-color: var(--color-primary);
    }

    .project-card:hover .project-tech .pill {
        border-color: var(--color-primary);
        color: var(--color-primary);
    }
</style>
