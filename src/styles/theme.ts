/**
 * Token desain Minimarket — gaya marketplace modern.
 *
 * Arah visual: aplikasi belanja/kasir dengan header biru bergradasi,
 * kartu produk, dan kategori berwarna. Netral diberi sedikit kebiruan
 * agar satu keluarga dengan warna utama.
 */

export const colors = {
  // Permukaan
  bg: "#F5F7FB",
  surface: "#FFFFFF",
  surfaceSunken: "#EEF2F9",
  surfaceMuted: "#F7F9FC",

  // Garis
  border: "#E4E9F2",
  borderStrong: "#D3DBE8",

  // Teks
  ink: "#0F1B2D",
  inkMuted: "#5C6B82",
  inkFaint: "#93A0B4",
  inkOnDark: "#FFFFFF",
  inkOnDarkMuted: "#D6E2FF",

  // Warna utama (biru)
  primary: "#2158F0",
  primaryDark: "#1741C4",
  primaryLight: "#4D80FF",
  primarySoft: "#E8EEFF",
  primarySoftBorder: "#C9D8FF",

  gradientStart: "#2B6BFF",
  gradientEnd: "#1536C7",

  // Aksen
  accent: "#FFB020",
  accentInk: "#8A5800",
  accentSoft: "#FFF4DE",
  accentSoftBorder: "#FFE2AC",

  // Pendukung
  mint: "#12B76A",
  mintSoft: "#E6F8EF",
  mintSoftBorder: "#C1EDD8",

  violet: "#7A5AF8",
  violetSoft: "#F0ECFF",
  violetSoftBorder: "#DCD3FF",

  coral: "#F04438",
  coralSoft: "#FEECEA",
  coralSoftBorder: "#FBCEC9",

  sky: "#0BA5EC",
  skySoft: "#E4F5FE",
  skySoftBorder: "#C0E7FA",

  // Status
  danger: "#D92D20",
  dangerSoft: "#FEECEA",
  dangerSoftBorder: "#FBCEC9",
  dangerInk: "#B42318",

  success: "#12B76A",
  successSoft: "#E6F8EF",
};

export const radius = {
  sm: 10,
  md: 14,
  lg: 18,
  xl: 22,
  pill: 999,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 14,
  lg: 20,
  xl: 28,
};

export const shadow = {
  soft: {
    shadowColor: "#0F1B2D",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  lifted: {
    shadowColor: "#0F1B2D",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 22,
    elevation: 5,
  },
  primary: {
    shadowColor: "#1741C4",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.28,
    shadowRadius: 18,
    elevation: 6,
  },
};
