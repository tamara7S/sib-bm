<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('gedungs', function (Blueprint $table) {
            $table->id();
            $table->string('kode', 20)->unique();
            $table->string('kategori', 50); // Ibadah, Asrama, Pendidikan, Administrasi, Fasilitas, Umum
            $table->string('nama', 150);
            $table->string('alamat', 255)->default('Jl. Joyo Agung Atas no. 02., Kota Malang, Provinsi Jawa Timur');
            $table->text('deskripsi')->nullable();
            $table->string('luas_tanah', 50)->nullable();
            $table->string('luas_bangunan', 50)->nullable();
            $table->integer('jumlah_lantai')->default(1);
            $table->string('kapasitas', 50)->nullable();
            $table->string('foto', 255)->default('images/gedung.jpg');
            $table->decimal('latitude', 10, 7)->default(-7.9387000);
            $table->decimal('longitude', 10, 7)->default(112.5939000);
            $table->string('posisi_top', 20)->default('50%');
            $table->string('posisi_left', 20)->default('50%');
            $table->string('status', 30)->default('Aktif');
            $table->string('kontak_pj', 100)->default('Pengurus Pondok Pesantren');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gedungs');
    }
};
