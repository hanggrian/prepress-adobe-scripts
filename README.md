[![build](https://img.shields.io/travis/com/hendraanggrian/prepress-adobe-scripts)](https://travis-ci.com/hendraanggrian/prepress-adobe-scripts)
[![license](https://img.shields.io/github/license/hendraanggrian/prepress-adobe-scripts)](https://github.com/hendraanggrian/prepress-adobe-scripts/blob/main/LICENSE)

Prepress Adobe Scripts
======================

Essential Illustrator and Photoshop scripts for commercial printshop. While most of these scripts are general purpose, some are heavily prepress-focused like trim marks and imposition.

Illustrator Scripts
-------------------

Head over to [Illustrator Scripts](Illustrator%20Scripts) for more.

### Add Trim Marks

A direct replacement to `Object > Create Trim Marks`, which works great but extremely limited in configuration. There is also multi-target support as seen below.

![](art/ai-add-trim-marks.gif)

### Relink Same/Multipage

Relink multiple items at once, which somehow is not natively supported. Use `Relink Same` to set the same image/PDF page to all targets, or `Relink Multipage` to iterate images/PDF pages.

![](art/ai-relink-multipage.gif)

### Impose/*

Supports imposing `N-Up`, `Perfect Bound` and `Saddle Stitch`.

![](art/ai-impose.gif)

Photoshop Scripts
-----------------

Head over to [Photoshop Scripts](Photoshop%20Scripts) for more.

### Add Bleed

Create a layout guide around image and distribute bleed to all documents.

![](art/psd-add-bleed.gif)

Install
-------

These scripts are **not standalone**, all of them require hidden directories to be in pre-determined location. This is why it is recommended to put them in Adobe installation paths, and access them from menu bar.

![](art/scripts-menu-illustrator.png)
![](art/scripts-menu-photoshop.png)

### Automatic Installation

Run `patch-scripts.bat` as admin (Windows) or `patch-scripts.sh` with sudo (macOS).

![](art/patch-scripts.png)

### Manual Installation

Find **Scripts** directory in your local Adobe installation paths:
* Illustrator - `$PATH_TO_APP/Presets/$LOCALE_CODE/Scripts`.
* Photoshop - `$PATH_TO_APP/Presets/Scripts`.

> In macOS, make sure to show all hidden files in Finder.

Now copy two things:
* Content of `Illustrator/Photoshop Scripts` to **Scripts**.
* `.stdlib` to parent directory of **Scripts**.

Resources
---------

ExtendScript & SUI:
* [**Official ExtendScript Wiki**](https://github.com/ExtendScript/wiki/wiki)
* [**Official JavaScript Tools Guide**](https://wwwimages2.adobe.com/content/dam/acom/en/devnet/scripting/pdfs/javascript_tools_guide.pdf)
* [ScriptUI for Dummies](https://adobeindd.com/view/publications/a0207571-ff5b-4bbf-a540-07079bd21d75/92ra/publication-web-resources/pdf/scriptui-2-16-j.pdf)
* [ScriptUI JavaScript Reference](http://jongware.mit.edu/scriptuihtml/Sui/index_1.html)

Illustrator:
* [**Official Scripting**](https://www.adobe.com/devnet/illustrator/scripting.html)
* [Scripting Guide](https://ai-scripting.docsforadobe.dev/)
* [CS6 JavaScript Reference](http://jongware.mit.edu/iljscs6html/iljscs6/inxx.html)

Photoshop:
* [**Official Scripting**](https://www.adobe.com/devnet/photoshop/scripting.html)
* [CS5 JavaScript Reference](http://jongware.mit.edu/pscs5js_html/psjscs5/inxx.html)
