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
    set adobeApp=%~1
    set sourceScripts=%SOURCE_ROOT%%adobeApp% Scripts
    set "isEmpty=y"

    echo.
    echo Searching for %adobeApp% installations...
    echo.

    for /d %%a in ("%ProgramFiles%"\Adobe\*) do (
        set appName=%%~nxa
        if NOT !appName!==!appName:%adobeApp%=! (
            set "isEmpty="
            set presets=%%a\Presets
            if not exist !presets!\Scripts (
                for /d %%p in ("!presets!"\*) do (
                    call :patch_preset "%%a" "!sourceScripts!" "%%p"
                )
            ) else (
                call :patch_preset "%%a" "!sourceScripts!" "!presets!"
            )
        )
    )
    if defined isEmpty (
        echo [91mNot found.[0m
    )

    if exist "%ProgramFiles(x86)%" (
        set "isEmpty=y"
        echo Searching for 32-bit %adobeApp% installation paths...
        echo.
        for /d %%a in ("%ProgramFiles(x86)%"\Adobe\*) do (
            set appName=%%~nxa
            if NOT !appName!==!appName:%adobeApp%=! (
                set "isEmpty="
                set presets=%%a\Presets
                if not exist !presets!\Scripts (
                    for /d %%p in ("!presets!"\*) do (
                        call :patch_preset "%%a" "!sourceScripts!" "%%p"
                    )
                ) else (
                    call :patch_preset "%%a" "!sourceScripts!" "!presets!"
                )
            )
        )
        if defined isEmpty (
            echo [91mNot found.[0m
        )
    )
goto :eof

:patch_preset
    setlocal
    set app=%~1
    set sourceScripts=%~2
    set targetRoot=%~3
    set targetStdLib=!targetRoot!\.stdlib
    set targetScripts=!targetRoot!\Scripts
    set targetScriptsScratch=!targetScripts!\.scratch
    set targetScriptsLibTest=!targetScripts!\.lib-test
    set targetScriptsReadme=!targetScripts!\README.md

    echo [1m[92m!app![0m[0m

    if exist !targetStdLib! (
        echo [92mDeleting existing shared libraries...[0m
        rmdir /s /q "!targetStdLib!"
    )
    if exist !targetScripts! (
        echo [92mDeleting existing scripts...[0m
        rmdir /s /q "!targetScripts!"
    )

    echo [92mCopying new shared libraries and scripts...[0m
    md "!targetStdLib!"
    robocopy /s "!SOURCE_STDLIB!" "!targetStdLib!" /njh /njs /ndl /nc /ns /nfl
    md "!targetScripts!"
    robocopy /s "!sourceScripts!" "!targetScripts!" /njh /njs /ndl /nc /ns /nfl

    echo [92mCleaning up...[0m
    if exist !targetScriptsScratch! (
        rmdir /s /q "!targetScriptsScratch!"
    )
    if exist !targetScriptsLibTest! (
        rmdir /s /q "!targetScriptsLibTest!"
    )
    if exist !targetScriptsReadme! (
        del /q "!targetScriptsReadme!" 1>nul
    )

    echo [92mFinished.[0m
    echo.
goto :eof