import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import partytown from "@astrojs/partytown";
import node from "@astrojs/node";
import { SITE } from "./src/config.ts";

// https://astro.build/config
export default defineConfig({
    site: SITE.url,
    image: {
    // If you don't want to optimize images during the BUILD process,
    // you can open this comment. It will significantly reduce the build time but won't optimize any images anymore.
    // service: passthroughImageService(),
    },
    integrations: [partytown(), mdx(), sitemap(), tailwind(), react(), (await import("@playform/compress")).default({
        CSS: true,
        HTML: true,
        Image: false,
        JavaScript: true,
        SVG: true,
        Logger: 2,
    })],
    markdown: {
        shikiConfig: {
            theme: "github-light",
            themes: {
                light: "github-light",
                dark: "github-dark",
            },
            wrap: false,
        },
    },
    devToolbar: {
        enabled: false,
    },
    prefetch: true,
    output: "server",
    adapter: node({
        mode: "standalone",
    }),
    build: {
        assets: "dist",
    },
});
