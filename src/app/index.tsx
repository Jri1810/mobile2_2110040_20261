import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

import { sudahLihatWalkthrough } from "@/app/walkthrough";
import { getAuthSession } from "@/services/authService";
import { authStyles } from "@/styles/authStyles";
import { colors } from "@/styles/theme";

export default function Index() {
  const [checking, setChecking] = useState(true);
  const [tujuan, setTujuan] = useState<string>("/login");

  useEffect(() => {
    let alive = true;

    (async () => {
      // Perkenalan hanya tampil sekali, saat aplikasi pertama kali dibuka.
      const sudah = await sudahLihatWalkthrough();
      if (!alive) return;

      if (!sudah) {
        setTujuan("/walkthrough");
        setChecking(false);
        return;
      }

      const session = await getAuthSession();
      if (!alive) return;

      setTujuan(session?.token ? "/home" : "/login");
      setChecking(false);
    })();

    return () => {
      alive = false;
    };
  }, []);

  if (checking) {
    return (
      <View style={authStyles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return <Redirect href={tujuan as never} />;
}
