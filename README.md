Prepress Adobe Scripts
======================
Adobe Illustrator and Photoshop scripts tailored for printing purposes.
Tested only on latest Adobe suite.
* Prioritize CMYK and high resolution (300 ppi) settings.
* Shared libraries across Adobe apps.
* Kotlin-esque code style.

> Photoshop scripts are currently in preview.

Usage
-----
These scripts are **not standalone**, all of them requires hidden directories to be in pre-determined location. This is why it is recommended to put them in Adobe installation paths.

#### Automatic Installation
Run `scripts-patcher.bat` as admin (Windows) or `scripts-patcher.sh` with sudo (Mac).

#### Manual Installation
Manually copy & paste all files and folders within `Scripts` directory to `{App installation path}/Presets/{your locale}/Scripts`.

The scripts can then be accessible from `Menu Bar > File > Scripts`.

Resources
---------
General guide:
* [ExtendScript Wiki](https://github.com/ExtendScript/wiki/wiki)
* [JavaScript Tools Guide](https://wwwimages2.adobe.com/content/dam/acom/en/devnet/scripting/pdfs/javascript_tools_guide.pdf)
* [Illustrator Scripting](https://www.adobe.com/devnet/illustrator/scripting.html)
* [Photoshop Scripting](https://www.adobe.com/devnet/photoshop/scripting.html)

JavaScript Reference:
* [ScriptUI Reference](http://jongware.mit.edu/scriptuihtml/Sui/index_1.html)
* [Illustrator Reference](http://jongware.mit.edu/iljscs6html/iljscs6/inxx.html)
* [Photoshop Reference](http://jongware.mit.edu/pscs5js_html/psjscs5/inxx.html)