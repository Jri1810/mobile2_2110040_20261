# Screenshot Modul 11

Folder ini menampung bukti tangkapan layar hasil praktikum **Modul 11** —
Instalasi Laravel 13, Sanctum API Token, dan Integrasi `fetch()` Login & Register
dengan `AsyncStorage`.

## Cara Mengisi

1. Nyalakan backend Laravel: `php artisan serve --host=0.0.0.0 --port=8000`
   (repo `https://github.com/Jri1810/Laravel-2110040-20261`).
2. Nyalakan aplikasi: `npx expo start`, lalu scan QR dengan **Expo Go** di HP
   (laptop & HP harus satu jaringan Wi-Fi; samakan IP di `src/config/api.ts` dengan `ipconfig`).
3. Ambil screenshot **langsung dari HP** (bukan emulator browser).
4. Simpan ke folder ini dengan nama file di bawah ini.

## Daftar Screenshot

| No | Nama File              | Layar yang Diambil                                                        |
|----|------------------------|---------------------------------------------------------------------------|
| 1  | `01-login.png`         | Halaman Login dengan tombol **Masuk Sekarang**                             |
| 2  | `02-register.png`      | Halaman Register lengkap dengan input **Nomor HP / WhatsApp**              |
| 3  | `03-register-berhasil.png` | Alert "Pendaftaran Berhasil!" setelah akun tersimpan ke MySQL          |
| 4  | `04-home-user.png`     | Tab Home menampilkan **nama & email asli** hasil login dari database        |
| 5  | `05-profil.png`        | Tab Profil menampilkan nama, email, **Nomor HP**, dan tombol Keluar         |
| 6  | `06-database-users.png`| HeidiSQL/phpMyAdmin: tabel `users` berisi baris baru beserta `no_hp`         |
| 7  | `07-token-sanctum.png` | HeidiSQL/phpMyAdmin: tabel `personal_access_tokens` berisi token aktif       |
| 8  | `08-logout.png`        | Setelah logout, kembali ke halaman Login                                    |

## Poin yang Wajib Terlihat

- **Register**: data benar-benar tersimpan di MySQL (`users.no_hp` terisi).
- **Validasi server**: daftar dengan email yang sama memunculkan pesan
  "Email ini sudah terdaftar, silakan gunakan email lain." dari Laravel.
- **Login**: token Sanctum terbit (1 baris di `personal_access_tokens`)
  dan Home menampilkan nama/email asli.
- **Auto-login**: tutup penuh Expo Go lalu buka lagi — langsung masuk Beranda
  tanpa mengisi form (bukti `AsyncStorage` bekerja).
- **Logout**: baris token di `personal_access_tokens` terhapus dari database.
