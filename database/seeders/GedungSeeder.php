<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Gedung;

class GedungSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $gedungList = [
            [
                'kode' => 'G-01',
                'nama' => "Masjid Jami' Bahrul Maghfiroh",
                'kategori' => 'Ibadah',
                'alamat' => 'Jl. Joyo Agung Atas no. 02., Kota Malang, Provinsi Jawa Timur',
                'deskripsi' => 'Pusat kegiatan ibadah, sholat berjamaah lima waktu, sholat Jumat, dan pengajian santri serta masyarakat.',
                'luas_tanah' => '1.200 m²',
                'luas_bangunan' => '1.800 m²',
                'jumlah_lantai' => 2,
                'kapasitas' => '± 2.000 Jamaah',
                'foto' => 'images/masjid.jpg',
                'latitude' => -7.93870,
                'longitude' => 112.59390,
                'posisi_top' => '34%',
                'posisi_left' => '48%',
                'status' => 'Aktif Penuh',
                'kontak_pj' => "Pengurus Ta'mir Masjid"
            ],
            [
                'kode' => 'G-02',
                'nama' => 'Gedung Asrama Santri Putra (Al-Ikhlas)',
                'kategori' => 'Asrama',
                'alamat' => 'Jl. Joyo Agung Atas no. 02., Kota Malang, Provinsi Jawa Timur',
                'deskripsi' => 'Kompleks asrama tempat mukim para santri putra yang dilengkapi dengan ruang belajar komunal dan pos keamanan.',
                'luas_tanah' => '900 m²',
                'luas_bangunan' => '2.100 m²',
                'jumlah_lantai' => 3,
                'kapasitas' => '± 350 Santri',
                'foto' => 'images/asrama-putra.jpg',
                'latitude' => -7.93895,
                'longitude' => 112.59335,
                'posisi_top' => '52%',
                'posisi_left' => '28%',
                'status' => 'Aktif',
                'kontak_pj' => 'Bidang Kesantrian Putra'
            ],
            [
                'kode' => 'G-03',
                'nama' => 'Gedung Asrama Santri Putri (Ar-Rahmah)',
                'kategori' => 'Asrama',
                'alamat' => 'Jl. Joyo Agung Atas no. 02., Kota Malang, Provinsi Jawa Timur',
                'deskripsi' => 'Asrama mukim khusus santri putri dengan area tertutup privasi serta pengawasan ustadzah dan keamanan khusus.',
                'luas_tanah' => '1.100 m²',
                'luas_bangunan' => '2.400 m²',
                'jumlah_lantai' => 3,
                'kapasitas' => '± 400 Santriwati',
                'foto' => 'images/asrama-putri.jpg',
                'latitude' => -7.93835,
                'longitude' => 112.59425,
                'posisi_top' => '25%',
                'posisi_left' => '72%',
                'status' => 'Aktif',
                'kontak_pj' => 'Bidang Kesantrian Putri'
            ],
            [
                'kode' => 'G-04',
                'nama' => 'Gedung Pendidikan & Madrasah Terpadu',
                'kategori' => 'Pendidikan',
                'alamat' => 'Jl. Joyo Agung Atas no. 02., Kota Malang, Provinsi Jawa Timur',
                'deskripsi' => 'Gedung kegiatan belajar mengajar (KBM) formal kurikulum nasional dan kurikulum keagamaan/diniyah pesantren.',
                'luas_tanah' => '1.500 m²',
                'luas_bangunan' => '3.200 m²',
                'jumlah_lantai' => 3,
                'kapasitas' => '± 600 Siswa/Santri',
                'foto' => 'images/sekolah.jpg',
                'latitude' => -7.93920,
                'longitude' => 112.59410,
                'posisi_top' => '68%',
                'posisi_left' => '65%',
                'status' => 'Aktif KBM',
                'kontak_pj' => 'Waka Sarana & Prasarana'
            ],
            [
                'kode' => 'G-05',
                'nama' => 'Gedung Rektorat & Ndalem Pengasuh',
                'kategori' => 'Administrasi',
                'alamat' => 'Jl. Joyo Agung Atas no. 02., Kota Malang, Provinsi Jawa Timur',
                'deskripsi' => 'Pusat pimpinan pondok pesantren, penerimaan tamu kehormatan, pendaftaran santri baru, dan administrasi yayasan.',
                'luas_tanah' => '800 m²',
                'luas_bangunan' => '1.000 m²',
                'jumlah_lantai' => 2,
                'kapasitas' => '± 100 Orang',
                'foto' => 'images/kantor-ndalem.jpg',
                'latitude' => -7.93825,
                'longitude' => 112.59350,
                'posisi_top' => '20%',
                'posisi_left' => '32%',
                'status' => 'Aktif Layanan',
                'kontak_pj' => 'Sekretariat Ponpes'
            ],
            [
                'kode' => 'G-06',
                'nama' => 'Aula Utama & Gedung Serbaguna',
                'kategori' => 'Umum',
                'alamat' => 'Jl. Joyo Agung Atas no. 02., Kota Malang, Provinsi Jawa Timur',
                'deskripsi' => 'Gedung aula kapasitas besar untuk wisuda santri, seminar nasional, pertemuan wali santri, dan pagelaran seni.',
                'luas_tanah' => '1.000 m²',
                'luas_bangunan' => '950 m²',
                'jumlah_lantai' => 1,
                'kapasitas' => '± 1.200 Orang',
                'foto' => 'images/aula.jpg',
                'latitude' => -7.93875,
                'longitude' => 112.59455,
                'posisi_top' => '45%',
                'posisi_left' => '80%',
                'status' => 'Siap Pakai',
                'kontak_pj' => 'Pengelola Gedung Aula'
            ],
            [
                'kode' => 'G-07',
                'nama' => 'Sentra Penunjang (Klinik & Kantin)',
                'kategori' => 'Fasilitas',
                'alamat' => 'Jl. Joyo Agung Atas no. 02., Kota Malang, Provinsi Jawa Timur',
                'deskripsi' => 'Pusat layanan kesehatan pertama santri (Poskestren), pujasera kantin higienis, dan minimarket kebutuhan harian.',
                'luas_tanah' => '600 m²',
                'luas_bangunan' => '750 m²',
                'jumlah_lantai' => 2,
                'kapasitas' => '± 200 Orang',
                'foto' => 'images/klinik-kantin.jpg',
                'latitude' => -7.93910,
                'longitude' => 112.59365,
                'posisi_top' => '75%',
                'posisi_left' => '35%',
                'status' => 'Layanan 24 Jam',
                'kontak_pj' => 'Tim Kesehatan Poskestren'
            ],
        ];

        foreach ($gedungList as $item) {
            Gedung::updateOrCreate(['kode' => $item['kode']], $item);
        }
    }
}
