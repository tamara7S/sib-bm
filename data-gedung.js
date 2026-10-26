// Data Bangunan dan Fasilitas Pondok Pesantren Bahrul Maghfiroh (SIB-BM)
// Format ini sangat mudah diubah, ditambah, atau dikurangi oleh tim KKN UM.

const DATA_GEDUNG = [
  {
    id: "masjid-jami",
    kode: "G-01",
    nama: "Masjid Jami' Bahrul Maghfiroh",
    kategori: "Ibadah",
    tagColor: "emerald",
    deskripsi: "Pusat kegiatan ibadah mahdhoh, sholat berjamaah lima waktu, sholat Jumat, dan pengajian akbar santri serta masyarakat.",
    luas_tanah: "1.200 m²",
    luas_bangunan: "1.800 m²",
    jumlah_lantai: 2,
    kapasitas: "± 2.000 Jamaah",
    fasilitas_utama: [
      "Ruang Sholat Utama (Karpet Premium)",
      "Sound System Terintegrasi",
      "Tempat Wudhu Putra & Putri Terpisah (50 Kran)",
      "Toilet & Kamar Mandi Bersih",
      "Mezanin Lantai 2 untuk Jamaah Tambahan",
      "Mimbar Kayu Jati Ukir",
      "Pendingin Ruangan (Kipas & AC)"
    ],
    pembagian_lantai: [
      { lantai: "Lantai 1", fungsi: "Ruang sholat utama jamaah putra, tempat wudhu utama, dan mimbar khutbah" },
      { lantai: "Lantai 2", fungsi: "Balkon / mezanin untuk jamaah putri, ruang kajian kitab kuning, dan perpustakaan masjid" }
    ],
    foto: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
    posisi: { top: "34%", left: "48%" }, // Posisi koordinat pada peta drone (%)
    status: "Aktif Penuh",
    kontak_pj: "Ustadz Pengurus Ta'mir"
  },
  {
    id: "asrama-putra-utama",
    kode: "G-02",
    nama: "Gedung Asrama Santri Putra (Al-Ikhlas)",
    kategori: "Asrama",
    tagColor: "blue",
    deskripsi: "Kompleks asrama tempat mukim para santri putra yang dilengkapi dengan ruang belajar komunal dan pengawasan ketat.",
    luas_tanah: "900 m²",
    luas_bangunan: "2.100 m²",
    jumlah_lantai: 3,
    kapasitas: "± 350 Santri",
    fasilitas_utama: [
      "24 Kamar Santri (Ranjang Tingkat + Kasur)",
      "Lemari Pribadi Tiap Santri",
      "Kamar Mandi & WC (18 Pintu)",
      "Area Jemuran Luas di Rooftop",
      "Ruang Belajar Bersama per Lantai",
      "Pos Keamanan & Piket Asrama 24 Jam"
    ],
    pembagian_lantai: [
      { lantai: "Lantai 1", fungsi: "Kantor pembina santri putra, kamar santri pemula/junior, dan kamar mandi utama" },
      { lantai: "Lantai 2", fungsi: "Kamar santri jenjang madrasah aliyah dan aula musyawarah" },
      { lantai: "Lantai 3", fungsi: "Kamar santri senior, ruang hafalan Al-Qur'an, dan akses rooftop jemuran" }
    ],
    foto: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
    posisi: { top: "52%", left: "28%" },
    status: "Aktif",
    kontak_pj: "Bidang Kesantrian Putra"
  },
  {
    id: "asrama-putri-ar-rahmah",
    kode: "G-03",
    nama: "Gedung Asrama Santri Putri (Ar-Rahmah)",
    kategori: "Asrama",
    tagColor: "pink",
    deskripsi: "Asrama mukim khusus santri putri dengan area tertutup (privasi terjaga) serta pengawasan ustadzah dan keamanan khusus.",
    luas_tanah: "1.100 m²",
    luas_bangunan: "2.400 m²",
    jumlah_lantai: 3,
    kapasitas: "± 400 Santriwati",
    fasilitas_utama: [
      "28 Kamar Tidur Santriwati",
      "Kamar Mandi Bersih & Higienis (20 Unit)",
      "Dapur Santri Putri & Ruang Makan",
      "Lobi Tamu Mahram (Wali Santri)",
      "Ruang Setoran Hafalan Qur'an",
      "CCTV Keamanan Area Luar"
    ],
    pembagian_lantai: [
      { lantai: "Lantai 1", fungsi: "Lobi tamu keluarga, kantor ustadzah pembina, dan ruang makan santriwati" },
      { lantai: "Lantai 2", fungsi: "Kamar-kamar santriwati tingkat SMP/MTs" },
      { lantai: "Lantai 3", fungsi: "Kamar-kamar santriwati tingkat SMA/MA dan area musyawarah" }
    ],
    foto: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    posisi: { top: "25%", left: "72%" },
    status: "Aktif",
    kontak_pj: "Bidang Kesantrian Putri"
  },
  {
    id: "gedung-pendidikan-sekolah",
    kode: "G-04",
    nama: "Gedung Pendidikan & Madrasah Terpadu",
    kategori: "Pendidikan",
    tagColor: "amber",
    deskripsi: "Gedung kegiatan belajar mengajar (KBM) formal kurikulum nasional dan kurikulum keagamaan/diniyah pesantren.",
    luas_tanah: "1.500 m²",
    luas_bangunan: "3.200 m²",
    jumlah_lantai: 3,
    kapasitas: "± 600 Siswa/Santri",
    fasilitas_utama: [
      "18 Ruang Kelas Ber-AC & LCD Proyektor",
      "Laboratorium Komputer & Bahasa",
      "Laboratorium IPA / Sains",
      "Perpustakaan Digital & Buku Fisik",
      "Ruang Guru & Kepala Sekolah",
      "Ruang Tata Usaha (TU)"
    ],
    pembagian_lantai: [
      { lantai: "Lantai 1", fungsi: "Kantor Kepala Sekolah, Ruang Guru, Ruang Tata Usaha, dan Lab Komputer" },
      { lantai: "Lantai 2", fungsi: "Ruang kelas pembelajaran tingkat MTs/SMP dan Perpustakaan" },
      { lantai: "Lantai 3", fungsi: "Ruang kelas pembelajaran tingkat MA/SMA dan Laboratorium IPA" }
    ],
    foto: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80",
    posisi: { top: "68%", left: "65%" },
    status: "Aktif KBM",
    kontak_pj: "Waka Kurikulum & Sarpras"
  },
  {
    id: "ndalem-kantor-pusat",
    kode: "G-05",
    nama: "Gedung Rektorat & Ndalem Pengasuh",
    kategori: "Administrasi",
    tagColor: "indigo",
    deskripsi: "Pusat pimpinan pondok pesantren, penerimaan tamu kehormatan, pendaftaran santri baru (PSB), dan administrasi yayasan.",
    luas_tanah: "800 m²",
    luas_bangunan: "1.000 m²",
    jumlah_lantai: 2,
    kapasitas: "± 100 Orang (Tamu & Staf)",
    fasilitas_utama: [
      "Ruang Tamu VVIP / Kediaman Pengasuh",
      "Layanan Terpadu Satu Pintu (PTSP) Pendaftaran",
      "Ruang Rapat Pimpinan Yayasan",
      "Kantor Keuangan & Administrasi",
      "Ruang Arsip Data Santri",
      "Koneksi Internet Fiber Optic"
    ],
    pembagian_lantai: [
      { lantai: "Lantai 1", fungsi: "Layanan informasi umum, kantor administrasi pendaftaran, dan lobi tamu" },
      { lantai: "Lantai 2", fungsi: "Ruang rapat pimpinan majelis dan kediaman dinas pengasuh" }
    ],
    foto: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    posisi: { top: "20%", left: "32%" },
    status: "Aktif Layanan",
    kontak_pj: "Sekretariat Ponpes"
  },
  {
    id: "aula-serbaguna",
    kode: "G-06",
    nama: "Aula Utama & Gedung Serbaguna",
    kategori: "Umum",
    tagColor: "teal",
    deskripsi: "Gedung aula kapasitas besar untuk wisuda santri, seminar nasional, pertemuan wali santri, dan pagelaran seni santri.",
    luas_tanah: "1.000 m²",
    luas_bangunan: "950 m²",
    jumlah_lantai: 1,
    kapasitas: "± 1.200 Orang",
    fasilitas_utama: [
      "Panggung Utama Megah (Stage)",
      "Sound System Line Array Hall",
      "Ruang Transit Pengisi Acara & VIP",
      "Toilet Tamu Pria & Wanita (8 Unit)",
      "Pintu Evakuasi & Sirkulasi Udara Luas",
      "Gudang Properti Acara"
    ],
    pembagian_lantai: [
      { lantai: "Lantai Dasar", fungsi: "Hall utama serbaguna tanpa sekat untuk menampung acara skala akbar" }
    ],
    foto: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
    posisi: { top: "45%", left: "80%" },
    status: "Siap Pakai",
    kontak_pj: "Pengelola Gedung Aula"
  },
  {
    id: "fasilitas-kesehatan-kantin",
    kode: "G-07",
    nama: "Sentra Penunjang (Klinik Santri & Kantin)",
    kategori: "Fasilitas",
    tagColor: "rose",
    deskripsi: "Pusat layanan kesehatan pertama santri (Poskestren) dan pujasera kantin higienis serta minimarket pesantren mart.",
    luas_tanah: "600 m²",
    luas_bangunan: "750 m²",
    jumlah_lantai: 2,
    kapasitas: "± 200 Orang",
    fasilitas_utama: [
      "Ruang Pemeriksaan Medis Dokter & Perawat",
      "Ruang Rawat Inap Sementara (6 Bed)",
      "Apotek Obat Dasar Santri",
      "Kantin Makanan Sehat & Minuman",
      "Toko Kitab, ATK & Kebutuhan Harian Santri"
    ],
    pembagian_lantai: [
      { lantai: "Lantai 1", fungsi: "Klinik Pratama Santri & Apotek" },
      { lantai: "Lantai 2", fungsi: "Pujasera kantin santri dan koperasi pesantren" }
    ],
    foto: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
    posisi: { top: "75%", left: "35%" },
    status: "Layanan 24 Jam (Medis)",
    kontak_pj: "Tim Kesehatan Poskestren"
  }
];

// Identitas Tim Pengembang KKN Universitas Negeri Malang
const DATA_TIM_KKN = {
  universitas: "Universitas Negeri Malang (UM)",
  fakultas: "Karya Kolaborasi Pengabdian Masyarakat",
  desa_lokasi: "Pondok Pesantren Bahrul Maghfiroh, Lowokwaru, Kota Malang",
  tahun: "2026",
  dpl: "Dosen Pembimbing Lapangan (DPL), M.Pd. / M.T.",
  tema: "Pengembangan Sistem Informasi Geografis Tata Letak Bangunan & Fasilitas Ponpes Berbasis Web (SIB-BM)",
  anggota: [
    { nama: "Nama Mahasiswa 1", nim: "210xxxxxxxx", prodi: "Teknik Informatika / S1", peran: "Ketua Tim & Web Dev" },
    { nama: "Nama Mahasiswa 2", nim: "210xxxxxxxx", prodi: "Teknik Sipil / Geodesi", peran: "Survei Luas & Bangunan" },
    { nama: "Nama Mahasiswa 3", nim: "210xxxxxxxx", prodi: "Desain Komunikasi Visual", peran: "UI/UX & Dokumentasi Drone" },
    { nama: "Nama Mahasiswa 4", nim: "210xxxxxxxx", prodi: "Pendidikan / Sastra", peran: "Penyusunan Konten & Humas" },
    { nama: "Nama Mahasiswa 5", nim: "210xxxxxxxx", prodi: "Ekonomi & Bisnis", peran: "Inventarisasi Fasilitas" }
  ]
};
