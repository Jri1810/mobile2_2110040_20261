import { Ionicons } from "@expo/vector-icons";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { tabStyles } from "@/styles/tabStyles";
import { colors } from "@/styles/theme";

type Transaksi = {
  id: string;
  item: string;
  waktu: string;
  total: number;
  metode: "Tunai" | "QRIS";
};

const DUMMY_TRANSAKSI: Transaksi[] = [
  {
    id: "TRX-001",
    item: "3 item belanja",
    waktu: "10:15",
    total: 128000,
    metode: "Tunai",
  },
  {
    id: "TRX-002",
    item: "5 item belanja",
    waktu: "11:02",
    total: 214500,
    metode: "QRIS",
  },
  {
    id: "TRX-003",
    item: "2 item belanja",
    waktu: "11:46",
    total: 47500,
    metode: "Tunai",
  },
];

const rupiah = (value: number) =>
  "Rp " + value.toLocaleString("id-ID", { maximumFractionDigits: 0 });

export default function TransaksiScreen() {
  const totalNota = DUMMY_TRANSAKSI.length;
  const totalNilai = DUMMY_TRANSAKSI.reduce((sum, t) => sum + t.total, 0);

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

        <View style={tabStyles.listGroup}>
          {DUMMY_TRANSAKSI.map((trx, index) => (
            <View
              key={trx.id}
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
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
