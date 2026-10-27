<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GedungController extends Controller
{
    /**
     * Menampilkan Landing Page & Peta Satelit Interaktif SIB-BM
     */
    public function index()
    {
        return view('beranda');
    }

    /**
     * Menampilkan Dashboard Pemilik & Pengelola SIB-BM
     */
    public function admin()
    {
        return view('admin');
    }
}
