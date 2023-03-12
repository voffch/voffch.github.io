---
layout: ../../layouts/MarkdownPostLayout.astro
title: Making anchor links in Astro
description: "Explaining how to attach the HTML anchor links to the headers of Markdown posts in Astro SSG"
pubDate: 2023-03-11
tags: ["astro", "webdev"]
---
This is a fancy feature useful for referencing fragments of long posts (i.e., not the ones you are likely to encounter on this site 😉). It is often encountered on different websites these days, and implementing it may not be obvious for a beginner, although I must admit that the main difficulty for me was finding the right part of the docs where this is described. So,

## See this one? <i class="bi bi-arrow-right"></i>

Autogenerating this kind of links requires [Markdown Plugins](https://docs.astro.build/en/guides/markdown-content/#markdown-plugins) such as [the one described here](https://docs.astro.build/en/guides/markdown-content/#customizing-a-plugin). Go ahead and 
```shell
npm install rehype-autolink-headings
```
The next step is configuring the `astro.config.mjs`. You don't need a separate `rehype-slug` for this to work because Astro generates its own IDs for markdown headers; however, these IDs have to be "fed" to the rehype plugin. In the import section of `astro.config.mjs`, you'll need 
```js
import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
```
and in the export - something like
```js
export default defineConfig({
  ...
  markdown: {
    ...
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
  ...
})
```
It is required that `rehypeHeadingIds` be the first element of the `rehypePlugins` array. The `rehype-autolink-headings` options are described in the <i class="bi bi-github"></i> [plugin docs](https://github.com/rehypejs/rehype-autolink-headings). Basically, I'm `append`ing the anchor to (after) the headers (only 2nd and 3rd ones), and adding some custom classes to the anchor's `<a>`. The last two classes are Bootstrap-specific.

The default elements appended to the markdown post headers now are as such:
```html
<a aria-hidden="" tabindex="-1" class="anchor-link text-secondary ms-2" href=...>
  <span class="icon icon-link"></span>
</a>
```
They are invisible though - by default there's no content in the links because *you've got no style*. Let's now amend this, e.g., in the respective markdown post layout file (note that `is:global` is necessary here):
```html
<style is:global>
  .anchor-link {
    text-decoration: none;
    opacity: 0.5;
    transition: all 0.2s;
  }
  .anchor-link:hover {
    opacity: 1.0;
  }
  .icon-link::before {
    content: '#';
  }
</style>
```
And that's all.