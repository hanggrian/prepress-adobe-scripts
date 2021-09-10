---
layout: post
title: "Add Trim Marks (⇧ F4)"
author: ai
categories: [ Illustrator Scripts ]
tags: [ prepress ]
image: assets/images/ai_add_trim_marks.png
featured: true
hidden: true
---

Although natively supported with `Menubar > Object > Create Trim Marks`, this script behaves  differently:
- With paths and compound paths, the dimension of stroke is ignored.
- With clipped items, the clipping path dimension is used.

### Single Target

![](../assets/images/ai_add_trim_marks_single.png)

Treats selection as one dimension and create trim marks around it.

### Multiple Target

![](../assets/images/ai_add_trim_marks_multiple.png)

Taking account the dimension of all selected items (grouped items count as 1) and create multiple trim marks around outer bounds.

This feature is particularly useful after [Step and Repeat](../step-and-repeat).