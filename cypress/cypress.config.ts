import { defineConfig } from "cypress";

export default defineConfig({
    viewportWidth: 600,
    viewportHeight: 600,
    component: {
        devServer: {
            framework: "create-react-app",
            bundler: "webpack",
        },
        video: false,
    },
});
