// Logika Aplikasi SIB-BM (Sistem Informasi Bangunan Bahrul Maghfiroh)
// Dikembangkan oleh Tim KKN Universitas Negeri Malang

let filterAktif = "Semua";
let keywordCari = "";

document.addEventListener("DOMContentLoaded", () => {
  inisialisasiTimKKN();
  renderPetaPins();
  renderGridGedung();
  inisialisasiEvent();
});

// 1. Inisialisasi Identitas Tim KKN Universitas Negeri Malang
function inisialisasiTimKKN() {
  if (typeof DATA_TIM_KKN !== "undefined") {
    const timTemaEl = document.getElementById("tim-tema");
    const dplNamaEl = document.getElementById("dpl-nama");
    const anggotaGridEl = document.getElementById("anggota-tim-grid");

    if (timTemaEl) timTemaEl.innerText = DATA_TIM_KKN.tema;
    if (dplNamaEl) dplNamaEl.innerText = DATA_TIM_KKN.dpl;

    if (anggotaGridEl && DATA_TIM_KKN.anggota) {
      anggotaGridEl.innerHTML = DATA_TIM_KKN.anggota.map((mhs, idx) => `
        <div class="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              ${idx + 1}
            </div>
            <div>
              <h4 class="font-display font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">${mhs.nama}</h4>
              <p class="text-xs font-mono text-slate-500">NIM. ${mhs.nim}</p>
            </div>
          </div>
          <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span class="text-slate-600">${mhs.prodi}</span>
            <span class="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold text-[11px] border border-emerald-100">
              ${mhs.peran}
            </span>
          </div>
        </div>
      `).join("");
    }
  }

  // Update statistik di Hero
  const statGedungEl = document.getElementById("stat-total-gedung");
  if (statGedungEl && typeof DATA_GEDUNG !== "undefined") {
    statGedungEl.innerText = `${DATA_GEDUNG.length} Bangunan`;
  }
}

// 2. Render Pin Interaktif di Atas Foto Drone Kawasan Ponpes
function renderPetaPins() {
  const pinsLayer = document.getElementById("pins-layer");
  if (!pinsLayer || typeof DATA_GEDUNG === "undefined") return;

  pinsLayer.innerHTML = "";

  const filteredData = dapatkanDataTerfilter();

  filteredData.forEach((gedung) => {
    const pin = document.createElement("div");
    pin.className = "absolute cursor-pointer group transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 hover:scale-110 z-10 hover:z-30";
    pin.style.top = gedung.posisi.top;
    pin.style.left = gedung.posisi.left;
    pin.setAttribute("data-id", gedung.id);

    // Warna Pin sesuai Kategori
    const badgeColor = dapatkanWarnaKategori(gedung.kategori);

    pin.innerHTML = `
      <!-- Lingkaran Luar Berdenyut -->
      <div class="relative flex items-center justify-center">
        <span class="absolute w-9 h-9 rounded-full ${badgeColor.pulseBg} pin-pulse opacity-75"></span>
        
        <!-- Tombol Pin Utama -->
        <div class="relative w-8 h-8 rounded-full ${badgeColor.bg} text-white flex items-center justify-center shadow-lg border-2 border-white font-display font-extrabold text-xs">
          ${gedung.kode.replace("G-", "")}
        </div>
        
        <!-- Label Mini Mengambang -->
        <div class="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900/90 text-white text-[11px] font-bold px-2 py-0.5 rounded shadow border border-slate-700 backdrop-blur-sm pointer-events-none group-hover:scale-105 transition-all">
          ${gedung.nama.split(" (")[0]}
        </div>

        <!-- Tooltip Hover Cepat -->
        <div class="absolute bottom-10 left-1/2 -translate-x-1/2 hidden group-hover:flex flex-col bg-white text-slate-800 p-3 rounded-xl shadow-2xl border border-slate-200 w-52 text-left pointer-events-none z-40 animate-fade-in">
          <div class="text-[10px] uppercase font-bold text-emerald-600 tracking-wider">${gedung.kategori} • ${gedung.kode}</div>
          <div class="text-xs font-bold text-slate-900 leading-snug mt-0.5">${gedung.nama}</div>
          <div class="mt-2 pt-2 border-t border-slate-100 text-[11px] text-slate-600 space-y-1">
            <div class="flex justify-between">
              <span>Luas Bangunan:</span>
              <strong class="text-slate-800">${gedung.luas_bangunan}</strong>
            </div>
            <div class="flex justify-between">
              <span>Kapasitas:</span>
              <strong class="text-slate-800">${gedung.kapasitas}</strong>
            </div>
          </div>
          <div class="mt-2 text-[10px] text-center font-bold text-emerald-600 bg-emerald-50 py-1 rounded">
            👉 Klik untuk rincian lengkap
          </div>
        </div>
      </div>
    `;

    // Event Klik Pin: Buka Modal Detail
    pin.addEventListener("click", () => {
      bukaDetailGedung(gedung.id);
    });

    pinsLayer.appendChild(pin);
  });
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

          <!-- Fasilitas Mini Preview -->
          <div class="text-xs text-slate-500">
            <span class="font-semibold text-slate-700">Fasilitas Utama:</span>
            <div class="mt-1.5 flex flex-wrap gap-1">
              ${gedung.fasilitas_utama.slice(0, 3).map(f => `
                <span class="px-2 py-0.5 rounded bg-slate-100 text-[11px] text-slate-600">✓ ${f}</span>
              `).join("")}
              ${gedung.fasilitas_utama.length > 3 ? `
                <span class="px-2 py-0.5 rounded bg-emerald-50 text-[11px] text-emerald-700 font-semibold">+${gedung.fasilitas_utama.length - 3} lainnya</span>
              ` : ""}
            </div>
          </div>

          <!-- Tombol Detail -->
          <button onclick="bukaDetailGedung('${gedung.id}')" class="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-emerald-600 text-slate-800 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-2 group-hover:bg-emerald-600 group-hover:text-white">
            <i class="fa-solid fa-circle-info"></i>
            <span>Buka Fasilitas & Ukuran Lengkap</span>
          </button>
        </div>

      </div>
    `;
  }).join("");
}

// 4. Modal Detail Gedung Sesuai Permintaan (Luas Tanah, Luas Gedung, Fasilitas, Kapasitas)
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

  // Render Pembagian Lantai
  const lantaiContainer = document.getElementById("modal-pembagian-lantai");
  if (gedung.pembagian_lantai && gedung.pembagian_lantai.length > 0) {
    lantaiContainer.innerHTML = gedung.pembagian_lantai.map(item => `
      <div class="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
        <span class="px-2 py-1 rounded bg-emerald-100 text-emerald-800 font-bold text-xs whitespace-nowrap">
          ${item.lantai}
        </span>
        <span class="text-xs text-slate-700 leading-relaxed mt-0.5">
          ${item.fungsi}
        </span>
      </div>
    `).join("");
  } else {
    lantaiContainer.innerHTML = `<p class="text-xs text-slate-400">Data pembagian lantai belum tersedia.</p>`;
  }

  // Render Checklist Fasilitas
  const fasContainer = document.getElementById("modal-fasilitas-list");
  if (gedung.fasilitas_utama && gedung.fasilitas_utama.length > 0) {
    fasContainer.innerHTML = gedung.fasilitas_utama.map(fas => `
      <div class="flex items-center gap-2 p-2 rounded-lg bg-emerald-50/60 border border-emerald-100 text-slate-700">
        <i class="fa-solid fa-check text-emerald-600 text-xs"></i>
        <span>${fas}</span>
      </div>
    `).join("");
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

  renderPetaPins();
  renderGridGedung();
}

function cariGedung(val) {
  keywordCari = val.toLowerCase().trim();
  renderPetaPins();
  renderGridGedung();
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
      gedung.fasilitas_utama.some(f => f.toLowerCase().includes(keywordCari));

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

// 6. Smooth Scroll & Keyboard Event
function inisialisasiEvent() {
  // Tutup modal jika klik di luar box
  const modal = document.getElementById("modal-detail");
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) tutupModal();
    });
  }

  // Tutup modal dengan tombol Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") tutupModal();
  });
}

function scrollToMap() {
  const el = document.getElementById("peta-kawasan");
  if (el) el.scrollIntoView({ behavior: "smooth" });
}
