:: Windows executable to sync scripts to Adobe installation paths.

@echo off

setlocal EnableDelayedExpansion

echo.
echo   ######################################################
echo  #               Prepress Adobe Scripts               #
echo ######################################################
echo.
echo 1. Illustrator
echo 2. Photoshop
echo A. All
echo.
echo Q. Quit
echo.
set /p input=[93mWhich scripts would you want to install: [0m

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
    echo [91mUnable to recognize input.[0m
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
    set "is_empty=y"

    echo.
    echo Searching for %adobe_app% installations...
    echo.

    for /d %%a in ("%ProgramFiles%"\Adobe\*) do (
        set appName=%%~nxa
        if NOT !appName!==!appName:%adobe_app%=! (
            set "is_empty="
            set presets=%%a\Presets
            if not exist !presets!\Scripts (
                for /d %%p in ("!presets!"\*) do (
                    call :patch_preset "%%a" "!source_scripts!" "%%p"
                )
            ) else (
                call :patch_preset "%%a" "!source_scripts!" "!presets!"
            )
        )
    )
    if defined is_empty (
        echo [91mNot found.[0m
    )

    if exist "%ProgramFiles(x86)%" (
        set "is_empty=y"
        echo Searching for 32-bit %adobe_app% installation paths...
        echo.
        for /d %%a in ("%ProgramFiles(x86)%"\Adobe\*) do (
            set appName=%%~nxa
            if NOT !appName!==!appName:%adobe_app%=! (
                set "is_empty="
                set presets=%%a\Presets
                if not exist !presets!\Scripts (
                    for /d %%p in ("!presets!"\*) do (
                        call :patch_preset "%%a" "!source_scripts!" "%%p"
                    )
                ) else (
                    call :patch_preset "%%a" "!source_scripts!" "!presets!"
                )
            )
        )
        if defined is_empty (
            echo [91mNot found.[0m
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
    set target_scripts_scratch=!target_scripts!\.scratch
    set target_scripts_libtest=!target_scripts!\.lib-test
    set target_scripts_readme=!target_scripts!\README.md

    echo [1m[92m!app![0m[0m

    if exist !target_stdlib! (
        echo [92mDeleting existing shared libraries...[0m
        rmdir /s /q "!target_stdlib!"
    )
    if exist !target_scripts! (
        echo [92mDeleting existing scripts...[0m
        rmdir /s /q "!target_scripts!"
    )

    echo [92mCopying new shared libraries and scripts...[0m
    md "!target_stdlib!"
    robocopy /s "!SOURCE_STDLIB!" "!target_stdlib!" /njh /njs /ndl /nc /ns /nfl
    md "!target_scripts!"
    robocopy /s "!source_scripts!" "!target_scripts!" /njh /njs /ndl /nc /ns /nfl

    echo [92mCleaning up...[0m
    if exist !target_scripts_scratch! (
        rmdir /s /q "!target_scripts_scratch!"
    )
    if exist !target_scripts_libtest! (
        rmdir /s /q "!target_scripts_libtest!"
    )
    if exist !target_scripts_readme! (
        del /q "!target_scripts_readme!" 1>nul
    )

    echo [92mFinished.[0m
    echo.
goto :eof