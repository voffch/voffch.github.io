---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'Interactive conference program'
pubDate: 2024-05-04
description: "Make your scientific conference program more usable with Preact and Astro"
tags: ["webdev", "astro", "science"]
---

## The conference websites

Scientific conferences, whether they are really useful or not quite, are an indispensable part of contemporary scientific process. As with most other events that have to be prepared for in advance, the conferences use internet to distribute the information to potential participants and collect the relevant data (i.e., abstracts, contact information) from the actual participants. Nowadays, most conferences, especially the more serious *you'll-pay-hundreds-of-dollars-conference-fee* international ones, tend to make their own dedicated websites instead of relying on the mailing lists or the webpages on the organizing institutions' websites. There are two extreme cases of a conference website:

- a landing page or a collection of static pages with no server-side functionality. These websites are basically for one-way communication from the organizing committee to the participants. In this case, the actual feedback, registration process, conference fee payment, etc., have to be managed by other means, of which the most popular is good old email. Need money? Just send them the bank account details for the wire transfer. Need info? Request an email with the personal details or abstract attached. Here, various web forms such as Google Forms may also come in handy.
- a *monstrosity* website with login, password, personal participant profile and "I forgot my name" functionality. There's a strong backend here, and pretty much all things except for the technical support are handled by the website - the registration, the payments and payment options, abstract submission... sometimes even the hotel booking. Such website is the most expensive option, but it's not always the most useful one because its functionality is not always well-polished for the lack of money, time and motivation in the face of sheer complexity of the thing. Most of such complex websites are homemade. I was surprised to discover that even the [Open Conference Systems](https://pkp.sfu.ca/software/retired/) project is now retired, meaning that we've lost support for a simple-to-configure open source conference management platform (well, I haven't worked with this one, so I'm simply extrapolating from my experience with [OJS](https://pkp.sfu.ca/software/ojs/)).

Most real-life conference websites are in-between these two extremes.

## The problem with programs

Regardless of the complexity of the conference website, the one thing I haven't seen anywhere is the web version of the conference program. The program itself is the first of two official publications that remain after any conference, the other one being the book of abstracts. Most often than not, the latter is an actual published book with its own ISBN. In contrast, the program is just a booklet informing of the conference schedule and the actual presentations (their titles, the presenter's names, the whens and the wheres). Besides, the program is for you to skim through its content, marking down the most interesting presentations that you wish to attend. The problem is, most actual conference programs are distributed as some unwieldy `pdf`s only. All may be well when you're using a PC, but when you want to check something out quickly on your phone... needless to say that using a phone to search through the `pdf` program trying to find one particular presentation is rarely a joyful experience.

In other words, an adaptive and interactive web program could be a nice and convenient thing to have.

The other part of the same problem is that some more or less official (`pdf` or `docx`) downloadable version of the program is still required. Manually maintaining two versions (e.g., web and `docx`) of the same thing is boring and repetitive, and could lead to errors and discrepancies between the versions. Besides, in our case, *chemistry* is what makes matters worse. There are chemical formulae in the titles of the presentations, and formatting the indices (subscripts and superscripts) by different means in different program versions is the last thing anyone would like to do.

## The solution

So, since [our conference's website](https://conferenceusu.github.io) is static, I came up with [this](https://conferenceusu.github.io/prog/) fun little project - a web version of the conference program that takes its data from the `docx` program file when the website is built. The interactivity is provided by a simple filter form that allows selecting the particular conference sections and searching through the titles and coauthors. In addition, you can check (as in "check a checkbox") some of the presentations (e.g., those you find most interesting) so as to display only those.

The tech stack is:

- [Astro](https://astro.build/), because, while I can't say I really *know* it, I've used it previously, if only to build this very website. It allows building *mostly static* websites with optional "islands" of dynamic content - just what we need in this case. Astro is not the only SSG that does this, and while it may not be as lean and simplistic (in a good way) as, e.g., [11ty](https://www.11ty.dev), it's a decently quick and easy-to-use SSG.
- [mammoth.js](https://www.npmjs.com/package/mammoth) to parse the input `docx` file.
- [Preact](https://preactjs.com/) - a fast and small React alternative for the *dynamic* part of the website.

The process is as follows: during the build time, the code between the `---` fences in the astro template parses the `docx` program, generating a large JS object with the relevant info about the presentations. This object is then used by the Preact island to generate and display the web program on the client device. And that's pretty much all there is to it.

I admit that my filterable conference program has the basic functionality of a [shopping cart example](https://react.dev/learn/thinking-in-react) that is used to teach the newbie React developers. Still, despite its simplicity, we found it to be quite useful. I can't believe that such things or maybe even their more complex alternatives are not yet ubiquitous, especially what with our modern *everything needs a website and a mobile phone app or two* modern IT culture.

### The requirement

Since generating the web program involves parsing the `docx` file, the latter should be well-structured. The headers should possess the header style, the lists should be styled as lists and not as sets of paragraphs, and so on. Our version of the program relies on the coauthor lists styled in bold, so, e.g., an extra space with the bold typeface, while invisible in the office suite, could mess with the structure of the `docx` parser output. Thus, the person formatting the `docx` program should be extra careful. However, I think this is a small price to pay for the convenience of having a nice web program. Besides, having a nice-looking and well-structured `docx` is not something to regret as well.

### The unsolved issue

Since the website is totally static and intends to remain so, there's no login functionality, so the personalized filter settings and the checked presentations are stored within the user browser's [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage). The question is, what's the best way of identifying the checked (selected) presentation? I see two possible options. The first one (currently employed) is by using the presentation's index number just as it appears in the program. The second involves using the hashes, e.g., those built from the title strings, as the unambiguous presentation IDs.

The problem is that conference programs are not quite fixed and are prone to last-minute adjustments: presentations get added or cancelled at the last moment or even transferred between the sections. This kind of adjustment messes with the order in which the presentations appear in the program. So, it may seem as if hashes would work better than simple indexes for identifying the presentations. However, the titles and the coauthor lists may also change, which will mess with the hash of the corresponding presentation. Thus, hashes are not the panacea either. What can we do? Automatically generate some kind of *program changes history* that will alter the user's saved presentation selection considering the program's most recent version? This seems too complicated. However, I don't see a simpler solution at the moment.