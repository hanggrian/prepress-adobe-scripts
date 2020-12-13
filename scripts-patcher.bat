:: Windows executable to sync scripts to Adobe installation paths.

@echo off

setlocal EnableDelayedExpansion

echo.
echo.
echo   ######################################################
echo  #           Prepress Adobe Scripts Patcher           # 
echo ######################################################  
echo.
echo 1. Illustrator
echo 2. Photoshop
echo A. All
echo.
echo Q. Quit
echo.
set /p input=Which scripts would you want to install: 

set sourceRoot=%~dp0
set sourceLibs=%sourceRoot%.rootlib

if %input% == 1 (
    call :patchApp "Illustrator"
) else if %input% == 2 (
    call :patchApp "Photoshop"
) else if %input% == a (
    call :patchApp "Illustrator"
    call :patchApp "Photoshop"
) else if %input% == A (
    call :patchApp "Illustrator"
    call :patchApp "Photoshop"
) else if %input% == q (
    echo.
    echo Goodbye^^!
) else if %input% == Q (
    echo.
    echo Goodbye^^!
) else (
    echo.
    echo Unable to recognize input.
    exit /b 1
)

exit /b 0

:: In Windows, we manually do this manually.
:: check if `Presets` directly contain `Scripts` directory.
:patchApp
    setlocal
    set adobeApp=%~1
    set sourceScripts=%sourceRoot%%adobeApp% Scripts
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
                    call :patchPreset "%%a" "!sourceScripts!" "%%p"
                )
            ) else (
                call :patchPreset "%%a" "!sourceScripts!" "!presets!"
            )
        )
    )
    if defined isEmpty (
        echo Not found.
    )

    if exist "%ProgramFiles(x86)%" (
        set "isEmpty=y"
        echo Searching for 32-bit %adobeApp% installation paths...
        echo.
        for /d %%a in ("%ProgramFiles%"\Adobe\*) do (
            set appName=%%~nxa
            if NOT !appName!==!appName:%adobeApp%=! (
                set "isEmpty="
                set presets=%%a\Presets
                if not exist !presets!\Scripts (
                    for /d %%p in ("!presets!"\*) do (
                        call :patchPreset "%%a" "!sourceScripts!" "%%p"
                    )
                ) else (
                    call :patchPreset "%%a" "!sourceScripts!" "!presets!"
                )
            )
        )
        if defined isEmpty (
            echo Not found.
        )
    )
goto :eof

:patchPreset
    setlocal
    set app=%~1
    set sourceScripts=%~2
    set targetRoot=%~3
    set targetLibs=!targetRoot!/.rootlib
    set targetScripts=!targetRoot!/Scripts

    echo Patching to '!app!'...
    if exist !targetLibs! (
        echo Deleting existing root libraries...
        rmdir /s /q "!targetLibs!"
    )
    if exist !targetScripts! (
        echo Deleting existing scripts...
        rmdir /s /q "!targetScripts!"
    )
    echo Copying new scripts and root libraries...
    md "!targetScripts!"
    robocopy /s /unicode "!sourceScripts!" "!targetScripts!"
    md "!targetLibs!"
    robocopy /s /unicode "!sourceLibs!" "!targetLibs!"
    echo Finished.
goto :eof