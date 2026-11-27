import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { PRODUK, rupiah } from "@/data/minimarket";
import { tabStyles } from "@/styles/tabStyles";
import { colors } from "@/styles/theme";

/** Data contoh penjualan per hari (dalam ribuan rupiah). */
const PENJUALAN_HARIAN = [
  { hari: "Sen", nilai: 1180 },
  { hari: "Sel", nilai: 1460 },
  { hari: "Rab", nilai: 990 },
  { hari: "Kam", nilai: 1720 },
  { hari: "Jum", nilai: 2040 },
  { hari: "Sab", nilai: 2610 },
  { hari: "Min", nilai: 1850 },
];

const PERIODE = ["7 hari", "30 hari", "Bulan ini"] as const;
type Periode = (typeof PERIODE)[number];

const FAKTOR: Record<Periode, number> = {
  "7 hari": 1,
  "30 hari": 4.2,
  "Bulan ini": 3.6,
};

export default function ReportScreen() {
  const [periode, setPeriode] = useState<Periode>("7 hari");
  const [barAktif, setBarAktif] = useState<string | null>(null);

  const maxNilai = Math.max(...PENJUALAN_HARIAN.map((d) => d.nilai));
  const totalMinggu = PENJUALAN_HARIAN.reduce((s, d) => s + d.nilai, 0);
  const totalPeriode = totalMinggu * FAKTOR[periode];

  const terlaris = useMemo(
    () => [...PRODUK].sort((a, b) => b.terjual - a.terjual).slice(0, 4),
    [],
  );

  const barTerpilih = PENJUALAN_HARIAN.find((d) => d.hari === barAktif);

  return (
    <SafeAreaView style={tabStyles.screenContainer} edges={["top"]}>
      <ScrollView
        style={tabStyles.screenContainer}
        contentContainerStyle={tabStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={tabStyles.pageIntro}>
          <View style={tabStyles.introAccent} />
          <Text style={tabStyles.pageTitle}>Laporan Penjualan</Text>
          <Text style={tabStyles.pageSubtitle}>
            Ringkasan performa toko pada periode terpilih.
          </Text>
        </View>

        <View style={{ flexDirection: "row", gap: 8 }}>
          {PERIODE.map((p) => {
            const on = p === periode;
            return (
              <TouchableOpacity
                key={p}
                onPress={() => setPeriode(p)}
                activeOpacity={0.75}
                style={{
                  flex: 1,
                  height: 36,
                  alignItems: "center",
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
                  {p}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={tabStyles.statGrid}>
          <View style={tabStyles.statCard}>
            <Text style={tabStyles.statLabel}>Omset {periode}</Text>
            <Text style={tabStyles.statValue}>
              Rp {(totalPeriode / 1000).toLocaleString("id-ID")} jt
            </Text>
            <Text style={tabStyles.statDelta}>+12% dari periode lalu</Text>
          </View>
          <View style={[tabStyles.statCard, tabStyles.statCardAccent]}>
            <Text style={[tabStyles.statLabel, tabStyles.statLabelOnDark]}>
              Omset hari ini
            </Text>
            <Text style={[tabStyles.statValue, tabStyles.statValueOnDark]}>
              Rp 1,85 jt
            </Text>
            <Text style={[tabStyles.statDelta, { color: colors.accent }]}>
              24 nota
            </Text>
          </View>
        </View>

        <View style={tabStyles.card}>
          <View style={tabStyles.cardHeaderRow}>
            <Text style={tabStyles.sectionTitle}>Tren Harian</Text>
            <View style={tabStyles.badgeBlue}>
              <Ionicons name="trending-up" size={12} color={colors.primary} />
              <Text style={tabStyles.badgeBlueText}>7 hari</Text>
            </View>
          </View>

          <View style={tabStyles.chartRow}>
            {PENJUALAN_HARIAN.map((d) => {
              const height = Math.max(8, (d.nilai / maxNilai) * 96);
              const peak = d.nilai === maxNilai;
              const aktif = d.hari === barAktif;
              return (
                <TouchableOpacity
                  key={d.hari}
                  activeOpacity={0.7}
                  onPress={() => setBarAktif(aktif ? null : d.hari)}
                  style={tabStyles.chartBarWrap}
                >
                  <View
                    style={[
                      tabStyles.chartBar,
                      { height },
                      peak && tabStyles.chartBarPeak,
                      aktif && { backgroundColor: colors.accent },
                    ]}
                  />
                  <Text
                    style={[
                      tabStyles.chartLabel,
                      aktif && { color: colors.ink, fontWeight: "800" },
                    ]}
                  >
                    {d.hari}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text
            style={{
              fontSize: 11.5,
              color: colors.inkMuted,
              marginTop: 10,
              textAlign: "center",
            }}
          >
            {barTerpilih
              ? `${barTerpilih.hari}: ${rupiah(barTerpilih.nilai * 1000)}`
              : "Ketuk batang untuk melihat nilai harian"}
          </Text>
        </View>

        <View style={tabStyles.card}>
          <View style={tabStyles.cardHeaderRow}>
            <Text style={tabStyles.sectionTitle}>Produk Terlaris</Text>
            <View style={tabStyles.badgeAccent}>
              <Ionicons name="flame" size={12} color={colors.accentInk} />
              <Text style={tabStyles.badgeAccentText}>Top 4</Text>
            </View>
          </View>

          {terlaris.map((p, i) => (
            <TouchableOpacity
              key={p.id}
              activeOpacity={0.7}
              onPress={() => router.push(`/produk/${p.id}` as never)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 11,
                paddingVertical: 9,
                borderTopWidth: i === 0 ? 0 : 1,
                borderTopColor: colors.border,
              }}
            >
              <Text style={[tabStyles.chartLabel, { width: 16 }]}>
                {i + 1}
              </Text>
              <Text
                style={[tabStyles.listItemTitle, { flex: 1 }]}
                numberOfLines={1}
              >
                {p.nama}
              </Text>
              <Text style={tabStyles.listItemMeta}>{p.terjual} terjual</Text>
              <Ionicons
                name="chevron-forward"
                size={14}
                color={colors.inkFaint}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
