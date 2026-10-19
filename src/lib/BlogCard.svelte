<script lang="ts">
	import { AUTHOR, type Post } from '$lib/blog';
	import { Calendar, Clock } from '@lucide/svelte';

	export let post: Post;
</script>

<a href="/blog/{post.slug}" class="blog-card">
	{#if post.cover}
		<div class="blog-cover-wrap">
			<img src={post.cover} alt={post.title} class="blog-cover" loading="lazy" />
		</div>
	{/if}
	<div class="blog-body">
		<h2 class="blog-title">{post.title}</h2>
		<p class="blog-excerpt">{post.excerpt}</p>
		<div class="blog-meta">
			<img src={AUTHOR.avatar} alt={AUTHOR.name} class="blog-avatar" />
			<span class="blog-author">{AUTHOR.name}</span>
			<span class="blog-sep"></span>
			<span class="inline-flex items-center gap-1.5">
				<Calendar class="w-3.5 h-3.5 text-text-muted" />
				{post.dateLabel}
			</span>
			<span class="blog-sep"></span>
			<span class="inline-flex items-center gap-1.5">
				<Clock class="w-3.5 h-3.5 text-text-muted" />
				{post.readTime} min read
			</span>
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
		flex-direction: column;
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
		box-shadow: 0 14px 30px -10px rgba(0, 0, 0, 0.5);
	}

	.blog-cover-wrap {
		width: 100%;
		aspect-ratio: 16 / 9;
		overflow: hidden;
		background-color: #0b0e14;
		border-bottom: 1px solid var(--color-border);
	}

	.blog-cover {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		transition: transform 0.4s ease;
	}

	.blog-card:hover .blog-cover {
		transform: scale(1.02);
	}

	.blog-body {
		padding: var(--space-3);
		display: flex;
		flex-direction: column;
		gap: 12px;
		flex: 1;
	}

	.blog-title {
		margin: 0;
		font-size: 1.35rem;
		line-height: 1.35;
		color: var(--color-text);
		transition: color 0.2s ease;
	}

	.blog-card:hover .blog-title {
		color: var(--color-primary);
	}

	.blog-excerpt {
		margin: 0;
		color: var(--color-text-muted);
		font-size: 0.95rem;
		line-height: 1.6;
	}

	.blog-meta {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 12px;
		color: var(--color-text-muted);
		font-size: 0.85rem;
		margin-top: auto;
		padding-top: 8px;
	}

	.blog-avatar {
		width: 24px;
		height: 24px;
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
</style>
