---
layout: post
title:  "Convert between markdown and pdf on macOS"
date:   2020-10-01 09:00:00 +0700
categories: [macOS, homebrew, pandoc, pdf, markdown]
---

I write my homework in markdown and my professor want pdfs. Here's what I do

## Install dependencies
[pandoc](https://pandoc.org/)
> "If you need to convert files from one markup format into another, pandoc is your swiss-army knife. Pandoc can convert between the following formats:"

[basictex](https://tug.org/mactex/morepackages.html)
basictex provides pdflatex, a lib needed by pandoc to convert markdown -> pdf

```bash
brew install pandoc
brew cask install basictex
````

## Do it
```bash
pandoc -f markdown-implicit_figures -t pdf file.md > file.pdf
```

`-f` means *from*

You can also just use markdown but your images will be moved around like in latex which I generally don't want.

`-t` means *to*

`>` redirect output to file.pdf