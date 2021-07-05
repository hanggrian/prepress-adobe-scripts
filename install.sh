#!/bin/bash
# Mac executable to sync scripts to Adobe installation paths.

END=[0m
BOLD=[1m
UNDERLINE=[4m
RED=[91m
GREEN=[92m
YELLOW=[93m

# Check mac
if [ $(uname) != Darwin ]; then
    echo
    echo ${RED}Unsupported platform.$END
    echo
    exit 1
fi

# Check privilege
if [ "$EUID" -ne 0 ]; then
    echo
    echo ${RED}Please run as root.$END
    echo
    exit 1
fi

echo
echo $YELLOW${BOLD}WARNING$END
echo ${YELLOW}This command will replace all existing scripts, even the default ones.
echo Backup if necessary.$END
echo
echo $BOLD${UNDERLINE}Prepress Adobe Scripts$END
echo
echo 1. Illustrator
echo 2. Photoshop
echo A. All
echo
echo Q. Quit
echo
echo ${BOLD}Which scripts would you like to install:$END
read input

SOURCE_ROOT="$(cd `dirname $0` && pwd)"
SOURCE_STDLIB="$SOURCE_ROOT/.stdlib"

# Find adobe apps and determine its scripts directory parent.
# In mac, localized directories always have `.localized` suffix.
patch_app() {
    local adobe_app=$1
    local source_scripts="$SOURCE_ROOT/$adobe_app Scripts"
    local success=false

    echo
    echo Patching $adobe_app...

    for app in "/Applications/"*; do
        local appName=`basename $app`
        if [[ $appName == *Adobe* ]] && [[ $appName == *$adobe_app* ]]; then
            local presets="$app/Presets"
            local localizedPresets="$presets.localized"
            if [ -d "$localizedPresets" ]; then
                for preset in "$localizedPresets/"*; do
                    success=true
                    patch_preset "$app" "$source_scripts" "$preset"
                done
            else
                success=true
                patch_preset "$app" "$source_scripts" "$presets"
            fi
        fi
    done
    if [ $success = false ]; then
        echo ${RED}Not found.$END
    fi
}

# Wipe out current scripts and shared libraries, then copy new ones.
patch_preset() {
    local app=$1
    local source_scripts=$2
    local target_root=$3
    local target_stdlib="$target_root/.stdlib"
    local target_scripts="$target_root/Scripts"
    local target_scripts_incubating="$target_scripts/.incubating"
    local url="$target_scripts/prepress-adobe-scripts.url"

    echo - $GREEN$app$END

    # Deleting existing shared libraries
    if [ -d "$target_stdlib" ]; then
        rm -rf "$target_stdlib"
    fi
    # Deleting existing scripts
    if [ -d "$target_scripts" ]; then
        rm -rf "$target_scripts"
    fi
    # Copying new shared libraries and scripts
    mkdir "$target_scripts"
    cp -r "$source_scripts"/. "$target_scripts"
    mkdir "$target_stdlib"
    cp -r "$SOURCE_STDLIB"/. "$target_stdlib"
    # Cleaning up
    rm -rf "$target_scripts_incubating"
    # Adding url
    > "$url"
    echo [InternetShortcut] >> "$url"
    echo URL=https://github.com/hendraanggrian/prepress-adobe-scripts >> "$url"
    echo IconIndex=0 >> "$url"
}

case $input in
    '1')
        patch_app Illustrator
        ;;
    '2')
        patch_app Photoshop
        ;;
    'a' | 'A')
        patch_app Illustrator
        patch_app Photoshop
        ;;
    'q' | 'Q')
        ;;
    *)
        echo
        echo ${RED}Unable to recognize input.$END
        echo
        exit 1
        ;;
esac

echo
echo Goodbye!
echo
exit 0