<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Gedung extends Model
{
    use HasFactory;

    protected $table = 'gedungs';

    protected $fillable = [
        'kode',
        'kategori',
        'nama',
        'alamat',
        'deskripsi',
        'luas_tanah',
        'luas_bangunan',
        'jumlah_lantai',
        'kapasitas',
        'foto',
        'latitude',
        'longitude',
        'posisi_top',
        'posisi_left',
        'status',
        'kontak_pj',
    ];
}
