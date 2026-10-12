<script lang="ts">
    export let title: string;
    export let description: string;
    export let githubUrl: string;
    export let technologies: string[] = [];
    export let imageUrl: string;
</script>

<a
    href={githubUrl}
    target="_blank"
    rel="noopener noreferrer"
    class="project-card"
>
    <img
        src={imageUrl}
        alt={title}
        class="w-full h-48 object-cover transition-transform duration-300"
    />
    <div class="project-overlay">
        <h3 class="text-primary text-xl mb-2 font-monda">
            {title}
        </h3>
        <p class="text-text-muted text-sm mb-3">
            {description}
        </p>
        <div class="project-tech flex flex-wrap gap-2">
            {#each technologies as tech}
                <span
                    class="tech-tag bg-primary/20 text-primary px-2 py-1 rounded text-xs"
                >
                    {tech}
                </span>
            {/each}
        </div>
    </div>
</a>

<style>
    .project-card {
        display: block;
        position: relative;
        background-color: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        overflow: hidden;
        transition: all 0.3s ease;
        text-decoration: none;
        color: inherit;
    }

    .project-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 40px rgba(255, 143, 64, 0.2);
        border-color: var(--color-primary);
    }

    .project-card img {
        border-radius: var(--radius-lg) var(--radius-lg) 0 0;
    }

    .project-card:hover img {
        transform: scale(1.05);
    }

    .project-overlay {
        padding: var(--space-3);
        background-color: var(--color-surface);
    }

    .tech-tag {
        font-size: 0.75rem;
        font-weight: 500;
        transition: all 0.2s ease;
    }

    .tech-tag:hover {
        background: rgba(255, 143, 64, 0.3) !important;
        transform: scale(1.05);
    }
</style>
