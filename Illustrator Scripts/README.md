Illustrator Scripts
===================

Scripts menu are prefixed with [⒈](https://www.compart.com/en/unicode/search?q=full+stop) unicode instead of regular `1.`.
This is mainly because `1. Object` directory will translate to `1.` submenu.

General Purpose
---------------

### Resize/Reorder Artboards

<img src="../art/ai_resize_artboards.gif" width="480" height="240"/><img src="../art/ai_reorder_artboards.gif" width="480" height="240"/>

Bulk resize all artboards.
Reorder artboards based on their title/position.

### Copy to Artboards

![](../art/ai_copy_to_artboards.gif)

Duplicate selection to each artboards.

### Resize/Rasterize Each

<img src="../art/ai_resize_each.gif" width="480" height="240"/><img src="../art/ai_rasterize_each.gif" width="480" height="240"/>

<table><tr><td>

|   | Transform Each | *Resize Each* |
| - | :------------: | :-----------: |
| Target | Multiple | Multiple |
| Method | By percentage | By actual value |
| Recursive | &cross; | &check; |

</td><td>

|   | Rasterize | *Rasterize Each* |
| - | :-------: | :--------------: |
| Target | Single | Multiple |
| Prioritize | Resolution | Bounds |
| Recursive | &cross; | &check; |

</td></tr></table>

Prepress
--------

### Relink Same/Multipage

![](../art/ai_relink_multipage.gif)

Relinking multiple items has always been a pain in the ass in Illustrator.

|   | Relink | *Relink Same* | *Relink Multipage* |
| - | :----: | :-----------: | :----------------: |
| Operation | One-by-one | At once | At once |
| Input file | Single PDF<br/>Single image | Single PDF<br/>Single image | Single PDF<br/>Multiple images<br/>Multiple PDFs & images
| Ordering | Layer index | &cross; | Layer index<br/>X/Y position

### Step and Repeat

![](../art/ai_step_and_repeat.gif)

User of CorelDRAW would be familiar with this feature.

### Add Trim Marks

![](../art/ai_add_trim_marks.gif)

Though natively supported with `Menubar > Object > Create Trim Marks`, they are extremely limited in configuration.

|   | Create Trim Marks | *Add Trim Marks* |
| - | :---------------: | :--------------: |
| Trim marks around Clip Group | Content size | Clipping size |
| Trim marks around Path | Stroke | Fill |
| Customization | &cross; | &check; |
| Multiple targets | &cross; | &check; |

### Numerize

![](../art/ai_numerize.gif)

Iterate through selected texts and retype them to index. There is also alphabet suffix support which can be useful for naming duplex impositions.

### Impose

![](../art/ai_impose.gif)

Supports imposing `N-Up`, `Perfect Bound` and `Saddle Stitch`.

Known Issue
-----------

* EditText units validator is unstable, entering operator like `+` will crash the app.
* `Links/Relink *` - In document with large number of artboards scattered through multiple row positions, only first row of selection is detected.
* `Impose/*` - When artboards exceed canvas size, units will break causing oversized `PlacedItem`.