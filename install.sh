#!/bin/bash
# Mac executable to sync scripts to Adobe installation paths.

readonly END='[0m'
readonly BOLD='[1m'
readonly UNDERLINE='[4m'
readonly RED='[91m'
readonly GREEN='[92m'
readonly YELLOW='[93m'

warn() { echo "$YELLOW$*$END"; } >&2
die() { echo; echo "$RED$*$END"; echo; exit 1; } >&2

# Find Adobe apps and determine its scripts directory parent.
# In mac, localized directories always have `.localized` suffix.
patch_app() {
  local name="$1"
  local action_extension="$2"
  local scripts_filename="$name Scripts"
  local action_filename="Prepress Adobe Scripts.$action_extension"
  local success=false

  echo
  echo "Patching $name..."

  for app in '/Applications/'*; do
    local app_name && app_name=$(basename "$app")
    # find matching Adobe app
    if [[ "$app_name" == *'Adobe'* ]] && [[ "$app_name" == *"$name"* ]]; then
      local presets="$app/Presets"
      local localized_presets="$presets.localized"
      if [[ -d "$localized_presets" ]]; then
        # in Illustrator, scripts are located within `$root/Presets/$LOCALE`
        for localized_preset in "$localized_presets/"*; do
          local localized_preset_name && \
            localized_preset_name=$(basename "$localized_preset")
          if [[ "$localized_preset_name" == 'en_'* ]]; then
            success=true
            patch_preset \
              "$scripts_filename" \
              "$action_filename" \
              "$localized_preset"
          fi
        done
      else
        # in Photoshop, scripts are located within `$root`
        success=true
        patch_preset "$scripts_filename" "$action_filename" "$presets"
      fi
    fi
  done
  if [[ "$success" == false ]]; then
    echo "${RED}Not found.$END"
  fi
}

# Wipe out current scripts and shared libraries, then copy new ones.
patch_preset() {
  local scripts_filename="$1"
  local action_filename="$2"
  local target_root="$3"

  echo "- $GREEN$target_root$END"

  # delete existing
  if [[ -d "$target_root/.stdlib" ]]; then
    rm -rf "$target_root/.stdlib"
    mkdir "$target_root/.stdlib"
  fi
  if [[ -d "$target_root/.stdres" ]]; then
    rm -rf "$target_root/.stdres"
    mkdir "$target_root/.stdres"
  fi
  if [[ -d "$target_root/Scripts" ]]; then
    rm -rf "$target_root/Scripts"
    mkdir "$target_root/Scripts"
  fi
  if [[ -f "$target_root/Actions/$action_filename" ]]; then
    rm -f "$target_root/Actions/$action_filename"
  fi
  # copy new ones
  rsync -a "$SOURCE_ROOT/.stdlib" "$target_root"
  rsync -a "$SOURCE_ROOT/.stdres" "$target_root" && \
    chmod +x "$target_root/.stdres/script/check_updates.command"
  rsync -a "$SOURCE_ROOT/$scripts_filename/". "$target_root/Scripts"
  rsync -a \
    "$SOURCE_ROOT/Actions/$action_filename" \
    "$target_root/Actions/$action_filename"
  # clean up
  rm -f "$target_root/.stdres/script/check_updates.cmd"
  rm -rf "$target_root/Scripts/.incubating"
  rm -rf "$target_root/Scripts/.lib-test"
}

# SOURCE_ROOT doesn't end with slash
SOURCE_ROOT=$(cd "$(dirname "$0")" && pwd) && readonly SOURCE_ROOT

# check OS
if [[ $(uname) != Darwin ]]; then die 'Unsupported OS.'; fi

# check permissions
if [[ "$EUID" -ne 0 ]]; then die 'Root access required.'; fi

# check sources
if [[ ! -d "$SOURCE_ROOT/.stdlib" ]] || [[ ! -d "$SOURCE_ROOT/.stdres" ]]; then
  die 'Missing hidden directories.'
fi
if [[ ! -d "$SOURCE_ROOT/Illustrator Scripts" ]] || \
    [[ ! -d "$SOURCE_ROOT/Photoshop Scripts" ]]; then
  die 'Missing scripts.'
fi
if [[ ! -d "$SOURCE_ROOT/Actions" ]]; then
  die 'Missing actions.'
fi

echo
echo "$BOLD${UNDERLINE}Prepress Adobe Scripts Installer$END"
echo
echo "$YELLOW${BOLD}WARNING$END"
warn 'This command will replace all existing scripts, backup if necessary.'
echo
echo '1. Illustrator'
echo '2. Photoshop'
echo 'A. All'
echo
echo 'Q. Quit'
echo
echo "${BOLD}Pick the app:$END"
read -r input

case "$input" in
  1) patch_app 'Illustrator' 'aia' ;;
  2) patch_app 'Photoshop' 'atn' ;;
  A | a)
    patch_app 'Illustrator' 'aia'
    patch_app 'Photoshop' 'atn'
    ;;
  Q | q) ;;
  *) die 'Unable to recognize input.' ;;
esac

echo
echo 'Goodbye!'
echo
exit 0
