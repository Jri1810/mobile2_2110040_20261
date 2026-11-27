import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { showDialog } from "@/components/dialog";
import { rupiah } from "@/data/minimarket";
import { tabStyles } from "@/styles/tabStyles";
import { colors } from "@/styles/theme";

type Transaksi = {
  id: string;
  item: string;
  waktu: string;
  total: number;
  metode: "Tunai" | "QRIS";
  rincian: { nama: string; qty: number; harga: number }[];
};

const DUMMY_TRANSAKSI: Transaksi[] = [
  {
    id: "TRX-001",
    item: "3 item belanja",
    waktu: "10:15",
    total: 128000,
    metode: "Tunai",
    rincian: [
      { nama: "Minyak Goreng 2L", qty: 2, harga: 32000 },
      { nama: "Gula Pasir 1kg", qty: 1, harga: 17500 },
      { nama: "Kopi Sachet 10x", qty: 2, harga: 13500 },
      { nama: "Air Mineral 600ml", qty: 3, harga: 4000 },
    ],
  },
  {
    id: "TRX-002",
    item: "5 item belanja",
    waktu: "11:02",
    total: 214500,
    metode: "QRIS",
    rincian: [
      { nama: "Beras Premium 5kg", qty: 2, harga: 68000 },
      { nama: "Telur Ayam 1kg", qty: 2, harga: 29500 },
      { nama: "Keripik Singkong", qty: 2, harga: 9500 },
    ],
  },
  {
    id: "TRX-003",
    item: "2 item belanja",
    waktu: "11:46",
    total: 47500,
    metode: "Tunai",
    rincian: [
      { nama: "Telur Ayam 1kg", qty: 1, harga: 29500 },
      { nama: "Sabun Mandi 100g", qty: 1, harga: 6500 },
      { nama: "Air Mineral 600ml", qty: 2, harga: 4000 },
    ],
  },
];

export default function TransaksiScreen() {
  const [detail, setDetail] = useState<Transaksi | null>(null);

  const totalNota = DUMMY_TRANSAKSI.length;
  const totalNilai = DUMMY_TRANSAKSI.reduce((s, t) => s + t.total, 0);

  return (
    <SafeAreaView style={tabStyles.screenContainer} edges={["top"]}>
      <ScrollView
        style={tabStyles.screenContainer}
        contentContainerStyle={tabStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={tabStyles.pageIntro}>
          <View style={tabStyles.introAccent} />
          <Text style={tabStyles.pageTitle}>Transaksi Kasir</Text>
          <Text style={tabStyles.pageSubtitle}>
            {totalNota} nota tercatat hari ini dengan total{" "}
            {rupiah(totalNilai)}.
          </Text>
        </View>

        <View style={tabStyles.statGrid}>
          <View style={tabStyles.statCard}>
            <Text style={tabStyles.statLabel}>Total nota</Text>
            <Text style={tabStyles.statValue}>{totalNota}</Text>
          </View>
          <View style={[tabStyles.statCard, tabStyles.statCardAccent]}>
            <Text style={[tabStyles.statLabel, tabStyles.statLabelOnDark]}>
              Nilai transaksi
            </Text>
            <Text style={[tabStyles.statValue, tabStyles.statValueOnDark]}>
              {rupiah(totalNilai)}
            </Text>
          </View>
        </View>

        <View style={tabStyles.listGroup}>
          {DUMMY_TRANSAKSI.map((trx, index) => (
            <TouchableOpacity
              key={trx.id}
              activeOpacity={0.7}
              onPress={() => setDetail(trx)}
              style={[
                tabStyles.listRow,
                index === 0 && tabStyles.listRowFirst,
              ]}
            >
              <View style={tabStyles.listItemLeft}>
                <View style={tabStyles.iconBox}>
                  <Ionicons
                    name="receipt-outline"
                    size={18}
                    color={colors.violet}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={tabStyles.listItemTitle}>{trx.id}</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 6,
                      marginTop: 4,
                    }}
                  >
                    <Text style={tabStyles.listItemMeta}>{trx.waktu} WIB</Text>
                    <Text style={tabStyles.listItemMeta}>·</Text>
                    <Text style={tabStyles.listItemMeta}>{trx.item}</Text>
                  </View>
                </View>
              </View>

              <View style={{ alignItems: "flex-end", gap: 4 }}>
                <Text style={tabStyles.listItemPrice}>{rupiah(trx.total)}</Text>
                <View
                  style={[
                    tabStyles.stockPill,
                    trx.metode === "QRIS" && tabStyles.stockPillLow,
                  ]}
                >
                  <Text
                    style={[
                      tabStyles.stockPillText,
                      trx.metode === "QRIS" && tabStyles.stockPillLowText,
                    ]}
                  >
                    {trx.metode}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() =>
            showDialog({
              title: "Buat transaksi baru",
              message:
                "Keranjang kasir akan tersedia pada modul praktikum berikutnya.",
              icon: "cart-outline",
            })
          }
          style={tabStyles.saveButton}
        >
          <Ionicons name="add-circle-outline" size={18} color={colors.inkOnDark} />
          <Text style={tabStyles.saveButtonText}>Transaksi Baru</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Rincian nota */}
      <Modal
        visible={Boolean(detail)}
        transparent
        animationType="fade"
        onRequestClose={() => setDetail(null)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(15,27,45,0.45)",
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              backgroundColor: colors.surface,
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              padding: 18,
              paddingBottom: 26,
              gap: 12,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text style={{ fontSize: 16, fontWeight: "800", color: colors.ink }}>
                  {detail?.id}
                </Text>
                <Text style={{ fontSize: 11.5, color: colors.inkMuted, marginTop: 2 }}>
                  {detail?.waktu} WIB · {detail?.metode}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setDetail(null)}
                accessibilityLabel="Tutup rincian"
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 999,
                  backgroundColor: colors.surfaceMuted,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="close" size={18} color={colors.ink} />
              </TouchableOpacity>
            </View>

            {detail?.rincian.map((r, i) => (
              <View
                key={r.nama}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                  paddingVertical: 8,
                  borderTopWidth: i === 0 ? 0 : 1,
                  borderTopColor: colors.border,
                }}
              >
                <Text
                  style={{
                    flex: 1,
                    fontSize: 12.5,
                    fontWeight: "700",
                    color: colors.ink,
                  }}
                  numberOfLines={1}
                >
                  {r.nama}
                </Text>
                <Text style={{ fontSize: 11.5, color: colors.inkMuted }}>
                  {r.qty}×
                </Text>
                <Text
                  style={{
                    fontSize: 12.5,
                    fontWeight: "800",
                    color: colors.ink,
                    fontVariant: ["tabular-nums"],
                  }}
                >
                  {rupiah(r.harga * r.qty)}
                </Text>
              </View>
            ))}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                borderTopWidth: 1,
                borderTopColor: colors.borderStrong,
                paddingTop: 12,
              }}
            >
              <Text style={{ fontSize: 13, fontWeight: "800", color: colors.ink }}>
                Total
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "800",
                  color: colors.primary,
                  fontVariant: ["tabular-nums"],
                }}
              >
                {rupiah(detail?.total ?? 0)}
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
