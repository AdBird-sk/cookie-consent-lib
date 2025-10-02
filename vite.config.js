import path from "path";
import react from "@vitejs/plugin-react";
import {defineConfig} from "vite";


export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src")
        }
    },
    build: {
        lib: {
            entry: "src/index.js",
            name: "CookieConsentLib",
            fileName: (format) => `cookie-consent-lib.${format}.js`,
            formats: ["es", "umd"]
        },
        rollupOptions: {
            external: ["react", "react-dom"],
            output: {
                globals: {
                    react: "React",
                    "react-dom": "ReactDOM"
                }
            }
        }
    },
    root: ".",
    publicDir: "public",
    server: {
        open: "/demo/index.html"
    }
})
