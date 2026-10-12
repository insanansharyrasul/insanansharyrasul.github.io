<script lang="ts">
	import '../../app.css';
	import BlogCard from '$lib/BlogCard.svelte';
	import { getAllPosts, getAllTags } from '$lib/blog';

	const posts = getAllPosts();
	const tags = getAllTags();

	let activeTag: string | null = null;

	$: filtered = activeTag ? posts.filter((p) => p.tags.includes(activeTag as string)) : posts;

	function toggle(tag: string | null) {
		activeTag = activeTag === tag ? null : tag;
	}
</script>

<svelte:head>
	<title>Blog — Insan Anshary Rasul</title>
	<meta
		name="description"
		content="Blog by Insan Anshary Rasul — writeups, notes, and life updates on systems, mobile, and automation."
	/>
</svelte:head>

<main class="min-h-screen bg-bg text-text">
	<nav class="flex px-[5%] py-4 justify-between items-center bg-surface border-b border-border">
		<a href="/" class="flex items-center gap-3 no-underline text-text">
			<img src="/icons/header_icon.svg" alt="home" class="h-8 transition-all duration-300 hover:scale-110" />
		</a>
		<div class="flex gap-6">
			<a href="/" class="nav-link text-text no-underline text-base hover:text-primary transition-colors" style="font-family: 'Raleway', sans-serif;">Home</a>
			<a href="/blog" class="nav-link text-primary no-underline text-base" style="font-family: 'Raleway', sans-serif;">Blog</a>
		</div>
	</nav>

	<div class="max-w-5xl mx-auto px-5 py-12">
		<h1 class="text-3xl text-center mb-3 text-primary font-monda">Blog</h1>
		<p class="text-center text-text-muted italic mb-8">Writeups, notes, and life updates</p>

		{#if tags.length}
			<div class="flex flex-wrap justify-center gap-2 mb-10">
				<button
					class="pill"
					class:active={activeTag === null}
					on:click={() => toggle(null)}
				>
					All
				</button>
				{#each tags as tag}
					<button
						class="pill"
						class:active={activeTag === tag}
						on:click={() => toggle(tag)}
					>
						# {tag}
					</button>
				{/each}
			</div>
		{/if}

		<div class="flex flex-col gap-6">
			{#each filtered as post (post.slug)}
				<BlogCard {post} />
			{:else}
				<p class="text-center text-text-muted">No posts with this tag yet.</p>
			{/each}
		</div>
	</div>
</main>


