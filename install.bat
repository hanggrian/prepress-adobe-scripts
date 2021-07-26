:: Windows executable to sync scripts to Adobe installation paths.

@echo off

setlocal EnableDelayedExpansion

set END=[0m
set BOLD=[1m
set UNDERLINE=[4m
set RED=[91m
set GREEN=[92m
set YELLOW=[93m

:: Check privilege
net session >nul 2>&1
if !errorLevel! neq 0 (
    echo.
    echo !RED!Administrative permissions required.!END!
    echo.
    pause && exit /b 1
)

echo.
echo !YELLOW!!BOLD!WARNING!END!
echo !YELLOW!This command will replace all existing scripts, even the default ones.
echo Backup if necessary.!END!
echo.
echo !BOLD!!UNDERLINE!Prepress Adobe Scripts!END!
echo.
echo 1. Illustrator
echo 2. Photoshop
echo A. All
echo.
echo Q. Quit
echo.
set /p input=!BOLD!Which scripts would you like to install: !END!

set SOURCE_ROOT=%~dp0
set SOURCE_STDLIB=!SOURCE_ROOT!.stdlib
set SOURCE_SUPPORT=!SOURCE_ROOT!.support-files

if "!input!" equ "1" (
    call :patch_app Illustrator
) else if "!input!" equ "2" (
    call :patch_app Photoshop
) else if "!input!" equ "a" (
    call :patch_app Illustrator
    call :patch_app Photoshop
) else if "!input!" equ "A" (
    call :patch_app Illustrator
    call :patch_app Photoshop
) else if "!input!" equ "q" (
    rem
) else if "!input!" equ "Q" (
    rem
) else (
    echo.
    echo !RED!Unable to recognize input.!END!
    echo.
    pause && exit /b 1
)

echo.
echo Goodbye^^!
echo.
pause && exit /b 0

:: Find adobe apps and determine its scripts directory parent.
:: In Windows, we manually do this manually. Check if `Presets` directly contain `Scripts` directory.
:patch_app
    setlocal
    set adobe_app=%~1
    set source_scripts=!SOURCE_ROOT!!adobe_app! Scripts
    set "success="

    echo.
    echo Patching !adobe_app!...

    for /d %%a in ("!ProgramFiles!\Adobe\*") do (
        set appName=%%~nxa
        if "!appName:%adobe_app%=!" neq "!appName!" (
            set presets=%%a\Presets
            if not exist "!presets!\Scripts" (
                for /d %%p in ("!presets!\*") do (
                    set "success=y"
                    call :patch_preset "%%a" "!source_scripts!" "%%p"
                )
            ) else (
                set "success=y"
                call :patch_preset "%%a" "!source_scripts!" "!presets!"
            )
        )
    )
    if not defined success (
        echo !RED!Not found.!END!
    )

    if exist "!ProgramFiles(x86)!" (
        set "success="
        echo.
        echo Patching 32-bit !adobe_app!...

        for /d %%a in ("!ProgramFiles(x86)!\Adobe\*") do (
            set appName=%%~nxa
            if "!appName:%adobe_app%=!" neq "!appName!" (
                set presets=%%a\Presets
                if not exist "!presets!\Scripts" (
                    for /d %%p in ("!presets!\*") do (
                        set "success=y"
                        call :patch_preset "%%a" "!source_scripts!" "%%p"
                    )
                ) else (
                    set "success=y"
                    call :patch_preset "%%a" "!source_scripts!" "!presets!"
                )
            )
        )
        if not defined success (
            echo !RED!Not found.!END!
        )
    )
    endlocal
goto :eof

:: Wipe out current scripts and shared libraries, then copy new ones.
:patch_preset
    setlocal
    set app=%~1
    set source_scripts=%~2
    set target_root=%~3
    set target_stdlib=!target_root!\.stdlib
    set target_support=!target_root!\.support-files
    set target_scripts=!target_root!\Scripts
    set target_scripts_incubating=!target_scripts!\.incubating
    set url=!target_scripts!\prepress-adobe-scripts.url

    echo - !GREEN!!app!!END!

    :: Delete existing
    if exist "!target_stdlib!" (
        rmdir /s /q "!target_stdlib!"
    )
    if exist "!target_support!" (
        rmdir /s /q "!target_support!"
    )
    if exist "!target_scripts!" (
        rmdir /s /q "!target_scripts!"
    )
    :: Copy new ones
    md "!target_stdlib!"
    robocopy /s "!SOURCE_STDLIB!" "!target_stdlib!" /njh /njs /ndl /nc /ns /nfl
    md "!target_support!"
    robocopy /s "!SOURCE_SUPPORT!" "!target_support!" /njh /njs /ndl /nc /ns /nfl
    md "!target_scripts!"
    robocopy /s "!source_scripts!" "!target_scripts!" /njh /njs /ndl /nc /ns /nfl
    :: Clean up
    rmdir /s /q "!target_scripts_incubating!"
    :: Add url
    echo [InternetShortcut] >> "!url!"
    echo URL=https://github.com/hendraanggrian/prepress-adobe-scripts >> "!url!"
    echo IconIndex=0 >> "!url!"
    endlocal
goto :eof