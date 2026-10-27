@echo off
cd /d "%~dp0"
node --version >nul 2>&1
if errorlevel 1 (
 echo Node.js is not installed. Install it from https://nodejs.org/ then run this file again.
 pause
 exit /b
)
start "MyStudio server - keep open" cmd /k node server.js
timeout /t 2 /nobreak >nul
start "" http://localhost:3000
