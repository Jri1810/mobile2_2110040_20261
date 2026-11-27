import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  diskonPersen,
  KATEGORI_FILTER,
  PRODUK,
  rupiah,
  STOK_MENIPIS,
} from "@/data/minimarket";
import { tabStyles } from "@/styles/tabStyles";
import { colors } from "@/styles/theme";

type FilterKategori = (typeof KATEGORI_FILTER)[number];

export default function ProdukScreen() {
  const params = useLocalSearchParams<{ kategori?: string }>();
  const awal = KATEGORI_FILTER.includes(
    String(params.kategori) as FilterKategori,
  )
    ? (String(params.kategori) as FilterKategori)
    : "Semua";

  const [aktif, setAktif] = useState<FilterKategori>(awal);

  const daftar = useMemo(
    () =>
      aktif === "Semua"
        ? PRODUK
        : PRODUK.filter((p) => p.kategori === aktif),
    [aktif],
  );

  const menipis = PRODUK.filter((p) => p.stok < STOK_MENIPIS).length;

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
            {PRODUK.length} jenis barang terdaftar, {menipis} perlu ditambah
            stoknya.
          </Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8, paddingRight: 4 }}
        >
          {KATEGORI_FILTER.map((k) => {
            const on = k === aktif;
            return (
              <TouchableOpacity
                key={k}
                activeOpacity={0.75}
                onPress={() => setAktif(k)}
                style={{
                  paddingHorizontal: 14,
                  height: 34,
                  justifyContent: "center",
                  borderRadius: 999,
                  backgroundColor: on ? colors.primary : colors.surface,
                  borderWidth: 1,
                  borderColor: on ? colors.primary : colors.border,
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "700",
                    color: on ? colors.inkOnDark : colors.inkMuted,
                  }}
                >
                  {k}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {daftar.length === 0 ? (
          <View
            style={{
              alignItems: "center",
              gap: 8,
              paddingVertical: 40,
            }}
          >
            <Ionicons name="cube-outline" size={38} color={colors.inkFaint} />
            <Text
              style={{
                fontSize: 13,
                fontWeight: "700",
                color: colors.ink,
              }}
            >
              Belum ada produk pada kategori ini
            </Text>
            <TouchableOpacity onPress={() => setAktif("Semua")}>
              <Text
                style={{
                  fontSize: 12.5,
                  fontWeight: "800",
                  color: colors.primary,
                }}
              >
                Tampilkan semua produk
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={tabStyles.produkGrid}>
            {daftar.map((item) => {
              const low = item.stok < STOK_MENIPIS;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={tabStyles.produkGridCard}
                  activeOpacity={0.85}
                  onPress={() => router.push(`/produk/${item.id}` as never)}
                >
                  <View
                    style={[
                      tabStyles.produkGridThumb,
                      { backgroundColor: item.thumbBg },
                    ]}
                  >
                    <Ionicons
                      name={item.icon}
                      size={34}
                      color={colors.inkMuted}
                    />
                    {diskonPersen(item) && (
                      <View style={tabStyles.produkGridBadge}>
                        <Text style={tabStyles.produkGridBadgeText}>
                          {diskonPersen(item)}
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
                      <Text style={tabStyles.produkGridMetaText}>
                        {item.rating}
                      </Text>
                      <Text style={tabStyles.produkGridMetaText}>
                        · {item.stok} {item.satuan}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
