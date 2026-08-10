import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/css/carmen.css", "resources/css/alessandro.css", "resources/js/carmen.js", "resources/js/alessandro.js"],
            refresh: true,
        }),
    ],
});
