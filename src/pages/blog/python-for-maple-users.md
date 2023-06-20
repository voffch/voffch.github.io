---
layout: ../../layouts/MarkdownPostLayout.astro
title: "Python for Maple users"
description: "A short intro to Python for Maplesoft Maple users"
pubDate: 2023-06-21
tags: ["science", "scripts", "python", "maple", "thermodynamics"]
---
Where I currently work, we've used Maplesoft Maple for various, but chiefly symbolic, calculations for as long as I recall. Primarily, that's for historical reasons - [one man](https://orcid.org/0000-0002-1593-0994) learned how to use it, tauhgt everyone else, everybody can now use it to some extent... You know how it is - if your instrument of choice is a hammer and if you know how to hammer, then everything's a nail. While Maple is a decent computer algebra system (CAS), being one of the oldest ones, it's main drawbacks for us right now are the cost (it's *pRoPRiEtOrY*) and the fact that the optimization functionality in our version of it, well... Let's just say it could be better. There's not even a Levenberg–Marquardt implemented.

I dabbled in Python on and off, mostly off, for years. Literally. It's more than ten years since I audited a MIT's MOOC about Python 2 on EdX, way before this platform monetized itself to the gills. Passed with 80/100, being not exactly sober most of the time. Whereas my, ahem, mastery never got past a very basic level, I've always been fascinated by the simplicity and power of the language.

Now, owing to the large community's unceasing interest, Pythonic ecosystem is getting better all the time. Many people make it an instrument of choice for the science-related computations. I was pleasantly surprised to discover that the `sympy` package for symbolic computations coupled with the Jupyter notebooks turn your browser into a poor man's CAS with the dormant capabilities of a general-purpose programming language. And don't even start me on `numpy` and `scipy`. In other words, even if we're not talking of replacing Maple just now, Python looks like a perfect software suite to greatly augment one's abilities to perform various computational tasks.

The problem is that learning anything new takes time. At the same time, if you know something, than it's easier to understand something similar. While there are some cross-language introductions for the general-purpose programming languages (*psst! come here! I'll teach you some JavaScript in 3 minutes if you know C already*), I haven't found anything like this for the Maple-Python language pair. I only found some Reddit posts with the titles like "Why the hell Maple" and the answers in the general direction of "because you're probably in Canada". Being not in Canada, as well as not at all proficient at either Maple or Python, I jumped to the task...

...and so here comes my short tutorial - an introduction to performing the scientific-calculator-like computations in Python for those who are acquainted with the Maple syntax. The tutorial is somewhat a bit *heavily* thermodynamics-oriented, but what can you do?.. There are two Jupyter notebooks, depending on your language of choice, hosted as github gists:

[English version](https://gist.github.com/voffch/a9b11e74dbbf3959200deaf2d63025b8)

[Русскоязычная версия](https://gist.github.com/voffch/3136be8cbc3313096abd88f1ded6f9c6)

Both versions contain the same code with the same comments. The output is removed from the notebooks, but, in any case, they are intended to be interactive. If you don't want to install Python, you can use [Google Colab](https://colab.research.google.com).

So, if you're interested, check out the notebook, run the code, play, experiment, have fun! I hope you'll find all this at least a tiny bit useful.