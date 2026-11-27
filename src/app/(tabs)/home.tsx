import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { showDialog } from "@/components/dialog";
import { getStorageImageUrl } from "@/config/api";
import {
  diskonPersen,
  type IconName,
  NOTIFIKASI,
  PRODUK,
  PRODUK_PROMO,
  rupiah,
} from "@/data/minimarket";
import { getAuthSession, UserData } from "@/services/authService";
import { homeStyles } from "@/styles/homeStyles";
import { colors } from "@/styles/theme";

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
    key: "segar",
    label: "Segar",
    icon: "leaf-outline",
    color: colors.violet,
    bg: colors.violetSoft,
    border: colors.violetSoftBorder,
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

export default function HomeScreen() {
  const [user, setUser] = useState<UserData | null>(null);
  const [cari, setCari] = useState("");

  useFocusEffect(
    useCallback(() => {
      getAuthSession().then((session) => {
        if (session) setUser(session.user);
      });
    }, []),
  );

  const photoUrl = getStorageImageUrl(user?.foto);
  const firstName = (user?.name || "").split(" ")[0] || "Pengelola";
  const belumDibaca = NOTIFIKASI.filter((n) => !n.dibaca).length;

  const hasilCari = useMemo(() => {
    const q = cari.trim().toLowerCase();
    if (!q) return null;
    return PRODUK.filter((p) => p.nama.toLowerCase().includes(q));
  }, [cari]);

  const bukaKategori = (label: string) => {
    router.push(`/produk?kategori=${encodeURIComponent(label)}` as never);
  };

  return (
    <SafeAreaView style={homeStyles.safeArea} edges={["top"]}>
      <ScrollView
        style={homeStyles.scrollContainer}
        contentContainerStyle={homeStyles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
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
            <TouchableOpacity
              style={homeStyles.headerAvatar}
              onPress={() => router.push("/profil" as never)}
              accessibilityLabel="Buka profil"
            >
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
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
              <Text style={homeStyles.headerGreetingLabel}>Selamat datang</Text>
              <Text style={homeStyles.headerGreetingName} numberOfLines={1}>
                {firstName}
              </Text>
            </View>
            <TouchableOpacity
              style={homeStyles.headerIconButton}
              onPress={() => router.push("/notifikasi" as never)}
              accessibilityLabel={`Notifikasi, ${belumDibaca} belum dibaca`}
            >
              <Ionicons
                name="notifications-outline"
                size={19}
                color={colors.inkOnDark}
              />
              {belumDibaca > 0 && <View style={homeStyles.headerBadge} />}
            </TouchableOpacity>
          </View>

          <View style={homeStyles.searchBar}>
            <Ionicons name="search" size={17} color={colors.inkFaint} />
            <TextInput
              style={[homeStyles.searchPlaceholder, { paddingVertical: 0 }]}
              placeholder="Cari produk atau nota"
              placeholderTextColor={colors.inkFaint}
              value={cari}
              onChangeText={setCari}
              returnKeyType="search"
              autoCorrect={false}
            />
            {cari.length > 0 ? (
              <TouchableOpacity
                onPress={() => setCari("")}
                accessibilityLabel="Hapus pencarian"
              >
                <Ionicons
                  name="close-circle"
                  size={17}
                  color={colors.inkFaint}
                />
              </TouchableOpacity>
            ) : (
              <>
                <View style={homeStyles.searchDivider} />
                <TouchableOpacity
                  onPress={() => router.push("/produk" as never)}
                  accessibilityLabel="Buka katalog produk"
                >
                  <Ionicons
                    name="options-outline"
                    size={17}
                    color={colors.primary}
                  />
                </TouchableOpacity>
              </>
            )}
          </View>
        </LinearGradient>

        <View style={homeStyles.body}>
          {hasilCari ? (
            <View style={homeStyles.sectionBlock}>
              <Text style={homeStyles.sectionTitle}>
                Hasil pencarian “{cari}”
              </Text>
              {hasilCari.length === 0 ? (
                <Text
                  style={{
                    fontSize: 12.5,
                    color: colors.inkMuted,
                    marginTop: 8,
                    lineHeight: 18,
                  }}
                >
                  Tidak ada produk yang cocok. Coba kata lain atau buka katalog
                  lengkap.
                </Text>
              ) : (
                hasilCari.map((p) => (
                  <TouchableOpacity
                    key={p.id}
                    onPress={() => router.push(`/produk/${p.id}` as never)}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 11,
                      paddingVertical: 10,
                      borderTopWidth: 1,
                      borderTopColor: colors.border,
                    }}
                  >
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 12,
                        backgroundColor: p.thumbBg,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Ionicons
                        name={p.icon}
                        size={20}
                        color={colors.inkMuted}
                      />
                    </View>
                    <Text
                      style={{
                        flex: 1,
                        fontSize: 13,
                        fontWeight: "700",
                        color: colors.ink,
                      }}
                      numberOfLines={1}
                    >
                      {p.nama}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12.5,
                        fontWeight: "800",
                        color: colors.primary,
                        fontVariant: ["tabular-nums"],
                      }}
                    >
                      {rupiah(p.harga)}
                    </Text>
                  </TouchableOpacity>
                ))
              )}
            </View>
          ) : (
            <>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => bukaKategori("Sembako")}
                style={[
                  homeStyles.promoCard,
                  { backgroundColor: colors.primaryDark },
                ]}
              >
                <View style={homeStyles.promoDeco} />
                <View style={homeStyles.promoTextWrap}>
                  <Text
                    style={[homeStyles.promoKicker, { color: colors.accent }]}
                  >
                    Promo hari ini
                  </Text>
                  <Text
                    style={[homeStyles.promoTitle, { color: colors.inkOnDark }]}
                  >
                    Diskon sembako{"\n"}hingga 20%
                  </Text>
                  <Text
                    style={[
                      homeStyles.promoBody,
                      { color: colors.inkOnDarkMuted },
                    ]}
                  >
                    Berlaku sampai pukul 21.00 WIB
                  </Text>
                </View>
                <View style={homeStyles.promoBadge}>
                  <Ionicons
                    name="pricetag"
                    size={24}
                    color={colors.inkOnDark}
                  />
                </View>
              </TouchableOpacity>

              <View style={homeStyles.sectionBlock}>
                <View style={homeStyles.sectionHeader}>
                  <Text style={homeStyles.sectionTitle}>Kategori</Text>
                  <TouchableOpacity
                    onPress={() => router.push("/produk" as never)}
                  >
                    <Text style={homeStyles.sectionAction}>Lihat semua</Text>
                  </TouchableOpacity>
                </View>
                <View style={homeStyles.kategoriGrid}>
                  {KATEGORI.map((k) => (
                    <TouchableOpacity
                      key={k.key}
                      style={homeStyles.kategoriItem}
                      activeOpacity={0.7}
                      onPress={() => bukaKategori(k.label)}
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
                  <TouchableOpacity
                    onPress={() => router.push("/produk" as never)}
                  >
                    <Text style={homeStyles.sectionAction}>Lihat semua</Text>
                  </TouchableOpacity>
                </View>
                <View style={homeStyles.produkRow}>
                  {PRODUK_PROMO.map((p) => (
                    <TouchableOpacity
                      key={p.id}
                      style={homeStyles.produkCard}
                      activeOpacity={0.8}
                      onPress={() => router.push(`/produk/${p.id}` as never)}
                    >
                      <View
                        style={[
                          homeStyles.produkThumb,
                          { backgroundColor: p.thumbBg },
                        ]}
                      >
                        <Ionicons
                          name={p.icon}
                          size={32}
                          color={colors.inkMuted}
                        />
                        <View style={homeStyles.produkDiscount}>
                          <Text style={homeStyles.produkDiscountText}>
                            {diskonPersen(p)}
                          </Text>
                        </View>
                      </View>
                      <View style={homeStyles.produkBody}>
                        <Text style={homeStyles.produkName} numberOfLines={2}>
                          {p.nama}
                        </Text>
                        <Text style={homeStyles.produkPrice}>
                          {rupiah(p.harga)}
                        </Text>
                        {p.hargaAsli && (
                          <Text style={homeStyles.produkOldPrice}>
                            {rupiah(p.hargaAsli)}
                          </Text>
                        )}
                        <View style={homeStyles.produkRatingRow}>
                          <Ionicons
                            name="star"
                            size={11}
                            color={colors.accent}
                          />
                          <Text style={homeStyles.produkRatingText}>
                            {p.rating}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </>
          )}

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
                    : showDialog({
                        title: m.label,
                        message: `Fitur ${m.label} akan tersedia pada modul berikutnya.`,
                        icon: "construct-outline",
                      })
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
