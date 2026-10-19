import { marked } from 'marked';
import hljs from 'highlight.js/lib/core';
import python from 'highlight.js/lib/languages/python';
import markdown from 'highlight.js/lib/languages/markdown';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import bash from 'highlight.js/lib/languages/bash';


hljs.registerLanguage('python', python);
hljs.registerLanguage('markdown', markdown);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('bash', bash);


export const AUTHOR = {
	name: 'insanansharyrasul',
	displayName: 'Insan Anshary Rasul',
	avatar: '/icons/logo.png'
};

export interface TocItem {
	id: string;
	text: string;
	level: number;
}

export interface Post {
	slug: string;
	title: string;
	excerpt: string;
	date: string;
	dateLabel: string;
	tags: string[];
	cover?: string;
	readTime: number;
	html: string;
	toc: TocItem[];
}


function parseFrontmatter(raw: string): { meta: Record<string, string>; body: string } {
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

function parseTags(v: string | undefined): string[] {
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

// Vite 6: `as:'raw'` removed, use query/import form
const modules = import.meta.glob('../posts/*.md', {
	query: '?raw',
	import: 'default',
	eager: true
}) as Record<string, string>;

const decode = (s: string): string =>
	s
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&#39;|&apos;/g, "'")
		.replace(/&amp;/g, '&');

const esc = (s: string): string =>
	s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// highlight.js (real grammars); unknown language → plain-escaped, no auto-detect
function highlightCode(raw: string, lang: string): string {
	if (lang && hljs.getLanguage(lang)) return hljs.highlight(raw, { language: lang }).value;
	return esc(raw);
}

function buildPost(path: string, raw: string): Post {
	const slug = path.split('/').pop()!.replace(/\.md$/, '');
	const { meta, body } = parseFrontmatter(raw);

	// TOC from lexer (single pass, no renderer override needed;
	// ids are assigned client-side in the same order)
	const seen: Record<string, number> = {};
	const toc: TocItem[] = [];
	for (const tok of marked.lexer(body)) {
		if (tok.type === 'heading' && (tok.depth === 2 || tok.depth === 3)) {
			const base = slugify(tok.text) || 'section';
			seen[base] = (seen[base] ?? 0) + 1;
			toc.push({
				id: seen[base] > 1 ? `${base}-${seen[base]}` : base,
				text: tok.text,
				level: tok.depth
			});
		}
	}

	const rawHtml = marked.parse(body, { breaks: true }) as string;
	// Highlight fenced blocks (marked only adds language-xxx, no colors).
	const codeHtml = rawHtml.replace(
		/<pre><code(?: class="language-([\w-]+)")?>([\s\S]*?)<\/code><\/pre>/g,
		(m: string, lang: string | undefined, code: string) =>
			`<pre><code${lang ? ` class="language-${lang}"` : ''}>${highlightCode(decode(code), lang ?? '')}</code></pre>`
	);

	// Transform GitHub-style alerts: > [!NOTE], > [!IMPORTANT], > [!WARNING], etc.
	const alertIcons: Record<string, string> = {
		IMPORTANT:
			'<svg class="callout-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
		NOTE: '<svg class="callout-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>',
		WARNING:
			'<svg class="callout-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
		TIP: '<svg class="callout-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>',
		CAUTION:
			'<svg class="callout-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>'
	};
	const fallbackIcon =
		'<svg class="callout-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="17" x2="12" y2="22"/><path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"/></svg>';
	const alertLabels: Record<string, string> = {
		IMPORTANT: 'PENTING',
		NOTE: 'CATATAN',
		WARNING: 'PERINGATAN',
		TIP: 'TIPS',
		CAUTION: 'PERHATIAN'
	};
	const alertHtml = codeHtml.replace(
		/<blockquote>\s*<p>\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\](?:\s*<br\s*\/?>)?([\s\S]*?)<\/p>\s*<\/blockquote>/gi,
		(_, type: string, content: string) => {
			const t = type.toUpperCase();
			const icon = alertIcons[t] ?? fallbackIcon;
			const label = alertLabels[t] ?? t;
			return `<div class="callout callout-${t.toLowerCase()}"><div class="callout-header"><span class="callout-icon">${icon}</span> <span class="callout-title">${label}</span></div><p>${content.trim()}</p></div>`;
		}
	);

	// Inject TOC ids server-side so anchors exist in prerendered HTML.
	// override — version-proof, no API coupling.
	let n = 0;
	const html = alertHtml.replace(/<h([23])>/g, (m, lvl: string) => {
		const t = toc[n++];
		return t ? `<h${lvl} id="${t.id}">` : m;
	});
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
		readTime: Math.max(1, Math.ceil(words / 200)),
		html,
		toc
	};
}

const posts: Post[] = Object.entries(modules)
	.map(([path, raw]) => buildPost(path, raw))
	.sort((a, b) => (a.date < b.date ? 1 : -1));

export function getAllPosts(): Post[] {
	return posts;
}

export function getAllTags(): string[] {
	return [...new Set(posts.flatMap((p) => p.tags))].sort();
}

export function getPost(slug: string): Post | undefined {
	return posts.find((p) => p.slug === slug);
}

// Neighbours for prev/next nav (newest first: prev = newer, next = older)
export function getNeighbours(slug: string): { newer?: Post; older?: Post } {
	const i = posts.findIndex((p) => p.slug === slug);
	if (i === -1) return {};
	return {
		newer: i > 0 ? posts[i - 1] : undefined,
		older: i < posts.length - 1 ? posts[i + 1] : undefined
	};
}
