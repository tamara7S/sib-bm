// Data Bangunan Pondok Pesantren Bahrul Maghfiroh (SIB-BM)
// Dilengkapi koordinat GPS geodetik nyata untuk peta satelit interaktif (Google/Leaflet)

const ALAMAT_RESMI_PONPES = "Jl. Joyo Agung Atas no. 02., Kota Malang, Provinsi Jawa Timur";

const DATA_GEDUNG = [
  {
    id: "masjid-jami",
    kode: "G-01",
    nama: "Masjid Jami' Bahrul Maghfiroh",
    kategori: "Ibadah",
    alamat: ALAMAT_RESMI_PONPES,
    deskripsi: "Pusat kegiatan ibadah, sholat berjamaah lima waktu, sholat Jumat, dan pengajian santri serta masyarakat.",
    luas_tanah: "1.200 m²",
    luas_bangunan: "1.800 m²",
    jumlah_lantai: 2,
    kapasitas: "± 2.000 Jamaah",
    foto: "images/masjid.jpg",
    koordinat: [-7.93870, 112.59390], // Titik GPS tepat di atas kubah Masjid Ponpes Bahrul Maghfiroh
    posisi: { top: "34%", left: "48%" },
    status: "Aktif Penuh",
    kontak_pj: "Pengurus Ta'mir Masjid"
  },
  {
    id: "asrama-putra-utama",
    kode: "G-02",
    nama: "Gedung Asrama Santri Putra (Al-Ikhlas)",
    kategori: "Asrama",
    alamat: ALAMAT_RESMI_PONPES,
    deskripsi: "Kompleks asrama tempat mukim para santri putra yang dilengkapi dengan ruang belajar komunal dan pos keamanan.",
    luas_tanah: "900 m²",
    luas_bangunan: "2.100 m²",
    jumlah_lantai: 3,
    kapasitas: "± 350 Santri",
    foto: "images/asrama-putra.jpg",
    koordinat: [-7.93895, 112.59335],
    posisi: { top: "52%", left: "28%" },
    status: "Aktif",
    kontak_pj: "Bidang Kesantrian Putra"
  },
  {
    id: "asrama-putri-ar-rahmah",
    kode: "G-03",
    nama: "Gedung Asrama Santri Putri (Ar-Rahmah)",
    kategori: "Asrama",
    alamat: ALAMAT_RESMI_PONPES,
    deskripsi: "Asrama mukim khusus santri putri dengan area tertutup privasi serta pengawasan ustadzah dan keamanan khusus.",
    luas_tanah: "1.100 m²",
    luas_bangunan: "2.400 m²",
    jumlah_lantai: 3,
    kapasitas: "± 400 Santriwati",
    foto: "images/asrama-putri.jpg",
    koordinat: [-7.93835, 112.59425],
    posisi: { top: "25%", left: "72%" },
    status: "Aktif",
    kontak_pj: "Bidang Kesantrian Putri"
  },
  {
    id: "gedung-pendidikan-sekolah",
    kode: "G-04",
    nama: "Gedung Pendidikan & Madrasah Terpadu",
    kategori: "Pendidikan",
    alamat: ALAMAT_RESMI_PONPES,
    deskripsi: "Gedung kegiatan belajar mengajar (KBM) formal kurikulum nasional dan kurikulum keagamaan/diniyah pesantren.",
    luas_tanah: "1.500 m²",
    luas_bangunan: "3.200 m²",
    jumlah_lantai: 3,
    kapasitas: "± 600 Siswa/Santri",
    foto: "images/sekolah.jpg",
    koordinat: [-7.93920, 112.59410],
    posisi: { top: "68%", left: "65%" },
    status: "Aktif KBM",
    kontak_pj: "Waka Sarana & Prasarana"
  },
  {
    id: "ndalem-kantor-pusat",
    kode: "G-05",
    nama: "Gedung Rektorat & Ndalem Pengasuh",
    kategori: "Administrasi",
    alamat: ALAMAT_RESMI_PONPES,
    deskripsi: "Pusat pimpinan pondok pesantren, penerimaan tamu kehormatan, pendaftaran santri baru, dan administrasi yayasan.",
    luas_tanah: "800 m²",
    luas_bangunan: "1.000 m²",
    jumlah_lantai: 2,
    kapasitas: "± 100 Orang",
    foto: "images/kantor-ndalem.jpg",
    koordinat: [-7.93825, 112.59350],
    posisi: { top: "20%", left: "32%" },
    status: "Aktif Layanan",
    kontak_pj: "Sekretariat Ponpes"
  },
  {
    id: "aula-serbaguna",
    kode: "G-06",
    nama: "Aula Utama & Gedung Serbaguna",
    kategori: "Umum",
    alamat: ALAMAT_RESMI_PONPES,
    deskripsi: "Gedung aula kapasitas besar untuk wisuda santri, seminar nasional, pertemuan wali santri, dan pagelaran seni.",
    luas_tanah: "1.000 m²",
    luas_bangunan: "950 m²",
    jumlah_lantai: 1,
    kapasitas: "± 1.200 Orang",
    foto: "images/aula.jpg",
    koordinat: [-7.93875, 112.59455],
    posisi: { top: "45%", left: "80%" },
    status: "Siap Pakai",
    kontak_pj: "Pengelola Gedung Aula"
  },
  {
    id: "fasilitas-kesehatan-kantin",
    kode: "G-07",
    nama: "Sentra Penunjang (Klinik & Kantin)",
    kategori: "Fasilitas",
    alamat: ALAMAT_RESMI_PONPES,
    deskripsi: "Pusat layanan kesehatan pertama santri (Poskestren), pujasera kantin higienis, dan minimarket kebutuhan harian.",
    luas_tanah: "600 m²",
    luas_bangunan: "750 m²",
    jumlah_lantai: 2,
    kapasitas: "± 200 Orang",
    foto: "images/klinik-kantin.jpg",
    koordinat: [-7.93910, 112.59365],
    posisi: { top: "75%", left: "35%" },
    status: "Layanan 24 Jam",
    kontak_pj: "Tim Kesehatan Poskestren"
  }
];

// Identitas Tim Pengembang KKN Universitas Negeri Malang
const DATA_TIM_KKN = {
  universitas: "Universitas Negeri Malang (UM)",
  prodi_umum: "S1 Teknik Informatika 2023",
  desa_lokasi: "Pondok Pesantren Bahrul Maghfiroh, Jl. Joyo Agung Atas no. 02., Kota Malang, Provinsi Jawa Timur",
  tahun: "2026",
  tema: "Pengembangan Sistem Informasi Tata Letak Bangunan Ponpes Berbasis Web (SIB-BM)",
  anggota: [
    { nama: "Ahmad Farid Nugraha Satria Pradana", prodi: "S1 Teknik Informatika", kerja: "Ketua Tim KKN" },
    { nama: "Azarine Nadya Arfionika", prodi: "S1 Teknik Informatika", kerja: "Desain UI/UX Web" },
    { nama: "Mochammad Aditya Baharianto", prodi: "S1 Teknik Informatika", kerja: "Multimedia & Drone" },
    { nama: "Septa Agil Nur Nandyas", prodi: "S1 Teknik Informatika", kerja: "Survei & Pemetaan Aset" },
    { nama: "Tamara Rani Meilita", prodi: "S1 Teknik Informatika", kerja: "Web Developer" }
  ]
};
