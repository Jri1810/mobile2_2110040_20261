import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { registerApi } from "@/services/authService";
import { authStyles } from "@/styles/authStyles";
import { colors } from "@/styles/theme";

export default function RegisterScreen() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [noHp, setNoHp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [focusedField, setFocusedField] = useState<
    "nama" | "email" | "noHp" | "password" | "confirm" | null
  >(null);

  const handleRegister = async () => {
    if (
      !nama.trim() ||
      !email.trim() ||
      !noHp.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      const message = "Semua kolom formulir wajib diisi.";
      setFeedback({ type: "error", message });
      Alert.alert("Pendaftaran Gagal", message);
      return;
    }

    if (password.length < 6) {
      const message = "Kata sandi minimal terdiri dari 6 karakter.";
      setFeedback({ type: "error", message });
      Alert.alert("Kata Sandi Lemah", message);
      return;
    }

    if (password !== confirmPassword) {
      const message = "Konfirmasi kata sandi tidak sama dengan kata sandi.";
      setFeedback({ type: "error", message });
      Alert.alert("Tidak Cocok", message);
      return;
    }

    setFeedback(null);
    setLoading(true);

    try {
      const result = await registerApi({
        name: nama.trim(),
        email: email.trim(),
        no_hp: noHp.trim(),
        password,
        password_confirmation: confirmPassword,
      });

      setFeedback({
        type: "success",
        message: `Akun atas nama ${result.user.name} berhasil tersimpan. Silakan masuk melalui halaman Login.`,
      });

      Alert.alert(
        "Pendaftaran Berhasil!",
        `Akun atas nama ${result.user.name} telah tersimpan ke database. Silakan masuk melalui halaman Login.`,
        [{ text: "Ke Login", onPress: () => router.back() }],
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat mendaftarkan akun.";

      setFeedback({ type: "error", message });
      Alert.alert("Pendaftaran Gagal", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={authStyles.safeArea}>
      <KeyboardAvoidingView
        style={authStyles.flexContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={authStyles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity
            style={authStyles.topBackButton}
            disabled={loading}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={20} color={colors.ink} />
          </TouchableOpacity>

          <View style={authStyles.headerArea}>
            <View style={authStyles.logoBadge}>
              <Ionicons name="person-add" size={26} color={colors.inkOnDark} />
            </View>
            <Text style={authStyles.eyebrow}>Minimarket · Pendaftaran</Text>
            <Text style={authStyles.title}>Buat akun pengelola</Text>
            <Text style={authStyles.subtitle}>
              Lengkapi data diri untuk mulai mengelola operasional toko.
            </Text>
          </View>

          <View style={authStyles.card}>
            <View style={authStyles.tapeStripe} />
            <View style={authStyles.formGroup}>
              <Text style={authStyles.label}>Nama Lengkap</Text>
              <View
                style={[
                  authStyles.inputWrapper,
                  focusedField === "nama" && authStyles.inputWrapperFocused,
                ]}
              >
                <Ionicons
                  name="person-outline"
                  size={20}
                  color={focusedField === "nama" ? colors.primary : colors.inkFaint}
                  style={authStyles.inputIcon}
                />
                <TextInput
                  style={authStyles.input}
                  placeholder="Contoh: Muhammad Rizki"
                  placeholderTextColor={colors.inkFaint}
                  editable={!loading}
                  value={nama}
                  onChangeText={(text) => {
                    setNama(text);
                    setFeedback(null);
                  }}
                  onFocus={() => setFocusedField("nama")}
                  onBlur={() => setFocusedField(null)}
                />
              </View>
            </View>

            <View style={authStyles.formGroup}>
              <Text style={authStyles.label}>Alamat Email</Text>
              <View
                style={[
                  authStyles.inputWrapper,
                  focusedField === "email" && authStyles.inputWrapperFocused,
                ]}
              >
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color={focusedField === "email" ? colors.primary : colors.inkFaint}
                  style={authStyles.inputIcon}
                />
                <TextInput
                  style={authStyles.input}
                  placeholder="nama@minimarket.id"
                  placeholderTextColor={colors.inkFaint}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  editable={!loading}
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    setFeedback(null);
                  }}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                />
              </View>
            </View>

            <View style={authStyles.formGroup}>
              <Text style={authStyles.label}>Nomor HP / WhatsApp</Text>
              <View
                style={[
                  authStyles.inputWrapper,
                  focusedField === "noHp" && authStyles.inputWrapperFocused,
                ]}
              >
                <Ionicons
                  name="call-outline"
                  size={20}
                  color={focusedField === "noHp" ? colors.primary : colors.inkFaint}
                  style={authStyles.inputIcon}
                />
                <TextInput
                  style={authStyles.input}
                  placeholder="Contoh: 081234567890"
                  placeholderTextColor={colors.inkFaint}
                  keyboardType="phone-pad"
                  editable={!loading}
                  value={noHp}
                  onChangeText={(text) => {
                    setNoHp(text);
                    setFeedback(null);
                  }}
                  onFocus={() => setFocusedField("noHp")}
                  onBlur={() => setFocusedField(null)}
                />
              </View>
            </View>

            <View style={authStyles.formGroup}>
              <Text style={authStyles.label}>Kata Sandi</Text>
              <View
                style={[
                  authStyles.inputWrapper,
                  focusedField === "password" &&
                    authStyles.inputWrapperFocused,
                ]}
              >
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={focusedField === "password" ? colors.primary : colors.inkFaint}
                  style={authStyles.inputIcon}
                />
                <TextInput
                  style={authStyles.input}
                  placeholder="Minimal 6 karakter"
                  placeholderTextColor={colors.inkFaint}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  editable={!loading}
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    setFeedback(null);
                  }}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                />
                <TouchableOpacity
                  style={authStyles.eyeButton}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color={colors.inkFaint}
                  />
                </TouchableOpacity>
              </View>
              <Text style={authStyles.helperText}>
                Gunakan kombinasi huruf dan angka.
              </Text>
            </View>

            <View style={authStyles.formGroup}>
              <Text style={authStyles.label}>Konfirmasi Kata Sandi</Text>
              <View
                style={[
                  authStyles.inputWrapper,
                  focusedField === "confirm" &&
                    authStyles.inputWrapperFocused,
                ]}
              >
                <Ionicons
                  name="checkmark-circle-outline"
                  size={20}
                  color={focusedField === "confirm" ? colors.primary : colors.inkFaint}
                  style={authStyles.inputIcon}
                />
                <TextInput
                  style={authStyles.input}
                  placeholder="Ulangi kata sandi"
                  placeholderTextColor={colors.inkFaint}
                  secureTextEntry={!showConfirm}
                  autoCapitalize="none"
                  editable={!loading}
                  value={confirmPassword}
                  onChangeText={(text) => {
                    setConfirmPassword(text);
                    setFeedback(null);
                  }}
                  onFocus={() => setFocusedField("confirm")}
                  onBlur={() => setFocusedField(null)}
                />
                <TouchableOpacity
                  style={authStyles.eyeButton}
                  onPress={() => setShowConfirm(!showConfirm)}
                >
                  <Ionicons
                    name={showConfirm ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color={colors.inkFaint}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={[
                authStyles.primaryButton,
                loading && authStyles.primaryButtonDisabled,
              ]}
              activeOpacity={0.85}
              disabled={loading}
              onPress={handleRegister}
            >
              {loading ? (
                <ActivityIndicator color={colors.inkOnDark} />
              ) : (
                <>
                  <Text style={authStyles.primaryButtonText}>Daftar Akun</Text>
                  <Ionicons name="checkmark" size={19} color={colors.inkOnDark} />
                </>
              )}
            </TouchableOpacity>

            {feedback && (
              <Text
                style={
                  feedback.type === "success"
                    ? authStyles.feedbackSuccess
                    : authStyles.feedbackError
                }
              >
                {feedback.message}
              </Text>
            )}

            <View style={[authStyles.footerRow, { marginTop: 18 }]}>
              <Text style={authStyles.footerText}>Sudah memiliki akun?</Text>
              <TouchableOpacity disabled={loading} onPress={() => router.back()}>
                <Text style={authStyles.footerLink}>Masuk di sini</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
