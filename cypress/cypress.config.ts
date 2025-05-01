import { defineConfig } from "cypress";

export default defineConfig({
    viewportWidth: 600,
    viewportHeight: 600,
    component: {
        devServer: {
            framework: "react",
            bundler: "vite",
        },
        video: false,
    },
});
