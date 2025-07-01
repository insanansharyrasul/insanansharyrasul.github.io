/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            colors: {
                primary: '#FE8100',
                'primary-dark': '#ff6b35',
                dark: {
                    100: '#2c2c2c',
                    200: '#2a2a2a',
                    300: '#1f1f1f',
                    400: '#1a1a1a',
                    500: '#000000'
                }
            },
            fontFamily: {
                'monda': ['Monda', 'sans-serif'],
                'raleway': ['Raleway', 'sans-serif'],
                'sans': ['Raleway', 'sans-serif']
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
                    '0%, 100%': { boxShadow: '0 0 20px rgba(254, 129, 0, 0.3)' },
                    '50%': { boxShadow: '0 0 30px rgba(254, 129, 0, 0.6)' }
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
            backgroundImage: {
                'gradient-main': 'linear-gradient(135deg, #2c2c2c 0%, #332E2A 50%, #1a1a1a 100%)',
                'gradient-header': 'linear-gradient(135deg, #1a1a1a 0%, #2c2c2c 50%, #332E2A 100%)',
                'gradient-about': 'linear-gradient(135deg, #2a2a2a 0%, #1f1f1f 100%)',
                'gradient-skills': 'linear-gradient(135deg, #1a1a1a 0%, #2c2c2c 100%)',
                'gradient-footer': 'linear-gradient(135deg, #1a1a1a 0%, #000 100%)',
                'gradient-primary': 'linear-gradient(90deg, #FE8100, #ff6b35)',
                'gradient-nav-mobile': 'linear-gradient(135deg, #FE8100, #ff6b35)'
            }
        },
    },
    plugins: [],
}
