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
├── styles/
│   ├── authStyles.ts        # StyleSheet Login & Register
│   ├── homeStyles.ts        # StyleSheet dashboard marketplace
│   └── tabStyles.ts         # StyleSheet bilah tab + kartu konten
└── app/
    ├── _layout.tsx          # Root Stack (index, login, register, (tabs))
    ├── index.tsx            # Redirect ke /login
    ├── login.tsx            # Stack 1: Login
    ├── register.tsx         # Stack 2: Register
    └── (tabs)/
        ├── _layout.tsx      # Bottom Tabs 5 menu + useSafeAreaInsets
        ├── home.tsx         # Beranda + 5 menu cepat marketplace
        ├── produk.tsx       # Katalog produk
        ├── transaksi.tsx    # Kasir & transaksi
        ├── report.tsx       # Laporan penjualan
        └── profil.tsx       # Profil + tombol Logout
```

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
