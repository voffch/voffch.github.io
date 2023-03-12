---
layout: ../../layouts/MarkdownPostLayout.astro
title: Visual acuity
description: "Some thoughts on the topic of visual acuity (this is also an accompanying post to the test on this site)"
pubDate: 2023-03-12
tags: ["health", "vision", "webdev", "ha ha"]
---
This is a satellite post to [that page with the test](/vision#vision-checker).

## What is it?

The term itself is basically a "how good your vision is", or how well you can distinguish small details. Much more small details than I ~~can see~~ dare to describe here you can find [on Wikipedia](https://en.wikipedia.org/wiki/Visual_acuity).

### What about the test?

The chart itself is a [LogMAR chart](https://en.wikipedia.org/wiki/LogMAR_chart), the abbreviation standing for (decimal) Logarithm of the Minimum Angle of Resolution. This is probably the most *geometric* visual acuity metric. Good acuity is thought to correspond to the ability of resolving details as small as 1 minute of visual angle, or LogMAR = 0.0. In the chart, the numbers to the right of the letter rows are LogMARs.

Now, latin letters have quite a few details, so a person with zero LogMAR shold be able to distinguish letters subtending 5 minutes at the eye. Half of this value, 2.5', constitutes an acute angle (at the eye) in the right triangle, whose sides are half-height of the letter and the distance to the letter. Knowing LogMAR (basically, the angle), the distance and basic trigonometry, we can calculate the height of the letter that a person with this LogMAR would be able to distinguish. If you didn't understand a thing, here's an [optometrists' explanation of visual acuity](https://www.tedmontgomery.com/the_eye/acuity.html) with examples and pictures, more detailed and more coherent.

As for the technical realization of my chart, it uses absolute CSS units (mm) to set the font sizes for different LogMARs depending on the distance entered. In fact, only one size (for LogMAR = 1.0, the highest row) is calculated on-the-fly with JS as
```js
fontSizeInMm = 2 * Math.tan((Math.pow(10, 1.0) * 2.5) / 60 / 180 * Math.PI) * (distanceInCm * 10);
```
This `fontSizeInMm` is taken as `1em` in the chart container, and the coefficients setting the sizes of the other letters in CSS were (for reasons unknown) generated in Python:
```python
logmar = lambda x : 2 * math.tan((10**x * 2.5) / 60 / 180 * math.pi)
logmar_multipliers = [logmar(i/10) / logmar(1.0) for i in range(10, -4, -1)]
for i, lm in enumerate(logmar_multipliers):
    print(f'.sloan-row:nth-of-type({i + 1}) {{')
    print(f'  font-size: {lm}em;')
    print('}\n')
```

Why did I take 70 cm as the default distance? Well, it was loosely based on the assumption of the distance between you and the screen being about the length of an outstretched hand. The latter, in turn, was based on some [anthropometric data](https://multisite.eos.ncsu.edu/www-ergocenter-ncsu-edu/wp-content/uploads/sites/18/2016/06/Anthropometric-Detailed-Data-Tables.pdf), which you can check out as well if you ever wondered what is the average length of different body parts. I'll save you the disappointment, though: there is no *that* body part in those tables 😅.

The letters in the rows were taken from some real vision test chart. The font I used is called **Sloan** and is a special font intended for vision testing. It is distributed by a CC license and is available from <i class="bi bi-github"></i> [Denis G. Pelli's repo](https://github.com/denispelli/Eye-Chart-Fonts), where a description of the font can also be found.

### Disclaimer

I guess I don't need to reiterate (but I'm still doing it) that my test is not medical and not diagnostic. If your vision is poor (mine is), you don't need a random webpage to tell you so (I don't). Besides, if you're curious, there are better tests out there. For example, you can take a look at [this one by Zeiss](https://www.zeiss.com/vision-care/us/better-vision/vision-screening.html).

Please also be aware of the *limitations of modern technology*: not all digital screens are expected to be able to render the low letter sizes well, especially if the distance entered is small.

### Other references

[About diopters and acuity](https://www.iblindness.org/3564/converting-vision-between-diopters-and-20xx/)

More about acuity tests:

- Ricci F, Cedrone C, Cerulli L. Standardized measurement of visual acuity. Ophthalmic Epidemiol. 1998 Mar;5(1):41-53. doi: [10.1076/opep.5.1.41.1499](https://doi.org/10.1076/opep.5.1.41.1499). PMID: 9575537.

- [Evaluation Of Visual Acuity](https://www.statpearls.com/ArticleLibrary/viewarticle/35714)