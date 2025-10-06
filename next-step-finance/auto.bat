@echo off
setlocal enabledelayedexpansion

echo ========================================
echo Next Step Finance - Full Automated Setup and APK Build (Fixed Version)
echo ========================================
echo Date: %date% %time%
echo.
echo WARNING: Run as Administrator! This installs Node.js, Git, Tor silently.
echo Edit variables (REPO_URL, secrets) before running.
echo Press any key to continue...
pause > nul

REM User Configuration - EDIT THESE
set REPO_URL=https://github.com/yourusername/next-step-finance.git  REM Your repo URL
set PROJECT_DIR=next-step-finance
set NODE_VERSION=22.9.0
set NODE_INSTALLER_URL=https://nodejs.org/dist/v%NODE_VERSION%/node-v%NODE_VERSION%-x64.msi
set GIT_VERSION=2.47.0.windows.1
set GIT_INSTALLER_URL=https://github.com/git-for-windows/git/releases/download/v%GIT_VERSION%/Git-2.47.0-64-bit.exe
set TOR_DIR=C:\Tor
set TOR_VERSION=14.0.3
set TOR_URL=https://archive.torproject.org/tor-package-archive/torbrowser/%TOR_VERSION%/tor-expert-bundle-windows-x86_64-%TOR_VERSION%.tar.gz
set MONGO_URI=mongodb://localhost:27017/nextstepfinance  REM Or Atlas URI
set JWT_SECRET=your_super_secret_jwt_key_here_change_me
set TWILIO_SID=your_twilio_sid
set TWILIO_TOKEN=your_twilio_token
set TWILIO_PHONE=+1234567890
set ONION_HOSTNAME_DIR=%TOR_DIR%\hs

REM Step 1: Install Node.js silently if missing
echo.
echo [1/10] Checking/Installing Node.js...
node -v >nul 2>&1
if errorlevel 1 (
    echo Downloading Node.js v%NODE_VERSION%...
    powershell -Command "Invoke-WebRequest -Uri '%NODE_INSTALLER_URL%' -OutFile node.msi"
    echo Installing silently...
    msiexec /i node.msi /qn /norestart
    del node.msi
    set PATH=%PATH%;C:\Program Files\nodejs\
    echo Node.js installed.
) else (
    echo Node.js already installed.
)

REM Step 2: Install Git silently if missing
echo.
echo [2/10] Checking/Installing Git...
git --version >nul 2>&1
if errorlevel 1 (
    echo Downloading Git v%GIT_VERSION%...
    powershell -Command "Invoke-WebRequest -Uri '%GIT_INSTALLER_URL%' -OutFile git.exe"
    echo Installing silently...
    start /wait git.exe /VERYSILENT /NORESTART /NOCANCEL /SP- /SUPPRESSMSGBOXES
    del git.exe
    set PATH=%PATH%;C:\Program Files\Git\cmd\
    echo Git installed.
) else (
    echo Git already installed.
)

REM Step 3: Install Expo and EAS CLI globally
echo.
echo [3/10] Installing Expo/EAS CLI...
npm install -g @expo/cli eas-cli

REM Step 4: Setup Tor Hidden Service
echo.
echo [4/10] Setting up Tor...
if not exist "%TOR_DIR%" (
    echo Downloading Tor v%TOR_VERSION%...
    powershell -Command "Invoke-WebRequest -Uri '%TOR_URL%' -OutFile tor.tar.gz"
    mkdir "%TOR_DIR%"
    tar -xzf tor.tar.gz -C "%TOR_DIR%" --strip-components=1
    del tor.tar.gz
)

set TORRC=%TOR_DIR%\torrc
echo Log notice file %TOR_DIR%\tor.log > "%TORRC%"
echo DataDirectory %TOR_DIR% >> "%TORRC%"
echo HiddenServiceDir %ONION_HOSTNAME_DIR% >> "%TORRC%"
echo HiddenServiceVersion 3 >> "%TORRC%"
echo HiddenServicePort 80 127.0.0.1:3000 >> "%TORRC%"

cd /d "%TOR_DIR%"
tor.exe --service remove >nul 2>&1  REM Clean up if exists
tor.exe --service install -options -f "%TORRC%"
sc start tor
echo Waiting 30s for Tor to bootstrap...
timeout /t 30 /nobreak > nul

if exist "%ONION_HOSTNAME_DIR%\hostname" (
    set /p ONION_URL=<%ONION_HOSTNAME_DIR%\hostname
    echo Onion URL: http://%ONION_URL%
) else (
    echo Tor failed. Check %TOR_DIR%\tor.log
    pause
    exit /b 1
)

REM Step 5: Clone/Pull Project
echo.
echo [5/10] Cloning/Pulling Project...
if not exist "%PROJECT_DIR%" (
    git clone "%REPO_URL%" "%PROJECT_DIR%"
) else (
    cd "%PROJECT_DIR%"
    git pull
)
cd "%PROJECT_DIR%"

REM Step 6: Root Dependencies
echo.
echo [6/10] Installing Root Dependencies...
npm install

REM Step 7: Backend Setup
echo.
echo [7/10] Backend Setup...
cd backend
npm install
copy .env.example .env >nul 2>&1
powershell -Command "(Get-Content .env) -replace 'MONGO_URI=.*', 'MONGO_URI=%MONGO_URI%' | Set-Content .env"
powershell -Command "(Get-Content .env) -replace 'JWT_SECRET=.*', 'JWT_SECRET=%JWT_SECRET%' | Set-Content .env"
powershell -Command "(Get-Content .env) -replace 'TWILIO_SID=.*', 'TWILIO_SID=%TWILIO_SID%' | Set-Content .env"
powershell -Command "(Get-Content .env) -replace 'TWILIO_TOKEN=.*', 'TWILIO_TOKEN=%TWILIO_TOKEN%' | Set-Content .env"
powershell -Command "(Get-Content .env) -replace 'TWILIO_PHONE=.*', 'TWILIO_PHONE=%TWILIO_PHONE%' | Set-Content .env"
mkdir uploads server-files 2>nul

REM Auto-fix API URLs with onion
powershell -Command "(Get-Content ..\frontend\src\shared\services\api.ts) -replace 'baseURL:.*', 'baseURL: ''http://%ONION_URL%/api'',' | Set-Content ..\frontend\src\shared\services\api.ts"
powershell -Command "(Get-Content ..\admin-panel\src\services\api.ts) -replace 'baseURL:.*', 'baseURL: ''http://%ONION_URL%/api'',' | Set-Content ..\admin-panel\src\services\api.ts"

start "Backend Server" cmd /k "npm run dev"
timeout /t 5 /nobreak > nul

REM Step 8: Admin Panel Setup
echo.
echo [8/10] Admin Panel Setup...
cd ..\admin-panel
npm install
start "Admin Panel" cmd /k "npm start"
timeout /t 5 /nobreak > nul

REM Step 9: Frontend Setup
echo.
echo [9/10] Frontend Setup...
cd ..\frontend
npm install
npx expo install --fix

REM Step 10: Build APK
echo.
echo [10/10] Building APK...
eas build:configure --non-interactive
powershell -Command "(Get-Content eas.json) -replace '\"buildType\": \"aab\"', '\"buildType\": \"apk\"' | Set-Content eas.json"
eas build --platform android --profile preview --non-interactive
echo Build submitted! Download APK from Expo dashboard (expo.dev).

echo ========================================
echo Setup Complete!
echo - Tor Onion: http://%ONION_URL%
echo - Backend: Running (localhost:3000)
echo - Admin: http://localhost:3000
echo - APK: Check Expo for link
echo Edit backend/.env for real secrets!
echo ========================================
pause