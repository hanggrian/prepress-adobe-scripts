---
layout: post
title: "Add Trim Marks"
author: ai
categories: [ Illustrator Scripts ]
tags: [ prepress ]
image: https://github.com/hendraanggrian/prepress-adobe-scripts/raw/assets/screens/ai_objects_addtrimmarks.png
featured: true
hidden: true
---

Although natively supported with `Menubar > Object > Create Trim Marks`, this script behaves  differently:
- With paths and compound paths, the dimension of stroke is ignored.
- With clipped items, the clipping path dimension is used.

## Single Target

![Add trim marks around single target.](../images/samples/ai_objects_addtrimmarks_single.png)

Treats selection as one dimension and create trim marks around it.

## Multiple Target

![Add trim marks around multiple targets.](../images/samples/ai_objects_addtrimmarks_multiple.png)

Taking account the dimension of all selected items (grouped items count as 1) and
create multiple trim marks around outer bounds.

This feature is particularly useful after [Step and Repeat](../step-and-repeat).
