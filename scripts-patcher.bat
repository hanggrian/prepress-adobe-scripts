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
set sourceStdLib=%sourceRoot%.stdlib

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
) else if %input% == Q (
    echo.
) else (
    echo.
    echo Unable to recognize input.
    exit /b 1
)

echo.
echo Goodbye^^!
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
        for /d %%a in ("%ProgramFiles(x86)%"\Adobe\*) do (
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
    set targetStdLib=!targetRoot!/.stdlib
    set targetScripts=!targetRoot!/Scripts
    set targetScriptsIdea=!targetScripts!/.idea
    set targetScriptsLibTest=!targetScripts!/.lib-test

    echo Patching to '!app!'...

    if exist !targetStdLib! (
        echo Deleting existing shared libraries...
        rmdir /s /q "!targetStdLib!"
    )
    if exist !targetScripts! (
        echo Deleting existing scripts...
        rmdir /s /q "!targetScripts!"
    )

    echo Copying new shared libraries and scripts...
    md "!targetStdLib!"
    robocopy /s "!sourceStdLib!" "!targetStdLib!" /njh /njs /ndl /nc /ns /nfl
    md "!targetScripts!"
    robocopy /s "!sourceScripts!" "!targetScripts!" /njh /njs /ndl /nc /ns /nfl

    echo Cleaning up...
    if exist !targetScriptsIdea! (
        rmdir /s /q "!targetScriptsIdea!"
    )
    if exist !targetScriptsLibTest! (
        rmdir /s /q "!targetScriptsLibTest!"
    )

    echo Finished.
    echo.
goto :eof