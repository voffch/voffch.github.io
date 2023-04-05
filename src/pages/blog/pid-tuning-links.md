---
layout: ../../layouts/MarkdownPostLayout.astro
title: "PID tuning rules: external links"
description: "Some useful resources describing how to tune the PID controller"
pubDate: 2023-04-05
tags: ["science", "equipment", "PID", "links"]
---
I'm tired of googling the same things over and over, and since I've got a whole personal website which even I don't use, here's my personal list of useful resources for some quick and dirty Ziegler-Nichols.

[Ziegler–Nichols on Wikipedia](https://en.wikipedia.org/wiki/Ziegler%E2%80%93Nichols_method) - basically, a table with the coefficients for those who have already determined their ultimate gain and oscillation period and now just want to calculate the PID constants.

[PIDTuningClassical](https://web.archive.org/web/20110930015634/https://controls.engin.umich.edu/wiki/index.php/PIDTuningClassical) - a webarchived page with several different method explained (incl. trial-and-error) and a couple of worked out examples.

And a bunch of articles from the Opticontrol blog:

[PID Controller Algorithms](https://blog.opticontrols.com/archives/124) Watch out for these ones! Among the common pitfalls are setting the integration time instead of gain, and trying to tune some dreaded parallel PID as if it's an ideal one.

[Ziegler-Nichols Closed-Loop](https://blog.opticontrols.com/archives/131), the one with *oscillations*.

[Ziegler-Nichols Open-Loop](https://blog.opticontrols.com/archives/477), the one with a *step response*.