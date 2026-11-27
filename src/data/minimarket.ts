import type { Ionicons } from "@expo/vector-icons";

export type IconName = React.ComponentProps<typeof Ionicons>["name"];

export type Produk = {
  id: string;
  nama: string;
  kategori: "Sembako" | "Segar" | "Kebersihan" | "Minuman" | "Snack";
  stok: number;
  satuan: string;
  harga: number;
  hargaAsli?: number;
  rating: string;
  terjual: number;
  thumbBg: string;
  icon: IconName;
  deskripsi: string;
};

export const PRODUK: Produk[] = [
  {
    id: "1",
    nama: "Minyak Goreng 2L",
    kategori: "Sembako",
    stok: 45,
    satuan: "pouch",
    harga: 32000,
    hargaAsli: 38000,
    rating: "4.8",
    terjual: 32,
    thumbBg: "#FFF4DE",
    icon: "water-outline",
    deskripsi:
      "Minyak goreng sawit kemasan 2 liter. Stabil pada suhu tinggi dan tidak mudah berbau tengik.",
  },
  {
    id: "2",
    nama: "Beras Premium 5kg",
    kategori: "Sembako",
    stok: 18,
    satuan: "karung",
    harga: 68000,
    hargaAsli: 72500,
    rating: "4.9",
    terjual: 24,
    thumbBg: "#E8EEFF",
    icon: "nutrition-outline",
    deskripsi:
      "Beras pulen varietas premium, disosoh dua kali. Butir utuh, wangi, dan cocok untuk kebutuhan harian.",
  },
  {
    id: "3",
    nama: "Gula Pasir 1kg",
    kategori: "Sembako",
    stok: 30,
    satuan: "pcs",
    harga: 17500,
    rating: "4.7",
    terjual: 19,
    thumbBg: "#E6F8EF",
    icon: "flask-outline",
    deskripsi:
      "Gula pasir putih bersih dari tebu pilihan. Mudah larut dan tidak menggumpal.",
  },
  {
    id: "4",
    nama: "Telur Ayam 1kg",
    kategori: "Segar",
    stok: 7,
    satuan: "kg",
    harga: 29500,
    rating: "4.6",
    terjual: 41,
    thumbBg: "#FEF3E7",
    icon: "egg-outline",
    deskripsi:
      "Telur ayam segar dari peternakan mitra, dikirim setiap pagi. Simpan di suhu ruang atau kulkas.",
  },
  {
    id: "5",
    nama: "Sabun Mandi 100g",
    kategori: "Kebersihan",
    stok: 52,
    satuan: "pcs",
    harga: 6500,
    rating: "4.8",
    terjual: 63,
    thumbBg: "#F0ECFF",
    icon: "sparkles-outline",
    deskripsi:
      "Sabun mandi batang dengan wangi lembut. Membentuk busa lembut dan tidak membuat kulit kering.",
  },
  {
    id: "6",
    nama: "Air Mineral 600ml",
    kategori: "Minuman",
    stok: 88,
    satuan: "botol",
    harga: 4000,
    rating: "4.9",
    terjual: 120,
    thumbBg: "#E4F5FE",
    icon: "water-outline",
    deskripsi:
      "Air mineral dalam kemasan botol 600 ml. Praktis untuk bekal dan perjalanan.",
  },
  {
    id: "7",
    nama: "Keripik Singkong",
    kategori: "Snack",
    stok: 36,
    satuan: "pcs",
    harga: 9500,
    hargaAsli: 12000,
    rating: "4.5",
    terjual: 28,
    thumbBg: "#FFF1E6",
    icon: "fast-food-outline",
    deskripsi:
      "Keripik singkong renyah dengan bumbu balado. Dikemas kedap udara agar tetap garing.",
  },
  {
    id: "8",
    nama: "Kopi Sachet 10x",
    kategori: "Minuman",
    stok: 64,
    satuan: "pack",
    harga: 13500,
    rating: "4.7",
    terjual: 55,
    thumbBg: "#F3EDE4",
    icon: "cafe-outline",
    deskripsi:
      "Kopi instan sachet isi 10. Cukup seduh dengan air panas, cocok untuk stok warung.",
  },
];

/** Dipakai beranda: produk yang punya harga coret. */
export const PRODUK_PROMO = PRODUK.filter((p) => p.hargaAsli);

export const STOK_MENIPIS = 10;

export const KATEGORI_FILTER = [
  "Semua",
  "Sembako",
  "Segar",
  "Kebersihan",
  "Minuman",
  "Snack",
] as const;

export const rupiah = (value: number) =>
  "Rp " + value.toLocaleString("id-ID", { maximumFractionDigits: 0 });

export const diskonPersen = (p: Produk) =>
  p.hargaAsli
    ? Math.round(((p.hargaAsli - p.harga) / p.hargaAsli) * 100) + "%"
    : null;

export type Notifikasi = {
  id: string;
  judul: string;
  pesan: string;
  waktu: string;
  icon: IconName;
  warna: string;
  bg: string;
  border: string;
  dibaca: boolean;
};

export const NOTIFIKASI: Notifikasi[] = [
  {
    id: "n1",
    judul: "Stok telur ayam menipis",
    pesan: "Sisa 7 kg. Segera lakukan pemesanan ke supplier.",
    waktu: "5 menit lalu",
    icon: "alert-circle-outline",
    warna: "#8A5800",
    bg: "#FFF4DE",
    border: "#FFE2AC",
    dibaca: false,
  },
  {
    id: "n2",
    judul: "Transaksi baru TRX-003",
    pesan: "Rp 47.500 dibayar tunai oleh pelanggan.",
    waktu: "18 menit lalu",
    icon: "receipt-outline",
    warna: "#2158F0",
    bg: "#E8EEFF",
    border: "#C9D8FF",
    dibaca: false,
  },
  {
    id: "n3",
    judul: "Target harian tercapai",
    pesan: "Omset hari ini Rp 1.850.000 dari 24 nota.",
    waktu: "1 jam lalu",
    icon: "checkmark-circle-outline",
    warna: "#12B76A",
    bg: "#E6F8EF",
    border: "#C1EDD8",
    dibaca: false,
  },
  {
    id: "n4",
    judul: "Laporan mingguan siap",
    pesan: "Rekap penjualan tujuh hari terakhir sudah tersedia.",
    waktu: "Kemarin",
    icon: "bar-chart-outline",
    warna: "#7A5AF8",
    bg: "#F0ECFF",
    border: "#DCD3FF",
    dibaca: true,
  },
];
