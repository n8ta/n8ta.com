---
layout: post
title:  "Convert between markdown and pdf on macOS"
date:   2020-10-01 09:00:00 +0700
categories: [macOS, homebrew, pandoc, pdf, markdown]
---

I write my homework in markdown and my professors usually want pdfs.
 Here's what I do

## Install dependencies

```bash
# Install homebrew from https://brew.sh/
brew install pandoc
brew install basictex

# Add /Library/TeX/texbin to your path (varies by shell, here's how for bash) so pandoc can find pdflatex
export PATH=$PATH:/Library/TeX/texbin
````

## Do it
```bash
pandoc -f markdown-implicit_figures -t pdf file.md > file.pdf
```

## Explanation 

`-f` means *from*

You can also just use markdown but your images will be moved around like in latex which I generally don't want.

`-t` means *to*

`>` redirect output to file.pdf

<a href='https://brew.sh/' target='_blank'>homebrew</a>

This is the main macOS package manager. If you do any programming on macOS you'll need it eventually. Follow the instruction on their homepage to install.

<a href='https://pandoc.org/' target='_blank'>pandoc</a>
> "If you need to convert files from one markup format into another, pandoc is your swiss-army knife..."

<a href='https://tug.org/mactex/morepackages.html' target='_blank'>basictex</a>

basictex provides pdflatex, a lib needed by pandoc to convert markdown -> pdf

