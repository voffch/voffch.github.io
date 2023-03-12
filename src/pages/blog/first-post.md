---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'My First Post'
pubDate: 2023-03-09
description: "This is a post about this site and why I'm starting it"
tags: ["astro", "ssg", "webdev"]
---

This is going to be either my personal dark corner of the web, or the same thing, but stale. What exactly it will become depends on my perseverance, which isn't generally considered to be great. We'll see.

## Rationale

I can't say I *enjoy* web development, but I *like* it from time to time. However, web development without putting things online feels kinda fake. And so, I needed a personal space, an online playground, so to speak. Hence, this website. Besides, I feel I have (or will have) a few thoughts to share with the web, I' like to practice writing, and social networks won't do, because I'm *antisocialnetworks*. Hence, the blog.

## The choice of tools

### Why Astro

Well, I don't need any server-side functionality right now, and I'm too poor to afford paid hosting, so an <abbr title="Static Site Generator">SSG</abbr> was an obvious choice. Recently, I decided to try a frontend library, chose [React](https://reactjs.org/), and was immediately fascinated with the concepts of reusable components (of which my first, ahem, "app" used none anyway) and state. Therefore, my first choice was [Gatsby JS](https://gatsbyjs.com/). And then I was a bit overwhelmed by the complexity of the thing. GraphQL? What? B.. b.. but all I wanted was some static HTML with interactive pieces now and then. I needed something much simpler.

The next choice was [Eleventy](https://11ty.dev/). Though I didn't choose it for this project because I think I found more suitable solution in Astro, I still think Eleventy is cool. It's small (smol!), fast, flexible and adaptive. All in all, I highly recommend at least trying Eleventy.

In the end, I guess my primary reason for choosing [Astro](https://astro.build/) over Eleventy was its out-of-the-box support for partial hydration and `mdx`, and (it may sound strange) opinionated folder structure and template language. When the choices are limited, you tend to spend less time choosing. Besides, I liked `astro`'s `jsx`-like language more than I liked `nunjucks`.

### Why Bootstrap

At least in the first version of this site I use [Bootstrap](https://getbootstrap.com) for a css library - aside from its popularity and the fact that it is probably overkill for this site, Bootstrap's default typography looks great and I didn't want to *play designer* just then. I don't think I'm an especially skilled designer anyway. I wanted a set of easily implementable pre-configured components that you can throw at the page on demand. So, next time, [Tailwind CSS](https://tailwindcss.com/), next time...

It is, most probably, not the best one, but my idiosyncratic way of using Bootstrap (v. 5.x) with Astro is as follows:

1. `npm install bootstrap`

2. Copy all `@import`s from `node_modules/bootstrap/bootstrap.scss` into the `global.scss` file that is imported in the front matter in the Astro's base layout that all other pages inherit

3. Add "`bootstrap/scss`" to all `@import`s so that, e.g.,

```scss
@import "root";
```

becomes

```scss
@import "bootstrap/scss/root";
```

4. Copy the following into the `global.js` file:

```js
import 'bootstrap/js/dist/alert';
import 'bootstrap/js/dist/button';
import 'bootstrap/js/dist/carousel';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/offcanvas';
import 'bootstrap/js/dist/popover';
import 'bootstrap/js/dist/scrollspy';
import 'bootstrap/js/dist/tab';
import 'bootstrap/js/dist/toast';
import 'bootstrap/js/dist/tooltip';
```

5. Make sure that `global.js` is imported in the base layout, e.g., in my case, with `global.js` inside the `scripts` folder in Astro's `src`, it looks like the following (at the end of the `<body>`)

```html
<script>import "../scripts/global.js"</script>
```

And that's all. By commenting out the unused js and scss imports in the respective global files, I can now avoid including the unnecessary features into the compiled js and css used in production.