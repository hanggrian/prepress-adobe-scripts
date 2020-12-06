@rem Windows executable to sync scripts to Adobe installation paths.

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
set sourceLibs=%sourceRoot%.sharedlib

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
    echo Goodbye!
) else if %input% == Q (
    echo.
    echo Goodbye!
) else (
    echo.
    echo Unable to recognize input.
    exit /b 1
)

exit /b 0

:patchApp
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
            set presets="%%a"\Presets\*
            for /d %%p in ("%presets%") do (
                call :patchPreset "%app%" "%sourceScripts%" "%preset%"
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
            if NOT !appName!==!appName:Illustrator=! (
                set "isEmpty="
                set presets="%%a"\Presets\*
                for /d %%p in ("%presets%") do (
                    call :patchPreset "%app%" "%sourceScripts%" "%preset%"
                )
            )
        )
        if defined isEmpty (
            echo Not found.
        )
    )
goto :eof

:patchPreset
    set app=%~1
    set sourceScripts=%~2
    set targetRoot=%~3
    set targetLibs=!targetRoot!/.sharedlib
    set targetScripts=!targetRoot!/Scripts

    echo Patching to '!app!'...
    if exist !targetLibs! (
        echo Deleting existing shared libraries...
        rmdir /s /q !targetLibs!
    )
    if exist !targetScripts! (
        echo Deleting existing scripts...
        rmdir /s /q !targetScripts!
    )
    echo Copying new scripts and shared libraries...
    robocopy /s /unicode "%SOURCE%" !scripts!
    echo Finished.
goto :eof