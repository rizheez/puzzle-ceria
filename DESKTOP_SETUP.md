# Panduan Setup Desktop (Tauri) - Windows

Dokumen ini berisi langkah-langkah untuk menyiapkan lingkungan pengembangan (development environment) di laptop Anda agar bisa menjalankan dan membuat installer desktop (.exe) untuk game **Puzzle Kata Ceria**.

> [!NOTE]
> Langkah-langkah di bawah ini **hanya perlu dilakukan sekali** di laptop Anda (sebagai developer). Pengguna akhir (anak-anak/guru) tidak perlu meng-install tool ini, mereka langsung menerima file `.exe` jadi.

---

## Prasyarat 1: Microsoft C++ Build Tools

Tauri memerlukan kompiler C++ untuk mem-build kode Rust di Windows.

1. Unduh **Visual Studio Build Tools 2022 Installer** melalui tautan resmi ini:
   [https://visualstudio.microsoft.com/visual-cpp-build-tools/](https://visualstudio.microsoft.com/visual-cpp-build-tools/)
2. Jalankan installer yang sudah diunduh.
3. Di dalam menu pilihan workload, centang **"Desktop development with C++"** (Pengembangan desktop dengan C++).
4. Klik **Install** di pojok kanan bawah dan tunggu hingga selesai (membutuhkan waktu beberapa menit dan download sekitar 1.5 - 2 GB).
5. Setelah instalasi selesai, kami merekomendasikan untuk **menyalakan ulang (restart) laptop Anda**.

---

## Prasyarat 2: Install Rust (Rustup)

Setelah C++ Build Tools terpasang, Anda perlu meng-install Rust.

1. Unduh installer Rust untuk Windows (64-bit) melalui link ini:
   [https://rustup.rs/](https://rustup.rs/) (Unduh file `rustup-init.exe`)
2. Jalankan `rustup-init.exe`.
3. Sebuah jendela command prompt akan terbuka. Tekan tombol **Enter** untuk memilih opsi default:
   `1) Proceed with standard installation (default-ui)`
4. Tunggu hingga proses instalasi selesai. Setelah selesai, tekan **Enter** untuk menutup jendela tersebut.
5. Buka terminal baru (atau restart terminal/VS Code Anda) agar perintah Rust terbaca di sistem Anda.
6. Verifikasi instalasi dengan mengetik perintah berikut di command prompt/terminal:
   ```bash
   rustc --version
   cargo --version
   ```
   Jika menampilkan informasi versi, berarti Rust berhasil terinstal.

---

## Menjalankan Aplikasi dalam Mode Desktop

Setelah semua prasyarat di atas selesai terinstal, Anda bisa menjalankan aplikasi desktop dengan perintah berikut di root folder proyek:

```bash
bun run tauri dev
```
Perintah ini akan secara otomatis:
1. Menjalankan server local Vite (`http://localhost:5173`)
2. Membuka jendela aplikasi desktop asli (Tauri Window) yang menampilkan game Puzzle Kata Ceria.
3. Mendukung *Hot Module Replacement* (HMR), artinya setiap kali Anda mengubah kode React, aplikasi desktop akan langsung ter-update secara otomatis.

---

## Membuat Installer Desktop (.exe)

Untuk membuat file installer mandiri (.exe) yang bisa dibagikan dan di-install secara offline di laptop lain:

```bash
bun run tauri build
```
Hasil build berupa installer `.exe` (MSI installer atau standalone exe) akan tersimpan di dalam folder:
`src-tauri/target/release/bundle/msi/` atau `src-tauri/target/release/bundle/nsis/`
