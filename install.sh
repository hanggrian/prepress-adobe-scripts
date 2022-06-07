#!/bin/bash
# Mac executable to sync scripts to Adobe installation paths.

readonly END=[0m
readonly BOLD=[1m
readonly UNDERLINE=[4m
readonly RED=[91m
readonly GREEN=[92m
readonly YELLOW=[93m

fail() { echo; echo "$RED$1$END"; echo; exit 1; }

# Find adobe apps and determine its scripts directory parent.
# In mac, localized directories always have `.localized` suffix.
patch_app() {
  local name=$1
  local action_extension=$2
  local scripts_filename="$name Scripts"
  local action_filename="Prepress Adobe Scripts.$action_extension"
  local success=false

  echo
  echo "Patching $name..."

  for app in '/Applications/'*; do
    local app_name=$(basename "$app")
    if [[ "$app_name" == *"Adobe"* ]] && [[ "$app_name" == *"$name"* ]]; then
      local presets="$app/Presets"
      local localizedPresets="$presets.localized"
      if [[ -d "$localizedPresets" ]]; then
        for preset in "$localizedPresets/"*; do
          success=true
          patch_preset "$app" "$scripts_filename" "$action_filename" "$preset"
        done
      else
        success=true
        patch_preset "$app" "$scripts_filename" "$action_filename" "$presets"
      fi
    fi
  done
  if [[ "$success" = false ]]; then
    echo "${RED}Not found.$END"
  fi
}

# Wipe out current scripts and shared libraries, then copy new ones.
patch_preset() {
  local full_name=$1
  local scripts_filename=$2
  local action_filename=$3
  local target_root=$4

  echo "- $GREEN$full_name$END"

  # Delete existing
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
  # Copy new ones
  cp -r "$SOURCE_ROOT/.stdlib"/. "$target_root/.stdlib"
  cp -r "$SOURCE_ROOT/.stdres"/. "$target_root/.stdres" && chmod +x "$target_root/.stdres/script/check_updates.command"
  cp -r "$SOURCE_ROOT/$scripts_filename"/. "$target_root/Scripts"
  cp "$SOURCE_ROOT/Actions/$action_filename" "$target_root/Actions/$action_filename"
  # Clean up
  rm -f "$target_root/.stdres/script/check_updates.cmd"
  rm -rf "$target_root/Scripts/.incubating"
}

# SOURCE_ROOT doesn't end with slash
readonly SOURCE_ROOT="$(cd $(dirname "$0") && pwd)"

# Check OS
if [[ $(uname) != Darwin ]]; then fail 'Unsupported OS'; fi

# Check sources
if [[ ! -d "$SOURCE_ROOT/.stdlib" ]] || [[ ! -d "$SOURCE_ROOT/.stdres" ]]; then fail 'Missing hidden directories'; fi
if [[ ! -d "$SOURCE_ROOT/Illustrator Scripts" ]] || [[ ! -d "$SOURCE_ROOT/Photoshop Scripts" ]]; then fail 'Missing scripts'; fi
if [[ ! -d "$SOURCE_ROOT/Actions" ]]; then fail 'Missing actions'; fi

# Check permissions
if [[ "$EUID" -ne 0 ]]; then fail 'Root access required'; fi

echo
echo "$YELLOW${BOLD}WARNING$END"
echo "${YELLOW}This command will replace all existing scripts, even the default ones"
echo "Backup if necessary.$END"
echo
echo "$BOLD${UNDERLINE}Prepress Adobe Scripts$END"
echo
echo '1. Illustrator'
echo '2. Photoshop'
echo '3. All'
echo
echo 'Q. Quit'
echo
echo "${BOLD}Which scripts would you like to install:$END"
read input

case "$input" in
  1) patch_app 'Illustrator' 'aia' ;;
  2) patch_app 'Photoshop' 'atn' ;;
  3) patch_app 'Illustrator' 'aia'; patch_app 'Photoshop' 'atn' ;;
  q | Q) ;;
  *) fail 'Unable to recognize input' ;;
esac

echo
echo 'Goodbye!'
echo
exit 0