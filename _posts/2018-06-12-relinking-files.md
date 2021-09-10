---
layout: post
title: "Relinking Files (... F7)"
author: ai
categories: [ Illustrator Scripts ]
tags: [ general ]
image: assets/images/ai_relinking_files.png
---

Linking large number of files has always been a pain in the ass since Illustrator only lets you do it one-by-one. All the scripts in `Links` sub-directory provide solution to execute once.

Change Page (F7)
----------------

A faster script to change links' PDF page, because it doesn't open up a file picker.

Relink Same (⇧ F7)
------------------

![](../assets/images/ai_relinking_files_same.png)

Opens up a file picker to select a single image or PDF file. In case of PDF file, an additional panel is shown to specify page and cropping type.

Relink Multipage (⌘ F7)
-----------------------

![](../assets/images/ai_relinking_files_multipage.png)

Opens up a file picker to select multiple image and/or PDF files. There are 3 scenarios here:
1. Multiple images - iterate files.
2. Single PDF - iterate pages.
3. Combination of images and PDFs - iterate files, always use first page when PDF is found.