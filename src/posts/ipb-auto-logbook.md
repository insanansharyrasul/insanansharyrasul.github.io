---
title: Panduan Lengkap IPB Auto Logbook: Otomatisasi Pengisian Logbook Portal IPB
excerpt: Cara praktis mengisi puluhan entri logbook aktivitas IPB secara otomatis via Chrome Extension, Desktop GUI, dan CLI menggunakan data CSV.
date: 2026-10-19
tags: [automation, python, playwright, tools]
cover: /blog/ipb-auto-logbook/ipb-auto-logbook-cover.svg
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
        <span style="font-family: 'Fira Code', monospace; color: var(--color-yellow); font-size: 0.85rem; font-weight: 600;" class="media-badge">v2.1.0</span>
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
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="21.17" y1="8" x2="12" y2="8"/><line x1="3.95" y1="6.06" x2="8.54" y2="14"/><line x1="10.88" y1="21.94" x2="15.46" y2="14"/></svg>
      Chrome Extension (.zip)
    </a>
    <a href="https://github.com/insanansharyrasul/ipb_auto_logbook/releases/download/v2.1.0/IPB-Auto-Logbook-Windows.zip" class="installer-pill" target="_blank" rel="noopener noreferrer">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/></svg>
      Windows Standalone (.zip)
    </a>
    <a href="https://github.com/insanansharyrasul/ipb_auto_logbook/releases/download/v2.1.0/IPB-Auto-Logbook-macOS.zip" class="installer-pill" target="_blank" rel="noopener noreferrer">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-2 .6-2.65 1.35-.58.67-1.09 1.74-.95 2.77 1.01.08 2.06-.52 2.68-1.27z"/></svg>
      macOS Standalone (.zip)
    </a>
    <a href="https://github.com/insanansharyrasul/ipb_auto_logbook/releases/download/v2.1.0/IPB-Auto-Logbook-Linux.tar.gz" class="installer-pill" target="_blank" rel="noopener noreferrer">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
      Linux Standalone (.tar.gz)
    </a>
    <a href="https://github.com/insanansharyrasul/ipb_auto_logbook" class="installer-pill" target="_blank" rel="noopener noreferrer">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
      GitHub Repository
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

<figure>
  <img src="/blog/ipb-auto-logbook/app-showcase.webp" alt="Preview Tampilan Aplikasi Desktop dan Chrome Extension di Portal IPB" class="rounded-lg border border-border w-full" />
  <figcaption>Preview Tampilan Aplikasi di Portal IPB</figcaption>
</figure>

## Persiapan Berkas Data CSV

Sebelum menjalankan otomatisasi, siapkan satu berkas spreadsheet dan simpan dengan format **CSV (Comma Separated Values)**.

### Format Kolom Wajib

Berkas CSV harus memiliki **8 nama kolom** (ditulis dengan huruf kecil):

| Nama Kolom   | Keterangan                                            | Contoh Nilai                            |
| :----------- | :---------------------------------------------------- | :-------------------------------------- |
| `tanggal`    | Tanggal kegiatan (format `DD/MM/YYYY`)                | `04/02/2026`                            |
| `mulai`      | Waktu mulai kegiatan (format `HH:MM`)                 | `15:00`                                 |
| `selesai`    | Waktu selesai kegiatan (format `HH:MM`)               | `16:00`                                 |
| `keterangan` | Uraian atau topik aktivitas harian                    | `Diskusi project dan pembagian jobdesk` |
| `file`       | Lokasi path relatif file bukti kegiatan               | `files/bukti_04_02_2026.png`            |
| `tipe`       | Jenis kegiatan (`offline`, `online`, atau `hybrid`)   | `offline`                               |
| `lokasi`     | Lokasi spesifik tempat kegiatan berlangsung           | `SC IPB Kampus Dramaga`                 |
| `berita`     | Kategori aktivitas (`kegiatan`, `ujian`, `bimbingan`) | `kegiatan`                              |

Format berkas bukti yang didukung meliputi `.png`, `.jpeg`, `.jpg`, dan `.pdf`.

### Contoh Isi Berkas data.csv

Berikut adalah contoh isi berkas `data.csv`:

```csv
tanggal,mulai,selesai,keterangan,file,tipe,lokasi,berita
04/02/2026,15:00,16:00,Diskusi project dan pembagian jobdesk,files/bukti_04_02_2026.png,offline,SC IPB,kegiatan
05/02/2026,09:00,12:00,Pengerjaan modul frontend dan integrasi API,files/bukti_05_02_2026.png,online,Lab Komputer,kegiatan
06/02/2026,13:30,15:00,Bimbingan progres mingguan bersama dosen penggerak,files/bimbingan_06_02.pdf,offline,Ruang Dosen,bimbingan
```

<figure>
  <img src="/blog/ipb-auto-logbook/csv-example.webp" alt="Preview Format data.csv di Spreadsheet" class="rounded-lg border border-border w-full" />
  <figcaption>Preview Tampilan Format data.csv di Microsoft Excel / Google Sheets</figcaption>
</figure>

## Cara Menggunakan Opsi 1: Chrome Extension

Metode Chrome Extension adalah opsi yang paling direkomendasikan karena Anda tidak perlu memasang Python maupun dependensi driver browser di komputer.

### Langkah Pemasangan Ekstensi

1. Unduh arsip `IPB-Auto-Logbook-Chrome-Extension.zip` dari [halaman rilis v2.1.0](https://github.com/insanansharyrasul/ipb_auto_logbook/releases/tag/v2.1.0).
2. Ekstrak berkas zip tersebut ke salah satu folder di komputer Anda.
3. Buka browser Google Chrome, lalu buka alamat `chrome://extensions/`.
4. Aktifkan sakelar **Developer mode** (Mode Pengembang) di pojok kanan atas.
5. Klik tombol **Load unpacked** (Muat yang belum dibongkar) di pojok kiri atas.
6. Arahkan dan pilih folder hasil ekstrak ekstensi tadi.

<figure>
  <img src="/blog/ipb-auto-logbook/chrome-extension-demo.gif" alt="Demo Chrome Extension IPB Auto Logbook" class="rounded-lg border border-border w-full" />
  <figcaption>Demo Penggunaan Chrome Extension IPB Auto Logbook</figcaption>
</figure>

### Menjalankan Otomatisasi di Portal

1. Masuk ke Portal Mahasiswa IPB (`https://studentportal.ipb.ac.id/`).
2. Masuk ke menu kegiatan: **Aktivitas Kampus Merdeka** di tautan `https://studentportal.ipb.ac.id/Kegiatan/AktivitasKampusMerdeka`.
3. Perhatikan pojok kanan atas halaman portal. Anda akan melihat sebuah tombol mengambang (*floating action button*) ekstensi. Klik ikon tombol tersebut untuk menampilkan panel kontrol otomatisasi. Jika belum muncul, muat ulang (refresh) halaman tab Anda.
4. Masukkan parameter konfigurasi kegiatan:
   - **Dosen**: Masukkan nama lengkap dosen penggerak persis seperti yang tertulis pada opsi dropdown portal.
   - **Row Number (Baris)**: Nomor ID kegiatan yang ada di kolom paling kiri (`No`) tabel utama kegiatan.
   - **Semester**: Keterangan semester pada kolom `Tahun Semester` (misalnya `2026/2027 Semester Genap`).
5. Unggah berkas `data.csv` yang telah disiapkan.
6. Pilih berkas-berkas foto/dokumen bukti pendukung sesuai dengan nama yang tercantum di kolom `file` pada CSV.
7. Klik tombol **Mulai Pengisian**. Ekstensi akan secara otomatis membuka jendela modal form, mengisi setiap kolom secara berurutan, melampirkan berkas bukti, dan menekan tombol simpan hingga semua baris selesai diproses.

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

<figure>
  <img src="/blog/ipb-auto-logbook/desktop-gui.webp" alt="Preview Tampilan Desktop GUI IPB Auto Logbook" class="rounded-lg border border-border w-full" />
  <figcaption>Preview Tampilan Desktop GUI IPB Auto Logbook</figcaption>
</figure>

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

| Parameter              | Cara Menemukannya di Portal Mahasiswa                                                                                    | Contoh Input yang Tepat            |
| :--------------------- | :----------------------------------------------------------------------------------------------------------------------- | :--------------------------------- |
| **Dosen**              | Masuk ke detail Kegiatan $\rightarrow$ Log $\rightarrow$ Tambah. Salin nama lengkap dosen dari opsi dropdown.            | `Jeffrey Einstein, S.Komp., Ph.D.` |
| **Row Number (Baris)** | Angka pada kolom paling kiri (`No`) di tabel utama aktivitas. Gunakan angka ID baris, bukan urutan yang dihitung manual. | `1`                                |
| **Semester**           | Teks pada kolom `Tahun Semester` di tabel utama aktivitas. Harus ditulis sama persis.                                    | `2026/2027 Semester Genap`         |

> [!IMPORTANT]
> Mesin otomatisasi menggabungkan nilai `Row Number` dan `Semester` (dengan format `<Row Number> <Semester>`) untuk mengidentifikasi dan mengklik tombol detail pada baris kegiatan yang benar di portal.

## Video Panduan Lengkap

Untuk saat ini, video panduan lengkap penggunaan IPB Auto Logbook bis dilihat melalui instagram. Kalian bisa mengikuti tutorial dari instagram resmi pengembang di [@insan_a_r](https://www.instagram.com/reel/DeD3A3ZpPzp/) untuk panduan dari awal hingga akhir proses otomatisasi.

## Keamanan Data dan Privasi

Ketika menggunakan alat otomatisasi web, privasi dan keamanan akun adalah prioritas penting:

- **Eksekusi Sepenuhnya di Sisi Klien**: Seluruh proses otomasi berjalan langsung di komputer Anda. Tidak ada data akun, sandi, maupun berkas logbook yang dikirimkan ke server pihak ketiga.
- **Isolasi Shadow DOM**: Komponen antarmuka pada Chrome Extension diisolasi di dalam *Shadow DOM* agar tidak terjadi kebocoran gaya (style conflict) maupun bentrokan skrip dengan sistem portal IPB.
- **Lisensi Terbuka**: Kode sumber proyek ini didistribusikan di bawah lisensi terbuka [GNU General Public License v3.0 (GPL-3.0)](https://github.com/insanansharyrasul/ipb_auto_logbook/blob/main/LICENSE), sehingga transparan dan dapat dipelajari oleh siapa saja.

Jika Anda menemukan kendala saat menjalankan aplikasi atau memiliki saran perbaikan fitur, silakan buat laporan masalah (*issue*) atau ajukan kontribusi langsung di repositori resmi [GitHub ipb_auto_logbook](https://github.com/insanansharyrasul/ipb_auto_logbook).
