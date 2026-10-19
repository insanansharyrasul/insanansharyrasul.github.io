<script lang="ts">
	import "../../app.css";
	import Navbar from "$lib/Navbar.svelte";
	import BlogCard from "$lib/BlogCard.svelte";
	import { getAllPosts, getAllTags } from "$lib/blog";

	const posts = getAllPosts();
	const tags = getAllTags();
	const blogLinks = [
		{ href: "/", label: "Home", key: "home" },
		{ href: "/blog", label: "Blog", key: "blog" },
	];

	let activeTag: string | null = null;

	$: filtered = activeTag
		? posts.filter((p) => p.tags.includes(activeTag as string))
		: posts;

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
	<Navbar links={blogLinks} activeSection="blog" />

	<div class="max-w-5xl mx-auto px-5 py-12">
		<h1 class="text-3xl text-center mb-3 text-primary font-monda">Blog</h1>
		<p class="text-center text-text-muted italic mb-8">
			Writeups, notes, and life updates
		</p>

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

		<div
			class="grid grid-cols-1 {filtered.length === 1 ? 'max-w-2xl mx-auto' : 'md:grid-cols-2'} gap-8"
		>
			{#each filtered as post (post.slug)}
				<BlogCard {post} />
			{:else}
				<p class="text-center text-text-muted col-span-full">No posts with this tag yet.</p>
			{/each}
		</div>
	</div>
</main>
