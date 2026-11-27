import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CameraCaptureModal, {
  CapturedPhoto,
} from "@/components/CameraCaptureModal";
import { showDialog } from "@/components/dialog";
import { getStorageImageUrl } from "@/config/api";
import {
  clearAuthSession,
  fetchProfileApi,
  getAuthSession,
  logoutApi,
  PhotoUploadAsset,
  updatePasswordApi,
  updateProfileApi,
  updateStoredUser,
  uploadProfilePhotoApi,
  UserData,
} from "@/services/authService";
import { tabStyles } from "@/styles/tabStyles";
import { colors } from "@/styles/theme";

const MAX_PHOTO_BYTES = 5 * 1024 * 1024; // 5 MB

export default function ProfilScreen() {
  const [user, setUser] = useState<UserData | null>(null);
  const [activeTab, setActiveTab] = useState<"profil" | "password">("profil");

  // State Form Update Profil
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [noHp, setNoHp] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);

  // State Form Ganti Kata Sandi
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  // State Upload Foto Profil
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [cameraVisible, setCameraVisible] = useState(false);
  const [loadingLogout, setLoadingLogout] = useState(false);

  const fillProfileForm = useCallback((u: UserData) => {
    setUser(u);
    setName(u.name || "");
    setEmail(u.email || "");
    setNoHp(u.no_hp || "");
  }, []);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      getAuthSession().then(async (session) => {
        if (!session || !active) return;
        fillProfileForm(session.user);

        // Sinkronisasi diam-diam dengan data terbaru di server Laravel
        try {
          const fresh = await fetchProfileApi(session.token);
          if (active && fresh.user) {
            fillProfileForm(fresh.user);
            await updateStoredUser(fresh.user);
          }
        } catch {
          // Jika offline sementara, tetap tampilkan cache AsyncStorage
        }
      });

      return () => {
        active = false;
      };
    }, [fillProfileForm]),
  );

  // Unggah foto hasil kamera atau galeri
  const uploadPhotoAsset = async (
    asset: PhotoUploadAsset & { fileSize?: number },
  ) => {
    if (asset.fileSize && asset.fileSize > MAX_PHOTO_BYTES) {
      showDialog({
        title: "Ukuran Foto Terlalu Besar",
        message: "Ukuran maksimal foto yang diperbolehkan adalah 5 MB.",
      });
      return;
    }

    const session = await getAuthSession();
    if (!session?.token) {
      showDialog({ title: "Sesi Habis", message: "Silakan login kembali." });
      router.replace("/login");
      return;
    }

    setUploadingPhoto(true);
    try {
      const res = await uploadProfilePhotoApi(session.token, {
        uri: asset.uri,
        fileName: asset.fileName,
        mimeType: asset.mimeType,
      });

      fillProfileForm(res.user);
      await updateStoredUser(res.user);
      showDialog({
        title: "Berhasil",
        message: res.message || "Foto profil berhasil diperbarui.",
      });
    } catch (error) {
      const msg =
        error instanceof Error
          ? error.message
          : "Gagal mengunggah foto profil.";
      showDialog({ title: "Upload Foto Gagal", message: msg });
    } finally {
      setUploadingPhoto(false);
    }
  };

  // Fungsi Pilih Foto: Kamera Depan atau Galeri
  const handlePickPhoto = async (source: "camera" | "gallery") => {
    if (source === "camera") {
      setCameraVisible(true);
      return;
    }

    try {
      const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!perm.granted) {
        showDialog({
          title: "Izin Galeri Ditolak",
          message: "Aktifkan izin galeri pada pengaturan HP untuk memilih foto.",
        });
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.85,
      });

      if (result.canceled || !result.assets?.[0]) {
        return;
      }

      await uploadPhotoAsset(result.assets[0]);
    } catch (error) {
      const msg =
        error instanceof Error ? error.message : "Gagal memilih foto profil.";
      showDialog({ title: "Pilih Foto Gagal", message: msg });
    }
  };

  const handleCapturedPhoto = (photo: CapturedPhoto) => {
    setCameraVisible(false);
    uploadPhotoAsset(photo);
  };

  // Fungsi Simpan Update Profil (Nama, Email, Nomor HP)
  const handleSaveProfile = async () => {
    if (!name.trim() || !email.trim() || !noHp.trim()) {
      showDialog({ title: "Input Belum Lengkap", message: "Nama, email, dan nomor HP wajib diisi." });
      return;
    }

    setSavingProfile(true);
    try {
      const session = await getAuthSession();
      if (!session?.token) {
        router.replace("/login");
        return;
      }

      const res = await updateProfileApi(session.token, {
        name: name.trim(),
        email: email.trim(),
        no_hp: noHp.trim(),
      });

      fillProfileForm(res.user);
      await updateStoredUser(res.user);
      showDialog({
        title: "Berhasil",
        message: res.message || "Profil berhasil diperbarui.",
      });
    } catch (error) {
      const msg =
        error instanceof Error
          ? error.message
          : "Gagal memperbarui data profil.";
      showDialog({ title: "Update Profil Gagal", message: msg });
    } finally {
      setSavingProfile(false);
    }
  };

  // Fungsi Simpan Kata Sandi Baru
  const handleSavePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      showDialog({
        title: "Input Belum Lengkap",
        message: "Semua kolom kata sandi wajib diisi.",
      });
      return;
    }

    if (newPassword.length < 6) {
      showDialog({
        title: "Kata Sandi Lemah",
        message: "Kata sandi baru minimal terdiri dari 6 karakter.",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      showDialog({
        title: "Konfirmasi Tidak Cocok",
        message: "Konfirmasi kata sandi baru tidak sama.",
      });
      return;
    }

    setSavingPassword(true);
    try {
      const session = await getAuthSession();
      if (!session?.token) {
        router.replace("/login");
        return;
      }

      const res = await updatePasswordApi(session.token, {
        current_password: currentPassword,
        password: newPassword,
        password_confirmation: confirmPassword,
      });

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      showDialog({ title: "Berhasil", message: res.message });
    } catch (error) {
      const msg =
        error instanceof Error
          ? error.message
          : "Gagal memperbarui kata sandi.";
      showDialog({ title: "Ganti Kata Sandi Gagal", message: msg });
    } finally {
      setSavingPassword(false);
    }
  };

  const handleLogout = async () => {
    showDialog({
      title: "Keluar dari akun?",
      message: "Anda perlu masuk kembali untuk mengelola toko.",
      icon: "log-out-outline",
      destructive: true,
      confirmLabel: "Keluar",
      cancelLabel: "Batal",
      onConfirm: async () => {
        setLoadingLogout(true);
        try {
          const session = await getAuthSession();
          if (session?.token) {
            await logoutApi(session.token);
          }
          await clearAuthSession();
          router.replace("/login");
        } finally {
          setLoadingLogout(false);
        }
      },
    });
  };

  const photoUrl = getStorageImageUrl(user?.foto);

  return (
    <SafeAreaView style={tabStyles.screenContainer} edges={["top"]}>
      <KeyboardAvoidingView
        style={tabStyles.screenContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={tabStyles.screenContainer}
          contentContainerStyle={tabStyles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
        {/* Kartu header: sampul hijau + avatar + tombol foto */}
        <View style={tabStyles.profileHeaderCard}>
          <View style={tabStyles.profileCover} />
          <View style={tabStyles.profileBody}>
            <View style={tabStyles.profileAvatar}>
              {photoUrl ? (
                <Image
                  source={{ uri: photoUrl }}
                  style={tabStyles.profileAvatarImage}
                  contentFit="cover"
                  transition={200}
                />
              ) : (
                <Ionicons name="person" size={38} color={colors.primary} />
              )}
              {uploadingPhoto && (
                <View style={tabStyles.avatarOverlayLoading}>
                  <ActivityIndicator color={colors.inkOnDark} />
                </View>
              )}
            </View>

            <Text style={tabStyles.profileName}>
              {user?.name || "Profil Pengguna"}
            </Text>
            <Text style={tabStyles.profileEmail}>{user?.email || "-"}</Text>

            <View style={tabStyles.photoActionRow}>
              <TouchableOpacity
                style={tabStyles.photoActionButton}
                activeOpacity={0.8}
                disabled={uploadingPhoto}
                onPress={() => handlePickPhoto("camera")}
              >
                <Ionicons
                  name="camera-outline"
                  size={17}
                  color={colors.primary}
                />
                <Text style={tabStyles.photoActionButtonText}>Kamera</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={tabStyles.photoActionButton}
                activeOpacity={0.8}
                disabled={uploadingPhoto}
                onPress={() => handlePickPhoto("gallery")}
              >
                <Ionicons
                  name="images-outline"
                  size={17}
                  color={colors.primary}
                />
                <Text style={tabStyles.photoActionButtonText}>Galeri</Text>
              </TouchableOpacity>
            </View>

            <Text style={tabStyles.photoHintText}>
              JPG/PNG/WebP {"\u2022"} Maks 5 MB {"\u2022"} Otomatis dikonversi ke WebP ringan
            </Text>
          </View>
        </View>

        {/* Switcher 2 Tab: Data Profil & Ganti Sandi */}
        <View style={tabStyles.segmentContainer}>
          <TouchableOpacity
            style={[
              tabStyles.segmentButton,
              activeTab === "profil" && tabStyles.segmentButtonActive,
            ]}
            onPress={() => setActiveTab("profil")}
          >
            <Ionicons
              name="person-circle-outline"
              size={18}
              color={activeTab === "profil" ? colors.primary : colors.inkFaint}
            />
            <Text
              style={[
                tabStyles.segmentText,
                activeTab === "profil" && tabStyles.segmentTextActive,
              ]}
            >
              Data Profil
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              tabStyles.segmentButton,
              activeTab === "password" && tabStyles.segmentButtonActive,
            ]}
            onPress={() => setActiveTab("password")}
          >
            <Ionicons
              name="key-outline"
              size={18}
              color={activeTab === "password" ? colors.primary : colors.inkFaint}
            />
            <Text
              style={[
                tabStyles.segmentText,
                activeTab === "password" && tabStyles.segmentTextActive,
              ]}
            >
              Ganti Sandi
            </Text>
          </TouchableOpacity>
        </View>

        {/* Form Aktif Sesuai Tab */}
        {activeTab === "profil" ? (
          <View style={tabStyles.card}>
            <View style={tabStyles.formGroup}>
              <Text style={tabStyles.formLabel}>Nama Lengkap</Text>
              <View style={tabStyles.inputWrapper}>
                <Ionicons
                  name="person-outline"
                  size={18}
                  color={colors.inkFaint}
                  style={tabStyles.inputIcon}
                />
                <TextInput
                  style={tabStyles.textInput}
                  placeholder="Nama lengkap Anda"
                  placeholderTextColor={colors.inkFaint}
                  editable={!savingProfile}
                  value={name}
                  onChangeText={setName}
                />
              </View>
            </View>

            <View style={tabStyles.formGroup}>
              <Text style={tabStyles.formLabel}>Alamat Email</Text>
              <View style={tabStyles.inputWrapper}>
                <Ionicons
                  name="mail-outline"
                  size={18}
                  color={colors.inkFaint}
                  style={tabStyles.inputIcon}
                />
                <TextInput
                  style={tabStyles.textInput}
                  placeholder="nama@kampus.ac.id"
                  placeholderTextColor={colors.inkFaint}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  editable={!savingProfile}
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>

            <View style={tabStyles.formGroup}>
              <Text style={tabStyles.formLabel}>Nomor HP / WhatsApp</Text>
              <View style={tabStyles.inputWrapper}>
                <Ionicons
                  name="call-outline"
                  size={18}
                  color={colors.inkFaint}
                  style={tabStyles.inputIcon}
                />
                <TextInput
                  style={tabStyles.textInput}
                  placeholder="081234567890"
                  placeholderTextColor={colors.inkFaint}
                  keyboardType="phone-pad"
                  editable={!savingProfile}
                  value={noHp}
                  onChangeText={setNoHp}
                />
              </View>
            </View>

            <TouchableOpacity
              style={[
                tabStyles.saveButton,
                savingProfile && tabStyles.saveButtonDisabled,
              ]}
              activeOpacity={0.85}
              disabled={savingProfile}
              onPress={handleSaveProfile}
            >
              {savingProfile ? (
                <ActivityIndicator color={colors.inkOnDark} />
              ) : (
                <>
                  <Ionicons name="save-outline" size={18} color={colors.inkOnDark} />
                  <Text style={tabStyles.saveButtonText}>
                    Simpan Perubahan Profil
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        ) : (
          <View style={tabStyles.card}>
            <View style={tabStyles.formGroup}>
              <Text style={tabStyles.formLabel}>Kata Sandi Saat Ini</Text>
              <View style={tabStyles.inputWrapper}>
                <Ionicons
                  name="lock-closed-outline"
                  size={18}
                  color={colors.inkFaint}
                  style={tabStyles.inputIcon}
                />
                <TextInput
                  style={tabStyles.textInput}
                  placeholder="Masukkan kata sandi lama"
                  placeholderTextColor={colors.inkFaint}
                  secureTextEntry={!showCurrent}
                  autoCapitalize="none"
                  editable={!savingPassword}
                  value={currentPassword}
                  onChangeText={setCurrentPassword}
                />
                <TouchableOpacity
                  style={tabStyles.eyeToggle}
                  onPress={() => setShowCurrent(!showCurrent)}
                >
                  <Ionicons
                    name={showCurrent ? "eye-off-outline" : "eye-outline"}
                    size={18}
                    color={colors.inkFaint}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={tabStyles.formGroup}>
              <Text style={tabStyles.formLabel}>Kata Sandi Baru</Text>
              <View style={tabStyles.inputWrapper}>
                <Ionicons
                  name="key-outline"
                  size={18}
                  color={colors.inkFaint}
                  style={tabStyles.inputIcon}
                />
                <TextInput
                  style={tabStyles.textInput}
                  placeholder="Minimal 6 karakter"
                  placeholderTextColor={colors.inkFaint}
                  secureTextEntry={!showNew}
                  autoCapitalize="none"
                  editable={!savingPassword}
                  value={newPassword}
                  onChangeText={setNewPassword}
                />
                <TouchableOpacity
                  style={tabStyles.eyeToggle}
                  onPress={() => setShowNew(!showNew)}
                >
                  <Ionicons
                    name={showNew ? "eye-off-outline" : "eye-outline"}
                    size={18}
                    color={colors.inkFaint}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={tabStyles.formGroup}>
              <Text style={tabStyles.formLabel}>Konfirmasi Kata Sandi Baru</Text>
              <View style={tabStyles.inputWrapper}>
                <Ionicons
                  name="checkmark-circle-outline"
                  size={18}
                  color={colors.inkFaint}
                  style={tabStyles.inputIcon}
                />
                <TextInput
                  style={tabStyles.textInput}
                  placeholder="Ulangi kata sandi baru"
                  placeholderTextColor={colors.inkFaint}
                  secureTextEntry={!showConfirm}
                  autoCapitalize="none"
                  editable={!savingPassword}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
                <TouchableOpacity
                  style={tabStyles.eyeToggle}
                  onPress={() => setShowConfirm(!showConfirm)}
                >
                  <Ionicons
                    name={showConfirm ? "eye-off-outline" : "eye-outline"}
                    size={18}
                    color={colors.inkFaint}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={[
                tabStyles.saveButton,
                savingPassword && tabStyles.saveButtonDisabled,
              ]}
              activeOpacity={0.85}
              disabled={savingPassword}
              onPress={handleSavePassword}
            >
              {savingPassword ? (
                <ActivityIndicator color={colors.inkOnDark} />
              ) : (
                <>
                  <Ionicons
                    name="shield-checkmark-outline"
                    size={18}
                    color={colors.inkOnDark}
                  />
                  <Text style={tabStyles.saveButtonText}>
                    Perbarui Kata Sandi
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity
          style={tabStyles.logoutButton}
          activeOpacity={0.8}
          onPress={handleLogout}
          disabled={loadingLogout}
        >
          {loadingLogout ? (
            <ActivityIndicator color={colors.dangerInk} />
          ) : (
            <>
              <Ionicons name="log-out-outline" size={20} color={colors.dangerInk} />
              <Text style={tabStyles.logoutButtonText}>Keluar dari Akun</Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>

      <CameraCaptureModal
        visible={cameraVisible}
        onClose={() => setCameraVisible(false)}
        onCaptured={handleCapturedPhoto}
      />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
