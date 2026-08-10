import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php", "./storage/framework/views/*.php", "./resources/**/*.blade.php", "./resources/**/*.js", "./resources/**/*.vue"],
    theme: {
        container: {
            screens: {
                "2xl": "1440px",
            },
        },
        extend: {
            fontFamily: {
                sans: ["proxima-nova", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                white: "#FFFFFF", //'d3d6db'
                black: "#303841",
                paper: "#d3d6db",
                primary: "#be3144", //'be3144','dc2f2f', '45171d'
                highlight: "#e84a5f",
                border: "#FFFFFF",
                /* white: "#fffdef",
                black: "#1a1831",
                paper: "#f1f1f1",
                primary: "#c50000",
                highlight: "#e70000",
                border: "#FFFFFF", */
                /* white: "#FFFFFF",
                black: "#2b2024",
                paper: "#fbf9fa",
                primary: "#a80038",
                highlight: "#fd0054",
                border: "#FFFFFF", */
            },
            spacing: {
                20: "180px",
                10: "90px",
                7: "65px",
                5: "45px",
                4: "32px",
                3: "26px",
                2: "20px",
                1: "10px",
            },
        },
    },
    plugins: [],
};
