<script lang="ts">
	import '../../../app.css';
	import { onMount } from 'svelte';
	import { AUTHOR } from '$lib/blog';
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ post, newer, older } = data);

	let contentEl: HTMLElement;

	onMount(() => {
		// ponytail: ids already injected server-side in blog.ts — copy buttons only
		contentEl.querySelectorAll('pre').forEach((pre) => {
			const btn = document.createElement('button');
			btn.textContent = 'Copy';
			btn.className = 'copy-btn';
			btn.type = 'button';
			btn.addEventListener('click', async () => {
				try {
					await navigator.clipboard.writeText(pre.innerText);
					btn.textContent = 'Copied!';
				} catch {
					btn.textContent = 'Failed';
				}
				setTimeout(() => (btn.textContent = 'Copy'), 1500);
			});
			pre.appendChild(btn);
		});
	});
</script>

<svelte:head>
	<title>{post.title} — Blog</title>
	<meta name="description" content={post.excerpt} />
</svelte:head>

<main class="min-h-screen bg-bg text-text">
	<nav
		class="flex px-[5%] py-4 justify-between items-center bg-surface border-b border-border sticky top-0 z-10"
	>
		<a href="/" class="flex items-center gap-3 no-underline text-text">
			<img src="/icons/header_icon.svg" alt="home" class="h-8 transition-all duration-300 hover:scale-110" />
		</a>
		<div class="flex gap-6">
			<a href="/" class="nav-link text-text no-underline text-base hover:text-primary transition-colors" style="font-family: 'Raleway', sans-serif;">Home</a>
			<a href="/blog" class="nav-link text-primary no-underline text-base" style="font-family: 'Raleway', sans-serif;">Blog</a>
		</div>
	</nav>

	<article class="max-w-5xl mx-auto px-5 py-10">
		<!-- ponytail: single snippet, was duplicated {#each} loops -->
		{#snippet tocList()}
			<ol>
				{#each post.toc as item}
					<li class:indent={item.level === 3}>
						<a href={'#' + item.id}>{item.text}</a>
					</li>
				{/each}
			</ol>
		{/snippet}
		<a href="/blog" class="text-text-muted no-underline text-sm hover:text-primary transition-colors">
			← All posts
		</a>

		{#if post.cover}
			<img src={post.cover} alt={post.title} class="w-full max-h-[420px] object-cover rounded-lg mt-6 border border-border" />
		{/if}

		<h1 class="text-3xl md:text-4xl font-bold mt-6 leading-tight">{post.title}</h1>

		<div class="flex items-center flex-wrap gap-3 mt-4 text-text-muted text-sm">
			<img src={AUTHOR.avatar} alt={AUTHOR.name} class="w-7 h-7 rounded-full object-cover" />
			<a href="/blog" class="text-text no-underline hover:text-primary transition-colors">{AUTHOR.name}</a>
			<span class="opacity-40">|</span>
			<span>{post.dateLabel}</span>
			<span class="opacity-40">|</span>
			<span>{post.readTime} min read</span>
		</div>

		{#if post.tags.length}
			<div class="flex flex-wrap gap-2 mt-4">
				{#each post.tags as tag}
					<a href="/blog" class="blog-tag no-underline">#{tag}</a>
				{/each}
			</div>
		{/if}

		{#if post.toc.length}
			<details class="toc-mobile">
				<summary>Table of Contents</summary>
				{@render tocList()}
			</details>
		{/if}

		<div class="post-grid">
			<div class="blog-content" bind:this={contentEl}>
				{@html post.html}
			</div>
			{#if post.toc.length}
				<aside class="toc-side">
					<p class="toc-title">Table of Contents</p>
					{@render tocList()}
				</aside>
			{/if}
		</div>

		<div class="flex flex-col md:flex-row gap-4 mt-12">
			{#if older}
				<a href="/blog/{older.slug}" class="nav-card">
					<span class="nav-label">← Older post</span>
					<span class="nav-title">{older.title}</span>
				</a>
			{/if}
			{#if newer}
				<a href="/blog/{newer.slug}" class="nav-card md:text-right md:ml-auto">
					<span class="nav-label">Newer post →</span>
					<span class="nav-title">{newer.title}</span>
				</a>
			{/if}
		</div>
	</article>
</main>

<style>
	.blog-tag {
		background-color: rgba(255, 255, 255, 0.06);
		border: 1px solid var(--color-border);
		border-radius: 999px;
		padding: 4px 14px;
		font-size: 0.85rem;
		color: var(--color-text);
	}

	.post-grid {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 2rem;
		margin-top: 2rem;
	}

	@media (min-width: 1024px) {
		.post-grid:has(.toc-side) {
			grid-template-columns: minmax(0, 1fr) 240px;
		}
		.toc-mobile {
			display: none;
		}
	}

	.toc-mobile {
		margin-top: 1.5rem;
		background-color: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: 1rem 1.25rem;
	}

	.toc-mobile summary {
		cursor: pointer;
		color: var(--color-primary);
		font-weight: 600;
	}

	.toc-side {
		position: sticky;
		top: 90px;
		align-self: start;
		background-color: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: 1rem 1.25rem;
		max-height: 70vh;
		overflow-y: auto;
	}

	.toc-title {
		margin: 0 0 0.75rem;
		color: var(--color-primary);
		font-weight: 600;
		font-size: 0.9rem;
	}

	.toc-side ol,
	.toc-mobile ol {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.toc-side li.indent,
	.toc-mobile li.indent {
		padding-left: 1rem;
	}

	.toc-side a,
	.toc-mobile a {
		color: var(--color-text-muted);
		text-decoration: none;
		font-size: 0.9rem;
		line-height: 1.4;
	}

	.toc-side a:hover,
	.toc-mobile a:hover {
		color: var(--color-primary);
	}

	.nav-card {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 4px;
		background-color: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: 1rem 1.25rem;
		text-decoration: none;
		transition:
			border-color 0.2s ease,
			transform 0.2s ease;
	}

	.nav-card:hover {
		border-color: var(--color-primary);
		transform: translateY(-2px);
	}

	.nav-label {
		font-size: 0.8rem;
		color: var(--color-text-muted);
	}

	.nav-title {
		color: var(--color-text);
		font-weight: 600;
	}

	/* ---- rendered markdown ---- */
	.blog-content {
		min-width: 0;
		line-height: 1.75;
		color: var(--color-text);
		font-size: 1.02rem;
	}

	.blog-content :global(h2) {
		font-size: 1.5rem;
		margin: 2.2em 0 0.8em;
		color: var(--color-text);
		scroll-margin-top: 90px;
	}

	.blog-content :global(h3) {
		font-size: 1.2rem;
		margin: 1.8em 0 0.6em;
		color: var(--color-text);
		scroll-margin-top: 90px;
	}

	.blog-content :global(p) {
		margin: 1em 0;
	}

	.blog-content :global(a) {
		color: var(--color-blue);
	}

	.blog-content :global(img) {
		max-width: 100%;
		border-radius: var(--radius-lg);
		border: 1px solid var(--color-border);
		margin: 1.5em 0;
	}

	.blog-content :global(blockquote) {
		border-left: 3px solid var(--color-primary);
		margin: 1.5em 0;
		padding: 0.25em 0 0.25em 1em;
		color: var(--color-text-muted);
	}

	.blog-content :global(table) {
		width: 100%;
		border-collapse: collapse;
		margin: 1.5em 0;
		font-size: 0.92rem;
		display: block;
		overflow-x: auto;
	}

	.blog-content :global(th),
	.blog-content :global(td) {
		border: 1px solid var(--color-border);
		padding: 8px 12px;
		text-align: left;
	}

	.blog-content :global(th) {
		background-color: var(--color-surface);
		color: var(--color-primary);
	}

	.blog-content :global(code) {
		font-family: 'Fira Code', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
		font-feature-settings:
			'calt' 1,
			'liga' 1;
		font-variant-ligatures: contextual;
		letter-spacing: 0;
		font-size: 0.88em;
	}

	.blog-content :global(:not(pre) > code) {
		background-color: rgba(255, 255, 255, 0.07);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		padding: 1px 6px;
		color: var(--color-yellow);
	}

	.blog-content :global(pre) {
		position: relative;
		background-color: #0a0d13;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: 1rem 1.25rem;
		overflow-x: auto;
		margin: 1.5em 0;
	}

	.blog-content :global(pre code) {
		background: none;
		border: none;
		padding: 0;
		color: var(--color-text);
		font-size: 0.88rem;
		line-height: 1.7;
	}

	/* highlight.js tokens → DESIGN.md palette (no prebuilt hljs theme) */
	.blog-content :global(.hljs-keyword) {
		color: var(--color-purple);
	}

	.blog-content :global(.hljs-string),
	.blog-content :global(.hljs-regexp) {
		color: var(--color-green);
	}

	.blog-content :global(.hljs-number),
	.blog-content :global(.hljs-literal) {
		color: var(--color-yellow);
	}

	.blog-content :global(.hljs-title),
	.blog-content :global(.hljs-built_in) {
		color: var(--color-blue);
	}

	.blog-content :global(.hljs-comment),
	.blog-content :global(.hljs-quote) {
		color: var(--color-text-muted);
		font-style: italic;
	}

	.blog-content :global(.copy-btn) {
		position: absolute;
		top: 8px;
		right: 8px;
		background-color: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		color: var(--color-text-muted);
		font-size: 0.75rem;
		padding: 3px 10px;
		cursor: pointer;
		opacity: 0;
		transition: opacity 0.2s ease;
	}

	.blog-content :global(pre:hover .copy-btn) {
		opacity: 1;
	}

	.blog-content :global(.copy-btn:hover) {
		color: var(--color-primary);
		border-color: var(--color-primary);
	}
</style>
