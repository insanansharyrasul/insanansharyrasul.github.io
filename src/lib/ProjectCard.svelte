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
        <p class="text-gray-300 text-sm mb-3">
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
        background: linear-gradient(
            135deg,
            rgba(254, 129, 0, 0.1),
            rgba(255, 107, 53, 0.05)
        );
        border: 1px solid rgba(254, 129, 0, 0.2);
        border-radius: 16px;
        overflow: hidden;
        transition: all 0.3s ease;
        text-decoration: none;
        color: inherit;
    }

    .project-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 40px rgba(254, 129, 0, 0.3);
        border-color: rgba(254, 129, 0, 0.5);
    }

    .project-card img {
        border-radius: 16px 16px 0 0;
    }

    .project-card:hover img {
        transform: scale(1.05);
    }

    .project-overlay {
        padding: 20px;
        background: linear-gradient(
            135deg,
            rgba(15, 23, 42, 0.95),
            rgba(30, 41, 59, 0.9)
        );
        backdrop-filter: blur(10px);
    }

    .tech-tag {
        font-size: 0.75rem;
        font-weight: 500;
        transition: all 0.2s ease;
    }

    .tech-tag:hover {
        background: rgba(254, 129, 0, 0.3) !important;
        transform: scale(1.05);
    }
</style>
