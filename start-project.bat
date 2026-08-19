@echo off
title Appliance Energy Profiler - Setup and Run
echo ============================================================
echo   Starting Appliance Energy Profiler Server...
echo ============================================================
echo.

:: 1. CHECK FOR NODE.JS RUNTIME
where node >nul 2>nul
if %errorlevel% equ 0 goto node_detected

echo [ALERT] Node.js runtime environment was NOT found on this system.
echo.
set /p INSTALL_NODE="Would you like to download and install Node.js v20 (LTS) automatically? (Y/N): "
if /i "%INSTALL_NODE%"=="Y" goto download_node
if /i "%INSTALL_NODE%"=="Yes" goto download_node
goto no_node_exit

:download_node
echo.
echo [INFO] Downloading Node.js installer (MSI)... Please wait.
powershell -Command "Invoke-WebRequest -Uri 'https://nodejs.org/dist/v20.11.1/node-v20.11.1-x64.msi' -OutFile '%temp%\node-install.msi'"
if %errorlevel% neq 0 goto download_failed

echo [INFO] Launching the installer... Please follow the installation wizard.
start /wait msiexec.exe /i "%temp%\node-install.msi"
echo.
echo [SUCCESS] Installation completed. 
echo [IMPORTANT] Please restart this command window/script to apply the changes.
echo.
pause
exit /b

:download_failed
echo [ERROR] Failed to download the Node.js installer. Please check your internet connection.
pause
exit /b

:no_node_exit
echo [ERROR] Node.js is required to run this project. Exiting.
pause
exit /b

:node_detected
echo [OK] Node.js runtime detected.
echo.

:: 2. CHECK FOR NODE_MODULES DEPENDENCIES
if not exist "%~dp0node_modules\" goto deps_missing
echo [OK] Project dependencies (node_modules) folder detected.
set /p REINSTALL_DEPS="Do you want to reinstall/update dependencies? (Y/N) [default: N]: "
if /i "%REINSTALL_DEPS%"=="Y" goto install_deps
goto run_project

:deps_missing
echo [ALERT] Project dependencies (node_modules) are not installed yet.
set /p INSTALL_DEPS="Would you like to install the required packages now? (Y/N): "
if /i "%INSTALL_DEPS%"=="Y" goto install_deps
echo [WARNING] Proceeding without installing dependencies. Server might fail to start.
echo.
goto run_project

:install_deps
echo.
echo [INFO] Checking/Installing Node.js dependencies (npm install)...
call npm install
if %errorlevel% neq 0 (
    echo.
    echo [WARNING] Package installation encountered issues. Let's try running the server anyway.
) else (
    echo [OK] Project dependencies installed successfully.
)
echo.

:run_project
:: 3. RUN THE PROJECT
echo ============================================================
echo Launching Express Server (node server.js)...
echo ============================================================
echo.
start http://localhost:3000
node server.js

echo.
echo ============================================================
echo Server has stopped.
pause
