#!/bin/bash
# Mac executable to sync scripts to Adobe installation paths.

if [ $(uname) != Darwin ]; then
    echo
    echo [91mUnsupported platform.[0m
    echo
    exit 1
fi

echo
echo '  ######################################################'
echo ' #               Prepress Adobe Scripts               #'
echo '######################################################'
echo
echo 1. Illustrator
echo 2. Photoshop
echo A. All
echo
echo Q. Quit
echo
echo [93mWhich scripts would you want to install:[0m
read input

SOURCE_ROOT="$(cd `dirname $0` && pwd)"
SOURCE_STDLIB="$SOURCE_ROOT/.stdlib"

# In mac, localized directories always have `.localized` suffix.
patch_app() {
    local adobe_app=$1
    local source_scripts="$SOURCE_ROOT/$adobe_app Scripts"
    local is_empty=true

    echo
    echo Searching for $adobe_app installations...
    echo

    for app in /Applications/* ; do
        local appName=`basename $app`
        if [[ $appName == *Adobe* ]] && [[ $appName == *$adobe_app* ]] ; then
            is_empty=false
            local presets="$app/Presets"
            local localizedPresets="$presets.localized"
            if [ -d "$localizedPresets" ] ; then
                for preset in "$localizedPresets/"* ; do
                    patch_preset "$app" "$source_scripts" "$preset"
                done
            else
                patch_preset "$app" "$source_scripts" "$presets"
            fi
        fi
    done
    if [ $is_empty = true ] ; then
        echo [91mNot found.[0m
    fi
}

patch_preset() {
    local app=$1
    local source_scripts=$2
    local target_root=$3
    local target_stdlib="$target_root/.stdlib"
    local target_scripts="$target_root/Scripts"
    local target_scripts_scratch="$target_scripts/.scratch"
    local target_scripts_libtest="$target_scripts/.lib-test"
    local target_scripts_readme="$target_scripts/README.md"

    echo [1m[92m$app[0m[0m

    if [ -d "$target_stdlib" ] ; then
        #echo [92mDeleting existing shared libraries...[0m
        rm -rf "$target_stdlib"
    fi
    if [ -d "$target_scripts" ] ; then
        #echo [92mDeleting existing scripts...[0m
        rm -rf "$target_scripts"
    fi

    echo [92mCopying new shared libraries and scripts...[0m
    mkdir "$target_scripts"
    cp -r "$source_scripts"/. "$target_scripts"
    mkdir "$target_stdlib"
    cp -r "$SOURCE_STDLIB"/. "$target_stdlib"

    echo [92mCleaning up...[0m
    if [ -d "$target_scripts_scratch" ] ; then
        rm -rf "$target_scripts_scratch"
    fi
    if [ -d "$target_scripts_libtest" ] ; then
        rm -rf "$target_scripts_libtest"
    fi
    if [ -f "$target_scripts_readme" ] ; then
        rm -rf "$target_scripts_readme"
    fi

    echo [92mFinished.[0m
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
        echo [91mUnable to recognize input.[0m
        echo
        exit 1
        ;;
esac

echo
echo 'Goodbye!'
echo
exit 0