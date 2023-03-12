import { defineConfig } from 'astro/config';

// https://astro.build/config
import preact from "@astrojs/preact";

// https://astro.build/config
// import tailwind from "@astrojs/tailwind";

import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

// https://astro.build/config
import sitemap from "@astrojs/sitemap";

// https://astro.build/config

// https://astro.build/config
export default defineConfig({
  site: 'https://voffch.github.io',
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      // Choose from Shiki's built-in themes (or add your own)
      // https://github.com/shikijs/shiki/blob/main/docs/themes.md
      theme: 'github-light',
      // Add custom languages
      // Note: Shiki has countless langs built-in, including .astro!
      // https://github.com/shikijs/shiki/blob/main/docs/languages.md
      langs: [],
      // Enable word wrap to prevent horizontal scrolling
      wrap: true
    },
    rehypePlugins: [rehypeHeadingIds, [rehypeAutolinkHeadings, {
      behavior: 'append',
      test: ['h2', 'h3'],
      properties: {
        ariaHidden: true,
        tabIndex: -1,
        class: 'anchor-link text-secondary ms-2'
      }
    }]]
  },
  integrations: [preact(), sitemap()] //, tailwind()
});