import { StyleSheet } from "react-native";

import { colors, radius, shadow } from "@/styles/theme";

export const tabNavColors = {
  active: colors.primary,
  inactive: "#9AA7BC",
  headerBg: colors.bg,
  headerTint: colors.ink,
  surface: colors.surface,
  border: colors.border,
};

export const tabStyles = StyleSheet.create({
  // --- Bilah tab bawah ---
  tabBar: {
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    shadowColor: "#0F1B2D",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.07,
    shadowRadius: 14,
    elevation: 10,
  },
  tabBarItem: {
    paddingTop: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  tabBarLabel: {
    fontSize: 10.5,
    fontWeight: "700",
    marginTop: 3,
  },
  iconContainer: {
    width: 30,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },

  // --- Header layar ---
  headerStyle: {
    backgroundColor: colors.bg,
    borderBottomWidth: 0,
  },
  headerTitleStyle: {
    fontWeight: "800",
    fontSize: 18,
    color: colors.ink,
    letterSpacing: -0.3,
  },

  // --- Kerangka layar ---
  screenContainer: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 28,
    gap: 13,
  },

  // --- Kepala bagian ---
  pageIntro: {
    paddingHorizontal: 2,
    paddingBottom: 2,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.ink,
    letterSpacing: -0.7,
    lineHeight: 30,
  },
  pageSubtitle: {
    fontSize: 12.5,
    color: colors.inkMuted,
    lineHeight: 18,
    marginTop: 5,
    maxWidth: 330,
  },
  introAccent: {
    height: 4,
    width: 40,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    marginBottom: 11,
  },

  // --- Kartu umum ---
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.soft,
  },
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.ink,
    letterSpacing: -0.3,
  },
  sectionSubtitle: {
    fontSize: 12.5,
    color: colors.inkMuted,
    lineHeight: 18,
    marginTop: 3,
  },

  // --- Lencana ---
  badgeBlue: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: colors.primarySoft,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.primarySoftBorder,
  },
  badgeBlueText: {
    fontSize: 10.5,
    fontWeight: "800",
    color: colors.primary,
  },
  badgeGreen: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: colors.mintSoft,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.mintSoftBorder,
  },
  badgeGreenText: {
    fontSize: 10.5,
    fontWeight: "800",
    color: colors.mint,
  },
  badgeAccent: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: colors.accentSoft,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.accentSoftBorder,
  },
  badgeAccentText: {
    fontSize: 10.5,
    fontWeight: "800",
    color: colors.accentInk,
  },

  // --- Daftar ---
  listGroup: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
    ...shadow.soft,
  },
  listItemCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  listRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 13,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    minHeight: 64,
  },
  listRowFirst: {
    borderTopWidth: 0,
  },
  listItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
    flex: 1,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
    borderWidth: 1,
    borderColor: colors.primarySoftBorder,
    alignItems: "center",
    justifyContent: "center",
  },
  listItemTitle: {
    fontSize: 13.5,
    fontWeight: "700",
    color: colors.ink,
    letterSpacing: -0.1,
  },
  listItemMeta: {
    fontSize: 11,
    color: colors.inkMuted,
    marginTop: 2,
    fontVariant: ["tabular-nums"],
  },
  listItemPrice: {
    fontSize: 13.5,
    fontWeight: "800",
    color: colors.ink,
    fontVariant: ["tabular-nums"],
  },
  stockPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.pill,
    backgroundColor: colors.primarySoft,
    borderWidth: 1,
    borderColor: colors.primarySoftBorder,
  },
  stockPillText: {
    fontSize: 10,
    fontWeight: "800",
    color: colors.primary,
  },
  stockPillLow: {
    backgroundColor: colors.accentSoft,
    borderColor: colors.accentSoftBorder,
  },
  stockPillLowText: {
    color: colors.accentInk,
  },

  // --- Grid produk (katalog) ---
  produkGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  produkGridCard: {
    width: "47.7%",
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
    ...shadow.soft,
  },
  produkGridThumb: {
    height: 96,
    alignItems: "center",
    justifyContent: "center",
  },
  produkGridBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: colors.coral,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: radius.sm,
  },
  produkGridBadgeText: {
    fontSize: 9.5,
    fontWeight: "800",
    color: colors.inkOnDark,
  },
  produkGridBody: {
    padding: 11,
    gap: 2,
  },
  produkGridName: {
    fontSize: 12.5,
    fontWeight: "700",
    color: colors.ink,
    lineHeight: 17,
    minHeight: 34,
  },
  produkGridPrice: {
    fontSize: 13.5,
    fontWeight: "800",
    color: colors.primary,
    fontVariant: ["tabular-nums"],
    marginTop: 2,
  },
  produkGridOld: {
    fontSize: 10.5,
    color: colors.inkFaint,
    textDecorationLine: "line-through",
    fontVariant: ["tabular-nums"],
  },
  produkGridMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
  produkGridMetaText: {
    fontSize: 10.5,
    fontWeight: "700",
    color: colors.inkMuted,
  },

  // --- Ringkasan angka ---
  statGrid: {
    flexDirection: "row",
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.soft,
  },
  statCardAccent: {
    backgroundColor: colors.primary,
    borderColor: colors.primaryDark,
  },
  statLabel: {
    fontSize: 10.5,
    color: colors.inkMuted,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  statLabelOnDark: {
    color: colors.inkOnDarkMuted,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.ink,
    marginTop: 6,
    letterSpacing: -0.5,
    fontVariant: ["tabular-nums"],
  },
  statValueOnDark: {
    color: colors.inkOnDark,
  },
  statDelta: {
    fontSize: 10.5,
    fontWeight: "700",
    color: colors.mint,
    marginTop: 4,
  },

  // --- Grafik batang ---
  chartRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 9,
    height: 96,
    marginTop: 6,
  },
  chartBarWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    height: "100%",
    gap: 6,
  },
  chartBar: {
    width: "100%",
    borderRadius: 6,
    backgroundColor: colors.primarySoftBorder,
  },
  chartBarPeak: {
    backgroundColor: colors.primary,
  },
  chartLabel: {
    fontSize: 10,
    color: colors.inkFaint,
    fontWeight: "700",
  },

  // --- Profil ---
  profileHeaderCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
    ...shadow.soft,
  },
  profileCover: {
    height: 80,
    backgroundColor: colors.primary,
  },
  profileBody: {
    alignItems: "center",
    paddingHorizontal: 18,
    paddingBottom: 18,
    marginTop: -40,
  },
  profileAvatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: colors.surfaceSunken,
    borderWidth: 4,
    borderColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 11,
    overflow: "hidden",
    position: "relative",
  },
  profileAvatarImage: {
    width: "100%",
    height: "100%",
  },
  avatarOverlayLoading: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(15,27,45,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  profileName: {
    fontSize: 17.5,
    fontWeight: "800",
    color: colors.ink,
    letterSpacing: -0.4,
    textAlign: "center",
  },
  profileEmail: {
    fontSize: 12,
    color: colors.inkMuted,
    marginTop: 3,
    textAlign: "center",
  },
  photoActionRow: {
    flexDirection: "row",
    gap: 9,
    marginTop: 15,
    width: "100%",
  },
  photoActionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: colors.primarySoft,
    borderWidth: 1,
    borderColor: colors.primarySoftBorder,
    borderRadius: radius.md,
    height: 42,
  },
  photoActionButtonText: {
    fontSize: 12.5,
    fontWeight: "800",
    color: colors.primary,
  },
  photoHintText: {
    fontSize: 10.5,
    color: colors.inkFaint,
    marginTop: 10,
    textAlign: "center",
    lineHeight: 15,
  },

  // --- Segment ---
  segmentContainer: {
    flexDirection: "row",
    backgroundColor: colors.surfaceSunken,
    borderRadius: radius.md,
    padding: 4,
    gap: 4,
  },
  segmentButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    height: 40,
    borderRadius: radius.sm,
  },
  segmentButtonActive: {
    backgroundColor: colors.surface,
    ...shadow.soft,
  },
  segmentText: {
    fontSize: 12.5,
    fontWeight: "700",
    color: colors.inkMuted,
  },
  segmentTextActive: {
    color: colors.primary,
    fontWeight: "800",
  },

  // --- Form ---
  formGroup: {
    marginBottom: 14,
  },
  formLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.ink,
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: 12,
    height: 50,
  },
  inputIcon: {
    marginRight: 9,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: colors.ink,
    paddingVertical: 0,
  },
  eyeToggle: {
    paddingLeft: 8,
    paddingVertical: 6,
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    height: 50,
    marginTop: 6,
    ...shadow.primary,
  },
  saveButtonDisabled: {
    opacity: 0.6,
    shadowOpacity: 0,
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.inkOnDark,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: colors.dangerSoft,
    borderWidth: 1,
    borderColor: colors.dangerSoftBorder,
    borderRadius: radius.md,
    height: 50,
    marginTop: 2,
  },
  logoutButtonText: {
    fontSize: 13.5,
    fontWeight: "800",
    color: colors.dangerInk,
  },
});
