[![build](https://img.shields.io/travis/com/hendraanggrian/prepress-adobe-scripts)](https://travis-ci.com/hendraanggrian/prepress-adobe-scripts)

Prepress Adobe Scripts
======================

![](images/logo_ai.png)
![](images/logo_psd.png)

Essential Illustrator and Photoshop scripts for commercial printshop.
While most of these scripts are general purpose, some are heavily prepress-focused like trim marks, dielines and imposition.
Tested only on latest Adobe suite.

Install
-------

![](images/menu_ai.png)
![](images/menu_psd.png)

These scripts are **not standalone**, all of them require hidden directories to be in pre-determined locations.
This is why it is recommended to put them in Adobe installation paths, and access them from menu bar.

### Automatic Installation

![](images/install.png)

Run `install.bat` as admin (Windows) or `install.sh` with sudo (macOS).

### Manual Installation

Find **Scripts** directory in your local Adobe installation paths:
* Illustrator - `$PATH_TO_APP/Presets/$LOCALE_CODE/Scripts`.
* Photoshop - `$PATH_TO_APP/Presets/Scripts`.

Now copy these:
* Content of `Illustrator/Photoshop Scripts` to **Scripts**.
* Following directories to parent directory of **Scripts**:
  * `.stdlib`
  * `.stdres`
  * `.stdres-light`
  * `.support-files`

> In macOS, make sure to show all hidden files in Finder.

Resources
---------

ExtendScript & SUI:
* [*Official ExtendScript Wiki*](https://github.com/ExtendScript/wiki/wiki)
* [*Official JavaScript Tools Guide*](https://wwwimages2.adobe.com/content/dam/acom/en/devnet/scripting/pdfs/javascript_tools_guide.pdf)
* [Scripting Guide](https://extendscript.docsforadobe.dev)
* [ScriptUI for Dummies](https://adobeindd.com/view/publications/a0207571-ff5b-4bbf-a540-07079bd21d75/92ra/publication-web-resources/pdf/scriptui-2-16-j.pdf)

Illustrator:
* [*Official Scripting*](https://www.adobe.com/devnet/illustrator/scripting.html)
* [Scripting Guide](https://ai-scripting.docsforadobe.dev)

Photoshop:
* [*Official Scripting*](https://www.adobe.com/devnet/photoshop/scripting.html)
