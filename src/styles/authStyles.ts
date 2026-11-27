import { StyleSheet } from "react-native";

import { colors, radius, shadow } from "@/styles/theme";

export const authStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  flexContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 28,
  },
  topBackButton: {
    width: 42,
    height: 42,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },

  // --- Kepala halaman ---
  headerArea: {
    marginBottom: 22,
  },
  logoBadge: {
    width: 60,
    height: 60,
    borderRadius: 18,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    ...shadow.primary,
  },
  eyebrow: {
    fontSize: 11.5,
    fontWeight: "800",
    letterSpacing: 1.2,
    color: colors.primary,
    marginBottom: 7,
    textTransform: "uppercase",
  },
  title: {
    fontSize: 27,
    fontWeight: "800",
    color: colors.ink,
    letterSpacing: -0.7,
    lineHeight: 33,
  },
  subtitle: {
    fontSize: 13.5,
    color: colors.inkMuted,
    marginTop: 7,
    lineHeight: 20,
    maxWidth: 320,
  },

  // --- Kartu formulir ---
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.lifted,
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 12.5,
    fontWeight: "700",
    color: colors.ink,
    marginBottom: 7,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: 13,
    height: 52,
  },
  inputWrapperFocused: {
    backgroundColor: colors.surface,
    borderColor: colors.primary,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: colors.ink,
    paddingVertical: 0,
  },
  eyeButton: {
    paddingLeft: 8,
    paddingVertical: 6,
  },
  helperText: {
    fontSize: 11.5,
    color: colors.inkFaint,
    marginTop: 6,
    lineHeight: 16,
  },

  // --- Tombol utama ---
  primaryButton: {
    flexDirection: "row",
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    height: 54,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
    ...shadow.primary,
  },
  primaryButtonText: {
    color: colors.inkOnDark,
    fontSize: 15.5,
    fontWeight: "800",
  },
  primaryButtonDisabled: {
    opacity: 0.6,
    shadowOpacity: 0,
  },

  // --- Umpan balik ---
  feedbackSuccess: {
    fontSize: 13,
    lineHeight: 19,
    color: colors.success,
    backgroundColor: colors.successSoft,
    borderWidth: 1,
    borderColor: colors.mintSoftBorder,
    borderRadius: radius.md,
    paddingVertical: 11,
    paddingHorizontal: 13,
    marginTop: 14,
  },
  feedbackError: {
    fontSize: 13,
    lineHeight: 19,
    color: colors.dangerInk,
    backgroundColor: colors.dangerSoft,
    borderWidth: 1,
    borderColor: colors.dangerSoftBorder,
    borderRadius: radius.md,
    paddingVertical: 11,
    paddingHorizontal: 13,
    marginTop: 14,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.bg,
  },

  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 18,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    fontSize: 12,
    color: colors.inkFaint,
    marginHorizontal: 12,
    fontWeight: "600",
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  footerText: {
    fontSize: 13.5,
    color: colors.inkMuted,
  },
  footerLink: {
    fontSize: 13.5,
    fontWeight: "800",
    color: colors.primary,
  },

  tapeStripe: {
    height: 4,
    width: 48,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    marginBottom: 16,
  },
});
