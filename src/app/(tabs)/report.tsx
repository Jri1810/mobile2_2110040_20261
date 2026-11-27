import { Ionicons } from "@expo/vector-icons";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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

const PRODUK_TERLARIS = [
  { nama: "Minyak Goreng 2L", terjual: 32 },
  { nama: "Beras Premium 5kg", terjual: 24 },
  { nama: "Gula Pasir 1kg", terjual: 19 },
];

export default function ReportScreen() {
  const maxNilai = Math.max(...PENJUALAN_HARIAN.map((d) => d.nilai));
  const totalMinggu = PENJUALAN_HARIAN.reduce((s, d) => s + d.nilai, 0);

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
          Ringkasan performa toko selama tujuh hari terakhir.
        </Text>
      </View>

      <View style={tabStyles.statGrid}>
        <View style={tabStyles.statCard}>
          <Text style={tabStyles.statLabel}>Omset minggu ini</Text>
          <Text style={tabStyles.statValue}>
            Rp {(totalMinggu / 1000).toLocaleString("id-ID")} jt
          </Text>
          <Text style={tabStyles.statDelta}>+12% dari pekan lalu</Text>
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
            return (
              <View key={d.hari} style={tabStyles.chartBarWrap}>
                <View
                  style={[
                    tabStyles.chartBar,
                    { height },
                    peak && tabStyles.chartBarPeak,
                  ]}
                />
                <Text style={tabStyles.chartLabel}>{d.hari}</Text>
              </View>
            );
          })}
        </View>
      </View>

      <View style={tabStyles.card}>
        <View style={tabStyles.cardHeaderRow}>
          <Text style={tabStyles.sectionTitle}>Produk Terlaris</Text>
          <View style={tabStyles.badgeAccent}>
            <Ionicons name="flame" size={12} color={colors.accentInk} />
            <Text style={tabStyles.badgeAccentText}>Top 3</Text>
          </View>
        </View>

        {PRODUK_TERLARIS.map((p, i) => (
          <View
            key={p.nama}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 11,
              paddingVertical: 9,
              borderTopWidth: i === 0 ? 0 : 1,
              borderTopColor: colors.border,
            }}
          >
            <Text style={[tabStyles.chartLabel, { width: 16 }]}>{i + 1}</Text>
            <Text style={[tabStyles.listItemTitle, { flex: 1 }]} numberOfLines={1}>
              {p.nama}
            </Text>
            <Text style={tabStyles.listItemMeta}>{p.terjual} terjual</Text>
          </View>
        ))}
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}
