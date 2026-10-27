# SIB-BM • Sistem Informasi Bangunan Bahrul Maghfiroh
**Aplikasi Web Resmi Berbasis Laravel Framework**  
Dikembangkan oleh **Tim KKN Reguler Universitas Negeri Malang (UM)**  
*Program Studi S1 Teknik Informatika — Angkatan 2023*

---

## 📌 Tentang Proyek
**SIB-BM (Sistem Informasi Bangunan Bahrul Maghfiroh)** adalah platform sistem informasi sarana dan prasarana interaktif berbasis web untuk **Pondok Pesantren Bahrul Maghfiroh**, beralamat di:  
> **Jl. Joyo Agung Atas no. 02., Kota Malang, Provinsi Jawa Timur**

Sistem ini memvisualisasikan peta kawasan pesantren secara interaktif menggunakan citra satelit presisi (Google Hybrid Satellite via Leaflet.js), menyajikan informasi detail setiap gedung (luas tanah, luas bangunan, kapasitas santri, fungsi gedung, foto asli), video kawasan drone, serta panel kontrol pengelola (admin ponpes) untuk pembaruan data secara dinamis.

---

## 🚀 Arsitektur & Teknologi (100% Bebas Lisensi / Open-Source)
Sistem ini dibangun secara resmi menggunakan standar industri dan akademik modern:
- **Framework Utama:** Laravel Framework (PHP 8.3+) — Lisensi MIT (Gratis & Terbuka)
- **Arsitektur:** Model-View-Controller (MVC) & Blade Templating Engine
- **Router & Controller:**
  - Route `/` (`route('beranda')`) &rarr; `GedungController@index`
  - Route `/admin` (`route('admin')`) &rarr; `GedungController@admin`
- **Peta Interaktif:** Leaflet.js & Google Hybrid Tiles Layer (Presisi koordinat `[-7.93870, 112.59390]` kubah Masjid Jami')
- **Styling & Tipografi:** Tailwind CSS & Plus Jakarta Sans (Google Fonts)
- **Ikon:** Font Awesome 6.5 (Gratis)
- **Database / Penyimpanan:** SQLite & LocalStorage Cache

---

## 💻 Cara Menjalankan Proyek

### 1. Menjalankan Menggunakan Laragon (Direkomendasikan)
1. Buka aplikasi **Laragon**.
2. Klik tombol **"Start All"** (Apache & MySQL akan menyala).
3. Buka browser dan ketik alamat:
   ```
   http://sib-bm.test
   ```
   *(Atau bisa juga melalui: `http://localhost/sib-bm`)*

### 2. Menjalankan Menggunakan Laravel Artisan
Kamu juga dapat menjalankan server bawaan Laravel dengan mudah:
- Klik dua kali file: **`JALANKAN_SERVER.bat`**
- Atau jalankan perintah berikut di terminal:
  ```bash
  php artisan serve --port=8000
  ```
- Buka browser di: `http://127.0.0.1:8000`

---

## 🔐 Akses Panel Pengelola / Admin
- **Halaman Admin:** `http://sib-bm.test/admin`
- **Username:** `admin_ponpes`
- **Password:** `bahrulmaghfiroh2026`

---

## 📁 Struktur Direktori Laravel
```
project_kkn/
├── app/
│   └── Http/Controllers/
│       └── GedungController.php    <-- Controller Beranda & Admin
├── bootstrap/                      <-- Konfigurasi boot Laravel
├── config/                         <-- Konfigurasi aplikasi
├── database/                       <-- Migrasi & SQLite database
├── public/                         <-- Root publik web server (Laragon DocumentRoot)
│   ├── images/                     <-- Foto gedung & logo Ponpes BM
│   ├── js/                         <-- Script peta & data
│   ├── videos/                     <-- Video kawasan ponpes
│   └── index.php                   <-- Entry point resmi Laravel
├── resources/
│   └── views/
│       ├── beranda.blade.php       <-- Blade View Halaman Utama & Peta Satelit
│       └── admin.blade.php         <-- Blade View Dashboard Pemilik/Admin
├── routes/
│   └── web.php                     <-- Definisi rute resmi Laravel
├── storage/                        <-- Log & session cache
├── .env                            <-- Environment variable Laravel
├── artisan                         <-- CLI Laravel Runner
├── composer.json                   <-- Dependensi Composer
└── JALANKAN_SERVER.bat             <-- Runner 1-klik untuk presentasi
```

---

## 📄 Lisensi
Seluruh pustaka dan framework yang digunakan bersifat **100% Open-Source (MIT / Apache License)** tanpa pembelian lisensi komersial.

© 2026 SIB-BM • Dikembangkan oleh **Tim KKN Reguler Universitas Negeri Malang — S1 Teknik Informatika Angkatan 2023**.
