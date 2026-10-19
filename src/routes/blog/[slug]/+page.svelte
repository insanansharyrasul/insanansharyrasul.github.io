<script lang="ts">
	import "../../../app.css";
	import { onMount } from "svelte";
	import { AUTHOR } from "$lib/blog";
	import Navbar from "$lib/Navbar.svelte";
	import type { PageData } from "./$types";
	import { ArrowLeft, ArrowRight, Calendar, Clock } from "@lucide/svelte";

	export let data: PageData;
	$: ({ post, newer, older } = data);

	let contentEl: HTMLElement;
	let activeId = "";

	onMount(() => {
		// Copy button
		contentEl.querySelectorAll("pre").forEach((pre) => {
			const btn = document.createElement("button");
			btn.textContent = "Copy";
			btn.className = "copy-btn";
			btn.type = "button";
			btn.addEventListener("click", async () => {
				try {
					await navigator.clipboard.writeText(pre.innerText);
					btn.textContent = "Copied!";
				} catch {
					btn.textContent = "Failed";
				}
				setTimeout(() => (btn.textContent = "Copy"), 1500);
			});
			pre.appendChild(btn);
		});

		// Scroll-spy
		const headings = Array.from(
			contentEl.querySelectorAll<HTMLElement>("h2[id], h3[id]")
		);
		if (!headings.length) return;

		const obs = new IntersectionObserver(
			(entries) => {
				// Pick the topmost heading that is intersecting
				const visible = entries
					.filter((e) => e.isIntersecting)
					.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
				if (visible.length) activeId = visible[0].target.id;
			},
			{ rootMargin: "0px 0px -70% 0px", threshold: 0 }
		);

		headings.forEach((h) => obs.observe(h));
		// Set initial active to the first heading
		activeId = headings[0].id;

		return () => obs.disconnect();
	});
</script>

<svelte:head>
	<title>{post.title} — Blog</title>
	<meta name="description" content={post.excerpt} />
</svelte:head>

<main class="min-h-screen bg-bg text-text">
	<Navbar
		links={[
			{ href: "/", label: "Home", key: "home" },
			{ href: "/blog", label: "Blog", key: "blog" },
		]}
		activeSection="blog"
		sticky
	/>

	<article class="max-w-5xl mx-auto px-5 py-10">
		<!-- ponytail: single snippet, was duplicated {#each} loops -->
		{#snippet tocList()}
			<ol>
				{#each post.toc as item}
					<li class:indent={item.level === 3}>
						<a href={"#" + item.id} class:active={activeId === item.id}>{item.text}</a>
					</li>
				{/each}
			</ol>
		{/snippet}
		<a
			href="/blog"
			class="text-text-muted no-underline text-sm hover:text-primary transition-colors inline-flex items-center gap-1.5"
		>
			<ArrowLeft class="w-4 h-4" /> All posts
		</a>

		{#if post.cover}
			<img
				src={post.cover}
				alt={post.title}
				class="w-full max-h-[420px] object-cover rounded-lg mt-6 border border-border"
			/>
		{/if}

		<h1 class="text-3xl md:text-4xl font-bold mt-6 leading-tight">
			{post.title}
		</h1>

		<div class="flex items-center flex-wrap gap-3 mt-4 text-text-muted text-sm">
			<img
				src={AUTHOR.avatar}
				alt={AUTHOR.name}
				class="w-7 h-7 rounded-full object-cover"
			/>
			<a
				href="/blog"
				class="text-text no-underline hover:text-primary transition-colors"
				>{AUTHOR.name}</a
			>
			<span class="opacity-40">|</span>
			<span class="inline-flex items-center gap-1.5">
				<Calendar class="w-3.5 h-3.5" />
				{post.dateLabel}
			</span>
			<span class="opacity-40">|</span>
			<span class="inline-flex items-center gap-1.5">
				<Clock class="w-3.5 h-3.5" />
				{post.readTime} min read
			</span>
		</div>

		{#if post.tags.length}
			<div class="flex flex-wrap gap-2 mt-4">
				{#each post.tags as tag}
					<a href="/blog" class="pill no-underline">#{tag}</a>
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
					<span class="nav-label inline-flex items-center gap-1.5"><ArrowLeft class="w-3.5 h-3.5" /> Older post</span>
					<span class="nav-title">{older.title}</span>
				</a>
			{/if}
			{#if newer}
				<a href="/blog/{newer.slug}" class="nav-card md:text-right md:ml-auto">
					<span class="nav-label inline-flex items-center justify-end gap-1.5">Newer post <ArrowRight class="w-3.5 h-3.5" /></span>
					<span class="nav-title">{newer.title}</span>
				</a>
			{/if}
		</div>
	</article>
</main>

<style>
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
		transition: color 0.2s ease;
	}

	.toc-side a:hover,
	.toc-mobile a:hover,
	.toc-side a.active,
	.toc-mobile a.active {
		color: var(--color-primary);
	}

	.toc-side a.active,
	.toc-mobile a.active {
		font-weight: 600;
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

	.blog-content :global(ol) {
		list-style-type: decimal;
		margin: 1.25em 0;
		padding-left: 1.75em;
	}

	.blog-content :global(ul) {
		list-style-type: disc;
		margin: 1.25em 0;
		padding-left: 1.75em;
	}

	.blog-content :global(li) {
		margin: 0.5em 0;
		padding-left: 0.25em;
		line-height: 1.75;
	}

	.blog-content :global(li::marker) {
		color: var(--color-primary);
		font-weight: 600;
	}

	.blog-content :global(ol ol) {
		list-style-type: lower-alpha;
		margin: 0.4em 0;
	}

	.blog-content :global(ul ul) {
		list-style-type: circle;
		margin: 0.4em 0;
	}

	.blog-content :global(ol ul),
	.blog-content :global(ul ol) {
		margin: 0.4em 0;
	}

	.blog-content :global(li > p) {
		margin: 0.4em 0;
	}

	.blog-content :global(hr) {
		border: 0;
		border-top: 1px solid var(--color-border);
		margin: 2.5em 0;
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

	.blog-content :global(figure) {
		margin: 2em 0;
		width: 100%;
		display: block;
	}

	.blog-content :global(figure img) {
		margin: 0 auto;
		display: block;
		width: 100%;
	}

	.blog-content :global(figcaption) {
		margin-top: 0.65rem;
		font-size: 0.85rem;
		color: var(--color-text-muted);
		text-align: center;
		line-height: 1.5;
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
		font-family: "Fira Code", ui-monospace, SFMono-Regular, Menlo, Consolas,
			monospace;
		font-feature-settings:
			"calt" 1,
			"liga" 1;
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

	/* Installer CTA box & button */
	.blog-content :global(.installer-box) {
		background-color: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: 1.5rem;
		margin: 2rem 0;
	}

	.blog-content :global(.installer-btn) {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.6rem;
		padding: 0.8rem 1.6rem;
		background-color: var(--color-primary);
		color: #0d1017 !important;
		font-weight: 700;
		font-size: 1rem;
		border-radius: var(--radius-md);
		text-decoration: none !important;
		transition: transform 0.2s ease, filter 0.2s ease, box-shadow 0.2s ease;
	}

	.blog-content :global(.installer-btn:hover) {
		transform: translateY(-2px);
		filter: brightness(1.1);
	}

	.blog-content :global(.installer-platforms) {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: 1rem;
	}

	.blog-content :global(.installer-pill) {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.8rem;
		padding: 4px 12px;
		border-radius: 9999px;
		border: 1px solid var(--color-border);
		background-color: rgba(255, 255, 255, 0.03);
		color: var(--color-text-muted) !important;
		text-decoration: none !important;
		transition: all 0.2s ease;
	}

	.blog-content :global(.installer-pill:hover) {
		border-color: var(--color-primary);
		color: var(--color-primary) !important;
		background-color: rgba(255, 143, 64, 0.05);
	}

	/* Visual media placeholders (Video / GIF / Screenshot) */
	.blog-content :global(.media-placeholder) {
		border: 2px dashed var(--color-border);
		background-color: rgba(20, 24, 33, 0.6);
		border-radius: var(--radius-lg);
		padding: 2rem 1.5rem;
		margin: 2rem 0;
		text-align: center;
		transition: border-color 0.2s ease, background-color 0.2s ease;
	}

	.blog-content :global(.media-placeholder:hover) {
		border-color: var(--color-primary);
		background-color: rgba(20, 24, 33, 0.85);
	}

	.blog-content :global(.media-badge) {
		display: inline-block;
		font-family: "Fira Code", monospace;
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.08em;
		padding: 3px 10px;
		border-radius: var(--radius-sm);
		margin-bottom: 0.75rem;
	}

	.blog-content :global(.media-badge-video) {
		background-color: rgba(89, 194, 255, 0.15);
		color: var(--color-blue);
		border: 1px solid rgba(89, 194, 255, 0.3);
	}

	.blog-content :global(.media-badge-gif) {
		background-color: rgba(210, 166, 255, 0.15);
		color: var(--color-purple);
		border: 1px solid rgba(210, 166, 255, 0.3);
	}

	.blog-content :global(.media-badge-image) {
		background-color: rgba(170, 217, 76, 0.15);
		color: var(--color-green);
		border: 1px solid rgba(170, 217, 76, 0.3);
	}

	.blog-content :global(.media-title) {
		font-weight: 600;
		color: var(--color-text);
		font-size: 1.05rem;
		margin: 0 0 0.5rem 0;
	}

	.blog-content :global(.media-desc) {
		font-size: 0.88rem;
		color: var(--color-text-muted);
		margin: 0 0 0.75rem 0;
		line-height: 1.5;
	}

	.blog-content :global(.media-hint) {
		display: inline-block;
		font-family: "Fira Code", monospace;
		font-size: 0.75rem;
		color: var(--color-yellow);
		background-color: rgba(255, 180, 84, 0.1);
		padding: 4px 10px;
		border-radius: var(--radius-sm);
		border: 1px solid rgba(255, 180, 84, 0.2);
	}

	.blog-content :global(video) {
		max-width: 100%;
		border-radius: var(--radius-lg);
		border: 1px solid var(--color-border);
		margin: 1.5em 0;
		background: #000;
	}

	/* Callout / Alert Box */
	.blog-content :global(.callout) {
		border-radius: var(--radius-md);
		padding: 1rem 1.25rem;
		margin: 1.5em 0;
		background-color: var(--color-surface);
		border: 1px solid var(--color-border);
		border-left-width: 4px;
	}

	.blog-content :global(.callout-header) {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-weight: 700;
		font-size: 0.85rem;
		letter-spacing: 0.05em;
		margin-bottom: 0.4rem;
	}

	.blog-content :global(.callout-icon) {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.blog-content :global(.callout-icon-svg) {
		width: 1.15rem;
		height: 1.15rem;
		stroke-width: 2.25;
	}

	.blog-content :global(.callout p) {
		margin: 0;
		font-size: 0.95rem;
		color: var(--color-text);
		line-height: 1.6;
	}

	.blog-content :global(.callout-important) {
		background-color: rgba(255, 143, 64, 0.08);
		border-color: rgba(255, 143, 64, 0.25);
		border-left-color: var(--color-primary);
	}

	.blog-content :global(.callout-important .callout-header) {
		color: var(--color-primary);
	}

	.blog-content :global(.callout-note) {
		background-color: rgba(89, 194, 255, 0.08);
		border-color: rgba(89, 194, 255, 0.25);
		border-left-color: var(--color-blue);
	}

	.blog-content :global(.callout-note .callout-header) {
		color: var(--color-blue);
	}

	.blog-content :global(.callout-warning) {
		background-color: rgba(255, 180, 84, 0.08);
		border-color: rgba(255, 180, 84, 0.25);
		border-left-color: var(--color-yellow);
	}

	.blog-content :global(.callout-warning .callout-header) {
		color: var(--color-yellow);
	}

	.blog-content :global(.callout-tip) {
		background-color: rgba(170, 217, 76, 0.08);
		border-color: rgba(170, 217, 76, 0.25);
		border-left-color: var(--color-green);
	}

	.blog-content :global(.callout-tip .callout-header) {
		color: var(--color-green);
	}

	.blog-content :global(.callout-caution) {
		background-color: rgba(217, 87, 87, 0.08);
		border-color: rgba(217, 87, 87, 0.25);
		border-left-color: var(--color-error);
	}

	.blog-content :global(.callout-caution .callout-header) {
		color: var(--color-error);
	}
</style>
