# Prepress Adobe Scripts

![Logo for Illustrator.](https://github.com/hendraanggrian/prepress-adobe-scripts/raw/assets/logo_ai.png)
![Logo for Photoshop.](https://github.com/hendraanggrian/prepress-adobe-scripts/raw/assets/logo_psd.png)

Collection of Illustrator and Photoshop scripts to automate repetitive tasks and
procedures of preparing final print layout.

- Multiple languages.
- Dark theme support.

Head to [repository website](http://hendraanggrian.com/prepress-adobe-scripts/)
for description of the scripts.

## Download

There are several ways to use the scripts, a recommended method is to install
them in Adobe installation paths so that they may appear
in `Menubar > File > Scripts`.

In any case, download the source code and pick one of the following solutions.

### Automatic Installation

![macOS installation.](https://github.com/hendraanggrian/prepress-adobe-scripts/raw/assets/install.png)

Run `install.bat` as admin (Windows) or `install.sh` with sudo (macOS).

### Manual Installation

Copy certain files and directories from this repository to your local Adobe
installation paths, usually *Applications* in macOS and *Program Files* in
Windows.

#### Illustrator

| From | To |
| --- | --- |
| Content of [Illustrator Scripts] | `$APP_DIR`/Presets/`$LOCALE_CODE`/Scripts/ |
| [.stdlib] and [.stdres] | `$APP_DIR`/Presets/`$LOCALE_CODE`/ |

#### Photoshop

| From | To |
| --- | --- |
| Content of [Photoshop Scripts] | `$APP_DIR`/Presets/Scripts/ |
| [.stdlib] and [.stdres] | `$APP_DIR`/Presets/ |

> In macOS, make sure to show all hidden files in Finder.

### No Installation

It is possible to use the scripts by drag-and-dropping JSX files directly to
Adobe apps. Just make sure to keep the entirety of root folder instead of
only `Illustrator Scripts` or `Photoshop Scripts` folders.

This is because the scripts are **not standalone**, all of them require hidden
directories to be in pre-determined locations.

## Usage

![Script menus in Illustrator.](https://github.com/hendraanggrian/prepress-adobe-scripts/raw/assets/menu_ai.png)
![Script menus in Photoshop.](https://github.com/hendraanggrian/prepress-adobe-scripts/raw/assets/menu_psd.png)

If you decide to install the scripts, they can be accessed from menubar
or [keyboard shortcuts](Actions).

[.stdlib]: .stdlib
[.stdres]: .stdres
[Illustrator Scripts]: Illustrator%20Scripts
[Photoshop Scripts]: Photoshop%20Scripts
