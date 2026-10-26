# SIB-BM (Sistem Informasi Bangunan Bahrul Maghfiroh)
### Karya Pengabdian Masyarakat — Mahasiswa KKN Universitas Negeri Malang (UM)

Sistem Informasi Geografis & Bangunan interaktif berbasis web untuk mendokumentasikan tata letak fasilitas, ukuran luas tanah, luas bangunan, daya tampung santri, dan pembagian ruang di **Pondok Pesantren Bahrul Maghfiroh, Lowokwaru, Kota Malang**.

---

## 🚀 Fitur Utama

1. **Landing Page Identitas KKN UM & Ponpes**:
   - Menampilkan identitas resmi Universitas Negeri Malang (UM), nama DPL, serta daftar anggota tim KKN (Nama, NIM, Jurusan, dan Peran).
2. **Peta Interaktif Drone Kawasan Ponpes**:
   - Menggunakan foto tampak atas / drone kawasan pesantren dari luar.
   - Dilengkapi **Pin Interaktif Berkedip (Hotspot)** di setiap gedung (Masjid, Asrama Putra, Asrama Putri, Sekolah/Madrasah, Kantor Ndalem, Klinik & Kantin, Aula).
   - Dilengkapi penunjuk **Gerbang Masuk Utama** (Jl. Joyo Agung).
3. **Popup / Modal Rincian Spesifikasi Gedung Lengkap**:
   - **📐 Luas Tanah (m²)**
   - **🏢 Luas Bangunan (m²)**
   - **👥 Kapasitas / Daya Tampung (Santri/Jamaah/Siswa)**
   - **🪜 Jumlah Lantai & Pembagian Fungsi tiap Lantai** (contoh: Lantai 1 untuk kantor, Lantai 2 untuk asrama)
   - **🛠️ Checklist Fasilitas Lengkap** (AC, Kamar Mandi, Wifi, Sound, dll)
   - **📸 Foto Nyata Masing-masing Gedung**
4. **Pencarian & Filter Kategori**:
   - Filter cepat berdasarkan kategori: *Ibadah*, *Asrama*, *Pendidikan*, *Administrasi*, dan *Fasilitas*.
   - Search bar pintar real-time.
5. **Direktori Katalog Gedung**:
   - Menampilkan kartu ringkasan seluruh gedung bagi pengguna yang ingin melihat langsung tanpa peta.

---

## 📂 Struktur File

```
project_kkn/
├── index.html        # Halaman utama aplikasi web (Landing Page + Peta + Modal)
├── data-gedung.js    # Tempat mengubah nama gedung, luas tanah, fasilitas, foto, & tim KKN
├── app.js            # Logika interaktif klik pin, modal, pencarian, dan filter
└── README.md         # Panduan penggunaan & presentasi KKN
```

---

## 🛠️ Cara Mengubah Data Gedung & Nama Tim KKN

Semua data sudah dipisahkan rapi di file **`data-gedung.js`**. Kalian **tidak perlu mengubah kode HTML** jika hanya ingin mengganti data!

### 1. Mengubah Data Gedung (Luas, Fasilitas, dll)
Buka file `data-gedung.js`, cari bagian objek gedung:
```javascript
{
  id: "masjid-jami",
  kode: "G-01",
  nama: "Masjid Jami' Bahrul Maghfiroh",
  kategori: "Ibadah",
  luas_tanah: "1.200 m²",       // <-- Ganti dengan hasil survei luas tanah riil
  luas_bangunan: "1.800 m²",    // <-- Ganti dengan hasil pengukuran bangunan riil
  jumlah_lantai: 2,
  kapasitas: "± 2.000 Jamaah",  // <-- Ganti daya tampung
  fasilitas_utama: [
    "Ruang Sholat Utama",
    "Tempat Wudhu 50 Kran"      // <-- Tambah / kurangi fasilitas
  ],
  foto: "link_foto_gedung.jpg", // <-- Masukkan foto tampak depan gedung
  posisi: { top: "34%", left: "48%" } // <-- Posisi pin di peta drone (%)
}
```

### 2. Mengisi Nama Anggota Tim KKN & DPL
Di bagian bawah file `data-gedung.js`, cari variabel `DATA_TIM_KKN`:
```javascript
const DATA_TIM_KKN = {
  dpl: "Nama DPL Kalian, M.Pd.",
  anggota: [
    { nama: "Nama Lengkapmu", nim: "210xxxx", prodi: "Teknik Informatika", peran: "Web Developer" },
    ...
  ]
};
```

---

## 💡 Cara Menjalankan Web

Web ini dirancang **sangat ringan dan mandiri** (tanpa database rumit & tanpa billing Google Maps).
1. **Cara Paling Cepat**: Cukup **klik 2x file `index.html`**, maka web langsung terbuka di browser (Chrome, Edge, Firefox).
2. **Online Gratis (Untuk ditunjukkan ke Dosen & Ponpes)**:
   - File ini bisa langsung diunggah ke **GitHub Pages**, **Vercel**, atau **Netlify** secara gratis 100% sehingga bisa dibuka siapa saja lewat HP melalui link web khusus.
