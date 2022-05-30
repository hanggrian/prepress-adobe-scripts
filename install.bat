:: Windows executable to sync scripts to Adobe installation paths.

@echo off

setlocal EnableDelayedExpansion

set END=[0m
set BOLD=[1m
set UNDERLINE=[4m
set RED=[91m
set GREEN=[92m
set YELLOW=[93m

:: Check sources
if not exist "!SOURCE_ROOT!.stdlib" goto :fail_sources
if not exist "!SOURCE_ROOT!.stdres" goto :fail_sources
if not exist "!SOURCE_ROOT!Illustrator Scripts" goto :fail_sources
if not exist "!SOURCE_ROOT!Photoshop Scripts" goto :fail_sources
if not exist "!SOURCE_ROOT!Actions" goto :fail_sources

:: Check permissions
net session >nul 2>&1
if !errorLevel! neq 0 goto :fail_permissions

:: SOURCE_ROOT ends with backslash
set SOURCE_ROOT=%~dp0

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

if "!input!" equ "1" (
  call :patch_app "Illustrator" "aia"
) else if "!input!" equ "2" (
  call :patch_app "Photoshop" "atn"
) else if "!input!" equ "a" (
  call :patch_app "Illustrator" "aia"
  call :patch_app "Photoshop" "atn"
) else if "!input!" equ "A" (
  call :patch_app "Illustrator" "aia"
  call :patch_app "Photoshop" "atn"
) else if "!input!" equ "q" (
  rem
) else if "!input!" equ "Q" (
  rem
) else (
  goto :fail_input
)

echo.
echo Goodbye^^!
echo.
pause
exit /b 0

:: Find adobe apps and determine its scripts directory parent.
:: In Windows, we manually do this manually. Check if `Presets` directly contain `Scripts` directory.
:patch_app
  setlocal
  set name=%~1
  set action_extension=%~2
  set scripts_filename=!name! Scripts
  set action_filename=Prepress Adobe Scripts.!action_extension!
  set "success="

  echo.
  echo Patching !name!...

  for /d %%a in ("!ProgramFiles!\Adobe\*") do (
    set app_name=%%~nxa
    if "!app_name:%name%=!" neq "!app_name!" (
      set presets=%%a\Presets
      if not exist "!presets!\Scripts" (
        for /d %%p in ("!presets!\*") do (
          set "success=y"
          call :patch_preset "%%a" "!scripts_filename!" "!action_filename!" "%%p"
        )
      ) else (
        set "success=y"
        call :patch_preset "%%a" "!scripts_filename!" "!action_filename!" "!presets!"
      )
    )
  )
  if not defined success (
    echo !RED!Not found.!END!
  )

  if exist "!ProgramFiles(x86)!" (
    set "success="
    echo.
    echo Patching 32-bit !name!...

    for /d %%a in ("!ProgramFiles(x86)!\Adobe\*") do (
      set app_name=%%~nxa
      if "!app_name:%name%=!" neq "!app_name!" (
        set presets=%%a\Presets
        if not exist "!presets!\Scripts" (
          for /d %%p in ("!presets!\*") do (
            set "success=y"
            call :patch_preset "%%a" "!scripts_filename!" "!action_filename!" "%%p"
          )
        ) else (
          set "success=y"
          call :patch_preset "%%a" "!scripts_filename!" "!action_filename!" "!presets!"
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
  set full_name=%~1
  set scripts_filename=%~2
  set action_filename=%~3
  set target_root=%~4

  echo - !GREEN!!full_name!!END!

  :: Delete existing
  if exist "!target_root!\.stdlib" (
    rmdir /s /q "!target_root!\.stdlib"
    md "!target_root!\.stdlib"
  )
  if exist "!target_root!\.stdres" (
    rmdir /s /q "!target_root!\.stdres"
    md "!target_root!\.stdres"
  )
  if exist "!target_root!\Scripts" (
    rmdir /s /q "!target_root!\Scripts"
    md "!target_root!\Scripts"
  )
  if exist "!target_root!\Actions\!action_filename!" (
    del "!target_root!\Actions\!action_filename!"
  )
  :: Copy new ones
  robocopy /s "!SOURCE_ROOT!.stdlib" "!target_root!\.stdlib" /njh /njs /ndl /nc /ns /nfl
  robocopy /s "!SOURCE_ROOT!.stdres" "!target_root!\.stdres" /njh /njs /ndl /nc /ns /nfl
  robocopy /s "!SOURCE_ROOT!!scripts_filename!" "!target_root!\Scripts" /njh /njs /ndl /nc /ns /nfl
  robocopy "!SOURCE_ROOT!Actions" "!target_root!\Actions" "!action_filename!" /njh /njs /ndl /nc /ns /nfl
  :: Clean up
  del "!target_root!\.stdres\script\check_updates.command"
  rmdir /s /q "!target_root!\Scripts\.incubating"
  endlocal
goto :eof

:fail_permissions
  echo.
  echo !RED!Administrative permissions required.!END!
  echo.
  pause
exit /b 1

:fail_sources
  echo.
  echo !RED!Missing sources.!END!
  echo.
  pause
exit /b 1

:fail_input
  echo.
  echo !RED!Unable to recognize input.!END!
  echo.
  pause
exit /b 1