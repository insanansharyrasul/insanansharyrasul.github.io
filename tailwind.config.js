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
                'fadeInUp': 'fadeInUp 1s ease-out 0.5s both',
                'pulse-custom': 'pulse 2s infinite',
                'glow': 'glow 2s infinite',
                'float': 'float 2s ease-in-out infinite',
                'typing': 'typing 3.5s steps(30, end)',
                'blink': 'blink 1s infinite',
                'scroll-down': 'scroll-down 2s infinite',
                'shimmer': 'shimmer 2s infinite',
                'gradientShift': 'gradientShift 10s ease infinite',
                'modalSlideIn': 'modalSlideIn 0.3s ease'
            },
            keyframes: {
                fadeInUp: {
                    'from': { opacity: '0', transform: 'translateY(50px)' },
                    'to': { opacity: '1', transform: 'translateY(0)' }
                },
                glow: {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(255, 143, 64, 0.3)' },
                    '50%': { boxShadow: '0 0 30px rgba(255, 143, 64, 0.6)' }
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' }
                },
                typing: {
                    'from': { width: '0' },
                    'to': { width: '100%' }
                },
                blink: {
                    '0%, 50%': { opacity: '1' },
                    '51%, 100%': { opacity: '0' }
                },
                'scroll-down': {
                    '0%': { opacity: '0', transform: 'rotate(45deg) translate(-20px, -20px)' },
                    '50%': { opacity: '1' },
                    '100%': { opacity: '0', transform: 'rotate(45deg) translate(20px, 20px)' }
                },
                shimmer: {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(100%)' }
                },
                gradientShift: {
                    '0%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                    '100%': { backgroundPosition: '0% 50%' }
                },
                modalSlideIn: {
                    'from': { transform: 'scale(0.7) translateY(50px)', opacity: '0' },
                    'to': { transform: 'scale(1) translateY(0)', opacity: '1' }
                }
            },
        },
    },
    plugins: [],
}
