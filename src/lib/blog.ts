export const AUTHOR = {
	name: 'insanansharyrasul',
	displayName: 'Insan Anshary Rasul',
	avatar: '/icons/logo.png'
};

export interface PostSummary {
	slug: string;
	title: string;
	excerpt: string;
	date: string;
	dateLabel: string;
	tags: string[];
	cover?: string;
	readTime: number;
}

export type Post = PostSummary;

export function parseFrontmatter(raw: string): { meta: Record<string, string>; body: string } {
	if (!raw.startsWith('---')) return { meta: {}, body: raw };
	const end = raw.indexOf('\n---', 3);
	if (end === -1) return { meta: {}, body: raw };
	const head = raw.slice(3, end).trim();
	const body = raw.slice(end + 4).replace(/^\n/, '');
	const meta: Record<string, string> = {};
	for (const line of head.split('\n')) {
		const i = line.indexOf(':');
		if (i === -1) continue;
		meta[line.slice(0, i).trim()] = line
			.slice(i + 1)
			.trim()
			.replace(/^['"]|['"]$/g, '');
	}
	return { meta, body };
}

export function parseTags(v: string | undefined): string[] {
	if (!v) return [];
	return v
		.replace(/^\[|\]$/g, '')
		.split(',')
		.map((t) => t.trim().replace(/^['"]|['"]$/g, ''))
		.filter(Boolean);
}

export function slugify(s: string): string {
	return s
		.toLowerCase()
		.replace(/<[^>]*>/g, '')
		.replace(/[^a-z0-9\s-]/g, '')
		.trim()
		.replace(/\s+/g, '-');
}

// Vite 6: query raw import
const modules = import.meta.glob('../posts/*.md', {
	query: '?raw',
	import: 'default',
	eager: true
}) as Record<string, string>;

function buildSummary(path: string, raw: string): PostSummary {
	const slug = path.split('/').pop()!.replace(/\.md$/, '');
	const { meta, body } = parseFrontmatter(raw);
	const words = body.split(/\s+/).filter(Boolean).length;
	const date = meta.date ?? '';
	const dateLabel = date
		? new Date(date + 'T00:00:00').toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			})
		: '';

	return {
		slug,
		title: meta.title ?? slug,
		excerpt: meta.excerpt ?? '',
		date,
		dateLabel,
		tags: parseTags(meta.tags),
		cover: meta.cover || undefined,
		readTime: Math.max(1, Math.ceil(words / 200))
	};
}

const posts: PostSummary[] = Object.entries(modules)
	.map(([path, raw]) => buildSummary(path, raw))
	.sort((a, b) => (a.date < b.date ? 1 : -1));

export function getAllPosts(): PostSummary[] {
	return posts;
}

export function getAllTags(): string[] {
	return [...new Set(posts.flatMap((p) => p.tags))].sort();
}

export function getPostSummary(slug: string): PostSummary | undefined {
	return posts.find((p) => p.slug === slug);
}

// Neighbours for prev/next nav (newest first: prev = newer, next = older)
export function getNeighbours(slug: string): { newer?: PostSummary; older?: PostSummary } {
	const i = posts.findIndex((p) => p.slug === slug);
	if (i === -1) return {};
	return {
		newer: i > 0 ? posts[i - 1] : undefined,
		older: i < posts.length - 1 ? posts[i + 1] : undefined
	};
}
