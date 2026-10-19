---
title: Panduan Lengkap IPB Auto Logbook: Otomatisasi Pengisian Logbook Portal IPB
excerpt: Cara praktis mengisi puluhan entri logbook aktivitas IPB secara otomatis via Chrome Extension, Desktop GUI, dan CLI menggunakan data CSV.
date: 2026-10-19
tags: [automation, python, playwright, tools]
cover: /images/ipb-auto-logbook-cover.svg
---

Bagi mahasiswa IPB yang sedang menjalani program MBKM, magang industri, capstone project, maupun kegiatan terstruktur lainnya, pengisian logbook harian di Portal Mahasiswa IPB (`studentportal.ipb.ac.id`) merupakan salah satu kewajiban rutin. Namun ketika aktivitas sudah berjalan berminggu-minggu atau berbulan-bulan, mengisi logbook secara manual satu per satu lewat formulir web portal sering kali menyita banyak waktu dan tenaga.

Setiap satu entri mengharuskan kita mencari baris kegiatan, membuka jendela modal form, memilih nama dosen penggerak, mengetik tanggal, memasukkan jam mulai dan selesai, menuliskan uraian kegiatan, memilih berkas bukti lampiran, lalu menekan tombol simpan. Jika ada 30 hingga 60 entri yang menumpuk, proses manual tersebut bisa menghabiskan waktu berjam-jam.

Untuk menyelesaikan persoalan tersebut, proyek open-source **IPB Auto Logbook** dikembangkan. Aplikasi ini membaca data logbook yang sudah disiapkan dalam format spreadsheet CSV, kemudian mengisikan seluruh isian formulir sekaligus mengunggah bukti lampiran ke portal secara berurutan dan otomatis.

<!-- SECTION: INSTALLER BUTTON & DOWNLOAD RELEASE -->
<div class="installer-box">
  <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem;">
    <div>
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
        <span class="media-badge media-badge-image">RELEASE TERBARU</span>
        <span style="font-family: 'Fira Code', monospace; color: var(--color-yellow); font-size: 0.85rem; font-weight: 600;">v2.1.0</span>
      </div>
      <h3 style="margin: 0 0 4px 0; font-size: 1.25rem; color: var(--color-text);">Unduh IPB Auto Logbook</h3>
      <p style="margin: 0; font-size: 0.9rem; color: var(--color-text-muted);">
        Pilih paket Chrome Extension (tanpa instalasi Python) atau paket aplikasi mandiri sesuai sistem operasi Anda.
      </p>
    </div>
    <div>
      <a href="https://github.com/insanansharyrasul/ipb_auto_logbook/releases/tag/v2.1.0" target="_blank" rel="noopener noreferrer" class="installer-btn">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
        Buka Halaman Rilis v2.1.0
      </a>
    </div>
  </div>

  <div class="installer-platforms">
    <a href="https://github.com/insanansharyrasul/ipb_auto_logbook/releases/download/v2.1.0/IPB-Auto-Logbook-Chrome-Extension.zip" class="installer-pill" target="_blank" rel="noopener noreferrer">
      <span>📦</span> Chrome Extension (.zip)
    </a>
    <a href="https://github.com/insanansharyrasul/ipb_auto_logbook/releases/download/v2.1.0/IPB-Auto-Logbook-Windows.zip" class="installer-pill" target="_blank" rel="noopener noreferrer">
      <span>🪟</span> Windows Standalone (.zip)
    </a>
    <a href="https://github.com/insanansharyrasul/ipb_auto_logbook/releases/download/v2.1.0/IPB-Auto-Logbook-macOS.zip" class="installer-pill" target="_blank" rel="noopener noreferrer">
      <span>🍎</span> macOS Standalone (.zip)
    </a>
    <a href="https://github.com/insanansharyrasul/ipb_auto_logbook/releases/download/v2.1.0/IPB-Auto-Logbook-Linux.tar.gz" class="installer-pill" target="_blank" rel="noopener noreferrer">
      <span>🐧</span> Linux Standalone (.tar.gz)
    </a>
    <a href="https://github.com/insanansharyrasul/ipb_auto_logbook" class="installer-pill" target="_blank" rel="noopener noreferrer">
      <span>⭐</span> GitHub Repository
    </a>
  </div>
</div>

## Fitur Utama

IPB Auto Logbook menyediakan beberapa keunggulan teknis yang memudahkan pengisian logbook:

1. **Akurasi Pengisian Formulir**: Mengisi tanggal, jam mulai, jam selesai, kategori kegiatan, nama dosen pembimbing, lokasi, deskripsi kegiatan, dan mengunggah dokumen bukti secara tepat.
2. **Tiga Pilihan Metode Eksekusi**: Mendukung ekstensi browser Chrome (Manifest V3), aplikasi desktop berbasis GUI (PyQt6), serta antarmuka baris perintah (CLI).
3. **Antarmuka Aman dan Terisolasi**: Pada Chrome Extension, panel kontrol mengambang diinjeksi menggunakan *Shadow DOM* sehingga tidak merusak tampilan layout portal IPB asli, dan seluruh kredensial tetap tersimpan aman di browser lokal Anda.
4. **Parsing CSV Fleksibel**: Menggunakan pustaka *PapaParse* yang toleran terhadap spasi berlebih, baris kosong, maupun tanda petik.
5. **Penyimpanan Berkas Lampiran**: Memanfaatkan *IndexedDB* pada browser agar berkas bukti tetap tersimpan rapi selama antrean pengisian berjalan.

<!-- PLACEHOLDER 1: OVERVIEW SCREENSHOT -->
<div class="media-placeholder">
  <span class="media-badge media-badge-image">SCREENSHOT PLACEHOLDER</span>
  <h4 class="media-title">Preview Tampilan Aplikasi di Portal IPB</h4>
  <p class="media-desc">Tampilkan tangkapan layar keseluruhan antarmuka saat Chrome Extension atau Desktop GUI aktif berdampingan dengan Portal Mahasiswa IPB.</p>
  <span class="media-hint">Rekomendasi file: static/blog/ipb-auto-logbook-overview.png (1280x720)</span>
</div>

## Persiapan Berkas Data CSV

Sebelum menjalankan otomatisasi, siapkan satu berkas spreadsheet dan simpan dengan format **CSV (Comma Separated Values)**.

### Format Kolom Wajib

Berkas CSV harus memiliki **8 nama kolom** (ditulis dengan huruf kecil):

| Nama Kolom | Keterangan | Contoh Nilai |
| :--- | :--- | :--- |
| `tanggal` | Tanggal kegiatan (format `DD/MM/YYYY`) | `04/02/2026` |
| `mulai` | Waktu mulai kegiatan (format `HH:MM`) | `15:00` |
| `selesai` | Waktu selesai kegiatan (format `HH:MM`) | `16:00` |
| `keterangan` | Uraian atau topik aktivitas harian | `Diskusi project dan pembagian jobdesk` |
| `file` | Lokasi path relatif file bukti kegiatan | `files/bukti_04_02_2026.png` |
| `tipe` | Jenis kegiatan (`offline`, `online`, atau `hybrid`) | `offline` |
| `lokasi` | Lokasi spesifik tempat kegiatan berlangsung | `SC IPB Kampus Dramaga` |
| `berita` | Kategori aktivitas (`kegiatan`, `ujian`, `bimbingan`) | `kegiatan` |

Format berkas bukti yang didukung meliputi `.png`, `.jpeg`, `.jpg`, dan `.pdf`.

### Contoh Isi Berkas data.csv

Berikut adalah contoh isi berkas `data.csv`:

```csv
tanggal,mulai,selesai,keterangan,file,tipe,lokasi,berita
04/02/2026,15:00,16:00,Diskusi project dan pembagian jobdesk,files/bukti_04_02_2026.png,offline,SC IPB,kegiatan
05/02/2026,09:00,12:00,Pengerjaan modul frontend dan integrasi API,files/bukti_05_02_2026.png,online,Lab Komputer,kegiatan
06/02/2026,13:30,15:00,Bimbingan progres mingguan bersama dosen penggerak,files/bimbingan_06_02.pdf,offline,Ruang Dosen,bimbingan
```

<!-- PLACEHOLDER 2: CSV SPREADSHEET SCREENSHOT -->
<div class="media-placeholder">
  <span class="media-badge media-badge-image">SCREENSHOT PLACEHOLDER</span>
  <h4 class="media-title">Tampilan Format data.csv di Microsoft Excel / Google Sheets</h4>
  <p class="media-desc">Tampilkan screenshot tabel CSV dengan 8 kolom yang terisi rapi untuk memperjelas format tanggal, jam, dan path file bukti.</p>
  <span class="media-hint">Rekomendasi file: static/blog/csv-format-preview.png (1000x500)</span>
</div>

## Cara Menggunakan Opsi 1: Chrome Extension

Metode Chrome Extension adalah opsi yang paling direkomendasikan karena Anda tidak perlu memasang Python maupun dependensi driver browser di komputer.

### Langkah Pemasangan Ekstensi

1. Unduh arsip `IPB-Auto-Logbook-Chrome-Extension.zip` dari [halaman rilis v2.1.0](https://github.com/insanansharyrasul/ipb_auto_logbook/releases/tag/v2.1.0).
2. Ekstrak berkas zip tersebut ke salah satu folder di komputer Anda.
3. Buka browser Google Chrome, lalu buka alamat `chrome://extensions/`.
4. Aktifkan sakelar **Developer mode** (Mode Pengembang) di pojok kanan atas.
5. Klik tombol **Load unpacked** (Muat yang belum dibongkar) di pojok kiri atas.
6. Arahkan dan pilih folder hasil ekstrak ekstensi tadi.

<!-- PLACEHOLDER 3: CHROME EXTENSION INSTALLATION SCREENSHOT -->
<div class="media-placeholder">
  <span class="media-badge media-badge-image">SCREENSHOT PLACEHOLDER</span>
  <h4 class="media-title">Langkah Load Unpacked di chrome://extensions/</h4>
  <p class="media-desc">Tangkapan layar halaman ekstensi Chrome dengan Developer Mode aktif dan folder ekstensi yang berhasil dimuat.</p>
  <span class="media-hint">Rekomendasi file: static/blog/chrome-load-unpacked.png (900x500)</span>
</div>

### Menjalankan Otomatisasi di Portal

1. Masuk ke Portal Mahasiswa IPB (`https://studentportal.ipb.ac.id/`).
2. Masuk ke menu kegiatan: **Aktivitas Kampus Merdeka** di tautan `https://studentportal.ipb.ac.id/Kegiatan/AktivitasKampusMerdeka`.
3. Perhatikan pojok kanan atas halaman portal. Anda akan melihat sebuah tombol mengambang berupa ikon dokumen (📄). Klik ikon tersebut untuk menampilkan panel kontrol otomatisasi. Jika ikon belum muncul, muat ulang (refresh) halaman tab Anda.
4. Masukkan parameter konfigurasi kegiatan:
   - **Dosen**: Masukkan nama lengkap dosen penggerak persis seperti yang tertulis pada opsi dropdown portal.
   - **Row Number (Baris)**: Nomor ID kegiatan yang ada di kolom paling kiri (`No`) tabel utama kegiatan.
   - **Semester**: Keterangan semester pada kolom `Tahun Semester` (misalnya `2026/2027 Semester Genap`).
5. Unggah berkas `data.csv` yang telah disiapkan.
6. Pilih berkas-berkas foto/dokumen bukti pendukung sesuai dengan nama yang tercantum di kolom `file` pada CSV.
7. Klik tombol **Mulai Pengisian**. Ekstensi akan secara otomatis membuka jendela modal form, mengisi setiap kolom secara berurutan, melampirkan berkas bukti, dan menekan tombol simpan hingga semua baris selesai diproses.

<!-- PLACEHOLDER 4: GIF DEMO CHROME EXTENSION IN ACTION -->
<div class="media-placeholder">
  <span class="media-badge media-badge-gif">GIF DEMO PLACEHOLDER</span>
  <h4 class="media-title">Animasi GIF: Proses Otomatisasi Berjalan di Browser</h4>
  <p class="media-desc">Rekaman animasi singkat (GIF 10 sampai 15 detik) yang memperlihatkan floating panel aktif dan form modal logbook terisi otomatis secara real-time.</p>
  <span class="media-hint">Rekomendasi file: static/blog/chrome-extension-demo.gif (800x450, &lt; 5MB)</span>
</div>

## Cara Menggunakan Opsi 2: Desktop GUI (PyQt6)

Bagi pengguna yang ingin menjalankan aplikasi komputer mandiri dengan tampilan visual lengkap, Anda bisa menggunakan aplikasi desktop berbasis PyQt6.

Aplikasi desktop ini tersedia dalam berkas siap pakai (standalone) untuk Windows, macOS, dan Linux di halaman rilis, atau dapat dijalankan langsung melalui kode sumber Python:

```bash
# Jalankan menggunakan Python standar
python gui_app.py

# Atau jalankan menggunakan uv
uv run python gui_app.py
```

### Navigasi Tab Desktop GUI

Aplikasi Desktop terbagi dalam 4 tab navigasi utama:

1. **Tab Config**: Untuk mengisi informasi kredensial login portal mahasiswa, nama dosen penggerak, nomor baris kegiatan, semester, dan memilih lokasi berkas CSV di komputer.
2. **Tab Logbook Data**: Menyajikan tabel visual interaktif untuk memeriksa kembali isi data CSV sebelum proses otomatisasi dijalankan. Anda dapat melihat apakah tanggal, jam, maupun nama berkas bukti sudah sesuai.
3. **Tab Run**: Tempat untuk menekan tombol mulai/berhenti proses otomatisasi, dilengkapi dengan indikator *progress bar* dan rekaman log aktivitas real-time.
4. **Tab About**: Berisi informasi versi aplikasi, lisensi, serta pengembang proyek.

<!-- PLACEHOLDER 5: SCREENSHOT DESKTOP GUI -->
<div class="media-placeholder">
  <span class="media-badge media-badge-image">SCREENSHOT PLACEHOLDER</span>
  <h4 class="media-title">Tampilan Antarmuka Desktop GUI (Tab Config & Data Logbook)</h4>
  <p class="media-desc">Tangkapan layar jendela aplikasi desktop PyQt6 yang menampilkan form konfigurasi dan pratinjau tabel entri data logbook.</p>
  <span class="media-hint">Rekomendasi file: static/blog/desktop-gui-preview.png (1000x600)</span>
</div>

## Cara Menggunakan Opsi 3: Terminal CLI

Bagi yang terbiasa bekerja di lingkungan terminal atau server tanpa antarmuka grafis, skrip CLI interaktif siap digunakan:

```bash
# Menggunakan Python standar
python main.py

# Menggunakan uv package manager
uv run python main.py
```

Skrip CLI akan meminta input konfigurasi secara bertahap:
- Username dan Password portal mahasiswa (karakter kata sandi disamarkan saat diketik demi keamanan).
- Nama Dosen Penggerak.
- Nomor Baris kegiatan.
- Keterangan Semester.
- Alamat path berkas data CSV logbook.

Driver browser Chromium akan terbuka secara otomatis di latar belakang untuk melakukan pengisian formulir.

## Panduan Parameter Konfigurasi Kegiatan

Agar otomatisasi dapat menemukan baris kegiatan yang tepat pada tabel portal, perhatikan panduan penulisan nilai berikut:

| Parameter | Cara Menemukannya di Portal Mahasiswa | Contoh Input yang Tepat |
| :--- | :--- | :--- |
| **Dosen** | Masuk ke detail Kegiatan $\rightarrow$ Log $\rightarrow$ Tambah. Salin nama lengkap dosen dari opsi dropdown. | `Jeffrey Einstein, S.Komp., Ph.D.` |
| **Row Number (Baris)** | Angka pada kolom paling kiri (`No`) di tabel utama aktivitas. Gunakan angka ID baris, bukan urutan yang dihitung manual. | `1` |
| **Semester** | Teks pada kolom `Tahun Semester` di tabel utama aktivitas. Harus ditulis sama persis. | `2026/2027 Semester Genap` |

> [!IMPORTANT]
> Mesin otomatisasi menggabungkan nilai `Row Number` dan `Semester` (dengan format `<Row Number> <Semester>`) untuk mengidentifikasi dan mengklik tombol detail pada baris kegiatan yang benar di portal.

## Video Panduan Lengkap

Untuk melihat alur penggunaan dari awal pembuatan berkas data hingga proses pengisian selesai di portal mahasiswa, simak rekaman video tutorial di bawah ini:

<!-- PLACEHOLDER 6: VIDEO WALKTHROUGH -->
<div class="media-placeholder">
  <span class="media-badge media-badge-video">VIDEO PLACEHOLDER</span>
  <h4 class="media-title">Video Walkthrough: Tutorial Lengkap IPB Auto Logbook</h4>
  <p class="media-desc">Video tutorial komprehensif berdurasi 3 sampai 5 menit yang mendemonstrasikan penyiapan data CSV, pemasangan ekstensi, hingga logbook terisi penuh di portal.</p>
  <span class="media-hint">Rekomendasi file: static/blog/tutorial-walkthrough.mp4 (atau embed YouTube iframe)</span>
</div>

## Keamanan Data dan Privasi

Ketika menggunakan alat otomatisasi web, privasi dan keamanan akun adalah prioritas penting:

- **Eksekusi Sepenuhnya di Sisi Klien**: Seluruh proses otomasi berjalan langsung di komputer Anda. Tidak ada data akun, sandi, maupun berkas logbook yang dikirimkan ke server pihak ketiga.
- **Isolasi Shadow DOM**: Komponen antarmuka pada Chrome Extension diisolasi di dalam *Shadow DOM* agar tidak terjadi kebocoran gaya (style conflict) maupun bentrokan skrip dengan sistem portal IPB.
- **Lisensi Terbuka**: Kode sumber proyek ini didistribusikan di bawah lisensi terbuka [GNU General Public License v3.0 (GPL-3.0)](https://github.com/insanansharyrasul/ipb_auto_logbook/blob/main/LICENSE), sehingga transparan dan dapat dipelajari oleh siapa saja.

## Petunjuk untuk Pemilik Blog: Cara Memasang Media Sebenarnya

Ketika Anda sudah merekam video, membuat GIF, atau mengambil tangkapan layar untuk blog ini, ganti elemen `<div class="media-placeholder">...</div>` di atas dengan tag media HTML berikut:

### 1. Memasang Gambar / Screenshot / GIF

Simpan gambar atau GIF Anda ke dalam folder `static/blog/` (misal: `static/blog/chrome-extension-demo.gif`), lalu ganti placeholder dengan format markdown standar atau tag img:

```html
<img src="/blog/chrome-extension-demo.gif" alt="Demo Chrome Extension IPB Auto Logbook" class="rounded-lg border border-border w-full my-6" />
```

### 2. Memasang Berkas Video MP4

Jika Anda ingin menampilkan video MP4 langsung:

```html
<video controls class="w-full rounded-lg border border-border my-6">
  <source src="/blog/tutorial-walkthrough.mp4" type="video/mp4" />
  Browser Anda tidak mendukung pemutaran video HTML5.
</video>
```

### 3. Memasang Video dari YouTube

Jika video diunggah ke YouTube, Anda bisa menyematkannya menggunakan iframe responsif:

```html
<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 12px; margin: 1.5em 0; border: 1px solid var(--color-border);">
  <iframe 
    src="https://www.youtube.com/embed/YOUR_VIDEO_ID" 
    title="Tutorial IPB Auto Logbook" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
  ></iframe>
</div>
```

---

Jika Anda menemukan kendala saat menjalankan aplikasi atau memiliki saran perbaikan fitur, silakan buat laporan masalah (*issue*) atau ajukan kontribusi langsung di repositori resmi [GitHub ipb_auto_logbook](https://github.com/insanansharyrasul/ipb_auto_logbook).
