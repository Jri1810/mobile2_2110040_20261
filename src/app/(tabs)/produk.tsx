import { Ionicons } from "@expo/vector-icons";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { tabStyles } from "@/styles/tabStyles";
import { colors } from "@/styles/theme";

type Produk = {
  id: string;
  nama: string;
  kategori: string;
  stok: number;
  harga: number;
  hargaAsli?: number;
  diskon?: string;
  rating: string;
  thumbBg: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
};

const KATEGORI = ["Semua", "Sembako", "Segar", "Kebersihan"];

const DUMMY_PRODUK: Produk[] = [
  {
    id: "1",
    nama: "Minyak Goreng 2L",
    kategori: "Sembako",
    stok: 45,
    harga: 32000,
    hargaAsli: 38000,
    diskon: "16%",
    rating: "4.8",
    thumbBg: "#FFF4DE",
    icon: "water-outline",
  },
  {
    id: "2",
    nama: "Beras Premium 5kg",
    kategori: "Sembako",
    stok: 18,
    harga: 68000,
    hargaAsli: 72500,
    diskon: "6%",
    rating: "4.9",
    thumbBg: "#E8EEFF",
    icon: "nutrition-outline",
  },
  {
    id: "3",
    nama: "Gula Pasir 1kg",
    kategori: "Sembako",
    stok: 30,
    harga: 17500,
    rating: "4.7",
    thumbBg: "#E6F8EF",
    icon: "flask-outline",
  },
  {
    id: "4",
    nama: "Telur Ayam 1kg",
    kategori: "Segar",
    stok: 7,
    harga: 29500,
    rating: "4.6",
    thumbBg: "#FEF3E7",
    icon: "egg-outline",
  },
  {
    id: "5",
    nama: "Sabun Mandi 100g",
    kategori: "Kebersihan",
    stok: 52,
    harga: 6500,
    rating: "4.8",
    thumbBg: "#F0ECFF",
    icon: "sparkles-outline",
  },
  {
    id: "6",
    nama: "Air Mineral 600ml",
    kategori: "Segar",
    stok: 88,
    harga: 4000,
    rating: "4.9",
    thumbBg: "#E4F5FE",
    icon: "water-outline",
  },
];

const rupiah = (value: number) =>
  "Rp " + value.toLocaleString("id-ID", { maximumFractionDigits: 0 });

const STOK_MENIPIS = 10;

export default function ProdukScreen() {
  const totalItem = DUMMY_PRODUK.length;
  const menipis = DUMMY_PRODUK.filter((p) => p.stok < STOK_MENIPIS).length;

  return (
    <SafeAreaView style={tabStyles.screenContainer} edges={["top"]}>
      <ScrollView
        style={tabStyles.screenContainer}
        contentContainerStyle={tabStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
      <View style={tabStyles.pageIntro}>
        <View style={tabStyles.introAccent} />
        <Text style={tabStyles.pageTitle}>Katalog Produk</Text>
        <Text style={tabStyles.pageSubtitle}>
          {totalItem} jenis barang terdaftar, {menipis} perlu ditambah stoknya.
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 8, paddingRight: 4 }}
      >
        {KATEGORI.map((k, i) => (
          <TouchableOpacity
            key={k}
            activeOpacity={0.75}
            style={{
              paddingHorizontal: 14,
              height: 34,
              justifyContent: "center",
              borderRadius: 999,
              backgroundColor: i === 0 ? colors.primary : colors.surface,
              borderWidth: 1,
              borderColor: i === 0 ? colors.primary : colors.border,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: "700",
                color: i === 0 ? colors.inkOnDark : colors.inkMuted,
              }}
            >
              {k}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={tabStyles.produkGrid}>
        {DUMMY_PRODUK.map((item) => {
          const low = item.stok < STOK_MENIPIS;
          return (
            <TouchableOpacity
              key={item.id}
              style={tabStyles.produkGridCard}
              activeOpacity={0.85}
            >
              <View
                style={[
                  tabStyles.produkGridThumb,
                  { backgroundColor: item.thumbBg },
                ]}
              >
                <Ionicons name={item.icon} size={34} color={colors.inkMuted} />
                {item.diskon && (
                  <View style={tabStyles.produkGridBadge}>
                    <Text style={tabStyles.produkGridBadgeText}>
                      {item.diskon}
                    </Text>
                  </View>
                )}
                {low && (
                  <View
                    style={[
                      tabStyles.produkGridBadge,
                      {
                        left: "auto",
                        right: 8,
                        backgroundColor: colors.accent,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        tabStyles.produkGridBadgeText,
                        { color: colors.accentInk },
                      ]}
                    >
                      Stok tipis
                    </Text>
                  </View>
                )}
              </View>

              <View style={tabStyles.produkGridBody}>
                <Text style={tabStyles.produkGridName} numberOfLines={2}>
                  {item.nama}
                </Text>
                <Text style={tabStyles.produkGridPrice}>
                  {rupiah(item.harga)}
                </Text>
                {item.hargaAsli && (
                  <Text style={tabStyles.produkGridOld}>
                    {rupiah(item.hargaAsli)}
                  </Text>
                )}
                <View style={tabStyles.produkGridMeta}>
                  <Ionicons name="star" size={11} color={colors.accent} />
                  <Text style={tabStyles.produkGridMetaText}>{item.rating}</Text>
                  <Text style={tabStyles.produkGridMetaText}>
                    · {item.stok} tersisa
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}
