---
layout: post
title: "Relinking Files"
author: ai
categories: [Illustrator Scripts]
tags: [general]
image: https://github.com/hendraanggrian/prepress-adobe-scripts/raw/assets/screenshots/ai_links_relinkmultipage.png
---

Linking large number of files has always been a pain in the ass since Illustrator only lets you do it one-by-one.
All the scripts in `Links` sub-directory provide solution to execute once.

## Change Page

![Change links page.](https://github.com/hendraanggrian/prepress-adobe-scripts/raw/assets/screenshots/ai_links_changepage.png)

A faster script to change links' PDF page, because it doesn't open up a file picker.

## Relink Same

![Relink links to same file.](https://github.com/hendraanggrian/prepress-adobe-scripts/raw/assets/screenshots/ai_links_relinksame.png)

Opens up a file picker to select a single image or PDF file. In case of PDF file,
an additional panel is shown to specify page and cropping type.

![Flow of relink same.](../images/samples/ai_links_relinksame.png)

## Relink Multipage

![Relink links to multiple files/pages.](https://github.com/hendraanggrian/prepress-adobe-scripts/raw/assets/screenshots/ai_links_relinkmultipage.png)

Opens up a file picker to select multiple image and/or PDF files. There are 3 scenarios here:
1. Multiple images - iterate files.
2. Single PDF - iterate pages.
3. Combination of images and PDFs - iterate files, always use first page when PDF is found.

![Flow of relink multiple.](../images/samples/ai_links_relinkmultipage.png)
