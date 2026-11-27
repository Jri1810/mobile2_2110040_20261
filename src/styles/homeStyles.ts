import { StyleSheet } from "react-native";

import { colors, radius, shadow } from "@/styles/theme";

export const homeStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scrollContent: {
    paddingBottom: 28,
  },

  // --- Header bergradasi ---
  header: {
    paddingHorizontal: 18,
    paddingTop: 4,
    paddingBottom: 52,
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
    overflow: "hidden",
  },
  headerDecoOne: {
    position: "absolute",
    top: -60,
    right: -40,
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: "rgba(255,255,255,0.10)",
  },
  headerDecoTwo: {
    position: "absolute",
    top: 40,
    right: 60,
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "rgba(255,255,255,0.07)",
  },
  headerTopRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
    marginBottom: 16,
  },
  headerAvatar: {
    width: 42,
    height: 42,
    borderRadius: radius.pill,
    backgroundColor: "rgba(255,255,255,0.22)",
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.4)",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  headerAvatarImage: {
    width: "100%",
    height: "100%",
  },
  headerGreetingLabel: {
    fontSize: 11.5,
    fontWeight: "600",
    color: colors.inkOnDarkMuted,
    letterSpacing: 0.2,
  },
  headerGreetingName: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.inkOnDark,
    letterSpacing: -0.3,
    marginTop: 1,
  },
  headerIconButton: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    backgroundColor: "rgba(255,255,255,0.18)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerBadge: {
    position: "absolute",
    top: 6,
    right: 7,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent,
  },

  // --- Kolom pencarian ---
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    paddingHorizontal: 13,
    height: 46,
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: 13,
    color: colors.inkFaint,
  },
  searchDivider: {
    width: 1,
    height: 20,
    backgroundColor: colors.border,
  },

  // --- Isi yang menumpuk di header ---
  body: {
    marginTop: -38,
    paddingHorizontal: 18,
    gap: 16,
  },

  // --- Banner promo ---
  promoCard: {
    borderRadius: radius.lg,
    padding: 16,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    ...shadow.soft,
  },
  promoDeco: {
    position: "absolute",
    right: -25,
    bottom: -30,
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "rgba(255,255,255,0.16)",
  },
  promoTextWrap: {
    flex: 1,
  },
  promoKicker: {
    fontSize: 10.5,
    fontWeight: "800",
    letterSpacing: 0.9,
    textTransform: "uppercase",
    marginBottom: 5,
  },
  promoTitle: {
    fontSize: 16.5,
    fontWeight: "800",
    letterSpacing: -0.4,
    lineHeight: 21,
  },
  promoBody: {
    fontSize: 11.5,
    marginTop: 5,
    lineHeight: 16,
  },
  promoBadge: {
    width: 52,
    height: 52,
    borderRadius: radius.md,
    backgroundColor: "rgba(255,255,255,0.22)",
    alignItems: "center",
    justifyContent: "center",
  },

  // --- Bagian berjudul ---
  sectionBlock: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.soft,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 13,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: colors.ink,
    letterSpacing: -0.25,
  },
  sectionAction: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.primary,
  },

  // --- Grid kategori ---
  kategoriGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 16,
  },
  kategoriItem: {
    width: "20%",
    alignItems: "center",
    gap: 7,
  },
  kategoriIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  kategoriLabel: {
    fontSize: 10.5,
    fontWeight: "700",
    color: colors.inkMuted,
    textAlign: "center",
  },

  // --- Kartu produk ---
  produkRow: {
    flexDirection: "row",
    gap: 11,
  },
  produkCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
    ...shadow.soft,
  },
  produkThumb: {
    height: 78,
    alignItems: "center",
    justifyContent: "center",
  },
  produkDiscount: {
    position: "absolute",
    top: 7,
    left: 7,
    backgroundColor: colors.coral,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: radius.sm,
  },
  produkDiscountText: {
    fontSize: 9.5,
    fontWeight: "800",
    color: colors.inkOnDark,
  },
  produkBody: {
    padding: 11,
    gap: 3,
  },
  produkName: {
    fontSize: 12.5,
    fontWeight: "700",
    color: colors.ink,
    lineHeight: 17,
  },
  produkPrice: {
    fontSize: 13.5,
    fontWeight: "800",
    color: colors.primary,
    fontVariant: ["tabular-nums"],
    marginTop: 2,
  },
  produkOldPrice: {
    fontSize: 10.5,
    color: colors.inkFaint,
    textDecorationLine: "line-through",
    fontVariant: ["tabular-nums"],
  },
  produkRatingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    marginTop: 3,
  },
  produkRatingText: {
    fontSize: 10.5,
    fontWeight: "700",
    color: colors.inkMuted,
  },

  // --- Daftar menu operasional ---
  menuCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
    ...shadow.soft,
  },
  menuHeader: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 11,
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    minHeight: 58,
  },
  menuIconWrapper: {
    width: 38,
    height: 38,
    borderRadius: radius.sm,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  menuRowText: {
    flex: 1,
  },
  menuLabel: {
    fontSize: 13.5,
    fontWeight: "700",
    color: colors.ink,
  },
  menuMeta: {
    fontSize: 11,
    color: colors.inkMuted,
    marginTop: 2,
  },

  footnote: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    paddingHorizontal: 2,
  },
  footnoteText: {
    flex: 1,
    fontSize: 11,
    color: colors.inkFaint,
    lineHeight: 16,
  },
});
