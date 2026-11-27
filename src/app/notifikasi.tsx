import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { NOTIFIKASI, type Notifikasi } from "@/data/minimarket";
import { tabStyles } from "@/styles/tabStyles";
import { colors } from "@/styles/theme";

export default function NotifikasiScreen() {
  const [dibaca, setDibaca] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(NOTIFIKASI.map((n) => [n.id, n.dibaca])),
  );

  const belumDibaca = useMemo(
    () => NOTIFIKASI.filter((n) => !dibaca[n.id]).length,
    [dibaca],
  );

  const tandaiSemua = () =>
    setDibaca(Object.fromEntries(NOTIFIKASI.map((n) => [n.id, true])));

  return (
    <SafeAreaView style={tabStyles.screenContainer} edges={["top"]}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          paddingHorizontal: 18,
          paddingTop: 4,
          paddingBottom: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            width: 40,
            height: 40,
            borderRadius: 999,
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.border,
            alignItems: "center",
            justifyContent: "center",
          }}
          accessibilityLabel="Kembali"
        >
          <Ionicons name="arrow-back" size={19} color={colors.ink} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={tabStyles.pageTitle}>Notifikasi</Text>
          <Text style={tabStyles.pageSubtitle}>
            {belumDibaca > 0
              ? `${belumDibaca} pemberitahuan belum dibaca`
              : "Semua pemberitahuan sudah dibaca"}
          </Text>
        </View>
        {belumDibaca > 0 && (
          <TouchableOpacity onPress={tandaiSemua}>
            <Text style={{ fontSize: 12, fontWeight: "800", color: colors.primary }}>
              Tandai dibaca
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        style={tabStyles.screenContainer}
        contentContainerStyle={{ paddingHorizontal: 18, paddingBottom: 28, gap: 10 }}
        showsVerticalScrollIndicator={false}
      >
        {NOTIFIKASI.map((n) => (
          <NotifRow
            key={n.id}
            n={n}
            dibaca={dibaca[n.id]}
            onPress={() =>
              setDibaca((prev) => ({ ...prev, [n.id]: true }))
            }
          />
        ))}

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 7,
            paddingHorizontal: 2,
            marginTop: 6,
          }}
        >
          <Ionicons
            name="information-circle-outline"
            size={14}
            color={colors.inkFaint}
          />
          <Text style={{ flex: 1, fontSize: 11, color: colors.inkFaint, lineHeight: 16 }}>
            Notifikasi ini masih berupa data contoh untuk keperluan praktikum.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function NotifRow({
  n,
  dibaca,
  onPress,
}: {
  n: Notifikasi;
  dibaca: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={{
        flexDirection: "row",
        gap: 12,
        padding: 14,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: dibaca ? colors.border : colors.primarySoftBorder,
        backgroundColor: dibaca ? colors.surface : colors.primarySoft,
      }}
    >
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 14,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: n.bg,
          borderWidth: 1,
          borderColor: n.border,
        }}
      >
        <Ionicons name={n.icon} size={19} color={n.warna} />
      </View>

      <View style={{ flex: 1 }}>
        <View
          style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
        >
          <Text
            style={{
              flex: 1,
              fontSize: 13.5,
              fontWeight: "800",
              color: colors.ink,
            }}
            numberOfLines={1}
          >
            {n.judul}
          </Text>
          {!dibaca && (
            <View
              style={{
                width: 7,
                height: 7,
                borderRadius: 4,
                backgroundColor: colors.primary,
              }}
            />
          )}
        </View>
        <Text
          style={{
            fontSize: 12,
            color: colors.inkMuted,
            lineHeight: 17,
            marginTop: 3,
          }}
        >
          {n.pesan}
        </Text>
        <Text
          style={{
            fontSize: 10.5,
            color: colors.inkFaint,
            marginTop: 5,
            fontWeight: "600",
          }}
        >
          {n.waktu}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
