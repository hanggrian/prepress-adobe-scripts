[![Figma](https://img.shields.io/badge/design-figma-f24e1e)](https://www.figma.com/community/file/1504878192282932029/)
[![Layers](https://img.shields.io/badge/showcase-layers-000)](https://layers.to/layers/cmape3icl0008l70b57p7vwr8/)
[![Pinterest](https://img.shields.io/badge/pin-pinterest-bd081c)](https://www.pinterest.com/pin/1107322627133955308/)

# Prepress Adobe Scripts

![](https://github.com/hanggrian/prepress-adobe-scripts/raw/assets/logo_ai.png "Logo for Illustrator")
![](https://github.com/hanggrian/prepress-adobe-scripts/raw/assets/logo_psd.png "Logo for Photoshop")

Collection of Illustrator and Photoshop scripts to automate repetitive tasks and
procedures of preparing final print layout.

- Multiple languages.
- Dark theme support.

[View scripts' descriptions](http://hanggrian.com/prepress-adobe-scripts/)

## Download

There are several ways to use the scripts, a recommended method is to install
them in Adobe installation paths so that they may appear in
`Menubar > File > Scripts`.

In any case, download the source code and pick one of the following solutions.

### Automatic Installation

![macOS installation.](https://github.com/hanggrian/prepress-adobe-scripts/raw/assets/install.png)

Run `install.bat` as admin (Windows) or `install.sh` with sudo (macOS).

### Manual Installation

Copy certain files and directories from this repository to your local Adobe
installation paths, usually *Applications* in macOS and *Program Files* in
Windows.

#### Illustrator

From | To
--- | ---
Content of [Illustrator Scripts] | `$APP_DIR`/Presets/`$LOCALE_CODE`/Scripts/
[.stdlib] and [.stdres] | `$APP_DIR`/Presets/`$LOCALE_CODE`/

#### Photoshop

From | To
--- | ---
Content of [Photoshop Scripts] | `$APP_DIR`/Presets/Scripts/
[.stdlib] and [.stdres] | `$APP_DIR`/Presets/

> In macOS, make sure to show all hidden files in Finder.

### No Installation

It is possible to use the scripts by drag-and-dropping JSX files directly to
Adobe apps. Just make sure to keep the entirety of root folder instead of only
`Illustrator Scripts` or `Photoshop Scripts` folders.

This is because the scripts are **not standalone,** all of them require hidden
directories to be in pre-determined locations.

## Usage

![Script menus in Illustrator.](https://github.com/hanggrian/prepress-adobe-scripts/raw/assets/menu_ai.png)
![Script menus in Photoshop.](https://github.com/hanggrian/prepress-adobe-scripts/raw/assets/menu_psd.png)

If you decide to install the scripts, they can be accessed from menubar or
[keyboard shortcuts](Actions).

[.stdlib]: .stdlib
[.stdres]: .stdres
[Illustrator Scripts]: Illustrator%20Scripts
[Photoshop Scripts]: Photoshop%20Scripts

## Building

- *WebStorm,* a JavaScript IDE with code style `JavaScript Standard Style`.
- *Visual Studio Code* with extensions:
  - [ExtendScript Debugger](https://marketplace.visualstudio.com/items?itemName=Adobe.extendscript-debug):
    used to debug scripts.
  - [ShellCheck](https://www.shellcheck.net/): Shell script linter.
- *[TableTool](https://github.com/jakob/TableTool/),* a GUI for editing CSV
  files with configurable delimiter and quote characters.

### Website

Forked from [Mediumish Jekyll Template](https://github.com/wowthemesnet/mediumish-theme-jekyll/).

- *WebStorm.*
- *Jekyll,* static sites generator.

### Assets

- **Adobe Illustrator,** used to manage vectors and generate images.
  - RGB, Screen (72 ppi), Pixels.
  - No color swatches to reduce file size.
  - Non-decimal artboard's position to generate image in exact dimension.
  - Save files in `ai` format using options:
    - `Create PDF Compatible File` if such files are directly linked to others,
      disable otherwise.
    - `Use Compression`.
  - Generate files in `png` with `Export for Screens...` using options:
    - 8-bit for resources.
    - 32-bit for others.

### References

Unofficial documentation and scripting guides.

Suite | JavaScript Reference | Guide
--- | --- | ---
JavaScript | | [JSDoc Guide](https://jsdoc.app/)
ExtendScript & ScriptUI | [Index](https://documentation.help/CS3-ScriptUI/inxx.html) | [Wiki](https://github.com/ExtendScript/wiki/wiki/) <br> [JavaScript Tools Guide](https://extendscript.docsforadobe.dev/) <br> [ScriptUI for Dummies](https://www.daube.ch/docu/fm-documentation/ExtendScript/ScriptUI_for_Dummies-%5BPeterKahrel%5D.pdf)
Illustrator | [Index](https://documentation.help/Illustrator-CS6/inxx.html) | [Scripting Guide](https://ai-scripting.docsforadobe.dev/)
Photoshop | [Index](https://documentation.help/Photoshop-CS5/inxx.html)
