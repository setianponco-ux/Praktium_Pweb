# Toko Sembako

Aplikasi web sederhana untuk mengelola data produk toko sembako dengan perhitungan total per baris dan Grand Total/Total keseleluruhan. Data disimpan di `localStorage` agar tetap tersimpan di browser.

Fitur
-----
- Tambah / edit / hapus produk (kode, nama, jumlah, harga per unit)
- Total per baris (jumlah × harga) dan `Grand Total` di footer
- Menyimpan data di `localStorage` (kunci: `productData`)
- Parsing dan pemformatan input harga yang tahan terhadap berbagai format (mis. `30.000`, `30,000`, `30000`)
- Tabel responsif dengan pembungkus untuk tampilan kecil

File Penting
------------
- `index.html` — struktur antarmuka
- `style.css` — gaya dan penyesuaian responsif
- `script.js` — logika aplikasi (CRUD, perhitungan, penyimpanan)
- `server.js` — contoh server Node/Express (opsional)
- `package.json` / `package-lock.json` — metadata proyek & dependensi

Mulai (Getting started)
-----------------------

1. Pasang dependensi:

```bash
npm install
```

2. Jalankan untuk development (otomatis restart dengan `nodemon`):

```bash
npm run dev
```

Buka `http://localhost:3000` di browser.

Catatan Penggunaan
------------------
- Isi `Jumlah` (angka) dan `Harga` (angka). `Harga` dapat dimasukkan dengan atau tanpa pemisah ribuan (mis. `30000`, `30.000`, `30,000`).
- Aplikasi akan memformat tampilan harga sebagai mata uang (IDR) dan menghitung total secara otomatis.
- Untuk menghapus semua data yang tersimpan, buka DevTools → Application → Local Storage → hapus `productData`.

Catatan Pengembangan
--------------------
- `nodemon` disarankan untuk pengembangan; jalankan `npm run dev`.
- Jika ingin menambahkan fitur: validasi input lebih ketat, ekspor/import data (CSV/JSON), atau integrasi backend.

Lisensi
-------
bebas digunakan dan dimodifikasi.
