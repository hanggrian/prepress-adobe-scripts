@rem Windows executable
@rem Copying `Scripts` directory to all Adobe Illustrator installation paths.

@echo off

setlocal EnableDelayedExpansion

set SOURCE=%~dp0Scripts

echo Searching for Adobe Illustrator installation paths...
echo.
set "isEmpty=y"
for /d %%a in ("%ProgramFiles%"\Adobe\*) do (
    set appName=%%~nxa
    if NOT !appName!==!appName:Illustrator=! (
        for /d %%p in ("%%a"\Presets\*) do (
            echo Patching to '%%p'...
            set "isEmpty="
            set scripts="%%p"\Scripts
            if exist !scripts! (
                echo Deleting existing scripts...
                rmdir /s /q !scripts!
            )
            echo Copying new scripts...
            robocopy /s /unicode "%SOURCE%" !scripts!
            echo Finished.
            echo.
        )
    )
)
if defined isEmpty (
    echo Not found.
    echo.
)

if exist "%ProgramFiles(x86)%" (
    echo Searching for 32-bit Adobe Illustrator installation paths...
    echo.
    set "isEmpty=y"
    for /d %%a in ("%ProgramFiles%"\Adobe\*) do (
        set appName=%%~nxa
        if NOT !appName!==!appName:Illustrator=! (
            for /d %%p in ("%%a"\Presets\*) do (
                echo Patching to '%%p'...
                set "isEmpty="
                set scripts="%%p"\Scripts
                if exist !scripts! (
                    echo Deleting existing scripts...
                    rmdir /s /q !scripts!
                )
                echo Copying new scripts...
                robocopy /s /unicode "%SOURCE%" !scripts!
                echo Finished.
                echo.
            )
        )
    )
    if defined isEmpty (
        echo Not found.
        echo.
    )
)