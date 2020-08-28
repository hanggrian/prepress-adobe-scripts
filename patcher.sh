#!/bin/bash

# Unix executable
# Copying `Scripts` directory to all Adobe Illustrator installation paths.

SOURCE=$(cd `dirname $0` && pwd)/"Scripts"

for app in "/Applications"/* ; do
    appName=`basename $app`
    if [[ $appName == *"Adobe"* ]] && [[ $appName == *"Illustrator"* ]] ; then
        echo "Patching to '$app':"
        for scripts in "$app/Presets.localized"/*/"Scripts" ; do
            echo "- $scripts"
            rm -rf "$scripts"/*
            rm -rf "$scripts/."*
            cp -r "$SOURCE/"* "$scripts/"
        done
    fi
done
