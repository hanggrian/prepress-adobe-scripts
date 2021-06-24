:: Windows executable to sync scripts to Adobe installation paths.

@echo off

setlocal EnableDelayedExpansion

set END=[0m
set BOLD=[1m
set ITALIC=[3m
set UNDERLINE=[4m
set RED=[91m
set GREEN=[92m
set YELLOW=[93m

echo.
echo !BOLD!!UNDERLINE!Prepress Adobe Scripts!END!
echo.
echo !BOLD!!YELLOW!WARNING!END!
echo !YELLOW!This command will replace all existing scripts, even the default ones.
echo Backup if necessary.!END!
echo.
echo 1. Illustrator
echo 2. Photoshop
echo A. All
echo.
echo Q. Quit
echo.
set /p input="!BOLD!Which scripts would you want to install: !END!"

set SOURCE_ROOT=%~dp0
set SOURCE_STDLIB=%SOURCE_ROOT%.stdlib

if "%input%" == "1" (
    call :patch_app Illustrator
) else if "%input%" == "2" (
    call :patch_app Photoshop
) else if "%input%" == "a" (
    call :patch_app Illustrator
    call :patch_app Photoshop
) else if "%input%" == "A" (
    call :patch_app Illustrator
    call :patch_app Photoshop
) else if "%input%" == "q" (
    echo.
) else if "%input%" == "Q" (
    echo.
) else (
    echo.
    echo !RED!Unable to recognize input.!END!
    exit /b 1
)

echo.
echo Goodbye^^!
exit /b 0

:: In Windows, we manually do this manually.
:: check if `Presets` directly contain `Scripts` directory.
:patch_app
    setlocal
    set adobe_app=%~1
    set source_scripts=%SOURCE_ROOT%%adobe_app% Scripts
    set "success="

    echo.
    echo Patching %adobe_app%:

    for /d %%a in ("%ProgramFiles%"\Adobe\*) do (
        set appName=%%~nxa
        if NOT !appName!==!appName:%adobe_app%=! (
            set presets=%%a\Presets
            if not exist !presets!\Scripts (
                for /d %%p in ("!presets!"\*) do (
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

    if exist "%ProgramFiles(x86)%" (
        set "success="
        echo.
        echo Patching 32-bit %adobe_app%:

        for /d %%a in ("%ProgramFiles(x86)%"\Adobe\*) do (
            set appName=%%~nxa
            if NOT !appName!==!appName:%adobe_app%=! (
                set presets=%%a\Presets
                if not exist !presets!\Scripts (
                    for /d %%p in ("!presets!"\*) do (
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
goto :eof

:patch_preset
    setlocal
    set app=%~1
    set source_scripts=%~2
    set target_root=%~3
    set target_stdlib=!target_root!\.stdlib
    set target_scripts=!target_root!\Scripts
    set target_scripts_incubating=!target_scripts!\.incubating

    echo - !GREEN!!app!!END!

    :: Deleting existing shared libraries
    if exist !target_stdlib! (
        rmdir /s /q "!target_stdlib!"
    )
    :: Deleting existing scripts
    if exist !target_scripts! (
        rmdir /s /q "!target_scripts!"
    )
    :: Copying new shared libraries and scripts
    md "!target_stdlib!"
    robocopy /s "!SOURCE_STDLIB!" "!target_stdlib!" /njh /njs /ndl /nc /ns /nfl
    md "!target_scripts!"
    robocopy /s "!source_scripts!" "!target_scripts!" /njh /njs /ndl /nc /ns /nfl
    :: Cleaning up
    if exist !target_scripts_incubating! (
        rmdir /s /q "!target_scripts_incubating!"
    )
goto :eof