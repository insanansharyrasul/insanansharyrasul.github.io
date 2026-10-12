---
title: Hello, Blog
excerpt: How to write a new post — markdown, code blocks, tables, and auto TOC
date: 2025-01-12
tags: [meta]
cover: /images/foto2.jpg
---

## Writing a Post

Drop a `.md` file in `src/posts/`. The filename becomes the URL: `my-post.md` → `/blog/my-post`. Frontmatter at the top sets the card:

```md
---
title: My Post Title
excerpt: One-line summary shown on the card
date: 2025-01-12
tags: [reversing, CTF]
cover: /images/foto1.jpg
---
```

Put cover images in `static/` (e.g. `static/blog/cover.png` → `cover: /blog/cover.png`).

## Code Blocks

Fenced blocks render in Fira Code with ligatures (`->`, `=>`, `!=` join up). Just write:

````md
```python
def solve(xs: list[int]) -> int:
    return sum(x for x in xs if x != 0)
```
````

Which renders as:

```python
def solve(xs: list[int]) -> int:
    return sum(x for x in xs if x != 0)
```

Every block gets a copy button automatically.

## Tables

GitHub-style tables just work:

| Command    | Meaning              |
| ---------- | -------------------- |
| `## Title` | TOC entry (level 2)  |
| `### Sub`  | TOC indented entry   |
| `![alt](url)` | image in the post |

## Table of Contents

Every `##` and `###` heading becomes a TOC entry on the post page — no manual list needed. Then rebuild (`npm run build`) and push; GitHub Pages does the rest.
