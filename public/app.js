// Logika Aplikasi SIB-BM (Sistem Informasi Bangunan Bahrul Maghfiroh)
// Dikembangkan oleh Tim KKN Reguler Teknik Informatika 2023 Universitas Negeri Malang

let filterAktif = "Semua";
let keywordCari = "";

// Peta Satelit Interaktif Leaflet & Layers
let petaLeaflet = null;
let tileLayerSatelit = null;
let tileLayerStreets = null;
let layerGrupMarker = null;
const markersDict = {};

// Koordinat Pusat Ponpes Bahrul Maghfiroh (Jl. Joyo Agung No. 2, Malang)
const KOORDINAT_PONPES = [-7.9387, 112.5938];

// Ambil data gedung terbaru (jika sudah diubah oleh pemilik di Dashboard Pemilik)
if (typeof DATA_GEDUNG !== "undefined" && localStorage.getItem("sib_bm_gedung")) {
  try {
    const customData = JSON.parse(localStorage.getItem("sib_bm_gedung"));
    if (Array.isArray(customData) && customData.length > 0) {
      DATA_GEDUNG = customData;
    }
  } catch (e) {
    console.warn("Gagal memuat data custom:", e);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  inisialisasiTahunDinamis();
  inisialisasiMediaDrone();
  inisialisasiTimKKN();
  inisialisasiPetaLeaflet();
  renderGridGedung();
  inisialisasiEvent();
});

// Menghitung tahun dinamis mengikuti Waktu Indonesia (WIB)
function inisialisasiTahunDinamis() {
  try {
    const formatter = new Intl.DateTimeFormat([], { timeZone: "Asia/Jakarta", year: "numeric" });
    const tahunWIB = formatter.format(new Date());
    document.querySelectorAll(".dinamis-tahun").forEach(el => {
      el.innerText = tahunWIB;
    });
  } catch (e) {
    const tahunFallback = new Date().getFullYear();
    document.querySelectorAll(".dinamis-tahun").forEach(el => {
      el.innerText = tahunFallback;
    });
  }
}

function inisialisasiMediaDrone() {
  const customVideo = localStorage.getItem("sib_bm_drone_video");
  if (customVideo) {
    const heroBgVid = document.getElementById("hero-bg-drone-video");
    const heroPlayerVid = document.getElementById("hero-drone-player");
    if (heroBgVid) heroBgVid.src = customVideo;
    if (heroPlayerVid) heroPlayerVid.src = customVideo;
  }
}

// 1. Inisialisasi Identitas Tim KKN Universitas Negeri Malang
function inisialisasiTimKKN() {
  if (typeof DATA_TIM_KKN !== "undefined") {
    const timTemaEl = document.getElementById("tim-tema");
    const anggotaGridEl = document.getElementById("anggota-tim-grid");

    if (timTemaEl) timTemaEl.innerText = DATA_TIM_KKN.tema;

    if (anggotaGridEl && DATA_TIM_KKN.anggota) {
      anggotaGridEl.className = "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 max-w-6xl mx-auto";
      anggotaGridEl.innerHTML = DATA_TIM_KKN.anggota.map((mhs, idx) => `
        <div class="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-sm text-center hover:border-emerald-400 hover:shadow-md transition-all hover:-translate-y-0.5 flex flex-col justify-between">
          <div>
            <div class="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs mx-auto mb-2 shadow-xs">
              ${idx + 1}
            </div>
            <h4 class="font-bold text-xs text-slate-900 leading-snug line-clamp-2 min-h-[32px] flex items-center justify-center" title="${mhs.nama}">
              ${mhs.nama}
            </h4>
            <p class="text-[10px] text-slate-500 font-medium mt-1">
              ${mhs.prodi || "S1 Teknik Informatika"}
            </p>
          </div>
          <div class="mt-2.5 pt-2 border-t border-slate-100">
            <span class="inline-block px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px] border border-emerald-200/60 leading-tight">
              Kerja: ${mhs.kerja || "Divisi Tim"}
            </span>
          </div>
        </div>
      `).join("");
    }
  }

  // Update statistik di Hero
  const statGedungEl = document.getElementById("stat-total-gedung");
  if (statGedungEl && typeof DATA_GEDUNG !== "undefined") {
    statGedungEl.innerText = `${DATA_GEDUNG.length}`;
  }
}

// 2. Inisialisasi Peta Satelit Interaktif (Google Maps Satellite Hybrid via Leaflet)
function inisialisasiPetaLeaflet() {
  const mapContainer = document.getElementById("map-leaflet");
  if (!mapContainer || typeof L === "undefined") {
    console.warn("Leaflet container atau library belum siap.");
    return;
  }

  // Buat instance map terfokus ke Pondok Pesantren Bahrul Maghfiroh
  petaLeaflet = L.map("map-leaflet", {
    center: KOORDINAT_PONPES,
    zoom: 18,
    minZoom: 15,
    maxZoom: 21,
    zoomControl: true,
    scrollWheelZoom: true
  });

  // Layer Satelit Hybrid Google (Satelit Nyata + Nama Jalan/Bangunan)
  tileLayerSatelit = L.tileLayer("https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}", {
    maxZoom: 21,
    attribution: "&copy; Google Hybrid Satellite"
  });

  // Layer Peta Jalan OpenStreetMap
  tileLayerStreets = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap"
  });

  // Pasang layer satelit sebagai default
  tileLayerSatelit.addTo(petaLeaflet);

  // Buat grup layer untuk penanda pin gedung
  layerGrupMarker = L.layerGroup().addTo(petaLeaflet);

  // Render marker pertama kali
  renderPetaLeafletMarkers();
}

// Switch Mode Satelit HD / Peta Jalan
function ubahTampilanPeta(mode) {
  if (!petaLeaflet) return;

  const btnHybrid = document.getElementById("btn-mode-hybrid");
  const btnStreets = document.getElementById("btn-mode-streets");

  if (mode === "hybrid") {
    petaLeaflet.removeLayer(tileLayerStreets);
    tileLayerSatelit.addTo(petaLeaflet);
    if (btnHybrid) {
      btnHybrid.className = "px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 text-white shadow transition-all flex items-center gap-1.5";
    }
    if (btnStreets) {
      btnStreets.className = "px-3 py-1.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition-all flex items-center gap-1.5";
    }
  } else {
    petaLeaflet.removeLayer(tileLayerSatelit);
    tileLayerStreets.addTo(petaLeaflet);
    if (btnStreets) {
      btnStreets.className = "px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 text-white shadow transition-all flex items-center gap-1.5";
    }
    if (btnHybrid) {
      btnHybrid.className = "px-3 py-1.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition-all flex items-center gap-1.5";
    }
  }
}

// Reset Posisi Kamera Peta ke Pusat Ponpes
function resetPosisiPeta() {
  if (petaLeaflet) {
    petaLeaflet.flyTo(KOORDINAT_PONPES, 18, {
      duration: 1.2
    });
  }
}

// Render Pin / Marker Gedung di Peta Satelit
function renderPetaLeafletMarkers() {
  if (!layerGrupMarker || typeof DATA_GEDUNG === "undefined") return;

  layerGrupMarker.clearLayers();
  const data = dapatkanDataTerfilter();

  data.forEach((gedung) => {
    if (!gedung.koordinat || gedung.koordinat.length !== 2) return;

    const warna = dapatkanWarnaKategori(gedung.kategori);

    // Custom Icon HTML Leaflet dengan Efek Denyut (Pulse)
    const customIcon = L.divIcon({
      className: "custom-pin-marker",
      iconSize: [44, 52],
      iconAnchor: [22, 48],
      popupAnchor: [0, -48],
      html: `
        <div class="relative flex flex-col items-center cursor-pointer group" style="width: 140px; margin-left: -48px;">
          <div class="relative flex items-center justify-center">
            <span class="absolute w-9 h-9 rounded-full ${warna.pulseBg} animate-ping opacity-60"></span>
            <div class="relative w-8 h-8 rounded-full ${warna.bg} text-white flex items-center justify-center font-display font-extrabold text-xs shadow-xl border-2 border-white">
              ${gedung.kode.replace("G-", "")}
            </div>
          </div>
          <div class="mt-1 px-2.5 py-0.5 rounded-lg bg-slate-950/90 text-white text-[11px] font-bold shadow-xl border border-slate-700/80 whitespace-nowrap backdrop-blur-md group-hover:scale-105 group-hover:border-emerald-400 transition-all">
            ${gedung.nama.split(" (")[0]}
          </div>
        </div>
      `
    });

    const marker = L.marker(gedung.koordinat, { icon: customIcon });

    // Popup Info Cepat saat Marker Diklik
    const popupContent = `
      <div class="w-64 bg-slate-950 text-white p-3 rounded-2xl font-sans border border-slate-800 shadow-2xl">
        <div class="relative h-28 rounded-xl overflow-hidden mb-2.5 bg-slate-900">
          <img src="${gedung.foto}" alt="${gedung.nama}" class="w-full h-full object-cover">
          <span class="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold ${warna.bg} text-white">
            ${gedung.kategori}
          </span>
          <span class="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-950/80 text-white border border-white/20">
            ${gedung.kode}
          </span>
        </div>
        <h4 class="font-bold text-xs text-white leading-tight">${gedung.nama}</h4>
        <div class="text-[10px] text-slate-400 mt-1 flex items-center gap-1.5 leading-snug">
          <i class="fa-solid fa-location-dot text-emerald-400 text-[10px]"></i>
          <span>${gedung.alamat || 'Jl. Joyo Agung Atas no. 02., Kota Malang, Provinsi Jawa Timur'}</span>
        </div>
        <div class="grid grid-cols-2 gap-1.5 bg-slate-900/90 p-2 rounded-lg border border-slate-800 text-[10px] text-slate-300 mt-2">
          <div><span class="text-slate-400">LT:</span> <strong>${gedung.luas_tanah}</strong></div>
          <div><span class="text-slate-400">LB:</span> <strong>${gedung.luas_bangunan}</strong></div>
          <div class="col-span-2"><span class="text-slate-400">Kapasitas:</span> <strong>${gedung.kapasitas}</strong></div>
        </div>
        <button onclick="bukaDetailGedung('${gedung.id}')" class="w-full mt-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md">
          <i class="fa-solid fa-circle-info"></i> Buka Rincian Lengkap
        </button>
      </div>
    `;

    marker.bindPopup(popupContent, {
      closeButton: false,
      offset: [0, -10]
    });

    marker.on("click", () => {
      if (petaLeaflet) {
        petaLeaflet.flyTo(gedung.koordinat, 19, { duration: 0.8 });
      }
    });

    markersDict[gedung.id] = marker;
    layerGrupMarker.addLayer(marker);
  });
}

// Fokuskan kamera peta ke gedung tertentu dari kartu katalog
function fokuskanGedungDiPeta(idGedung) {
  const gedung = DATA_GEDUNG.find(g => g.id === idGedung);
  if (!gedung || !gedung.koordinat) return;

  const mapSection = document.getElementById("peta-kawasan");
  if (mapSection) {
    mapSection.scrollIntoView({ behavior: "smooth" });
  }

  setTimeout(() => {
    if (petaLeaflet) {
      petaLeaflet.flyTo(gedung.koordinat, 20, { duration: 1.2 });
      const marker = markersDict[idGedung];
      if (marker) {
        setTimeout(() => {
          marker.openPopup();
        }, 800);
      }
    }
  }, 300);
}

// 3. Render Katalog Kartu Gedung (Direktori)
function renderGridGedung() {
  const gridContainer = document.getElementById("grid-gedung");
  const countEl = document.getElementById("count-gedung");
  if (!gridContainer || typeof DATA_GEDUNG === "undefined") return;

  const data = dapatkanDataTerfilter();
  if (countEl) countEl.innerText = data.length;

  if (data.length === 0) {
    gridContainer.innerHTML = `
      <div class="col-span-full py-12 text-center text-slate-500">
        <i class="fa-solid fa-circle-exclamation text-4xl text-slate-400 mb-3"></i>
        <p class="font-semibold">Tidak ditemukan gedung dengan kriteria pencarian tersebut.</p>
        <button onclick="resetFilter()" class="mt-3 px-4 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold">
          Tampilkan Semua Gedung
        </button>
      </div>
    `;
    return;
  }

  gridContainer.innerHTML = data.map((gedung) => {
    const badgeColor = dapatkanWarnaKategori(gedung.kategori);

    return `
      <div class="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col group">
        
        <!-- Thumbnail Foto Gedung -->
        <div class="relative h-48 overflow-hidden bg-slate-900">
          <img src="${gedung.foto}" alt="${gedung.nama}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
          
          <div class="absolute top-3 left-3 flex gap-2">
            <span class="px-2.5 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-md text-white text-xs font-mono font-bold border border-white/20">
              ${gedung.kode}
            </span>
            <span class="px-2.5 py-0.5 rounded-md ${badgeColor.bg} text-white text-xs font-bold">
              ${gedung.kategori}
            </span>
          </div>

          <div class="absolute bottom-3 left-3 right-3 text-white">
            <h3 class="font-display font-extrabold text-base leading-tight">${gedung.nama}</h3>
          </div>
        </div>

        <!-- Spesifikasi Luas & Kapasitas -->
        <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
          <p class="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            ${gedung.deskripsi}
          </p>

          <div class="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
            <div>
              <span class="text-slate-400 text-[10px] font-bold uppercase block">Luas Tanah:</span>
              <strong class="text-slate-800">${gedung.luas_tanah}</strong>
            </div>
            <div>
              <span class="text-slate-400 text-[10px] font-bold uppercase block">Luas Bangunan:</span>
              <strong class="text-slate-800">${gedung.luas_bangunan}</strong>
            </div>
            <div class="mt-1">
              <span class="text-slate-400 text-[10px] font-bold uppercase block">Kapasitas:</span>
              <strong class="text-slate-800">${gedung.kapasitas}</strong>
            </div>
            <div class="mt-1">
              <span class="text-slate-400 text-[10px] font-bold uppercase block">Jumlah Lantai:</span>
              <strong class="text-slate-800">${gedung.jumlah_lantai} Lantai</strong>
            </div>
          </div>

          <!-- Tombol Aksi: Detail & Fokuskan Peta -->
          <div class="grid grid-cols-2 gap-2">
            <button onclick="fokuskanGedungDiPeta('${gedung.id}')" class="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5" title="Lihat lokasi gedung di peta satelit">
              <i class="fa-solid fa-crosshairs text-emerald-600"></i>
              <span>Fokus di Peta</span>
            </button>
            <button onclick="bukaDetailGedung('${gedung.id}')" class="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow transition-all flex items-center justify-center gap-1.5">
              <i class="fa-solid fa-circle-info"></i>
              <span>Rincian Gedung</span>
            </button>
          </div>
        </div>

      </div>
    `;
  }).join("");
}

// 4. Modal Detail Gedung (Luas Tanah, Luas Bangunan, Kapasitas, Lantai, Foto)
function bukaDetailGedung(idGedung) {
  const gedung = DATA_GEDUNG.find(g => g.id === idGedung);
  if (!gedung) return;

  const modal = document.getElementById("modal-detail");
  const modalContent = document.getElementById("modal-content");

  // Isi data ke elemen modal
  document.getElementById("modal-foto").src = gedung.foto;
  document.getElementById("modal-badge-kode").innerText = gedung.kode;
  document.getElementById("modal-badge-kategori").innerText = gedung.kategori;
  document.getElementById("modal-nama").innerText = gedung.nama;
  document.getElementById("modal-deskripsi").innerText = gedung.deskripsi;
  document.getElementById("modal-luas-tanah").innerText = gedung.luas_tanah;
  document.getElementById("modal-luas-bangunan").innerText = gedung.luas_bangunan;
  document.getElementById("modal-kapasitas").innerText = gedung.kapasitas;
  document.getElementById("modal-lantai").innerText = `${gedung.jumlah_lantai} Lantai`;
  document.getElementById("modal-status").innerText = gedung.status;
  document.getElementById("modal-pj").innerText = gedung.kontak_pj;

  const modalAlamat = document.getElementById("modal-alamat");
  if (modalAlamat) {
    modalAlamat.innerText = gedung.alamat || "Jl. Joyo Agung Atas no. 02., Kota Malang, Provinsi Jawa Timur";
  }

  // Buka Modal dengan Animasi
  modal.classList.remove("hidden");
  setTimeout(() => {
    modalContent.classList.remove("scale-95", "opacity-0");
    modalContent.classList.add("scale-100", "opacity-100");
  }, 20);
}

function tutupModal() {
  const modal = document.getElementById("modal-detail");
  const modalContent = document.getElementById("modal-content");
  if (!modal || !modalContent) return;

  modalContent.classList.remove("scale-100", "opacity-100");
  modalContent.classList.add("scale-95", "opacity-0");

  setTimeout(() => {
    modal.classList.add("hidden");
  }, 200);
}

// 5. Filter & Pencarian
function filterKategori(kategori) {
  filterAktif = kategori;

  // Update styling tombol filter
  const buttons = document.querySelectorAll("#filter-container .filter-btn");
  buttons.forEach(btn => {
    if (btn.innerText.includes(kategori) || (kategori === "Semua" && btn.innerText.includes("Semua"))) {
      btn.className = "filter-btn px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 text-white transition-all shadow-sm";
    } else {
      btn.className = "filter-btn px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all";
    }
  });

  renderPetaLeafletMarkers();
  renderGridGedung();
}

function cariGedung(val) {
  keywordCari = val.toLowerCase().trim();
  renderPetaLeafletMarkers();
  renderGridGedung();

  // Jika kata kunci menemukan tepat 1 gedung, langsung arahkan peta ke gedung tersebut
  const dataFiltered = dapatkanDataTerfilter();
  if (dataFiltered.length === 1 && petaLeaflet && dataFiltered[0].koordinat) {
    petaLeaflet.flyTo(dataFiltered[0].koordinat, 19, { duration: 1.0 });
    const m = markersDict[dataFiltered[0].id];
    if (m) {
      setTimeout(() => m.openPopup(), 600);
    }
  }
}

function resetFilter() {
  filterAktif = "Semua";
  keywordCari = "";
  const inputEl = document.getElementById("input-cari");
  if (inputEl) inputEl.value = "";
  filterKategori("Semua");
}

function dapatkanDataTerfilter() {
  return DATA_GEDUNG.filter(gedung => {
    const cocokKategori = (filterAktif === "Semua") || (gedung.kategori.toLowerCase() === filterAktif.toLowerCase());
    const cocokKeyword = (keywordCari === "") ||
      gedung.nama.toLowerCase().includes(keywordCari) ||
      gedung.deskripsi.toLowerCase().includes(keywordCari) ||
      gedung.kode.toLowerCase().includes(keywordCari);

    return cocokKategori && cocokKeyword;
  });
}

function dapatkanWarnaKategori(kategori) {
  switch (kategori.toLowerCase()) {
    case "ibadah":
      return { bg: "bg-emerald-600", pulseBg: "bg-emerald-400" };
    case "asrama":
      return { bg: "bg-blue-600", pulseBg: "bg-blue-400" };
    case "pendidikan":
      return { bg: "bg-amber-600", pulseBg: "bg-amber-400" };
    case "administrasi":
      return { bg: "bg-indigo-600", pulseBg: "bg-indigo-400" };
    case "fasilitas":
      return { bg: "bg-rose-600", pulseBg: "bg-rose-400" };
    default:
      return { bg: "bg-teal-600", pulseBg: "bg-teal-400" };
  }
}

// 6. Smooth Scroll, Lightbox Video & Keyboard Event
function inisialisasiEvent() {
  // Tutup modal jika klik di luar box
  const modal = document.getElementById("modal-detail");
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) tutupModal();
    });
  }

  // Tutup lightbox video jika klik di luar box
  const modalVideo = document.getElementById("modal-video-lightbox");
  if (modalVideo) {
    modalVideo.addEventListener("click", (e) => {
      if (e.target === modalVideo) tutupVideoLightbox();
    });
  }

  // Tutup modal dengan tombol Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      tutupModal();
      tutupVideoLightbox();
    }
  });
}

function perbesarVideo() {
  const modal = document.getElementById("modal-video-lightbox");
  const vidPlayer = document.getElementById("lightbox-drone-video");
  if (!modal) return;
  modal.classList.remove("hidden");
  if (vidPlayer) {
    vidPlayer.play().catch(() => {});
  }
}

function tutupVideoLightbox() {
  const modal = document.getElementById("modal-video-lightbox");
  const vidPlayer = document.getElementById("lightbox-drone-video");
  if (!modal) return;
  modal.classList.add("hidden");
  if (vidPlayer) {
    vidPlayer.pause();
  }
}

function scrollToMap() {
  const el = document.getElementById("peta-kawasan");
  if (el) el.scrollIntoView({ behavior: "smooth" });
}
