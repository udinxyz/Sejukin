@echo off
title Sejukin Web Server
echo ===================================================
echo   Menjalankan Server Website Sejukin di Port 8000
echo   Tekan CTRL + C atau tutup jendela ini untuk berhenti
echo ===================================================
timeout /t 1 /nobreak >nul
start http://localhost:8000
python -m http.server 8000
pause
