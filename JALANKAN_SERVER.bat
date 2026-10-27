@echo off
title SIB-BM - Laravel Server (Ponpes Bahrul Maghfiroh)
color 0A
cls
echo ===================================================================
echo     MENJALANKAN SERVER RESMI LARAVEL SIB-BM
echo     KKN REGULER UNIVERSITAS NEGERI MALANG - TEKNIK INFORMATIKA 2023
echo ===================================================================
echo.

REM 1. Periksa file konfigurasi .env
if not exist .env (
    echo [*] Menyiapkan file konfigurasi .env otomatis...
    copy .env.example .env >nul
    call php artisan key:generate
)

REM 2. Periksa paket vendor composer
if not exist vendor (
    echo [*] Mengunduh dependensi pustaka Laravel (Composer)...
    call composer install
)

REM 3. Setup database MySQL jika belum ada
where mysql >nul 2>nul
if %errorlevel% equ 0 (
    mysql -u root -e "CREATE DATABASE IF NOT EXISTS sib_bm CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;" >nul 2>nul
    mysql --default-character-set=utf8mb4 -u root sib_bm < database\sib_bm.sql >nul 2>nul
)

echo.
echo Server Laravel sedang berjalan di:
echo http://127.0.0.1:8000 (atau http://sib-bm.test jika via Laragon)
echo.
echo * JANGAN TUTUP jendela ini selama web sedang diakses *
echo * Untuk mematikan server, tekan Ctrl+C atau tutup jendela ini *
echo ===================================================================
echo.
start http://127.0.0.1:8000
php artisan serve --port=8000
pause
