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
            fontFamily: {
                'monda': ['Monda', 'sans-serif'],
                'raleway': ['Raleway', 'sans-serif'],
                'sans': ['Raleway', 'sans-serif'],
                'mono': ['Fira Code', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace']
            },
            animation: {
                'blink': 'blink 1s infinite',
            },
            keyframes: {
                blink: {
                    '0%, 50%': { opacity: '1' },
                    '51%, 100%': { opacity: '0' }
                },
            },
        },
    },
    plugins: [],
}
