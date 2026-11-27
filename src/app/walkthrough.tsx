import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors, radius, shadow } from "@/styles/theme";

const KEY_WALKTHROUGH = "@minimarketapp_walkthrough_done";

type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

type Slide = {
  key: string;
  judul: string;
  subjudul: string;
  deskripsi: string;
  icon: IoniconName;
  warna: string;
  bg: string;
  border: string;
  poin: { icon: IoniconName; teks: string }[];
};

const SLIDES: Slide[] = [
  {
    key: "kasir",
    judul: "Kelola toko dari satu aplikasi",
    subjudul: "Minimarket · Kasir",
    deskripsi:
      "Catat penjualan, pantau stok, dan lihat laporan tanpa buku catatan manual.",
    icon: "storefront-outline",
    warna: colors.primary,
    bg: colors.primarySoft,
    border: colors.primarySoftBorder,
    poin: [
      { icon: "cart-outline", teks: "Transaksi kasir dan riwayat nota" },
      { icon: "cube-outline", teks: "Katalog produk beserta stok" },
      { icon: "bar-chart-outline", teks: "Laporan omset harian" },
    ],
  },
  {
    key: "stok",
    judul: "Stok menipis langsung terlihat",
    subjudul: "Inventaris",
    deskripsi:
      "Produk dengan stok di bawah sepuluh ditandai otomatis agar tidak kehabisan saat ramai pembeli.",
    icon: "layers-outline",
    warna: colors.accentInk,
    bg: colors.accentSoft,
    border: colors.accentSoftBorder,
    poin: [
      { icon: "alert-circle-outline", teks: "Penanda stok tipis" },
      { icon: "pricetag-outline", teks: "Harga jual dan harga promo" },
      { icon: "search-outline", teks: "Pencarian produk cepat" },
    ],
  },
  {
    key: "akun",
    judul: "Profil aman, foto bisa diganti",
    subjudul: "Akun pengelola",
    deskripsi:
      "Masuk dengan token yang tersimpan aman. Ganti foto profil dari kamera atau galeri, otomatis dioptimasi.",
    icon: "shield-checkmark-outline",
    warna: colors.mint,
    bg: colors.mintSoft,
    border: colors.mintSoftBorder,
    poin: [
      { icon: "lock-closed-outline", teks: "Kata sandi terenkripsi" },
      { icon: "camera-outline", teks: "Foto dari kamera atau galeri" },
      { icon: "image-outline", teks: "Dikompres ke WebP otomatis" },
    ],
  },
];

export async function sudahLihatWalkthrough(): Promise<boolean> {
  return (await AsyncStorage.getItem(KEY_WALKTHROUGH)) === "1";
}

export default function WalkthroughScreen() {
  const { height } = Dimensions.get("window");
  // Layar pendek memakai ukuran ringkas agar semua poin tetap terlihat.
  const ringkas = height < 720;
  const ukuranIlustrasi = ringkas ? 124 : 164;
  const ukuranIkon = ringkas ? 58 : 76;

  const [aktif, setAktif] = useState(0);

  const s = SLIDES[aktif];
  const terakhir = aktif === SLIDES.length - 1;

  const selesai = async () => {
    await AsyncStorage.setItem(KEY_WALKTHROUGH, "1");
    router.replace("/login");
  };

  const lanjut = () => {
    if (terakhir) selesai();
    else setAktif(aktif + 1);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.surface }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 18,
          paddingTop: 6,
        }}
      >
        <Text
          style={{
            fontSize: 12,
            fontWeight: "700",
            color: colors.inkFaint,
          }}
        >
          {aktif + 1} dari {SLIDES.length}
        </Text>
        <TouchableOpacity
          onPress={selesai}
          accessibilityLabel="Lewati perkenalan"
          style={{ paddingVertical: 6, paddingHorizontal: 4 }}
        >
          <Text
            style={{
              fontSize: 12.5,
              fontWeight: "700",
              color: colors.inkMuted,
            }}
          >
            Lewati
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 26,
          paddingTop: 6,
          paddingBottom: 18,
          flexGrow: 1,
          justifyContent: "center",
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Ilustrasi */}
        <View
          style={{
            width: ukuranIlustrasi,
            height: ukuranIlustrasi,
            borderRadius: 42,
            backgroundColor: s.bg,
            borderWidth: 1,
            borderColor: s.border,
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
            marginBottom: ringkas ? 16 : 28,
            ...shadow.soft,
          }}
        >
          <View
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              width: 20,
              height: 20,
              borderRadius: 10,
              backgroundColor: colors.surface,
              opacity: 0.9,
            }}
          />
          <View
            style={{
              position: "absolute",
              bottom: 20,
              left: 18,
              width: 13,
              height: 13,
              borderRadius: 7,
              backgroundColor: colors.surface,
              opacity: 0.75,
            }}
          />
          <Ionicons name={s.icon} size={ukuranIkon} color={s.warna} />
        </View>

        <View
          style={{
            alignSelf: "flex-start",
            backgroundColor: s.bg,
            borderWidth: 1,
            borderColor: s.border,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: radius.pill,
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              fontSize: 10.5,
              fontWeight: "800",
              letterSpacing: 1,
              textTransform: "uppercase",
              color: s.warna,
            }}
          >
            {s.subjudul}
          </Text>
        </View>

        <Text
          style={{
            fontSize: ringkas ? 21 : 25,
            fontWeight: "800",
            color: colors.ink,
            letterSpacing: -0.7,
            lineHeight: ringkas ? 27 : 31,
          }}
        >
          {s.judul}
        </Text>

        <Text
          style={{
            fontSize: 13,
            color: colors.inkMuted,
            lineHeight: 19,
            marginTop: 8,
          }}
        >
          {s.deskripsi}
        </Text>

        <View style={{ gap: ringkas ? 6 : 9, marginTop: ringkas ? 14 : 20 }}>
          {s.poin.map((p) => (
            <View
              key={p.teks}
              style={{ flexDirection: "row", alignItems: "center", gap: 9 }}
            >
              <View
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 8,
                  backgroundColor: s.bg,
                  borderWidth: 1,
                  borderColor: s.border,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name={p.icon} size={14} color={s.warna} />
              </View>
              <Text
                style={{
                  flex: 1,
                  fontSize: 12.5,
                  fontWeight: "600",
                  color: colors.ink,
                }}
              >
                {p.teks}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={{ paddingHorizontal: 26, paddingBottom: 22 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 7,
            marginBottom: 18,
          }}
        >
          {SLIDES.map((item, i) => (
            <TouchableOpacity
              key={item.key}
              onPress={() => setAktif(i)}
              accessibilityLabel={`Slide ${i + 1}`}
              style={{
                width: i === aktif ? 22 : 7,
                height: 7,
                borderRadius: 4,
                backgroundColor:
                  i === aktif ? colors.primary : colors.border,
              }}
            />
          ))}
        </View>

        <View style={{ flexDirection: "row", gap: 10 }}>
          {aktif > 0 && (
            <TouchableOpacity
              onPress={() => setAktif(aktif - 1)}
              accessibilityLabel="Kembali ke slide sebelumnya"
              style={{
                width: 54,
                height: 54,
                borderRadius: radius.md,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.surfaceMuted,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="arrow-back" size={19} color={colors.ink} />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={lanjut}
            activeOpacity={0.85}
            accessibilityLabel={
              terakhir ? "Mulai gunakan aplikasi" : "Lanjut ke slide berikutnya"
            }
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              height: 54,
              borderRadius: radius.md,
              backgroundColor: colors.primary,
              ...shadow.primary,
            }}
          >
            <Text
              style={{
                fontSize: 15.5,
                fontWeight: "800",
                color: colors.inkOnDark,
              }}
            >
              {terakhir ? "Mulai sekarang" : "Lanjut"}
            </Text>
            <Ionicons
              name={terakhir ? "checkmark" : "arrow-forward"}
              size={18}
              color={colors.inkOnDark}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
