:: Windows executable to sync scripts to Adobe installation paths.

@echo off
setlocal EnableDelayedExpansion

set END=[0m
set BOLD=[1m
set UNDERLINE=[4m
set RED=[91m
set GREEN=[92m
set YELLOW=[93m

:: SOURCE_ROOT ends with backslash
set "SOURCE_ROOT=%~dp0"

:: check permissions
net session >nul 2>&1
if !errorLevel! neq 0 set "DIE_MSG=Root access required." & goto :die

:: check sources
if not exist "!SOURCE_ROOT!.stdlib" set "DIE_MSG=Missing hidden directories." & goto :die
if not exist "!SOURCE_ROOT!.stdres" set "DIE_MSG=Missing hidden directories." & goto :die
if not exist "!SOURCE_ROOT!Illustrator Scripts" set "DIE_MSG=Missing scripts." & goto :die
if not exist "!SOURCE_ROOT!Photoshop Scripts" set "DIE_MSG=Missing scripts." & goto :die
if not exist "!SOURCE_ROOT!Actions" set "DIE_MSG=Missing actions." & goto :die

echo.
echo !BOLD!!UNDERLINE!Prepress Adobe Scripts Installer!END!
echo.
echo !YELLOW!!BOLD!WARNING!END!
call :warn !YELLOW!This command will replace all existing scripts, backup if necessary.!END!
echo.
echo 1. Illustrator
echo 2. Photoshop
echo A. All
echo.
echo Q. Quit
echo.
set /p input=!BOLD!Pick the app: !END!

if "!input!" equ "1" (
  call :patch_app "Illustrator" "aia"
) else if "!input!" equ "2" (
  call :patch_app "Photoshop" "atn"
) else if "!input!" equ "A" (
  call :patch_app "Illustrator" "aia"
  call :patch_app "Photoshop" "atn"
) else if "!input!" equ "a" (
  call :patch_app "Illustrator" "aia"
  call :patch_app "Photoshop" "atn"
) else if "!input!" equ "Q" (
  rem
) else if "!input!" equ "q" (
  rem
) else (
  set "DIE_MSG=Unable to recognize input." & goto :die
)

echo.
echo Goodbye^^!
echo.
pause
exit /b 0

:: Find Adobe apps and determine its scripts directory parent.
:: In Windows, we manually do this manually. Check if `Presets` directly contain `Scripts` directory.
:patch_app
  setlocal
  set "name=%~1"
  set "action_extension=%~2"
  set "scripts_filename=!name! Scripts"
  set "action_filename=Prepress Adobe Scripts.!action_extension!"
  set "success="

  echo.
  echo Patching !name!...

  :: find matching Adobe app
  for /d %%a in ("!ProgramFiles!\Adobe\*") do (
    set "app_name=%%~nxa"
    if "!app_name:%name%=!" neq "!app_name!" (
      set "presets=%%a\Presets"
      if not exist "!presets!\Scripts" (
        :: in Illustrator, scripts are located within `$root/Presets/$LOCALE`
        for /d %%p in ("!presets!\*") do (
          set "preset_name=%%~nxp"
          if "!preset_name:~0,3!" equ "en_" (
            set "success=y"
            call :patch_preset "!scripts_filename!" "!action_filename!" "%%p"
          )
        )
      ) else (
        :: in Photoshop, scripts are located within `$root`
        set "success=y"
        call :patch_preset "!scripts_filename!" "!action_filename!" "!presets!"
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

    :: find matching Adobe app
    for /d %%a in ("!ProgramFiles(x86)!\Adobe\*") do (
      set "app_name=%%~nxa"
      if "!app_name:%name%=!" neq "!app_name!" (
        set "presets=%%a\presets"
        if not exist "!presets!\Scripts" (
          :: in Illustrator, scripts are located within `$root/Presets/$LOCALE`
          for /d %%p in ("!presets!\*") do (
            set "preset_name=%%~nxp"
            if "!preset_name:~0,3!" equ "en_" (
              set "success=y"
              call :patch_preset "!scripts_filename!" "!action_filename!" "%%p"
            )
          )
        ) else (
          :: in Photoshop, scripts are located within `$root`
          set "success=y"
          call :patch_preset "!scripts_filename!" "!action_filename!" "!presets!"
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
  set "scripts_filename=%~1"
  set "action_filename=%~2"
  set "target_root=%~3"

  echo - !GREEN!!target_root!!END!

  :: delete existing
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
  :: copy new ones
  robocopy /s "!SOURCE_ROOT!.stdlib" "!target_root!\.stdlib" /njh /njs /ndl /nc /ns /nfl
  robocopy /s "!SOURCE_ROOT!.stdres" "!target_root!\.stdres" /njh /njs /ndl /nc /ns /nfl
  robocopy /s "!SOURCE_ROOT!!scripts_filename!" "!target_root!\Scripts" /njh /njs /ndl /nc /ns /nfl
  robocopy "!SOURCE_ROOT!Actions" "!target_root!\Actions" "!action_filename!" /njh /njs /ndl /nc /ns /nfl
  :: clean up
  del "!target_root!\.stdres\script\check_updates.command"
  rmdir /s /q "!target_root!\Scripts\.incubating"
  rmdir /s /q "!target_root!\Scripts\.lib-test"
  endlocal
  goto :eof

:warn
  echo !YELLOW!%*!END!
  goto :eof

:die
  echo.
  echo !RED!!DIE_MSG!!END!
  echo.
  pause
  exit /b 1
