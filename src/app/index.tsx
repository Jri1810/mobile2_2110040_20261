import { Redirect } from "expo-router";

/**
 * Titik masuk aplikasi.
 *
 * Layar perkenalan selalu ditampilkan setiap kali aplikasi dibuka, sesuai
 * permintaan agar tautan aplikasi selalu menyapa pengguna lebih dulu.
 * Setelah perkenalan selesai, walkthrough sendiri yang menentukan arah
 * berikutnya (beranda bila sesi masih ada, atau halaman masuk).
 */
export default function Index() {
  return <Redirect href="/walkthrough" />;
}
