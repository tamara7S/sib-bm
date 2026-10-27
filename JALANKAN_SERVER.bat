@echo off
title SIB-BM - Laravel Server (Ponpes Bahrul Maghfiroh)
color 0A
cls
echo ===================================================================
echo     MENJALANKAN SERVER RESMI LARAVEL SIB-BM
echo     KKN REGULER UNIVERSITAS NEGERI MALANG - TEKNIK INFORMATIKA 2023
echo ===================================================================
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
