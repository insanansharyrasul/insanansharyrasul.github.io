import { marked } from 'marked';
import hljs from 'highlight.js/lib/core';
import python from 'highlight.js/lib/languages/python';
import markdown from 'highlight.js/lib/languages/markdown';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import bash from 'highlight.js/lib/languages/bash';
import { parseFrontmatter, parseTags, slugify, type PostSummary } from './blog';

hljs.registerLanguage('python', python);
hljs.registerLanguage('markdown', markdown);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('bash', bash);

export interface TocItem {
	id: string;
	text: string;
	level: number;
}

export interface FullPost extends PostSummary {
	html: string;
	toc: TocItem[];
}

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

function highlightCode(raw: string, lang: string): string {
	if (lang && hljs.getLanguage(lang)) return hljs.highlight(raw, { language: lang }).value;
	return esc(raw);
}

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

function buildFullPost(path: string, raw: string): FullPost {
	const slug = path.split('/').pop()!.replace(/\.md$/, '');
	const { meta, body } = parseFrontmatter(raw);

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
	const codeHtml = rawHtml.replace(
		/<pre><code(?: class="language-([\w-]+)")?>([\s\S]*?)<\/code><\/pre>/g,
		(m: string, lang: string | undefined, code: string) =>
			`<pre><code${lang ? ` class="language-${lang}"` : ''}>${highlightCode(decode(code), lang ?? '')}</code></pre>`
	);

	const alertHtml = codeHtml.replace(
		/<blockquote>\s*<p>\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\](?:\s*<br\s*\/?>)?([\s\S]*?)<\/p>\s*<\/blockquote>/gi,
		(_, type: string, content: string) => {
			const t = type.toUpperCase();
			const icon = alertIcons[t] ?? fallbackIcon;
			const label = alertLabels[t] ?? t;
			return `<div class="callout callout-${t.toLowerCase()}"><div class="callout-header"><span class="callout-icon">${icon}</span> <span class="callout-title">${label}</span></div><p>${content.trim()}</p></div>`;
		}
	);

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

export function getFullPost(slug: string): FullPost | undefined {
	for (const [path, raw] of Object.entries(modules)) {
		if (path.endsWith(`/${slug}.md`)) {
			return buildFullPost(path, raw);
		}
	}
	return undefined;
}
