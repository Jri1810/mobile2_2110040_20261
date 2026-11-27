import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
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

import { loginApi, saveAuthSession } from "@/services/authService";
import { authStyles } from "@/styles/authStyles";
import { colors } from "@/styles/theme";

export default function LoginScreen() {
  const params = useLocalSearchParams<{ email?: string }>();
  const [email, setEmail] = useState(
    params.email ? String(params.email) : "",
  );
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<"email" | "password" | null>(
    null,
  );

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      const message = "Silakan masukkan email dan password Anda.";
      setErrorMessage(message);
      return;
    }

    setErrorMessage(null);
    setLoading(true);

    try {
      const result = await loginApi({ email: email.trim(), password });
      await saveAuthSession(result.user, result.token);
      router.replace("/home");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat masuk ke akun.",
      );
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
          <View style={authStyles.headerArea}>
            <View style={authStyles.logoBadge}>
              <Ionicons name="storefront" size={28} color={colors.inkOnDark} />
            </View>
            <Text style={authStyles.eyebrow}>Minimarket · Kasir</Text>
            <Text style={authStyles.title}>Selamat datang kembali</Text>
            <Text style={authStyles.subtitle}>
              Masuk untuk mengelola stok, transaksi, dan laporan toko Anda.
            </Text>
          </View>

          <View style={authStyles.card}>
            <View style={authStyles.tapeStripe} />

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
                  size={19}
                  color={
                    focusedField === "email" ? colors.primary : colors.inkFaint
                  }
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
                    setErrorMessage(null);
                  }}
                  onFocus={() => setFocusedField("email")}
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
                  size={19}
                  color={
                    focusedField === "password"
                      ? colors.primary
                      : colors.inkFaint
                  }
                  style={authStyles.inputIcon}
                />
                <TextInput
                  style={authStyles.input}
                  placeholder="Masukkan kata sandi"
                  placeholderTextColor={colors.inkFaint}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  editable={!loading}
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    setErrorMessage(null);
                  }}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                />
                <TouchableOpacity
                  style={authStyles.eyeButton}
                  onPress={() => setShowPassword(!showPassword)}
                  accessibilityLabel={
                    showPassword
                      ? "Sembunyikan kata sandi"
                      : "Tampilkan kata sandi"
                  }
                >
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={19}
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
              onPress={handleLogin}
            >
              {loading ? (
                <ActivityIndicator color={colors.inkOnDark} />
              ) : (
                <>
                  <Text style={authStyles.primaryButtonText}>Masuk</Text>
                  <Ionicons
                    name="arrow-forward"
                    size={18}
                    color={colors.inkOnDark}
                  />
                </>
              )}
            </TouchableOpacity>

            {errorMessage && (
              <Text style={authStyles.feedbackError}>{errorMessage}</Text>
            )}

            <View style={authStyles.dividerRow}>
              <View style={authStyles.dividerLine} />
              <Text style={authStyles.dividerText}>atau</Text>
              <View style={authStyles.dividerLine} />
            </View>

            <View style={authStyles.footerRow}>
              <Text style={authStyles.footerText}>Belum punya akun?</Text>
              <TouchableOpacity
                disabled={loading}
                onPress={() => router.push("/register")}
              >
                <Text style={authStyles.footerLink}>Daftar sekarang</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
