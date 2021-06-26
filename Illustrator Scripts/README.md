Illustrator Scripts
===================

General Purpose
---------------

### Resize/Reorder Artboards

Bulk resize all artboards.
Reorder artboards based on their title/position.

<img src="../art/ai-resize-artboards.gif" width="480" height="240"/><img src="../art/ai-reorder-artboards.gif" width="480" height="240"/>

### Copy to Artboards

Duplicate selection to each artboards.

![](../art/ai-copy-to-artboards.gif)

### Resize/Rasterize Each

`Context Menu > Transform > Transform Each...` can only modify size by scale while this script accepts target size.
`Menu > Object > Rasterize...` will group selected items and rasterize it once while this script rasterize each item.

<img src="../art/ai-resize-each.gif" width="480" height="240"/><img src="../art/ai-rasterize-each.gif" width="480" height="240"/>

Prepress
--------

### Add Trim Marks

A direct replacement to `Menu > Object > Create Trim Marks`, which works great but extremely limited in configuration. There is also multi-target support as seen below.

![](../art/ai-add-trim-marks.gif)

### Step and Repeat

User of CorelDRAW would be familiar with this feature.

![](../art/ai-step-and-repeat.gif)

### Relink Same/Multipage

Relink multiple items at once, which somehow is not natively supported. Use `Relink Same` to set the same image/PDF page to all targets, or `Relink Multipage` to iterate images/PDF pages.

![](../art/ai-relink-multipage.gif)

### Numerize

Iterate through selected texts and retype them to index. There is also alphabet suffix support which can be useful for naming duplex impositions.

![](../art/ai-numerize.gif)

### Impose

Supports imposing `N-Up`, `Perfect Bound` and `Saddle Stitch`.

![](../art/ai-impose.gif)

Known Issue
-----------

* EditText units validator is unstable, entering operator like `+` will crash the app.
* `Links/Relink *` - In document with large number of artboards scattered through multiple row positions, only first row of selection is detected.
* `Impose/*` - When artboards exceed canvas size, units will break causing oversized `PlacedItem`.