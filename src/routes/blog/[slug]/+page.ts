import { error } from '@sveltejs/kit';
import { getAllPosts, getNeighbours, type PostSummary } from '$lib/blog';
import { getFullPost } from '$lib/blogContent';
import type { PageLoad } from './$types';

export const prerender = true;

export function entries() {
	return getAllPosts().map((p) => ({ slug: p.slug }));
}

export const load: PageLoad = ({ params }) => {
	const post = getFullPost(params.slug);
	if (!post) throw error(404, 'Post not found');
	const { newer, older } = getNeighbours(params.slug);
	const slim = (p?: PostSummary) =>
		p && { slug: p.slug, title: p.title, excerpt: p.excerpt, dateLabel: p.dateLabel };
	return { post, newer: slim(newer), older: slim(older) };
};
