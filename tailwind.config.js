const {fontFamily} = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        fontFamily: {
            sans: ["var(--font-sans)", ...fontFamily.sans],
            display: ["var(--font-display)", ...fontFamily.sans],
        },
        extend: {
            colors: {
                primary: {
                    50: "#fff6f7",
                    100: "#FBEEEC",
                    200: "#FAC4C6",
                    400: "#F76768",
                    500: "#F54142",
                }
            },
            borderRadius: {
                '4xl': '2rem',
                '5xl': '2.5rem',
                '6xl': '3rem',
            },
            animation: {
                marquee: 'marquee 3s linear infinite',
            },
            keyframes: {
                marquee: {
                    from: { transform: 'rotate(var(--tw-rotate)) translate(0%, var(--tw-translate-y))' },
                    to: { transform: 'rotate(var(--tw-rotate)) translate(var(--tw-marquee-length), var(--tw-translate-y))' },
                }
            }
        }
    },
    plugins: [
        require('@tailwindcss/typography'),
        plugin(function({ matchUtilities, theme }) {
            matchUtilities(
                {
                    'word-spacing': (value) => ({
                        wordSpacing: value
                    }),
                },
                { values: theme('wordSpacing') }
            )
        }, {
            theme: {
                wordSpacing: {
                    'normal': 'normal',
                    1: '0.5rem',
                    2: '1rem',
                    4: '2rem',
                    6: '3rem',
                    8: '4rem',
                }
            }
        }),
        plugin(function({ matchUtilities, theme }) {
            matchUtilities(
                {
                    'marquee-length': (value) => ({
                        '--tw-marquee-length': value
                    }),
                },
                { values: theme('marqueeLength') }
            )
        }, {
            theme: {
                marqueeLength: {
                    '0': '0%'
                }
            }
        })
    ],
}
