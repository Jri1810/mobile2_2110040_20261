import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { getStorageImageUrl } from "@/config/api";
import { getAuthSession, UserData } from "@/services/authService";
import { homeStyles } from "@/styles/homeStyles";
import { colors } from "@/styles/theme";

type IconName = React.ComponentProps<typeof Ionicons>["name"];

type Kategori = {
  key: string;
  label: string;
  icon: IconName;
  color: string;
  bg: string;
  border: string;
};

const KATEGORI: Kategori[] = [
  {
    key: "sembako",
    label: "Sembako",
    icon: "basket-outline",
    color: colors.primary,
    bg: colors.primarySoft,
    border: colors.primarySoftBorder,
  },
  {
    key: "minuman",
    label: "Minuman",
    icon: "cafe-outline",
    color: colors.sky,
    bg: colors.skySoft,
    border: colors.skySoftBorder,
  },
  {
    key: "snack",
    label: "Snack",
    icon: "fast-food-outline",
    color: colors.accentInk,
    bg: colors.accentSoft,
    border: colors.accentSoftBorder,
  },
  {
    key: "kebersihan",
    label: "Kebersihan",
    icon: "sparkles-outline",
    color: colors.mint,
    bg: colors.mintSoft,
    border: colors.mintSoftBorder,
  },
  {
    key: "kesehatan",
    label: "Kesehatan",
    icon: "medkit-outline",
    color: colors.violet,
    bg: colors.violetSoft,
    border: colors.violetSoftBorder,
  },
];

type ProdukPromo = {
  id: string;
  nama: string;
  harga: number;
  hargaAsli: number;
  diskon: string;
  rating: string;
  thumbBg: string;
  icon: IconName;
};

const PRODUK_PROMO: ProdukPromo[] = [
  {
    id: "p1",
    nama: "Minyak Goreng 2L",
    harga: 32000,
    hargaAsli: 38000,
    diskon: "16%",
    rating: "4.8",
    thumbBg: "#FFF4DE",
    icon: "water-outline",
  },
  {
    id: "p2",
    nama: "Beras Premium 5kg",
    harga: 68000,
    hargaAsli: 72500,
    diskon: "6%",
    rating: "4.9",
    thumbBg: "#E8EEFF",
    icon: "nutrition-outline",
  },
];

const MENU: {
  key: string;
  label: string;
  meta: string;
  icon: IconName;
  route?: string;
}[] = [
  {
    key: "produk",
    label: "Katalog Produk",
    meta: "Stok dan harga jual",
    icon: "cube-outline",
    route: "/produk",
  },
  {
    key: "transaksi",
    label: "Transaksi Kasir",
    meta: "Keranjang dan nota",
    icon: "cart-outline",
    route: "/transaksi",
  },
  {
    key: "report",
    label: "Laporan Penjualan",
    meta: "Omset dan performa",
    icon: "bar-chart-outline",
    route: "/report",
  },
  {
    key: "pelanggan",
    label: "Pelanggan",
    meta: "Belum tersedia",
    icon: "people-outline",
  },
];

const rupiah = (v: number) => "Rp " + v.toLocaleString("id-ID");

export default function HomeScreen() {
  const [user, setUser] = useState<UserData | null>(null);

  useFocusEffect(
    useCallback(() => {
      getAuthSession().then((session) => {
        if (session) setUser(session.user);
      });
    }, []),
  );

  const photoUrl = getStorageImageUrl(user?.foto);
  const firstName = (user?.name || "").split(" ")[0] || "Pengelola";

  return (
    <SafeAreaView style={homeStyles.safeArea} edges={["top"]}>
      <ScrollView
        style={homeStyles.scrollContainer}
        contentContainerStyle={homeStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={[colors.gradientStart, colors.gradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={homeStyles.header}
        >
          <View style={homeStyles.headerDecoOne} />
          <View style={homeStyles.headerDecoTwo} />

          <View style={homeStyles.headerTopRow}>
            <View style={homeStyles.headerAvatar}>
              {photoUrl ? (
                <Image
                  source={{ uri: photoUrl }}
                  style={homeStyles.headerAvatarImage}
                  contentFit="cover"
                  transition={180}
                />
              ) : (
                <Ionicons name="person" size={20} color={colors.inkOnDark} />
              )}
            </View>
            <View style={{ flex: 1 }}>
              <Text style={homeStyles.headerGreetingLabel}>Selamat datang</Text>
              <Text style={homeStyles.headerGreetingName} numberOfLines={1}>
                {firstName}
              </Text>
            </View>
            <TouchableOpacity style={homeStyles.headerIconButton}>
              <Ionicons
                name="notifications-outline"
                size={19}
                color={colors.inkOnDark}
              />
              <View style={homeStyles.headerBadge} />
            </TouchableOpacity>
          </View>

          <View style={homeStyles.searchBar}>
            <Ionicons name="search" size={17} color={colors.inkFaint} />
            <Text style={homeStyles.searchPlaceholder}>
              Cari produk atau nota
            </Text>
            <View style={homeStyles.searchDivider} />
            <Ionicons name="options-outline" size={17} color={colors.primary} />
          </View>
        </LinearGradient>

        <View style={homeStyles.body}>
          <View
            style={[
              homeStyles.promoCard,
              { backgroundColor: colors.primaryDark },
            ]}
          >
            <View style={homeStyles.promoDeco} />
            <View style={homeStyles.promoTextWrap}>
              <Text style={[homeStyles.promoKicker, { color: colors.accent }]}>
                Promo hari ini
              </Text>
              <Text style={[homeStyles.promoTitle, { color: colors.inkOnDark }]}>
                Diskon sembako{"\n"}hingga 20%
              </Text>
              <Text
                style={[homeStyles.promoBody, { color: colors.inkOnDarkMuted }]}
              >
                Berlaku sampai pukul 21.00 WIB
              </Text>
            </View>
            <View style={homeStyles.promoBadge}>
              <Ionicons name="pricetag" size={24} color={colors.inkOnDark} />
            </View>
          </View>

          <View style={homeStyles.sectionBlock}>
            <View style={homeStyles.sectionHeader}>
              <Text style={homeStyles.sectionTitle}>Kategori</Text>
              <Text style={homeStyles.sectionAction}>Lihat semua</Text>
            </View>
            <View style={homeStyles.kategoriGrid}>
              {KATEGORI.map((k) => (
                <TouchableOpacity
                  key={k.key}
                  style={homeStyles.kategoriItem}
                  activeOpacity={0.7}
                  onPress={() =>
                    Alert.alert(
                      k.label,
                      `Filter kategori ${k.label} belum tersedia.`,
                    )
                  }
                >
                  <View
                    style={[
                      homeStyles.kategoriIcon,
                      { backgroundColor: k.bg, borderColor: k.border },
                    ]}
                  >
                    <Ionicons name={k.icon} size={22} color={k.color} />
                  </View>
                  <Text style={homeStyles.kategoriLabel} numberOfLines={1}>
                    {k.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View>
            <View style={homeStyles.sectionHeader}>
              <Text style={homeStyles.sectionTitle}>Sedang Promo</Text>
              <Text style={homeStyles.sectionAction}>Lihat semua</Text>
            </View>
            <View style={homeStyles.produkRow}>
              {PRODUK_PROMO.map((p) => (
                <TouchableOpacity
                  key={p.id}
                  style={homeStyles.produkCard}
                  activeOpacity={0.8}
                  onPress={() => router.push("/produk" as never)}
                >
                  <View
                    style={[
                      homeStyles.produkThumb,
                      { backgroundColor: p.thumbBg },
                    ]}
                  >
                    <Ionicons name={p.icon} size={32} color={colors.inkMuted} />
                    <View style={homeStyles.produkDiscount}>
                      <Text style={homeStyles.produkDiscountText}>
                        {p.diskon}
                      </Text>
                    </View>
                  </View>
                  <View style={homeStyles.produkBody}>
                    <Text style={homeStyles.produkName} numberOfLines={2}>
                      {p.nama}
                    </Text>
                    <Text style={homeStyles.produkPrice}>{rupiah(p.harga)}</Text>
                    <Text style={homeStyles.produkOldPrice}>
                      {rupiah(p.hargaAsli)}
                    </Text>
                    <View style={homeStyles.produkRatingRow}>
                      <Ionicons name="star" size={11} color={colors.accent} />
                      <Text style={homeStyles.produkRatingText}>
                        {p.rating}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={homeStyles.menuCard}>
            <View style={homeStyles.menuHeader}>
              <Text style={homeStyles.sectionTitle}>Menu Operasional</Text>
            </View>
            {MENU.map((m) => (
              <TouchableOpacity
                key={m.key}
                style={homeStyles.menuRow}
                activeOpacity={0.7}
                onPress={() =>
                  m.route
                    ? router.push(m.route as never)
                    : Alert.alert(
                        m.label,
                        `Fitur ${m.label} akan tersedia pada modul berikutnya.`,
                      )
                }
              >
                <View
                  style={[
                    homeStyles.menuIconWrapper,
                    {
                      backgroundColor: colors.primarySoft,
                      borderColor: colors.primarySoftBorder,
                    },
                  ]}
                >
                  <Ionicons name={m.icon} size={18} color={colors.primary} />
                </View>
                <View style={homeStyles.menuRowText}>
                  <Text style={homeStyles.menuLabel}>{m.label}</Text>
                  <Text style={homeStyles.menuMeta}>{m.meta}</Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={16}
                  color={colors.inkFaint}
                />
              </TouchableOpacity>
            ))}
          </View>

          <View style={homeStyles.footnote}>
            <Ionicons
              name="information-circle-outline"
              size={14}
              color={colors.inkFaint}
            />
            <Text style={homeStyles.footnoteText}>
              Angka dan produk pada beranda masih berupa data contoh praktikum.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
