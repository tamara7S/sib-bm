@echo off
title Setup Database SIB-BM di Laragon
color 0B
cls
echo ===================================================================
echo      SETUP OTOMATIS DATABASE MYSQL SIB-BM (LARAGON)
echo      Pondok Pesantren Bahrul Maghfiroh - KKN Reguler UM 2023
echo ===================================================================
echo.
echo Sedang membuat database 'sib_bm' dan mengimpor seluruh data gedung...
echo.

set MYSQL_PATH=C:\laragon\bin\mysql\mysql-8.4.3-winx64\bin\mysql.exe

if not exist "%MYSQL_PATH%" (
    for /d %%D in (C:\laragon\bin\mysql\*) do (
        if exist "%%D\bin\mysql.exe" set MYSQL_PATH=%%D\bin\mysql.exe
    )
)

if exist "%MYSQL_PATH%" (
    "%MYSQL_PATH%" -u root -e "CREATE DATABASE IF NOT EXISTS sib_bm CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
    "%MYSQL_PATH%" --default-character-set=utf8mb4 -u root sib_bm < "%~dp0sib_bm.sql"
    echo [BERHASIL] Database 'sib_bm' berhasil dibuat dan terisi lengkap di Laragon!
) else (
    mysql -u root -e "CREATE DATABASE IF NOT EXISTS sib_bm CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
    mysql --default-character-set=utf8mb4 -u root sib_bm < "%~dp0sib_bm.sql"
    echo [BERHASIL] Database 'sib_bm' berhasil diimpor!
)

echo.
echo Sekarang buka Laragon -> Klik 'Database' -> Database 'sib_bm' sudah muncul!
echo ===================================================================
pause
