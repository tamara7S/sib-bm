<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Gedung;

class GedungController extends Controller
{
    /**
     * Menampilkan Landing Page & Peta Satelit Interaktif SIB-BM
     */
    public function index()
    {
        $gedungs = Gedung::all();
        return view('beranda', compact('gedungs'));
    }

    /**
     * Menampilkan Dashboard Pemilik & Pengelola SIB-BM
     */
    public function admin()
    {
        $gedungs = Gedung::all();
        return view('admin', compact('gedungs'));
    }

    /**
     * API JSON Data Gedung dari MySQL
     */
    public function apiGedung()
    {
        return response()->json(Gedung::all());
    }
}
