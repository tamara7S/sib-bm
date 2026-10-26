// Data Bangunan Pondok Pesantren Bahrul Maghfiroh (SIB-BM)
// Fokus pada spesifikasi inti: Luas Tanah, Luas Bangunan, Kapasitas, dan Jumlah Lantai

const DATA_GEDUNG = [
  {
    id: "masjid-jami",
    kode: "G-01",
    nama: "Masjid Jami' Bahrul Maghfiroh",
    kategori: "Ibadah",
    deskripsi: "Pusat kegiatan ibadah, sholat berjamaah lima waktu, sholat Jumat, dan pengajian santri serta masyarakat.",
    luas_tanah: "1.200 m²",
    luas_bangunan: "1.800 m²",
    jumlah_lantai: 2,
    kapasitas: "± 2.000 Jamaah",
    foto: "images/masjid.jpg",
    posisi: { top: "34%", left: "48%" },
    status: "Aktif Penuh",
    kontak_pj: "Pengurus Ta'mir Masjid"
  },
  {
    id: "asrama-putra-utama",
    kode: "G-02",
    nama: "Gedung Asrama Santri Putra (Al-Ikhlas)",
    kategori: "Asrama",
    deskripsi: "Kompleks asrama tempat mukim para santri putra yang dilengkapi dengan ruang belajar komunal dan pos keamanan.",
    luas_tanah: "900 m²",
    luas_bangunan: "2.100 m²",
    jumlah_lantai: 3,
    kapasitas: "± 350 Santri",
    foto: "images/asrama-putra.jpg",
    posisi: { top: "52%", left: "28%" },
    status: "Aktif",
    kontak_pj: "Bidang Kesantrian Putra"
  },
  {
    id: "asrama-putri-ar-rahmah",
    kode: "G-03",
    nama: "Gedung Asrama Santri Putri (Ar-Rahmah)",
    kategori: "Asrama",
    deskripsi: "Asrama mukim khusus santri putri dengan area tertutup privasi serta pengawasan ustadzah dan keamanan khusus.",
    luas_tanah: "1.100 m²",
    luas_bangunan: "2.400 m²",
    jumlah_lantai: 3,
    kapasitas: "± 400 Santriwati",
    foto: "images/asrama-putri.jpg",
    posisi: { top: "25%", left: "72%" },
    status: "Aktif",
    kontak_pj: "Bidang Kesantrian Putri"
  },
  {
    id: "gedung-pendidikan-sekolah",
    kode: "G-04",
    nama: "Gedung Pendidikan & Madrasah Terpadu",
    kategori: "Pendidikan",
    deskripsi: "Gedung kegiatan belajar mengajar (KBM) formal kurikulum nasional dan kurikulum keagamaan/diniyah pesantren.",
    luas_tanah: "1.500 m²",
    luas_bangunan: "3.200 m²",
    jumlah_lantai: 3,
    kapasitas: "± 600 Siswa/Santri",
    foto: "images/sekolah.jpg",
    posisi: { top: "68%", left: "65%" },
    status: "Aktif KBM",
    kontak_pj: "Waka Sarana & Prasarana"
  },
  {
    id: "ndalem-kantor-pusat",
    kode: "G-05",
    nama: "Gedung Rektorat & Ndalem Pengasuh",
    kategori: "Administrasi",
    deskripsi: "Pusat pimpinan pondok pesantren, penerimaan tamu kehormatan, pendaftaran santri baru, dan administrasi yayasan.",
    luas_tanah: "800 m²",
    luas_bangunan: "1.000 m²",
    jumlah_lantai: 2,
    kapasitas: "± 100 Orang",
    foto: "images/kantor-ndalem.jpg",
    posisi: { top: "20%", left: "32%" },
    status: "Aktif Layanan",
    kontak_pj: "Sekretariat Ponpes"
  },
  {
    id: "aula-serbaguna",
    kode: "G-06",
    nama: "Aula Utama & Gedung Serbaguna",
    kategori: "Umum",
    deskripsi: "Gedung aula kapasitas besar untuk wisuda santri, seminar nasional, pertemuan wali santri, dan pagelaran seni.",
    luas_tanah: "1.000 m²",
    luas_bangunan: "950 m²",
    jumlah_lantai: 1,
    kapasitas: "± 1.200 Orang",
    foto: "images/aula.jpg",
    posisi: { top: "45%", left: "80%" },
    status: "Siap Pakai",
    kontak_pj: "Pengelola Gedung Aula"
  },
  {
    id: "fasilitas-kesehatan-kantin",
    kode: "G-07",
    nama: "Sentra Penunjang (Klinik & Kantin)",
    kategori: "Fasilitas",
    deskripsi: "Pusat layanan kesehatan pertama santri (Poskestren), pujasera kantin higienis, dan minimarket kebutuhan harian.",
    luas_tanah: "600 m²",
    luas_bangunan: "750 m²",
    jumlah_lantai: 2,
    kapasitas: "± 200 Orang",
    foto: "images/klinik-kantin.jpg",
    posisi: { top: "75%", left: "35%" },
    status: "Layanan 24 Jam",
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
  tema: "Pengembangan Sistem Informasi Tata Letak Bangunan & Fasilitas Ponpes Berbasis Web (SIB-BM)",
  anggota: [
    { nama: "Nama Mahasiswa 1", nim: "210xxxxxxxx", prodi: "Teknik Informatika / S1", peran: "Ketua Tim & Web Dev" },
    { nama: "Nama Mahasiswa 2", nim: "210xxxxxxxx", prodi: "Teknik Sipil / Geodesi", peran: "Survei Luas & Bangunan" },
    { nama: "Nama Mahasiswa 3", nim: "210xxxxxxxx", prodi: "Desain Komunikasi Visual", peran: "UI/UX & Dokumentasi Drone" },
    { nama: "Nama Mahasiswa 4", nim: "210xxxxxxxx", prodi: "Pendidikan / Sastra", peran: "Penyusunan Konten & Humas" },
    { nama: "Nama Mahasiswa 5", nim: "210xxxxxxxx", prodi: "Ekonomi & Bisnis", peran: "Inventarisasi Aset" }
  ]
};
