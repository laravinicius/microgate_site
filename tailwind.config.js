/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./*.{html,js}", "./components/**/*.html", "./js/**/*.js"],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                brand: {
                    dark: '#1f1f1f',
                    light: '#F5F5F7'
                },
                metallic: {
                    dark: '#181818'
                }
            },
            backgroundImage: {
                'neon': 'linear-gradient(145deg, #ffffff 0%, #e5e7eb 45%, #9ca3af 100%)'
            }
        },
    },
    plugins: [],
}
