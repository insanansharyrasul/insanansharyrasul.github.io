<script lang="ts">
	import { AUTHOR, type Post } from '$lib/blog';

	export let post: Post;
</script>

<a href="/blog/{post.slug}" class="blog-card">
	{#if post.cover}
		<img src={post.cover} alt={post.title} class="blog-cover" loading="lazy" />
	{/if}
	<div class="blog-body">
		<h2 class="blog-title">{post.title}</h2>
		<p class="blog-excerpt">{post.excerpt}</p>
		<div class="blog-meta">
			<img src={AUTHOR.avatar} alt={AUTHOR.name} class="blog-avatar" />
			<span class="blog-author">{AUTHOR.name}</span>
			<span class="blog-sep"></span>
			<span>{post.dateLabel}</span>
			<span class="blog-sep"></span>
			<span>{post.readTime} min read</span>
		</div>
		<div class="blog-tags">
			{#each post.tags as tag}
				<span class="pill"># {tag}</span>
			{/each}
		</div>
	</div>
</a>

<style>
	.blog-card {
		display: flex;
		background-color: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		overflow: hidden;
		text-decoration: none;
		color: inherit;
		transition:
			transform 0.3s ease,
			border-color 0.3s ease,
			box-shadow 0.3s ease;
	}

	.blog-card:hover {
		transform: translateY(-4px);
		border-color: var(--color-primary);
	}

	.blog-cover {
		width: 280px;
		min-width: 280px;
		object-fit: cover;
	}

	.blog-body {
		padding: var(--space-3);
		display: flex;
		flex-direction: column;
		gap: 12px;
		min-width: 0;
	}

	.blog-title {
		margin: 0;
		font-size: 1.5rem;
		line-height: 1.25;
		color: var(--color-text);
	}

	.blog-excerpt {
		margin: 0;
		color: var(--color-text-muted);
		font-size: 1rem;
		line-height: 1.5;
	}

	.blog-meta {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 12px;
		color: var(--color-text-muted);
		font-size: 0.9rem;
	}

	.blog-avatar {
		width: 28px;
		height: 28px;
		border-radius: 50%;
		object-fit: cover;
	}

	.blog-author {
		color: var(--color-text);
	}

	.blog-sep {
		width: 1px;
		height: 1em;
		background-color: var(--color-border);
	}

	.blog-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

  @media (max-width: 640px) {
		.blog-card {
			flex-direction: column;
		}
		.blog-cover {
			width: 100%;
			min-width: 0;
			max-height: 200px;
		}
	}
</style>
