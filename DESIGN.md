# Design System Documentation (`DESIGN.md`)

## 1. Visual Overview
A modern, developer-focused dark palette featuring deep slate backgrounds (`#0D1017`) and high-contrast vibrant accents. Optimized for Svelte and SvelteKit applications with accessible contrast ratios and structured spacing scales.

---

## 2. Token Specifications

### Color Tokens

#### Surface & Layout
| Token | Hex Value | Role / Usage |
| :--- | :--- | :--- |
| `bg` | `#0D1017` | Viewport/body background |
| `surface` | `#141821` | Cards, modals, dropdowns, sidebars |
| `border` | `#343B4D` | Card borders, dividers, input outlines |

#### Typography Colors
| Token | Hex Value | Role / Usage |
| :--- | :--- | :--- |
| `text` | `#BFBDB6` | Primary body text and headings |
| `text-muted` | `#828E9F` | Secondary descriptions, metadata, placeholders |
| `text-on-accent` | `#0D1017` | High-contrast text placed over bright accent buttons |

#### Accent & Semantic Palette
| Token | Hex Value | Role / Usage |
| :--- | :--- | :--- |
| `primary` | `#FF8F40` | Main CTA buttons, active states, key highlights |
| `blue` | `#59C2FF` | Links, focus states, informational elements |
| `green` | `#AAD94C` | Success alerts, status indicators, positive metrics |
| `yellow` | `#FFB454` | Warnings, pending badges, highlight tags |
| `purple` | `#D2A6FF` | Feature highlights, tags, code syntax accent |
| `error` | `#D95757` | Error states, destructive actions, form validation |

---

### Border Radius Tokens

| Token | Pixel Value | Rem Equivalent | Target Components |
| :--- | :--- | :--- | :--- |
| `sm` | `4px` | `0.25rem` | Badges, tooltips, code chips |
| `md` | `8px` | `0.5rem` | Buttons, form controls, small cards |
| `lg` | `12px` | `0.75rem` | Modals, main cards, container panels |

---

### Spacing Scale

Built on an 8px base grid:

| Token | Pixels | Rem Equivalent | Recommended Application |
| :--- | :--- | :--- | :--- |
| `1` | `8px` | `0.5rem` | Tight element padding, inline gap |
| `2` | `16px` | `1.0rem` | Form padding, button horizontal inset |
| `3` | `24px` | `1.5rem` | Default card padding, component stack gap |
| `4` | `32px` | `2.0rem` | Section gaps, header margin |
| `5` | `40px` | `2.5rem` | Large block spacing |
| `6` | `48px` | `3.0rem` | Layout grid gutters |
| `8` | `64px` | `4.0rem` | Section margins |
| `9` | `72px` | `4.5rem` | Large section dividers |
| `12` | `96px` | `6.0rem` | Hero block top/bottom margins |

---

## 3. Implementation in Svelte

### Global CSS Custom Variables (`src/app.css`)

```css
:root {
  /* Surface & Text */
  --color-bg: #0d1017;
  --color-surface: #141821;
  --color-border: #343b4d;
  --color-text: #bfbdb6;
  --color-text-muted: #828e9f;
  --color-text-on-accent: #0d1017;

  /* Accents & Status */
  --color-primary: #ff8f40;
  --color-blue: #59c2ff;
  --color-green: #aad94c;
  --color-yellow: #ffb454;
  --color-purple: #d2a6ff;
  --color-error: #d95757;

  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;

  /* Spacing Scale */
  --space-1: 8px;
  --space-2: 16px;
  --space-3: 24px;
  --space-4: 32px;
  --space-5: 40px;
  --space-6: 48px;
  --space-8: 64px;
  --space-9: 72px;
  --space-12: 96px;
}

body {
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  margin: 0;
}
```

---

### Tailwind CSS Configuration (`tailwind.config.js`)

If using Tailwind CSS in your Svelte project, configure theme extensions:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        bg: '#0D1017',
        surface: '#141821',
        border: '#343B4D',
        text: '#BFBDB6',
        'text-muted': '#828E9F',
        'text-on-accent': '#0D1017',
        primary: '#FF8F40',
        blue: '#59C2FF',
        green: '#AAD94C',
        yellow: '#FFB454',
        purple: '#D2A6FF',
        error: '#D95757',
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
      },
      spacing: {
        '1': '8px',
        '2': '16px',
        '3': '24px',
        '4': '32px',
        '5': '40px',
        '6': '48px',
        '8': '64px',
        '9': '72px',
        '12': '96px',
      }
    }
  },
  plugins: []
};
```

---

## 4. Example Components

See live components: `src/lib/TechCard.svelte`, `src/lib/ProjectCard.svelte`, `src/lib/BlogCard.svelte`.

---

## 5. Accessibility Guidelines

* **Text Contrast:** Primary text (`#BFBDB6`) on canvas (`#0D1017`) and surface (`#141821`) meets WCAG AAA standards for readability.
* **Accent Buttons:** Always pair vibrant fill accents (`primary`, `yellow`, `green`) with `text-on-accent` (`#0D1017`) for high-contrast legibility.
* **Interactive Focus:** Keyboard focus state must always be indicated using `--color-blue` (`#59C2FF`) with standard `outline-offset`.