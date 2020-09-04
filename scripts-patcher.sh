#!/bin/bash

# Mac executable
# Copying `Scripts` directory to all Adobe Illustrator installation paths.

if ! [ $(uname) == "Darwin" ]; then
    echo Unsupported platform.
    exit 1
fi

SOURCE="$(cd `dirname $0` && pwd)/Scripts"

echo -e "Searching for Adobe Illustrator installation paths...\n"
isEmpty=true
for app in /Applications/* ; do
    appName=`basename $app`
    if [[ $appName == *Adobe* ]] && [[ $appName == *Illustrator* ]] ; then
        for preset in "$app"/Presets.localized/* ; do
            echo Patching to \'$app\'...
            isEmpty=false
            scripts="$preset"/Scripts
            if [ -d "$scripts" ] ; then
                echo Deleting existing scripts...
                rm -rf "$scripts"
            fi
            echo Copying new scripts...
            cp -r "$SOURCE" "$preset"
            echo -e "Finished.\n"
        done
    fi
done
if [ $isEmpty = true ] ; then
    echo -e "Not found.\n"
fi

exit 0