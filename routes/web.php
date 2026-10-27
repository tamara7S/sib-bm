<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GedungController;

// Rute Halaman Utama & Peta Interaktif SIB-BM
Route::get('/', [GedungController::class, 'index'])->name('beranda');

// Rute Dashboard Pemilik & Pengelola SIB-BM
Route::get('/admin', [GedungController::class, 'admin'])->name('admin');
