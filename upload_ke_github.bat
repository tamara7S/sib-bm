@echo off
title Upload Proyek SIB-BM ke GitHub
color 0A
cls
echo ===================================================================
echo       UPLOAD PROYEK SIB-BM KE GITHUB (KKN UNIVERSITAS NEGERI MALANG)
echo ===================================================================
echo Akun GitHub terdeteksi: tamara7S
echo ===================================================================
echo.
git add .
git commit -m "update: tambahkan dashboard pemilik, background video drone, dan rapikan data gedung"
git push -u origin main

echo.
echo ===================================================================
if %ERRORLEVEL% EQU 0 (
    echo [BERHASIL!] Perubahan berhasil di-upload ke GitHub!
) else (
    echo [CATATAN] Periksa koneksi internet atau login GitHub kamu.
)
echo ===================================================================
echo.
pause
