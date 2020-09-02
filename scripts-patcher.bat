@rem Windows executable
@rem Copying `Scripts` directory to all Adobe Illustrator installation paths.

@rem @echo off

set SOURCE=%~dp0Scripts

for /d %%a in ("%PROGRAMFILES%"/*) do (
    set APP_NAME=%%~nxa
    echo %APP_NAME%
)
