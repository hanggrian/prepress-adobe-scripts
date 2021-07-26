@echo off

setlocal EnableDelayedExpansion

curl "https://api.github.com/repos/hendraanggrian/prepress-adobe-scripts/commits/main" -o "!USERPROFILE!\Desktop\prepress-adobe-scripts"