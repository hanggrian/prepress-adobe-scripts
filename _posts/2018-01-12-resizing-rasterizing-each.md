---
layout: post
title: "Resizing and Rasterizing Each (... F5)"
author: ai
categories: [ Illustrator Scripts ]
tags: [ general ]
image: assets/images/ai_resizing_rasterizing_each.png
---

Both of these scripts have an option to execute recursively, which means that it will go through the children of all groups and clipping masks.

Resize Each (⇧ ⌘ F5)
--------------------

Later version of Illustrator actually have `Context Menu > Transform Each` that may as well be used to resize items individually. However, it only accepts scale in percentage as opposed to actual unit size with `Resize Each`.

Rasterize Each
--------------

The problem with `Menubar > Object > Rasterize...` is that they consider selection as single entity and convert them to single image. `Rasterize Each`, in contrast, will create individual image while also maintaining original dimension.