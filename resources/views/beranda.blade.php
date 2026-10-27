<!DOCTYPE html>
<html lang="id" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SIB-BM | Sistem Informasi Bangunan Bahrul Maghfiroh - KKN UM</title>
  
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            brand: {
              50: '#ecfdf5',
              100: '#d1fae5',
              500: '#10b981',
              600: '#059669',
              700: '#047857',
              800: '#065f46',
              900: '#064e3b',
            },
            um: {
              gold: '#f59e0b',
              blue: '#1e3a8a',
            }
          },
          fontFamily: {
            sans: ['"Plus Jakarta Sans"', 'sans-serif'],
            display: ['"Plus Jakarta Sans"', 'sans-serif'],
          }
        }
      }
    }
  </script>

  <!-- Google Fonts: Plus Jakarta Sans & Font Awesome -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  
  <!-- Leaflet CSS for Google/Satellite Real Interactive Map -->
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />

  <style>
    /* Styling Peta Drone & Pin Interaktif */
    .map-container {
      position: relative;
      overflow: hidden;
      user-select: none;
      background: radial-gradient(circle at 50% 50%, #064e3b 0%, #022c22 100%);
    }

    /* Efek Berkedip Halus Pin Gedung */
    .pin-pulse {
      animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

    /* Leaflet Map & Popup Styling */
    #map-leaflet {
      width: 100%;
      background: #0f172a;
    }
    .leaflet-popup-content-wrapper {
      background: #0f172a !important;
      color: #fff !important;
      border-radius: 16px !important;
      border: 1px solid rgba(255, 255, 255, 0.15) !important;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5) !important;
      padding: 0 !important;
      overflow: hidden;
    }
    .leaflet-popup-content {
      margin: 0 !important;
      line-height: 1.4 !important;
    }
    .leaflet-popup-tip {
      background: #0f172a !important;
    }
    .leaflet-container {
      font-family: inherit !important;
    }
    .leaflet-marker-icon.custom-pin-marker {
      background: transparent;
      border: none;
    }

    @keyframes pulse-ring {
      0% {
        transform: scale(0.95);
        opacity: 0.9;
        box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
      }
      70% {
        transform: scale(1.1);
        opacity: 1;
        box-shadow: 0 0 0 14px rgba(16, 185, 129, 0);
      }
      100% {
        transform: scale(0.95);
        opacity: 0.9;
        box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
      }
    }

    /* Custom Scrollbar */
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    ::-webkit-scrollbar-track {
      background: #f1f5f9;
    }
    ::-webkit-scrollbar-thumb {
      background: #94a3b8;
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #64748b;
    }
  </style>
</head>
<body class="bg-slate-50 text-slate-800 font-sans antialiased selection:bg-emerald-500 selection:text-white">

  <!-- ================= TOPBAR IDENTITAS UM & KKN ================= -->
  <div class="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white text-xs py-2 px-4 border-b border-emerald-900/50">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
      <div class="flex items-center gap-2">
        <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
          <i class="fa-solid fa-graduation-cap mr-1"></i> KKN Reguler
        </span>
        <span class="text-slate-300 font-medium">Universitas Negeri Malang (UM) • Ponpes Bahrul Maghfiroh</span>
      </div>
      <div class="flex items-center gap-4 text-slate-400">
        <span><i class="fa-solid fa-location-dot text-emerald-400 mr-1"></i> Jl. Joyo Agung Atas no. 02., Kota Malang, Provinsi Jawa Timur</span>
        <span class="hidden sm:inline">•</span>
        <span class="hidden sm:inline"><i class="fa-regular fa-calendar-check text-emerald-400 mr-1"></i> Periode <span class="dinamis-tahun font-semibold text-emerald-300">2026</span></span>
      </div>
    </div>
  </div>

  <!-- ================= NAVBAR ================= -->
  <nav class="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        
        <!-- Brand / Logo Resmi Bahrul Maghfiroh -->
        <a href="{{ route('beranda') }}" class="flex items-center gap-3 group">
          <img src="{{ asset('images/logo_bm.png') }}" alt="Logo Ponpes Bahrul Maghfiroh" class="w-12 h-12 object-contain bg-white rounded-xl p-1 shadow-md shadow-emerald-500/10 group-hover:scale-105 transition-transform border border-slate-100">
          <div>
            <div class="flex items-center gap-1.5">
              <span class="font-display font-bold text-2xl tracking-tight text-slate-900">SIB<span class="text-emerald-600">-BM</span></span>
            </div>
            <p class="text-xs text-slate-500 font-medium">Sistem Informasi Bangunan Bahrul Maghfiroh</p>
          </div>
        </a>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center gap-8">
          <a href="#beranda" class="text-sm font-semibold text-slate-700 hover:text-emerald-600 transition-colors">Beranda</a>
          <a href="#peta-kawasan" class="text-sm font-semibold text-slate-700 hover:text-emerald-600 transition-colors flex items-center gap-1.5">
            <i class="fa-solid fa-map-location-dot text-emerald-600"></i> Peta Interaktif
          </a>
          <a href="#direktori-gedung" class="text-sm font-semibold text-slate-700 hover:text-emerald-600 transition-colors">Direktori Gedung</a>
          <a href="#tim-kkn" class="text-sm font-semibold text-slate-700 hover:text-emerald-600 transition-colors flex items-center gap-1">
            <i class="fa-solid fa-users text-amber-500"></i> Tim KKN UM
          </a>
        </div>

        <!-- CTA Button: Kontak Pesantren -->
        <div class="flex items-center gap-3">
          <a href="https://wa.me/628113648800" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-sm shadow-emerald-600/20 transition-all hover:scale-[1.02]">
            <i class="fa-brands fa-whatsapp text-sm"></i>
            <span>Kontak Ponpes</span>
          </a>
        </div>

      </div>
    </div>
  </nav>

  <!-- ================= HERO SECTION ================= -->
  <section id="beranda" class="relative overflow-hidden bg-slate-950 text-white pt-10 pb-12 lg:pt-14 lg:pb-16">
    <!-- Cinematic Drone Video Background Latar Penuh (Non-Interaktif) -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <video id="hero-bg-drone-video" autoplay loop muted playsinline class="w-full h-full object-cover opacity-25" poster="{{ asset('images/drone-kawasan.jpg') }}">
        <source src="{{ asset('videos/drone-kawasan.mp4') }}" type="video/mp4">
        <source src="{{ asset('images/drone-kawasan.mp4') }}" type="video/mp4">
        <source src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-and-buildings-42934-large.mp4" type="video/mp4">
      </video>
      <div class="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/90 to-slate-950"></div>
    </div>
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        <!-- Left Column: Copywriting & Identitas KKN UM (Lebih Rapi & Tenang) -->
        <div class="lg:col-span-7 space-y-5 text-center lg:text-left">
          
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-medium backdrop-blur-sm">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>KKN Reguler Universitas Negeri Malang • S1 Teknik Informatika</span>
          </div>

          <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-snug">
            Sistem Informasi Bangunan & Tata Letak<br>
            <span class="text-emerald-400">Pondok Pesantren Bahrul Maghfiroh</span>
          </h1>

          <p class="text-xs sm:text-sm text-slate-300 max-w-xl font-normal leading-relaxed">
            Platform peta digital interaktif untuk eksplorasi sarana prasarana, estimasi luas tanah, luas bangunan, serta daya tampung santri berbasis citra satelit dan data survei lapangan.
          </p>

          <!-- Action Buttons (Ringkas & Proporsional) -->
          <div class="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1">
            <a href="#peta-kawasan" class="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02] flex items-center gap-2">
              <i class="fa-solid fa-map-location-dot"></i>
              <span>Buka Peta Interaktif</span>
            </a>
            <a href="#direktori-gedung" class="px-5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-300 font-semibold text-xs transition-all hover:text-white flex items-center gap-2">
              <i class="fa-solid fa-table-cells-large"></i>
              <span>Daftar Rincian Gedung</span>
            </a>
          </div>

          <!-- Feature Highlights / Badges Ringkas -->
          <div class="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4 border-t border-slate-800/80 text-xs">
            <div class="flex items-center gap-2">
              <span class="text-sm font-bold text-emerald-400" id="stat-total-gedung">7</span>
              <span class="text-slate-400">Bangunan Terdata</span>
            </div>
            <span class="text-slate-700 hidden sm:inline">•</span>
            <div class="flex items-center gap-2">
              <span class="text-sm font-bold text-amber-400" id="stat-total-tanah">± 35.000 m²</span>
              <span class="text-slate-400">Total Luas Tanah Kawasan</span>
            </div>
          </div>

        </div>

        <!-- Right Column: Video Drone Showcase Frame (Sleek & Bersih Tanpa Tombol Dobel) -->
        <div class="lg:col-span-5 relative">
          <div class="relative mx-auto max-w-md rounded-2xl p-1.5 bg-gradient-to-tr from-emerald-500/20 via-slate-800 to-slate-700/50 shadow-2xl backdrop-blur-md">
            <div class="rounded-xl overflow-hidden bg-slate-900 border border-slate-800/80 p-3 space-y-3">
              
              <!-- Video Header -->
              <div class="flex items-center justify-between border-b border-slate-800 pb-2">
                <div class="flex items-center gap-2 text-xs text-slate-300 font-medium">
                  <i class="fa-solid fa-video text-emerald-400 text-xs"></i>
                  <span>Tayangan Udara Kawasan</span>
                </div>
                <button onclick="perbesarVideo()" class="text-emerald-400 hover:text-emerald-300 text-[11px] font-semibold flex items-center gap-1 transition-colors" title="Perbesar Tampilan Video">
                  <i class="fa-solid fa-expand text-[10px]"></i>
                  <span>Perbesar</span>
                </button>
              </div>

              <!-- Pemutar Video Drone Khusus -->
              <div class="relative h-60 sm:h-64 rounded-lg overflow-hidden bg-slate-950 border border-slate-800 shadow-inner group">
                <video id="hero-drone-player" autoplay loop muted playsinline class="w-full h-full object-cover cursor-pointer" onclick="perbesarVideo()" poster="{{ asset('images/drone-kawasan.jpg') }}">
                  <source src="{{ asset('videos/drone-kawasan.mp4') }}" type="video/mp4">
                  <source src="{{ asset('images/drone-kawasan.mp4') }}" type="video/mp4">
                  <source src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-and-buildings-42934-large.mp4" type="video/mp4">
                </video>
                <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none"></div>

                <!-- Label Lokasi Halus di Bawah Video -->
                <div class="absolute bottom-2.5 left-3 right-3 text-left bg-slate-900/90 py-1.5 px-3 rounded-lg border border-slate-800 backdrop-blur-md flex items-center justify-between">
                  <span class="text-[11px] font-semibold text-white">Ponpes Bahrul Maghfiroh</span>
                  <span class="text-[10px] text-emerald-400 font-mono">1080p HD</span>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- ================= SECTION: PETA INTERAKTIF KAWASAN ================= -->
  <section id="peta-kawasan" class="py-10 lg:py-14 bg-slate-100 border-y border-slate-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-6">
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
          <i class="fa-solid fa-crosshairs"></i> Modul Utama SIB-BM
        </div>
        <h2 class="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
          Peta Drone & Denah Kawasan Pesantren
        </h2>
        <p class="text-slate-600 mt-2 text-xs sm:text-sm">
          Arahkan kursor atau sentuh <strong>Pin Gedung</strong> di bawah untuk membuka informasi detail ukuran luas tanah, luas bangunan, daya tampung, serta foto gedung.
        </p>
      </div>

      <!-- Toolbar: Filter Kategori & Search Bar -->
      <div class="bg-white p-3.5 rounded-2xl shadow-sm border border-slate-200/80 mb-4 flex flex-col md:flex-row justify-between items-center gap-3">
        
        <!-- Filter Pills -->
        <div class="flex flex-wrap items-center gap-2 w-full md:w-auto" id="filter-container">
          <button onclick="filterKategori('Semua')" class="filter-btn active px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 text-white transition-all shadow-sm">
            Semua Gedung
          </button>
          <button onclick="filterKategori('Ibadah')" class="filter-btn px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all">
            <i class="fa-solid fa-mosque mr-1 text-emerald-600"></i> Ibadah
          </button>
          <button onclick="filterKategori('Asrama')" class="filter-btn px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all">
            <i class="fa-solid fa-bed mr-1 text-blue-600"></i> Asrama Santri
          </button>
          <button onclick="filterKategori('Pendidikan')" class="filter-btn px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all">
            <i class="fa-solid fa-school mr-1 text-amber-600"></i> Pendidikan/Sekolah
          </button>
          <button onclick="filterKategori('Administrasi')" class="filter-btn px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all">
            <i class="fa-solid fa-building mr-1 text-indigo-600"></i> Kantor & Ndalem
          </button>
          <button onclick="filterKategori('Fasilitas')" class="filter-btn px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all">
            <i class="fa-solid fa-store mr-1 text-rose-600"></i> Fasilitas Umum
          </button>
        </div>

        <!-- Search Bar -->
        <div class="relative w-full md:w-72">
          <input type="text" id="input-cari" oninput="cariGedung(this.value)" placeholder="Cari nama gedung..." class="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none focus:bg-white transition-all">
          <i class="fa-solid fa-magnifying-glass absolute left-3 top-3 text-slate-400 text-xs"></i>
        </div>

      </div>

      <!-- MAP CONTAINER VIEWPORT (Peta Satelit Interaktif HD Berbasis Koordinat Nyata) -->
      <div class="relative bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
        
        <!-- Peta Satelit Leaflet -->
        <div id="map-leaflet" class="w-full h-[500px] sm:h-[560px] lg:h-[600px] z-10"></div>

        <!-- Tombol Aksi Peta Cepat di Pojok Kanan Atas (Ganti Mode Satelit / Jalan, Reset Kamera) -->
        <div class="absolute top-4 right-4 z-20 flex flex-col gap-2">
          <div class="bg-slate-900/90 backdrop-blur-md p-1.5 rounded-2xl border border-slate-700 shadow-xl flex items-center gap-1.5">
            <button onclick="ubahTampilanPeta('hybrid')" id="btn-mode-hybrid" class="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 text-white shadow transition-all flex items-center gap-1.5" title="Tampilan Satelit Nyata Google + Label Jalan">
              <i class="fa-solid fa-satellite"></i> Satelit HD
            </button>
            <button onclick="ubahTampilanPeta('streets')" id="btn-mode-streets" class="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition-all flex items-center gap-1.5" title="Tampilan Peta Jalan">
              <i class="fa-solid fa-map"></i> Peta Jalan
            </button>
          </div>

          <button onclick="resetPosisiPeta()" class="bg-slate-900/90 hover:bg-slate-800 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-slate-700 text-white text-xs font-bold shadow-xl transition-all flex items-center justify-center gap-2 hover:border-emerald-500 hover:text-emerald-400" title="Kembalikan Tampilan Peta ke Titik Tengah Ponpes">
            <i class="fa-solid fa-arrows-to-dot text-emerald-400"></i>
            <span>Pusatkan Ponpes</span>
          </button>
        </div>

        <!-- Pintu Gerbang Utama / Penanda Akses Masuk Overlay -->
        <div class="absolute bottom-14 left-4 z-20 bg-slate-950/90 text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-xl border border-slate-800 backdrop-blur-md flex items-center gap-2 pointer-events-none">
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Jl. Joyo Agung Atas no. 02., Kota Malang, Provinsi Jawa Timur</span>
        </div>

        <!-- Map Footer Bar: Legend Keterangan Warna Pin -->
        <div class="bg-slate-950 text-white px-6 py-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs relative z-20">
          <div class="flex items-center gap-2">
            <span class="text-slate-400 font-medium">Petunjuk:</span>
            <span class="text-slate-300">Gunakan scroll mouse atau tombol (+ / -) untuk zoom in/out. Klik marker pin gedung untuk melihat ukuran & rincian.</span>
          </div>
          <div class="flex items-center gap-4 text-[11px]">
            <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Ibadah</span>
            <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Asrama</span>
            <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Sekolah</span>
            <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-indigo-500"></span> Kantor</span>
            <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Fasilitas</span>
          </div>
        </div>

      </div>

    </div>
  </section>

  <!-- ================= SECTION: DIREKTORI & DAFTAR GEDUNG (CARDS) ================= -->
  <section id="direktori-gedung" class="py-12 lg:py-14 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-7">
        <div>
          <span class="text-emerald-600 font-bold text-xs uppercase tracking-wider">Katalog Lengkap</span>
          <h2 class="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 mt-1">Direktori Bangunan & Sarana Prasarana</h2>
          <p class="text-slate-500 text-xs sm:text-sm mt-1.5 max-w-2xl">
            Rangkuman seluruh gedung yang telah disurvei dan diinventarisasi oleh tim KKN Reguler Universitas Negeri Malang di Pondok Pesantren Bahrul Maghfiroh.
          </p>
        </div>
        <div class="mt-4 md:mt-0 text-xs font-semibold text-slate-500">
          Menampilkan <span id="count-gedung" class="text-emerald-600 font-bold">0</span> Bangunan
        </div>
      </div>

      <!-- Grid Kartu Gedung -->
      <div id="grid-gedung" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Disuntikkan secara dinamis dari data-gedung.js -->
      </div>

    </div>
  </section>

  <!-- ================= SECTION: IDENTITAS TIM KKN UNIVERSITAS NEGERI MALANG ================= -->
  <section id="tim-kkn" class="py-10 lg:py-12 bg-gradient-to-b from-slate-50 to-emerald-50/40 border-t border-slate-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      
      <div class="max-w-3xl mx-auto mb-5">
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2 border border-amber-300">
          <i class="fa-solid fa-graduation-cap"></i> Tim Pengembang
        </div>
        <h2 class="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
          Mahasiswa KKN Reguler Universitas Negeri Malang (UM)
        </h2>
        <div class="mt-2">
          <span class="text-xs font-bold text-emerald-800 bg-emerald-100/80 px-3 py-1 rounded-full border border-emerald-300">
            S1 Teknik Informatika
          </span>
        </div>
      </div>

      <!-- 5 Orang Mahasiswa Sejajar & Kompak (Tanpa NIM) -->
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 max-w-5xl mx-auto" id="anggota-tim-grid">
        <!-- Disuntikkan dari data-gedung.js -->
      </div>

    </div>
  </section>

  <!-- ================= FOOTER ================= -->
  <footer class="bg-slate-950 text-slate-400 text-xs py-12 border-t border-slate-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 pb-8 border-b border-slate-800/80">
        
        <!-- Kolom 1: Profil Pondok & Yayasan -->
        <div class="space-y-3">
          <div class="flex items-center gap-3">
            <img src="{{ asset('images/logo_bm.png') }}" alt="Logo BM" class="h-10 w-auto object-contain bg-white rounded-xl p-1 shadow-md">
            <div>
              <span class="text-white font-display font-bold text-base block">Pondok Pesantren</span>
              <span class="text-emerald-400 font-display font-bold text-sm tracking-wide">Bahrul Maghfiroh</span>
            </div>
          </div>
          <p class="text-slate-400 leading-relaxed text-xs">
            Pondok Pesantren Bahrul Maghfiroh Malang merupakan Pondok Pesantren dibawah naungan Yayasan Bahrul Maghfiroh Cinta Indonesia.
          </p>
        </div>

        <!-- Kolom 2: Hubungi Kami -->
        <div class="space-y-3">
          <div class="text-white font-bold text-sm border-b border-slate-800 pb-2">Hubungi Kami</div>
          <div class="space-y-2 text-slate-300">
            <div class="flex items-center gap-2.5">
              <i class="fa-solid fa-phone text-emerald-400 w-4"></i>
              <a href="tel:+628113648800" class="hover:text-emerald-400 transition-colors">+62 811-3648-800</a>
            </div>
            <div class="flex items-start gap-2.5">
              <i class="fa-solid fa-location-dot text-emerald-400 w-4 mt-0.5"></i>
              <span>Jl. Joyo Agung Atas no. 02., Kota Malang, Provinsi Jawa Timur</span>
            </div>
            <div class="flex items-center gap-2.5">
              <i class="fa-solid fa-envelope text-emerald-400 w-4"></i>
              <a href="mailto:yayasanbmci@gmail.com" class="hover:text-emerald-400 transition-colors">yayasanbmci@gmail.com</a>
            </div>
          </div>
        </div>

        <!-- Kolom 3: Lokasi Kami (Google Maps Embed) -->
        <div class="space-y-3">
          <div class="text-white font-bold text-sm border-b border-slate-800 pb-2">Lokasi Kami</div>
          <div class="rounded-xl overflow-hidden border border-slate-800 shadow-lg">
            <iframe 
              src="https://maps.google.com/maps?q=Pondok+Pesantren+Bahrul+Maghfiroh+Jl.+Joyo+Agung+Atas+no.+02+Kota+Malang&t=&z=16&ie=UTF8&iwloc=&output=embed" 
              class="w-full h-36 border-0" 
              allowfullscreen="" 
              loading="lazy" 
              referrerpolicy="no-referrer-when-downgrade"
              title="Peta Lokasi Pondok Pesantren Bahrul Maghfiroh">
            </iframe>
          </div>
          <a href="https://maps.google.com/?q=Pondok+Pesantren+Bahrul+Maghfiroh+Jl.+Joyo+Agung+Atas+no.+02+Kota+Malang" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold text-[11px] transition-colors">
            <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
            <span>Buka di Google Maps Langsung</span>
          </a>
        </div>

      </div>

      <!-- Copyright Bar (Ditengahkan sesuai permintaan user) -->
      <div class="text-center text-slate-400 text-xs space-y-2">
        <p>
          © <span class="dinamis-tahun">2026</span> SIB-BM • Dikembangkan oleh Tim KKN Reguler Teknik Informatika 2023 Universitas Negeri Malang.
        </p>
        <div>
          <a href="#beranda" class="inline-flex items-center gap-1.5 text-slate-500 hover:text-emerald-400 transition-colors">
            <span>Kembali ke Atas</span> <i class="fa-solid fa-arrow-up text-[10px]"></i>
          </a>
        </div>
      </div>

    </div>
  </footer>

  <!-- ================= MODAL / DRAWER DETAIL GEDUNG (SAAT DIKLIK) ================= -->
  <div id="modal-detail" class="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm hidden flex items-center justify-center p-4 sm:p-6 transition-all duration-300">
    
    <!-- Modal Card Box -->
    <div class="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-slate-200 max-h-[92vh] flex flex-col transform transition-all duration-300 scale-95 opacity-0" id="modal-content">
      
      <!-- Modal Header dengan Gambar -->
      <div class="relative h-56 sm:h-64 bg-slate-900 flex-shrink-0">
        <img id="modal-foto" src="" alt="Foto Gedung" class="w-full h-full object-cover">
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
        
        <!-- Close Button -->
        <button onclick="tutupModal()" class="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all hover:scale-110">
          <i class="fa-solid fa-xmark text-lg"></i>
        </button>

        <!-- Badge Kategori & Kode -->
        <div class="absolute bottom-4 left-5 right-5 text-white">
          <div class="flex items-center gap-2 mb-1">
            <span id="modal-badge-kode" class="px-2.5 py-0.5 rounded-md bg-white/20 backdrop-blur-md text-xs font-mono font-bold tracking-wider border border-white/30">G-01</span>
            <span id="modal-badge-kategori" class="px-2.5 py-0.5 rounded-md bg-emerald-600 text-xs font-bold">Ibadah</span>
          </div>
          <h3 id="modal-nama" class="text-xl sm:text-2xl font-display font-extrabold text-white leading-tight">Nama Gedung</h3>
        </div>
      </div>

      <!-- Modal Body (Scrollable) -->
      <div class="p-6 overflow-y-auto space-y-6">
        
        <!-- Deskripsi Singkat -->
        <p id="modal-deskripsi" class="text-slate-600 text-sm leading-relaxed">
          Deskripsi lengkap fungsi dan peruntukan gedung...
        </p>

        <!-- Alamat Lokasi Kawasan Ponpes -->
        <div class="flex items-center gap-2.5 text-xs text-slate-700 bg-emerald-50/60 px-3.5 py-2.5 rounded-xl border border-emerald-200/80">
          <i class="fa-solid fa-location-dot text-emerald-600 text-sm flex-shrink-0"></i>
          <div>
            <span class="text-emerald-900 font-bold block text-[10px] uppercase tracking-wider">Alamat Kawasan Ponpes Bahrul Maghfiroh:</span>
            <span id="modal-alamat" class="font-bold text-slate-800">Jl. Joyo Agung Atas no. 02., Kota Malang, Provinsi Jawa Timur</span>
          </div>
        </div>

        <!-- Grid Spesifikasi Utama: Luas Tanah, Luas Bangunan, Kapasitas, Lantai -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <div class="space-y-0.5">
            <div class="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <i class="fa-solid fa-vector-square text-emerald-600"></i> Luas Tanah
            </div>
            <div id="modal-luas-tanah" class="text-sm font-extrabold text-slate-800">0 m²</div>
          </div>

          <div class="space-y-0.5">
            <div class="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <i class="fa-solid fa-building text-blue-600"></i> Luas Bangunan
            </div>
            <div id="modal-luas-bangunan" class="text-sm font-extrabold text-slate-800">0 m²</div>
          </div>

          <div class="space-y-0.5">
            <div class="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <i class="fa-solid fa-users text-amber-600"></i> Kapasitas
            </div>
            <div id="modal-kapasitas" class="text-sm font-extrabold text-slate-800">0 Orang</div>
          </div>

          <div class="space-y-0.5">
            <div class="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <i class="fa-solid fa-layer-group text-purple-600"></i> Jml Lantai
            </div>
            <div id="modal-lantai" class="text-sm font-extrabold text-slate-800">1 Lantai</div>
          </div>
        </div>

        <!-- Status & Penanggung Jawab -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pt-4 border-t border-slate-100 text-xs text-slate-500">
          <div>
            Status Gedung: <span id="modal-status" class="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Aktif</span>
          </div>
          <div>
            Pengelola / Penanggung Jawab: <span id="modal-pj" class="font-semibold text-slate-700">-</span>
          </div>
        </div>

      </div>

      <!-- Modal Footer -->
      <div class="bg-slate-50 px-6 py-3 border-t border-slate-200 flex justify-end">
        <button onclick="tutupModal()" class="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition-colors">
          Tutup Rincian
        </button>
      </div>

    </div>

  </div>

  <!-- ================= MODAL LIGHTBOX PERBESAR VIDEO DRONE ================= -->
  <div id="modal-video-lightbox" class="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md hidden flex items-center justify-center p-4 sm:p-8">
    <div class="relative w-full max-w-5xl rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl flex flex-col">
      <div class="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800">
        <div class="flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span class="text-sm font-bold text-white">Video Udara Sinematik • Pondok Pesantren Bahrul Maghfiroh</span>
        </div>
        <button onclick="tutupVideoLightbox()" class="w-9 h-9 rounded-full bg-slate-800 hover:bg-rose-600 text-white flex items-center justify-center transition-colors">
          <i class="fa-solid fa-xmark text-sm"></i>
        </button>
      </div>
      <div class="relative w-full aspect-video bg-black flex items-center justify-center">
        <video id="lightbox-drone-video" controls autoplay loop class="w-full h-full object-contain">
          <source src="{{ asset('videos/drone-kawasan.mp4') }}" type="video/mp4">
          <source src="{{ asset('images/drone-kawasan.mp4') }}" type="video/mp4">
          <source src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-and-buildings-42934-large.mp4" type="video/mp4">
        </video>
      </div>
      <div class="px-6 py-3 bg-slate-950 text-slate-400 text-xs flex justify-between items-center">
        <span>Tekan tombol <kbd class="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-[11px] text-slate-300">Esc</kbd> atau klik tanda silang untuk menutup</span>
        <button onclick="tutupVideoLightbox()" class="text-emerald-400 hover:underline font-bold text-xs">Tutup Tampilan Penuh</button>
      </div>
    </div>
  </div>

  <!-- LEAFLET JS FOR REAL SATELLITE MAP -->
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <!-- SCRIPT DATA & APP LOGIC -->
  <script src="{{ asset('data-gedung.js') }}"></script>
  <script src="{{ asset('app.js') }}"></script>
</body>
</html>
