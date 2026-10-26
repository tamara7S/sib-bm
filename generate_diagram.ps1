Add-Type -AssemblyName System.Drawing

$width = 1600
$height = 1150
$bmp = New-Object System.Drawing.Bitmap $width, $height
$g = [System.Drawing.Graphics]::FromImage($bmp)

$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

# Background
$bgBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(248, 250, 252))
$g.FillRectangle($bgBrush, 0, 0, $width, $height)

# Fonts
$fontFamily = "Segoe UI"
$fontTitle = New-Object System.Drawing.Font ($fontFamily, 26, [System.Drawing.FontStyle]::Bold)
$fontSub = New-Object System.Drawing.Font ($fontFamily, 13, [System.Drawing.FontStyle]::Regular)
$fontSec = New-Object System.Drawing.Font ($fontFamily, 15, [System.Drawing.FontStyle]::Bold)
$fontCardTitle = New-Object System.Drawing.Font ($fontFamily, 14, [System.Drawing.FontStyle]::Bold)
$fontCardDesc = New-Object System.Drawing.Font ($fontFamily, 11, [System.Drawing.FontStyle]::Regular)
$fontBadge = New-Object System.Drawing.Font ($fontFamily, 10, [System.Drawing.FontStyle]::Bold)
$fontFoot = New-Object System.Drawing.Font ($fontFamily, 11, [System.Drawing.FontStyle]::Regular)

# Brushes & Pens
$whiteBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)
$slate900 = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(15, 23, 42))
$slate700 = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(51, 65, 85))
$slate500 = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(100, 116, 139))
$emeraldDark = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(6, 95, 70))
$emeraldMed = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(16, 185, 129))
$emeraldLight = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(236, 253, 245))
$amberLight = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(254, 243, 199))
$amberDark = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(180, 83, 9))
$blueLight = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(239, 246, 255))
$blueDark = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(29, 78, 216))

$penBorder = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(226, 232, 240)), 2
$penEmerald = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(16, 185, 129)), 3
$penArrow = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(16, 185, 129)), 4
$penArrow.CustomEndCap = New-Object System.Drawing.Drawing2D.AdjustableArrowCap (6, 7, $true)

# Helper function to draw rounded rectangle
function Draw-RoundedRect($graphics, $brush, $pen, $x, $y, $w, $h, $radius) {
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $d = $radius * 2
    $path.AddArc($x, $y, $d, $d, 180, 90)
    $path.AddArc($x + $w - $d, $y, $d, $d, 270, 90)
    $path.AddArc($x + $w - $d, $y + $h - $d, $d, $d, 0, 90)
    $path.AddArc($x, $y + $h - $d, $d, $d, 90, 90)
    $path.CloseFigure()
    if ($brush -ne $null) { $graphics.FillPath($brush, $path) }
    if ($pen -ne $null) { $graphics.DrawPath($pen, $path) }
}

# --- HEADER SECTION ---
Draw-RoundedRect $g $whiteBrush $penBorder 40 30 1520 120 16

# Badge KKN UM
Draw-RoundedRect $g $amberLight (New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(252, 211, 77)), 1) 70 48 340 32 8
$g.DrawString("UNIVERSITAS NEGERI MALANG - KKN 2026", $fontBadge, $amberDark, 85, 55)

# Title & Subtitle
$g.DrawString("FLOWCHART SISTEM INFORMASI BANGUNAN (SIB-BM)", $fontTitle, $slate900, 70, 85)
$g.DrawString("Alur Kerja Navigasi & Informasi Fasilitas Gedung Pondok Pesantren Bahrul Maghfiroh", $fontSub, $slate500, 760, 98)

# --- BAGIAN 1: ALUR PENGUNJUNG WEB (USER EXPERIENCE) ---
$g.DrawString("BAGIAN 1: ALUR INTERAKSI PENGUNJUNG DI WEBSITE", $fontSec, $emeraldDark, 50, 180)

# Card 1: Pengunjung Datang
$x1 = 50; $y1 = 220; $w1 = 330; $h1 = 380
Draw-RoundedRect $g $whiteBrush $penBorder $x1 $y1 $w1 $h1 16
Draw-RoundedRect $g $emeraldLight $null ($x1 + 20) ($y1 + 20) 290 38 8
$g.DrawString("TAHAP 1: AKSES DARI LUAR", $fontBadge, $emeraldDark, ($x1 + 35), ($y1 + 30))
$g.DrawString("Landing Page SIB-BM", $fontCardTitle, $slate900, ($x1 + 20), ($y1 + 75))
$desc1 = "Pengunjung (wali santri, tamu, atau santri baru) membuka web.`n`nDisambut halaman resmi memuat:`n* Identitas KKN Universitas Negeri Malang`n* Profil Ponpes Bahrul Maghfiroh`n* Penunjuk Pintu Gerbang Masuk`n* Tombol CTA: 'Buka Peta Drone'`n* Ringkasan statistik fasilitas"
$g.DrawString($desc1, $fontCardDesc, $slate700, (New-Object System.Drawing.RectangleF ($x1 + 20), ($y1 + 115), 290, 240))

# Arrow 1 -> 2
$g.DrawLine($penArrow, ($x1 + $w1 + 5), ($y1 + 190), ($x1 + $w1 + 55), ($y1 + 190))

# Card 2: Peta Drone Interaktif
$x2 = 445; $y2 = 220; $w2 = 330; $h2 = 380
Draw-RoundedRect $g $whiteBrush $penBorder $x2 $y2 $w2 $h2 16
Draw-RoundedRect $g $blueLight $null ($x2 + 20) ($y2 + 20) 290 38 8
$g.DrawString("TAHAP 2: EKSPLORASI AREA", $fontBadge, $blueDark, ($x2 + 35), ($y2 + 30))
$g.DrawString("Peta Drone Kawasan", $fontCardTitle, $slate900, ($x2 + 20), ($y2 + 75))
$desc2 = "Menampilkan foto tampak atas/drone seluruh kompleks pesantren secara utuh.`n`nFitur interaktif:`n* Pin Berkedip di tiap gedung`n* Kategori: Ibadah, Asrama, Sekolah, Kantor, & Fasilitas Umum`n* Search Bar pintar (misal: 'Masjid')`n* Navigasi zoom dan drag kawasan"
$g.DrawString($desc2, $fontCardDesc, $slate700, (New-Object System.Drawing.RectangleF ($x2 + 20), ($y2 + 115), 290, 240))

# Arrow 2 -> 3
$g.DrawLine($penArrow, ($x2 + $w2 + 5), ($y2 + 190), ($x2 + $w2 + 55), ($y2 + 190))

# Card 3: Aksi Klik Gedung
$x3 = 840; $y3 = 220; $w3 = 300; $h3 = 380
Draw-RoundedRect $g $whiteBrush $penBorder $x3 $y3 $w3 $h3 16
Draw-RoundedRect $g $amberLight $null ($x3 + 20) ($y3 + 20) 260 38 8
$g.DrawString("TAHAP 3: AKSI PENGUNJUNG", $fontBadge, $amberDark, ($x3 + 30), ($y3 + 30))
$g.DrawString("Klik Gedung A / B / C", $fontCardTitle, $slate900, ($x3 + 20), ($y3 + 75))
$desc3 = "Pengunjung memilih gedung yang ingin dilihat informasinya.`n`nContoh pilihan gedung:`n* Gedung A: Masjid Jami'`n* Gedung B: Asrama Santri Putra`n* Gedung C: Asrama Santri Putri`n* Gedung D: Gedung Sekolah/KBM`n* Gedung E: Kantor Ndalem / Rektorat`n* Gedung F: Aula & Fasilitas Umum"
$g.DrawString($desc3, $fontCardDesc, $slate700, (New-Object System.Drawing.RectangleF ($x3 + 20), ($y3 + 115), 260, 240))

# Arrow 3 -> 4
$g.DrawLine($penArrow, ($x3 + $w3 + 5), ($y3 + 190), ($x3 + $w3 + 55), ($y3 + 190))

# Card 4: Jendela Modal Rincian Spesifikasi Gedung
$x4 = 1205; $y4 = 220; $w4 = 345; $h4 = 380
Draw-RoundedRect $g $whiteBrush (New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(16, 185, 129)), 3) $x4 $y4 $w4 $h4 16
$g.FillRectangle((New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(16, 185, 129))), ($x4), ($y4), $w4, 50)
$g.DrawString("HASIL: POP-UP RINCIAN LENGKAP", $fontBadge, $whiteBrush, ($x4 + 25), ($y4 + 17))
$g.DrawString("Spesifikasi Bangunan Terbuka", $fontCardTitle, $slate900, ($x4 + 20), ($y4 + 70))
$desc4 = "Jendela detail memuat informasi persis sesuai permintaan:`n`n1. Foto Asli Gedung (Depan/Ruangan)`n2. Luas Tanah (m2)`n3. Luas Bangunan (m2)`n4. Kapasitas (Jumlah Jamaah/Santri)`n5. Jumlah Lantai & Pembagian Ruang`n6. Checklist Fasilitas (AC, Wifi, WC)`n7. Kontak Pengelola / Penanggung Jawab"
$g.DrawString($desc4, $fontCardDesc, $slate700, (New-Object System.Drawing.RectangleF ($x4 + 20), ($y4 + 105), 305, 260))


# --- BAGIAN 2: ALUR KERJA TIM KKN (PRAKTIS & TIDAK MEMPERSULIT) ---
$g.DrawString("BAGIAN 2: ALUR KERJA TIM KKN UNIVERSITAS NEGERI MALANG (BAGI TUGAS LAPANGAN)", $fontSec, $emeraldDark, 50, 640)

# Step A: Survei Lapangan
$saX = 50; $saY = 680; $saW = 460; $saH = 340
Draw-RoundedRect $g $whiteBrush $penBorder $saX $saY $saW $saH 16
Draw-RoundedRect $g $emeraldLight $null ($saX + 20) ($saY + 20) 420 36 8
$g.DrawString("LANGKAH 1: DOKUMENTASI & SURVEI LAPANGAN", $fontBadge, $emeraldDark, ($saX + 35), ($saY + 29))
$descSA = "Tugas Tim Lapangan:`n1. Ambil 1 foto tampak atas/drone seluruh kompleks ponpes.`n2. Ambil 1-2 foto tampak depan untuk masing-masing gedung.`n3. Wawancara pengurus pondok untuk mencatat:`n   - Nama gedung & fungsinya`n   - Luas tanah dan luas bangunan (m2)`n   - Kapasitas daya tampung santri/jamaah`n   - Fasilitas tiap lantai"
$g.DrawString($descSA, $fontCardDesc, $slate700, (New-Object System.Drawing.RectangleF ($saX + 20), ($saY + 75), 420, 240))

# Arrow A -> B
$g.DrawLine($penArrow, ($saX + $saW + 5), ($saY + 170), ($saX + $saW + 55), ($saY + 170))

# Step B: Input Data
$sbX = 570; $sbY = 680; $sbW = 460; $sbH = 340
Draw-RoundedRect $g $whiteBrush $penBorder $sbX $sbY $sbW $sbH 16
Draw-RoundedRect $g $blueLight $null ($sbX + 20) ($sbY + 20) 420 36 8
$g.DrawString("LANGKAH 2: MASUKKAN DATA (MUDAH, TANPA KODING RUMIT)", $fontBadge, $blueDark, ($sbX + 35), ($sbY + 29))
$descSB = "Tugas Tim Entri Data:`n1. Masukkan file foto ke folder: project_kkn/images/`n   - Foto drone dinamai: drone-kawasan.jpg`n   - Foto gedung dinamai: masjid.jpg, asrama.jpg, dll.`n`n2. Tulis angka luas, kapasitas, & fasilitas di file:`n   data-gedung.js (format sudah disediakan rapi).`n`n3. Masukkan nama-nama anggota tim KKN & DPL."
$g.DrawString($descSB, $fontCardDesc, $slate700, (New-Object System.Drawing.RectangleF ($sbX + 20), ($sbY + 75), 420, 240))

# Arrow B -> C
$g.DrawLine($penArrow, ($sbX + $sbW + 5), ($sbY + 170), ($sbX + $sbW + 55), ($sbY + 170))

# Step C: Presentasi & Output
$scX = 1090; $scY = 680; $scW = 460; $scH = 340
Draw-RoundedRect $g $whiteBrush (New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(16, 185, 129)), 2) $scX $scY $scW $scH 16
Draw-RoundedRect $g $amberLight $null ($scX + 20) ($scY + 20) 420 36 8
$g.DrawString("LANGKAH 3: HASIL JADI & PRESENTASI KKN", $fontBadge, $amberDark, ($scX + 45), ($saY + 29))
$descSC = "Output & Luaran KKN:`n1. Web SIB-BM langsung otomatis aktif dan terbarui.`n2. Bisa dijalankan offline via laptop saat presentasi.`n3. Bisa diunggah ke Vercel/Netlify agar punya link online.`n`nNilai Tambah (Rekomendasi):`n* Cetak Standing Banner / Plakat QR Code di pondok.`n* Tombol rute Google Maps untuk tamu wali santri."
$g.DrawString($descSC, $fontCardDesc, $slate700, (New-Object System.Drawing.RectangleF ($scX + 20), ($scY + 75), 420, 240))


# --- FOOTER ---
$g.DrawString("(c) 2026 SIB-BM - Sistem Informasi Bangunan Bahrul Maghfiroh | Mahasiswa KKN Universitas Negeri Malang (UM)", $fontFoot, $slate500, 480, 1070)

# Save to PNG
$outputPath = Join-Path (Get-Location) "flowchart_sib_bm.png"
$bmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)

$g.Dispose()
$bmp.Dispose()

Write-Host "SUCCESS: Saved flowchart to $outputPath"
