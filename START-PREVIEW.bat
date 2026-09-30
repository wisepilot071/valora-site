@echo off
title VALORA preview
cd /d "%~dp0"

echo.
echo  ===============================
echo    VALORA - starting preview
echo  ===============================
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo  Node.js is not installed on this computer.
  echo.
  echo  1. The download page will open now. Click the big "LTS" button.
  echo  2. Run the installer and keep clicking Next.
  echo  3. When it finishes, double-click START-PREVIEW.bat again.
  echo.
  start "" https://nodejs.org/en/download
  pause
  exit /b 1
)

for /f "tokens=1 delims=v." %%a in ('node -v') do set NODEMAJOR=%%a
for /f "tokens=1 delims=." %%a in ('node -v') do set NODEV=%%a
echo  Node.js found:
node -v
echo.

if not exist "node_modules\next" (
  echo  Installing packages - first time only, takes 1-3 minutes...
  echo.
  call npm install
  if errorlevel 1 (
    echo.
    echo  Install failed. Take a screenshot of this window and send it to Claude.
    pause
    exit /b 1
  )
)

echo.
echo  Starting the site. Your browser will open at http://localhost:3000
echo  Keep this window open while you browse. Close it to stop the site.
echo.
start "" cmd /c "timeout /t 8 >nul && start http://localhost:3000"
call npm run dev
echo.
echo  The site stopped. If you saw an error above, screenshot it and send it to Claude.
pause
