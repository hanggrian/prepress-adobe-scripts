#!/bin/bash
# Mac executable to sync scripts to Adobe installation paths.

if [ "$(uname)" != 'Darwin' ]; then
    echo 'Unsupported platform.'
    echo
    exit 1
fi

echo
echo
echo '  ######################################################'
echo ' #           Prepress Adobe Scripts Patcher           # '
echo '######################################################  '
echo
echo '1. Illustrator'
echo '2. Photoshop'
echo 'A. All'
echo
echo 'Q. Quit'
echo
echo 'Which scripts would you want to install:'
read input

sourceRoot="$(cd `dirname $0` && pwd)"
sourceLibs="$sourceRoot/.stdlib"

# In mac, localized directories always have `.localized` suffix.
patchApp () {
    local adobeApp=$1
    local sourceScripts="$sourceRoot/$adobeApp Scripts"
    local isEmpty=true

    echo
    echo "Searching for $adobeApp installations..."
    echo

    for app in '/Applications/'* ; do
        local appName=`basename $app`
        if [[ $appName == *'Adobe'* ]] && [[ $appName == *"$adobeApp"* ]] ; then
            isEmpty=false
            local presets="$app/Presets"
            local localizedPresets="$presets.localized"
            if [ -d "$localizedPresets" ] ; then
                for preset in "$localizedPresets/"* ; do
                    patchPreset "$app" "$sourceScripts" "$preset"
                done
            else
                patchPreset "$app" "$sourceScripts" "$presets"
            fi
        fi
    done
    if [ $isEmpty = true ] ; then
        echo 'Not found.'
    fi
}

patchPreset() {
    local app=$1
    local sourceScripts=$2
    local targetRoot=$3
    local targetLibs="$targetRoot/.stdlib"
    local targetScripts="$targetRoot/Scripts"

    echo "Patching to '$app'..."
    if [ -d "$targetLibs" ] ; then
        echo 'Deleting existing shared libraries...'
        rm -rf "$targetLibs"
    fi
    if [ -d "$targetScripts" ] ; then
        echo 'Deleting existing scripts...'
        rm -rf "$targetScripts"
    fi
    echo 'Copying new shared libraries and scripts...'
    mkdir "$targetScripts"
    cp -r "$sourceScripts"/. "$targetScripts"
    mkdir "$targetLibs"
    cp -r "$sourceLibs"/. "$targetLibs"
    echo 'Finished.'
}

case $input in
    '1')
        patchApp 'Illustrator'
        ;;
    '2')
        patchApp 'Photoshop'
        ;;
    'a' | 'A')
        patchApp 'Illustrator'
        patchApp 'Photoshop'
        ;;
    'q' | 'Q')
        echo
        echo 'Goodbye!'
        ;;
    *)
        echo
        echo 'Unable to recognize input.'
        echo
        exit 1
        ;;
esac

echo
exit 0