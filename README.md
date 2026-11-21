# Minimarket

Aplikasi mobile **minimarket** berbasis React Native + Expo (Expo Router, TypeScript)
dengan UI autentikasi, bottom navigation 5 menu, safe area insets, dan dashboard marketplace.

## Cara Menjalankan

```bash
npm install
npx expo start
```

Scan QR code dengan aplikasi **Expo Go** di HP (laptop & HP harus satu jaringan Wi-Fi).
Jika jaringan kampus memblokir koneksi langsung, gunakan:

```bash
npx expo start --tunnel
```

Perintah pengecekan:

```bash
npx tsc --noEmit   # typecheck
npx expo lint      # lint
```

## Struktur Proyek

```
src/
├── config/
│   └── api.ts               # [Modul 11] BASE_URL & daftar endpoint Laravel
├── services/
│   └── authService.ts       # [Modul 11] fetch() + simpan/baca/hapus AsyncStorage
├── styles/
│   ├── authStyles.ts        # StyleSheet Login & Register
│   ├── homeStyles.ts        # StyleSheet dashboard marketplace
│   └── tabStyles.ts         # StyleSheet bilah tab + kartu konten
└── app/
    ├── _layout.tsx          # Root Stack (index, login, register, (tabs))
    ├── index.tsx            # Cek sesi AsyncStorage → /home atau /login
    ├── login.tsx            # Login → loginApi() + saveAuthSession()
    ├── register.tsx         # Register + Nomor HP → registerApi()
    └── (tabs)/
        ├── _layout.tsx      # Bottom Tabs 5 menu + useSafeAreaInsets
        ├── home.tsx         # Beranda + nama/email asli dari AsyncStorage
        ├── produk.tsx       # Katalog produk
        ├── transaksi.tsx    # Kasir & transaksi
        ├── report.tsx       # Laporan penjualan
        └── profil.tsx       # Profil + Nomor HP + Logout ke server
```

## Backend

Aplikasi ini memanggil REST API Laravel 13 + Sanctum. Backend berada pada repo terpisah:

**https://github.com/Jri1810/Laravel-2110040-20261**

Alamat server diatur lewat berkas `.env.local` (tidak ikut ke Git). Salin contohnya
lalu isi IPv4 laptop dari perintah `ipconfig` (adapter Wi-Fi):

```bash
cp .env.example .env.local
```

```env
EXPO_PUBLIC_API_URL=http://<IPv4-LAPTOP>:8000/api
```

Jalankan backend dengan `php artisan serve --host=0.0.0.0 --port=8000`.


## Alur Navigasi

`/` → redirect → `/login` → (login sukses) `router.replace('/home')` → grup `(tabs)`.

- Login → Register memakai `router.push()` (boleh Back).
- Login → Home memakai `router.replace()` (tombol Back HP tidak kembali ke form login).
- Logout ada di tab **Profil** dan memakai `router.replace('/login')`.

## Cakupan Fitur

| Fitur                                                 | Status  | Berkas                             |
|-------------------------------------------------------|---------|------------------------------------|
| Hapus `src/app/home.tsx` lama                   | Selesai | —                                  |
| Style baru `tabStyles.ts`                       | Selesai | `src/styles/tabStyles.ts`          |
| `homeStyles.ts` diubah ke menu marketplace      | Selesai | `src/styles/homeStyles.ts`         |
| Root Stack: `name="(tabs)"`                     | Selesai | `src/app/_layout.tsx`              |
| Bottom Tab 5 menu + Safe Area Insets            | Selesai | `src/app/(tabs)/_layout.tsx`       |
| 5 layar tab (Home, Produk, Transaksi, Report, Profil) | Selesai | `src/app/(tabs)/*.tsx`      |
| Grid 5 menu cepat marketplace                   | Selesai | `src/app/(tabs)/home.tsx`          |
| Logout dipindah ke tab Profil                   | Selesai | `src/app/(tabs)/profil.tsx`        |

## Cakupan Fitur Modul 11 (Sanctum + AsyncStorage)

| Fitur                                                     | Status  | Berkas                              |
|-----------------------------------------------------------|---------|-------------------------------------|
| Pusat alamat API (`API_BASE_URL`, `API_ENDPOINTS`)        | Selesai | `src/config/api.ts`                 |
| Layer API terpisah: `loginApi`, `registerApi`, `logoutApi` | Selesai | `src/services/authService.ts`       |
| Helper sesi: `saveAuthSession`, `getAuthSession`, `clearAuthSession` | Selesai | `src/services/authService.ts` |
| Parser error validasi 422 dari Laravel                    | Selesai | `src/services/authService.ts`       |
| Cek sesi otomatis saat aplikasi dibuka (auto-login)        | Selesai | `src/app/index.tsx`                 |
| Login mengirim `fetch()` + menyimpan token ke AsyncStorage | Selesai | `src/app/login.tsx`                 |
| Register dengan input **Nomor HP** + kirim ke server       | Selesai | `src/app/register.tsx`              |
| Home membaca nama & email asli dari AsyncStorage           | Selesai | `src/app/(tabs)/home.tsx`           |
| Profil menampilkan Nomor HP + Logout hapus token di server | Selesai | `src/app/(tabs)/profil.tsx`         |
| Style `primaryButtonDisabled` & `loadingContainer`         | Selesai | `src/styles/authStyles.ts`          |
