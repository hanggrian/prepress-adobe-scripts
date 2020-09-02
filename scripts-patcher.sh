#!/bin/bash

# Mac executable
# Copying `Scripts` directory to all Adobe Illustrator installation paths.

SOURCE="$(cd `dirname $0` && pwd)/Scripts"

for app in /Applications/* ; do
    appName=`basename $app`
    if [[ $appName == *Adobe* ]] && [[ $appName == *Illustrator* ]] ; then
        echo "Patching to '$app':"
        for preset in "$app"/Presets.localized/* ; do
            echo "- $preset"
            # remove whole folder
            rm -rf "$preset"/Scripts
            # bulk copy folder
            cp -r "$SOURCE" "$preset"
        done
    fi
done