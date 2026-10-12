import { error } from '@sveltejs/kit';
import { getAllPosts, getNeighbours, getPost } from '$lib/blog';
import type { PageLoad } from './$types';

export const prerender = true;

export function entries() {
	return getAllPosts().map((p) => ({ slug: p.slug }));
}

export const load: PageLoad = ({ params }) => {
	const post = getPost(params.slug);
	if (!post) throw error(404, 'Post not found');
	const { newer, older } = getNeighbours(params.slug);
	const slim = (p?: typeof post) =>
		p && { slug: p.slug, title: p.title, excerpt: p.excerpt, dateLabel: p.dateLabel };
	return { post, newer: slim(newer), older: slim(older) };
};
