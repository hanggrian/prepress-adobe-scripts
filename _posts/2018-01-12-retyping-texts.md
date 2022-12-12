---
layout: post
title: Retyping Texts
author: ai
categories: [Illustrator Scripts]
tags: [general, prepress]
image: https://github.com/hendraanggrian/prepress-adobe-scripts/raw/assets/screenshots/ai_types_numerize.png
---

Change content of selected texts.

## Retype

![Retype texts.](https://github.com/hendraanggrian/prepress-adobe-scripts/raw/assets/screenshots/ai_types_retype.png)

Retype the same content to all texts.

Texts with multiple fonts are not yet supported, as the rest of characters will
use the first character's font.

## Numerize

![Numerize texts.](https://github.com/hendraanggrian/prepress-adobe-scripts/raw/assets/screenshots/ai_types_numerize.png)

Iterate all texts and change the content to current index. There are `Digits`
and `Stops at` configuration which are optional and can be left empty.

### Digits

![Iteration of numerize text with digits.](../images/samples/retypingtexts_numerize_digits.png)

Will append leading n-number of zeroes.

An example of this feature is voucher/invoice code.

### Stops at

![Iteration of numerize texts with stops at.](../images/samples/retypingtexts_numerize_stopsat.png)

Instead of iterating the index first, the script will take account of alphabet
suffix. The index will only be iterated when current alphabet has reached
destined character, at that point the alphabet will reset back to `A`.

An example of this feature is captioning a duplex printing layout.
