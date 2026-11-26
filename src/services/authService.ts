import AsyncStorage from "@react-native-async-storage/async-storage";
import { File } from "expo-file-system";
import { Platform } from "react-native";

import { API_ENDPOINTS } from "@/config/api";

const AUTH_TOKEN_KEY = "@minimarketapp_token";
const AUTH_USER_KEY = "@minimarketapp_user";
// 60 detik: hosting gratis (Render) butuh ~1 menit untuk bangun dari kondisi
// idle/spin-down, jadi 20 detik terlalu pendek untuk request pertama.
const REQUEST_TIMEOUT_MS = 60000;

export interface UserData {
  id: number;
  name: string;
  email: string;
  no_hp: string | null;
  foto: string | null;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token: string;
  user: UserData;
}

export interface AuthSession {
  token: string;
  user: UserData;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  no_hp: string;
  password: string;
  password_confirmation: string;
}

export interface UpdateProfilePayload {
  name: string;
  email: string;
  no_hp: string;
}

export interface UpdatePasswordPayload {
  current_password: string;
  password: string;
  password_confirmation: string;
}

export interface ProfileResponse {
  success: boolean;
  message?: string;
  user: UserData;
  foto_url?: string;
}

export interface BasicMessageResponse {
  success: boolean;
  message: string;
}

export interface PhotoUploadAsset {
  uri: string;
  fileName?: string | null;
  mimeType?: string | null;
}

function isConnectionError(error: unknown): boolean {
  return (
    error instanceof TypeError ||
    (error instanceof Error && error.name === "AbortError")
  );
}

async function fetchWithTimeout(
  input: string,
  init: RequestInit = {},
  timeoutMs = REQUEST_TIMEOUT_MS,
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timeoutId);
  }
}

async function handleApiResponse<T>(response: Response): Promise<T> {
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    if (data?.errors) {
      const firstKey = Object.keys(data.errors)[0];
      const firstMsg = data.errors[firstKey]?.[0];

      if (firstMsg) {
        throw new Error(firstMsg);
      }
    }

    throw new Error(
      data?.message || `Permintaan gagal dengan status HTTP ${response.status}.`,
    );
  }

  return data as T;
}

export async function loginApi(payload: LoginPayload): Promise<AuthResponse> {
  try {
    const response = await fetchWithTimeout(API_ENDPOINTS.LOGIN, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    return await handleApiResponse<AuthResponse>(response);
  } catch (error) {
    if (isConnectionError(error)) {
      throw new Error(
        "Tidak dapat terhubung ke server. Periksa koneksi internet Anda lalu coba lagi.",
      );
    }

    throw error;
  }
}

export async function registerApi(
  payload: RegisterPayload,
): Promise<AuthResponse> {
  try {
    const response = await fetchWithTimeout(API_ENDPOINTS.REGISTER, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    return await handleApiResponse<AuthResponse>(response);
  } catch (error) {
    if (isConnectionError(error)) {
      throw new Error(
        "Tidak dapat terhubung ke server. Periksa koneksi internet Anda lalu coba lagi.",
      );
    }

    throw error;
  }
}

export async function logoutApi(token: string): Promise<void> {
  try {
    await fetchWithTimeout(API_ENDPOINTS.LOGOUT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch {
    // Jika jaringan sedang terputus saat logout, sesi lokal di HP tetap kita bersihkan
  }
}

export async function saveAuthSession(
  user: UserData,
  token: string,
): Promise<void> {
  await AsyncStorage.multiSet([
    [AUTH_TOKEN_KEY, token],
    [AUTH_USER_KEY, JSON.stringify(user)],
  ]);
}

export async function getAuthSession(): Promise<AuthSession | null> {
  const values = await AsyncStorage.multiGet([AUTH_TOKEN_KEY, AUTH_USER_KEY]);
  const token = values[0]?.[1];
  const userJson = values[1]?.[1];

  if (!token || !userJson) {
    return null;
  }

  try {
    return { token, user: JSON.parse(userJson) as UserData };
  } catch {
    return null;
  }
}

export async function clearAuthSession(): Promise<void> {
  await AsyncStorage.multiRemove([AUTH_TOKEN_KEY, AUTH_USER_KEY]);
}

// 5. Ambil Profil Terbaru dari Server Laravel
export async function fetchProfileApi(token: string): Promise<ProfileResponse> {
  try {
    const response = await fetchWithTimeout(API_ENDPOINTS.PROFILE, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await handleApiResponse<ProfileResponse>(response);
  } catch (error) {
    if (isConnectionError(error)) {
      throw new Error(
        "Tidak dapat terhubung ke server. Periksa koneksi internet Anda.",
      );
    }
    throw error;
  }
}

// 6. Perbarui Nama, Email, dan Nomor HP
export async function updateProfileApi(
  token: string,
  payload: UpdateProfilePayload,
): Promise<ProfileResponse> {
  try {
    const response = await fetchWithTimeout(API_ENDPOINTS.UPDATE_PROFILE, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    return await handleApiResponse<ProfileResponse>(response);
  } catch (error) {
    if (isConnectionError(error)) {
      throw new Error(
        "Gagal menghubungi server saat menyimpan profil. Cek koneksi internet Anda.",
      );
    }
    throw error;
  }
}

// 7. Ganti Kata Sandi
export async function updatePasswordApi(
  token: string,
  payload: UpdatePasswordPayload,
): Promise<BasicMessageResponse> {
  try {
    const response = await fetchWithTimeout(API_ENDPOINTS.UPDATE_PASSWORD, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    return await handleApiResponse<BasicMessageResponse>(response);
  } catch (error) {
    if (isConnectionError(error)) {
      throw new Error(
        "Gagal menghubungi server saat mengganti kata sandi. Cek koneksi internet Anda.",
      );
    }
    throw error;
  }
}

// 8. Upload Foto Profil (FormData Multipart — Mendukung HP & Expo Web)
export async function uploadProfilePhotoApi(
  token: string,
  asset: PhotoUploadAsset,
): Promise<ProfileResponse> {
  try {
    const formData = new FormData();
    const fallbackExt =
      asset.mimeType === "image/png"
        ? "png"
        : asset.mimeType === "image/webp"
          ? "webp"
          : "jpg";
    const fileName = asset.fileName || `profile_${Date.now()}.${fallbackExt}`;

    if (Platform.OS === "web") {
      const blobResponse = await fetchWithTimeout(asset.uri);
      const blob = await blobResponse.blob();
      formData.append("foto", blob, fileName);
    } else {
      const file = new File(asset.uri);
      formData.append("foto", file);
    }

    // PENTING: Jangan menuliskan header "Content-Type" manual saat mengirim FormData,
    // karena fetch() akan otomatis membuat boundary multipart yang benar!
    const response = await fetchWithTimeout(
      API_ENDPOINTS.UPDATE_PHOTO,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      },
      60000,
    );

    return await handleApiResponse<ProfileResponse>(response);
  } catch (error) {
    if (isConnectionError(error)) {
      throw new Error(
        "Gagal mengunggah foto ke server. Periksa koneksi internet Anda.",
      );
    }
    throw error;
  }
}

// 9. Perbarui Data User Tersimpan di AsyncStorage Tanpa Menghapus Token
export async function updateStoredUser(user: UserData): Promise<void> {
  await AsyncStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
}
