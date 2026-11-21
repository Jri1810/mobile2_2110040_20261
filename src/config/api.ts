// Alamat API diatur lewat berkas .env.local (tidak ikut ke Git).
// Salin .env.example menjadi .env.local, lalu isi IPv4 laptop Anda
// hasil perintah 'ipconfig' (adapter Wi-Fi).
// Pastikan HP dan laptop terhubung ke jaringan Wi-Fi yang sama.
export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:8000/api";

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/login`,
  REGISTER: `${API_BASE_URL}/register`,
  PROFILE: `${API_BASE_URL}/profile`,
  LOGOUT: `${API_BASE_URL}/logout`,
};
