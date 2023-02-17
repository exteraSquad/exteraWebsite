const {fontFamily} = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        fontFamily: {
            sans: ["var(--font-onest)", ...fontFamily.sans],
            display: ["var(--font-cal-sans)", ...fontFamily.sans],
        },
        extend: {
            colors: {
                primary: {
                    50: "#fff6f7",
                    100: "#FBEEEC",
                    200: "#FAC4C6",
                    500: "#F54142",
                }
            }
        }
    },
    plugins: [],
}
