@echo off

set exitlevel=0

pushd "%~dp0"

call pnpm install

call pnpm run darken %*
if %errorlevel% neq 0 (
  set exitlevel=%errorlevel%
  pause
  goto exit
)

:exit
popd

exit /b %exitlevel%
