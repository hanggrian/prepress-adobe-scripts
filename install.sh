#!/bin/bash
# Mac executable to sync scripts to Adobe installation paths.

main() {
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

    case $input in
        "1")
            patch_app "Illustrator" "aia"
            ;;
        "2")
            patch_app "Photoshop" "atn"
            ;;
        "a" | "A")
            patch_app "Illustrator" "aia"
            patch_app "Photoshop" "atn"
            ;;
        "q" | "Q")
            ;;
        *)
            fail "Unable to recognize input."
            ;;
    esac

    echo
    echo Goodbye!
    echo
    exit 0
}

fail() {
    local message=$1

    echo
    echo $RED$message$END
    echo
    exit 1
}

# Find adobe apps and determine its scripts directory parent.
# In mac, localized directories always have `.localized` suffix.
patch_app() {
    local name=$1
    local action_extension=$2
    local source_scripts="$SOURCE_ROOT/$name Scripts"
    local source_action="$SOURCE_ROOT/Actions/Prepress Adobe Scripts.$action_extension"
    local success=false

    echo
    echo Patching $name...

    for app in "/Applications/"*; do
        local app_name=`basename "$app"`
        if [[ $app_name == *Adobe* ]] && [[ $app_name == *$name* ]]; then
            local presets="$app/Presets"
            local localizedPresets="$presets.localized"
            if [ -d "$localizedPresets" ]; then
                for preset in "$localizedPresets/"*; do
                    success=true
                    patch_preset "$app" "$source_scripts" "$source_action" "$preset"
                done
            else
                success=true
                patch_preset "$app" "$source_scripts" "$source_action" "$presets"
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
    local source_action=$3
    local target_root=$4
    local target_stdlib="$target_root/.stdlib"
    local target_stdres="$target_root/.stdres"
    local target_stdreslight="$target_root/.stdres-light"
    local target_support="$target_root/.support-files"
    local target_scripts="$target_root/Scripts"
    local target_scripts_incubating="$target_scripts/.incubating"
    local target_action="$target_root/Actions/`basename "$source_action"`"

    echo - $GREEN$app$END

    # Delete existing
    if [ -d "$target_stdlib" ]; then
        rm -rf "$target_stdlib"
    fi
    if [ -d "$target_stdres" ]; then
        rm -rf "$target_stdres"
    fi
    if [ -d "$target_stdreslight" ]; then
        rm -rf "$target_stdreslight"
    fi
    if [ -d "$target_support" ]; then
        rm -rf "$target_support"
    fi
    if [ -d "$target_scripts" ]; then
        rm -rf "$target_scripts"
    fi
    if [ -f "$target_action" ]; then
        rm -rf "$target_action"
    fi
    # Copy new ones
    mkdir "$target_stdlib"
    cp -r "$SOURCE_STDLIB"/. "$target_stdlib"
    mkdir "$target_stdres"
    cp -r "$SOURCE_STDRES"/. "$target_stdres"
    mkdir "$target_stdreslight"
    cp -r "$SOURCE_STDRESLIGHT"/. "$target_stdreslight"
    mkdir "$target_support"
    cp -r "$SOURCE_SUPPORT"/. "$target_support" && chmod +x "$target_support/check_updates.command"
    mkdir "$target_scripts"
    cp -r "$source_scripts"/. "$target_scripts"
    cp "$source_action" "$target_action"
    # Clean up
    rm -rf "$target_scripts_incubating"
    rm "$target_support/check_updates.bat"
}

END=[0m
BOLD=[1m
UNDERLINE=[4m
RED=[91m
GREEN=[92m
YELLOW=[93m

# Check mac
if [ `uname` != Darwin ]; then
    fail "Unsupported platform."
fi
# Check permissions
if [ "$EUID" -ne 0 ]; then
    fail "Root access required."
fi

SOURCE_ROOT="$(cd `dirname "$0"` && pwd)"
SOURCE_STDLIB="$SOURCE_ROOT/.stdlib"
SOURCE_STDRES="$SOURCE_ROOT/.stdres"
SOURCE_STDRESLIGHT="$SOURCE_ROOT/.stdres-light"
SOURCE_SUPPORT="$SOURCE_ROOT/.support-files"

# Check sources
if [ -d "$SOURCE_STDLIB" ] && [ -d "$SOURCE_STDRES" ] && [ -d "$SOURCE_STDRESLIGHT" ] && [ -d "$SOURCE_SUPPORT" ]; then
    main
else
    fail "Missing sources."
fi