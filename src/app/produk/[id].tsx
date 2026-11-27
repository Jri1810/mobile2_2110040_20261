import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { showDialog } from "@/components/dialog";
import {
  diskonPersen,
  PRODUK,
  rupiah,
  STOK_MENIPIS,
} from "@/data/minimarket";
import { tabStyles } from "@/styles/tabStyles";
import { colors } from "@/styles/theme";

export default function DetailProdukScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const produk = useMemo(
    () => PRODUK.find((p) => p.id === String(id)),
    [id],
  );
  const [qty, setQty] = useState(1);

  if (!produk) {
    return (
      <SafeAreaView style={tabStyles.screenContainer} edges={["top"]}>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 12, padding: 24 }}>
          <Ionicons name="cube-outline" size={44} color={colors.inkFaint} />
          <Text style={tabStyles.pageTitle}>Produk tidak ditemukan</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={{ fontSize: 13, fontWeight: "800", color: colors.primary }}>
              Kembali ke katalog
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const diskon = diskonPersen(produk);
  const low = produk.stok < STOK_MENIPIS;

  const tambah = () => {
    if (qty < produk.stok) setQty(qty + 1);
    else
      showDialog({
        title: "Stok terbatas",
        message: `Hanya tersedia ${produk.stok} ${produk.satuan}.`,
        icon: "alert-circle-outline",
        iconColor: colors.accentInk,
      });
  };
  const kurang = () => setQty(Math.max(1, qty - 1));

  return (
    <SafeAreaView style={tabStyles.screenContainer} edges={["top"]}>
      <ScrollView
        style={tabStyles.screenContainer}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Sampul produk */}
        <View
          style={{
            height: 230,
            backgroundColor: produk.thumbBg,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name={produk.icon} size={88} color={colors.inkMuted} />
          <TouchableOpacity
            onPress={() => router.back()}
            accessibilityLabel="Kembali"
            style={{
              position: "absolute",
              top: 14,
              left: 18,
              width: 40,
              height: 40,
              borderRadius: 999,
              backgroundColor: "rgba(255,255,255,0.9)",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name="arrow-back" size={19} color={colors.ink} />
          </TouchableOpacity>
          {diskon && (
            <View
              style={{
                position: "absolute",
                top: 14,
                right: 18,
                backgroundColor: colors.coral,
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 999,
              }}
            >
              <Text style={{ fontSize: 11, fontWeight: "800", color: "#fff" }}>
                Hemat {diskon}
              </Text>
            </View>
          )}
        </View>

        <View style={{ padding: 18, gap: 14 }}>
          <View>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <View style={tabStyles.badgeBlue}>
                <Text style={tabStyles.badgeBlueText}>{produk.kategori}</Text>
              </View>
              <View
                style={[
                  tabStyles.stockPill,
                  low && tabStyles.stockPillLow,
                ]}
              >
                <Text
                  style={[
                    tabStyles.stockPillText,
                    low && tabStyles.stockPillLowText,
                  ]}
                >
                  {low ? "Stok tipis" : "Stok aman"} · {produk.stok} {produk.satuan}
                </Text>
              </View>
            </View>

            <Text style={{ fontSize: 22, fontWeight: "800", color: colors.ink, letterSpacing: -0.6 }}>
              {produk.nama}
            </Text>

            <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginTop: 8 }}>
              <Ionicons name="star" size={14} color={colors.accent} />
              <Text style={{ fontSize: 12.5, fontWeight: "700", color: colors.inkMuted }}>
                {produk.rating} · {produk.terjual} terjual
              </Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 9, marginTop: 12 }}>
              <Text style={{ fontSize: 26, fontWeight: "800", color: colors.primary, fontVariant: ["tabular-nums"] }}>
                {rupiah(produk.harga)}
              </Text>
              {produk.hargaAsli && (
                <Text
                  style={{
                    fontSize: 13,
                    color: colors.inkFaint,
                    textDecorationLine: "line-through",
                    marginBottom: 4,
                    fontVariant: ["tabular-nums"],
                  }}
                >
                  {rupiah(produk.hargaAsli)}
                </Text>
              )}
            </View>
          </View>

          <View style={tabStyles.card}>
            <Text style={tabStyles.sectionTitle}>Deskripsi</Text>
            <Text style={{ fontSize: 12.5, color: colors.inkMuted, lineHeight: 19, marginTop: 6 }}>
              {produk.deskripsi}
            </Text>
          </View>

          <View style={tabStyles.card}>
            <Text style={tabStyles.sectionTitle}>Jumlah</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 14,
                marginTop: 10,
              }}
            >
              <TouchableOpacity
                onPress={kurang}
                accessibilityLabel="Kurangi jumlah"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: colors.border,
                  backgroundColor: colors.surfaceMuted,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="remove" size={20} color={colors.ink} />
              </TouchableOpacity>

              <Text style={{ fontSize: 18, fontWeight: "800", color: colors.ink, minWidth: 28, textAlign: "center" }}>
                {qty}
              </Text>

              <TouchableOpacity
                onPress={tambah}
                accessibilityLabel="Tambah jumlah"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: colors.border,
                  backgroundColor: colors.surfaceMuted,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="add" size={20} color={colors.ink} />
              </TouchableOpacity>

              <Text style={{ marginLeft: "auto", fontSize: 15, fontWeight: "800", color: colors.ink, fontVariant: ["tabular-nums"] }}>
                {rupiah(produk.harga * qty)}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bilah aksi bawah: ikut layout, bukan absolute, agar tidak menutupi isi */}
      <View
        style={{
          padding: 14,
          paddingBottom: 18,
          backgroundColor: colors.surface,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          flexDirection: "row",
          gap: 10,
        }}
      >
        <TouchableOpacity
          onPress={() =>
            showDialog({
              title: "Tambah ke keranjang",
              message:
                "Keranjang kasir akan tersedia pada modul praktikum berikutnya.",
              icon: "cart-outline",
            })
          }
          activeOpacity={0.85}
          style={[
            tabStyles.saveButton,
            { flex: 1, marginTop: 0 },
          ]}
        >
          <Ionicons name="cart-outline" size={18} color={colors.inkOnDark} />
          <Text style={tabStyles.saveButtonText}>
            Tambah · {rupiah(produk.harga * qty)}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
