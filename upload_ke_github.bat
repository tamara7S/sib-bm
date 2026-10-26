@echo off
title Upload Proyek SIB-BM ke GitHub
color 0A
cls
echo ===================================================================
echo       UPLOAD PROYEK SIB-BM KE GITHUB (KKN UNIVERSITAS NEGERI MALANG)
echo ===================================================================
echo Akun GitHub terdeteksi: tamara7S
echo Email: tamara.rani.2305356@students.um.ac.id
echo ===================================================================
echo.
echo Pastikan kamu SUDAH membuat repository baru di:
echo https://github.com/new
echo.
set /p REPO_NAME="Masukkan nama repository yang kamu buat (default: sib-bm): "
if "%REPO_NAME%"=="" set REPO_NAME=sib-bm

echo.
echo [1/3] Menghubungkan remote GitHub ke https://github.com/tamara7S/%REPO_NAME%.git ...
git remote remove origin 2>nul
git remote add origin https://github.com/tamara7S/%REPO_NAME%.git
git branch -M main

echo.
echo [2/3] Mengunggah file ke GitHub (Push ke branch main)...
echo (Jika muncul jendela login, silakan klik 'Sign in with your browser')
git push -u origin main

echo.
echo ===================================================================
if %ERRORLEVEL% EQU 0 (
    echo [BERHASIL!] Proyek berhasil di-upload ke:
    echo https://github.com/tamara7S/%REPO_NAME%
    echo.
    echo Jangan lupa aktifkan GitHub Pages di tab Settings -^> Pages
    echo agar web langsung punya link online: https://tamara7s.github.io/%REPO_NAME%/
) else (
    echo [CATATAN] Jika gagal, pastikan nama repository di GitHub sudah dibuat
    echo dan kamu sudah login ke akun GitHub kamu.
)
echo ===================================================================
echo.
pause
