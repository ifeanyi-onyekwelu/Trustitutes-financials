/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#0C3A30",
                secondary: "#103E2F",
                bg: "#FFFAEB",
                alternate: "#9EDD05",
                text: "#082720",
            },
        },
    },
    plugins: [],
};
