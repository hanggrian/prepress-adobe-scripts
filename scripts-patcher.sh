#!/bin/bash

# Mac executable
# Copying `Scripts` directory to all Adobe Illustrator installation paths.

if [ $(uname) != 'Darwin' ]; then
    echo 'Unsupported platform.'
    exit 1
fi

echo
echo
echo '  ######################################################'
echo ' #           Prepress Adobe Scripts Patcher           # '
echo '######################################################  '
echo
echo '1. Adobe Illustrator'
echo '2. Adobe Photoshop'
echo 'A. All'
echo
echo 'Q. Quit'
echo
echo 'Which scripts would you want to install:'
read input
echo

patchApp () {
    local targetApp=$1
    local sourceScripts=$2

    echo "Searching for Adobe $targetApp installation paths..."
    echo
    
    isEmpty=true
    for app in '/Applications'/* ; do
        local appName=`basename $app`
        if [[ $appName == *'Adobe'* ]] && [[ $appName == *"$targetApp"* ]] ; then
            local presets="$app/Presets"
            local localizedPresets="$presets.localized"
            if [ -d "$localizedPresets" ] ; then
                for preset in "$localizedPresets"/* ; do
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
    local appName=$1
    local sourceScripts=$2
    local targetScriptsParent=$3
    
    local sourceLibs="$(cd `dirname $0` && pwd)/.sharedlib"
    local targetScripts="$targetScriptsParent/Scripts"
    local targetLibs="$targetScriptsParent/.sharedlib"

    echo "Patching to '$appName'..."
    isEmpty=false
    if [ -d "$targetScripts" ] ; then
        echo 'Deleting existing scripts...'
        rm -rf "$targetScripts"
    fi
    if [ -d "$targetLibs" ] ; then
        echo 'Deleting existing shared libraries...'
        rm -rf "$targetLibs"
    fi
    echo 'Copying new scripts and shared libraries...'
    mkdir "$targetScripts"
    cp -r "$sourceScripts"/. "$targetScripts"
    mkdir "$targetLibs"
    cp -r "$sourceLibs"/. "$targetLibs"
    echo 'Finished.'
}

case $input in
    '1')
        patchApp 'Illustrator' "$(cd `dirname $0` && pwd)/Illustrator Scripts"
        ;;
    '2')
        patchApp 'Photoshop' "$(cd `dirname $0` && pwd)/Photoshop Scripts"
        ;;
    'a' | 'A')
        patchApp 'Illustrator' "$(cd `dirname $0` && pwd)/Illustrator Scripts"
        patchApp 'Photoshop' "$(cd `dirname $0` && pwd)/Photoshop Scripts"
        ;;
    'q' | 'Q')
        echo 'Goodbye!'
        ;;
    *)
        echo 'Unable to recognize input.'
        exit 1
        ;;
esac

echo
exit 0