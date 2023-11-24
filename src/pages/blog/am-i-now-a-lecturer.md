---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'Education, quote unquote'
pubDate: 2023-11-24
description: "And here I'm ranting about my feeble attempts at teaching"
tags: ["science", "ssg", "webdev", "personal"]
---

I haven't posted anything in a while, have I? Weeeeelll, that's in part because I've been turned, all of a sudden, into a non-tenure-track supplementary extra adjunct *person of teaching*.

> —You're a lecturer, Harry!
> 
> —I'm a what?
> 
> —A lecturer!
> 
> —F* me if I know what "a lecturer" means, right?

Sure, I'm my own worst enemy because I agreed to this a couple of years back on following conditions:

1. I gave my formal consent to be listed, *on paper*, among the teaching staff for the newly created English-language master's degree program that my superiors had to invent out of ~~nowhere~~ a similar Russian-language program so as to fulfill the terms of their grant agreement;
2. All the supposed lecturers were led to believe that it is highly unlikely that this master's degree program will ever be realized;
3. And, "even if it were," we were promised to be warned in advance so as to have some time to prepare.

Needless to say, conditions 2 and 3 were flagrantly violated. Here I am. Having no prior teaching experience in any language (being an acting lab assistant for several years doesn't really count), I have to do this in English. If I flatter myself a bit, I could say that I can say this and that in English, but speaking for long periods of time on distant matters is quite another matter, being a thing of acquired experience and innate talent.

So now, having basically dropped everything that I was doing up to the start of this term, I'm supposedly teaching a small course on "Synthesis of materials and nanomaterials" to some master’s students. And here's something about this course. Sure, it has its counterpart in Russian, but the thing is, the Russian version of it, to put it mildly, hasn't really been liked by the students. The existing course materials, while better than nothing, were maybe OK for the mid-2000s when the course was developed. As of now, if you ask me, they require significant overhaul. The course definitely needs improvements, such as more examples, more illustrations and more science-ish content, to be of more interest to the public. All this requires the very same thing that that I don't have - time. Why don't I have enough time? Simply because I haven't been given an advance warning that all of it will actually be needed. It's quite an experience to have to develop the course, find (there isn't any textbook on this kind of thing, mind) and understand the material that you'll have to deliver, and deliver it in your non-native language, all at the same time.

Or I'm probably just not clever enough to do these things properly and quickly. True, but in this case I have to compensate the lack of talent by the extra effort, which requires time, which I don't have.

The situation is complicated by the fact that the overall current state of affairs all around me is not conducive to successful educational process. Sounds vague, doesn't it? To be more precise, how about "underpaid and overworked lecturers have to teach something to uninterested students who know that they won't be expelled no matter what and thus don't really put much effort in learning, while the said lecturers have to carry on doing various research projects that are terribly underfinanced or not financed at all"?

All of the above doesn't make teaching quite enticing, especially if you don't like teaching for teaching's sake. Like, "thanks for the opportunity to spend a lot of time on something useless, guys, nah, I'm not interested". And you can't really do anything, whatever it is, without being a tiny bit interested in it. You spend half the time procrastinating, forcing yourself to start doing something. And so I invented a little something, of which I've been thinking from day 1, but it was a suggestion of my colleague's that really got me going. This something is: let's make a webpage and put at least some of the course materials in there for the use of anyone. Building webpages is fun, and so it should give me a bit of much needed interest.

It sure is rather silly of me to create even more work for myself to do if I don't even have enough time for the work that I have to do. And I agree that it is a bit vain of me to say, after being a lecturer for two months and four lectures, "oh, let's compile some *useful* course materials". What can I say? I've not been teaching for long, but I've been a practicing materials scientist, however mediocre, for about 15 years. Let's see if *this* really amounts to anything in my case, shall we?

And this is how [voffch.github.io/materials](https://voffch.github.io/materials/) was born. In this case, for the static website generator (SSG), I wanted something simple and heavily content-oriented, where I wouldn't have to spend time web designing. Hence, a specialized SSG for technical documentation seemed a reasonable choice. After trying [MkDocs](https://www.mkdocs.org/) with appropriately named [Material](https://squidfunk.github.io/mkdocs-material/) theme, I immediately fell in love. It's fast, at least for now, while there aren't many pages on the website. If you already have Python, MkDocs can be installed quickly. You don't have to pull half a terabyte of node packages into the project folder for everything to work. Bells and whistles such as math support, dark theme or [lunr](https://lunrjs.com/)-powered client-side search work with minimal or no configuration, almost out-of-the-box. All I've tried so far worked as expected.

All that remains is for me to be persistent in inventing the course materials and feeding them into the SSG, hoping that, some day, at least some of it could be of use to someone.