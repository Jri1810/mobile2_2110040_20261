import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export interface CapturedPhoto {
  uri: string;
  fileName: string;
  mimeType: string;
  fileSize?: number;
}

interface CameraCaptureModalProps {
  visible: boolean;
  onClose: () => void;
  onCaptured: (photo: CapturedPhoto) => void;
}

export default function CameraCaptureModal({
  visible,
  onClose,
  onCaptured,
}: CameraCaptureModalProps) {
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [ready, setReady] = useState(false);
  const [capturing, setCapturing] = useState(false);

  const handleClose = () => {
    setReady(false);
    onClose();
  };

  const handleCapture = async () => {
    if (!cameraRef.current || !ready || capturing) return;

    setCapturing(true);
    try {
      const picture = await cameraRef.current.takePictureAsync({ quality: 0.8 });
      if (!picture?.uri) return;

      const format = picture.format === "png" ? "png" : "jpg";
      const mimeType = format === "png" ? "image/png" : "image/jpeg";
      const base64 = picture.uri.startsWith("data:")
        ? picture.uri.split(",")[1] ?? ""
        : "";

      onCaptured({
        uri: picture.uri,
        fileName: `kamera_${Date.now()}.${format}`,
        mimeType,
        fileSize: base64 ? Math.ceil((base64.length * 3) / 4) : undefined,
      });
    } catch (error) {
      Alert.alert(
        "Kamera Gagal",
        error instanceof Error
          ? error.message
          : "Tidak dapat mengambil foto dari kamera.",
      );
    } finally {
      setCapturing(false);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={handleClose}
      statusBarTranslucent
    >
      <View style={styles.container}>
        {permission?.granted ? (
          <CameraView
            ref={cameraRef}
            style={StyleSheet.absoluteFill}
            facing="front"
            mirror
            onCameraReady={() => setReady(true)}
            onMountError={({ message }) => {
              Alert.alert(
                "Kamera Tidak Tersedia",
                message ||
                  "Periksa izin kamera. Untuk webcam laptop, buka Expo Web lewat http://localhost:8081.",
              );
              handleClose();
            }}
          />
        ) : (
          <View style={styles.permissionBox}>
            {permission === null ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <>
                <Ionicons name="camera-outline" size={48} color="#93C5FD" />
                <Text style={styles.permissionTitle}>
                  Akses Kamera Diperlukan
                </Text>
                <Text style={styles.permissionText}>
                  Izinkan aplikasi memakai kamera depan untuk mengambil foto
                  profil.
                </Text>
                <TouchableOpacity
                  style={styles.permissionButton}
                  activeOpacity={0.85}
                  onPress={requestPermission}
                >
                  <Text style={styles.permissionButtonText}>
                    Izinkan Kamera
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        )}

        <TouchableOpacity
          style={styles.closeButton}
          activeOpacity={0.8}
          onPress={handleClose}
        >
          <Ionicons name="close" size={26} color="#FFFFFF" />
        </TouchableOpacity>

        {permission?.granted && (
          <View style={styles.bottomBar}>
            <TouchableOpacity
              style={styles.shutterOuter}
              activeOpacity={0.8}
              disabled={!ready || capturing}
              onPress={handleCapture}
            >
              {capturing ? (
                <ActivityIndicator color="#0F172A" />
              ) : (
                <View style={styles.shutterInner} />
              )}
            </TouchableOpacity>
            <Text style={styles.hint}>
              Kamera depan {"\u2022"} Sentuh tombol untuk memotret
            </Text>
          </View>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
  },
  closeButton: {
    position: "absolute",
    top: 48,
    right: 20,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(15, 23, 42, 0.55)",
    alignItems: "center",
    justifyContent: "center",
  },
  permissionBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 28,
    gap: 10,
  },
  permissionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  permissionText: {
    fontSize: 13.5,
    color: "#CBD5E1",
    textAlign: "center",
    lineHeight: 20,
  },
  permissionButton: {
    marginTop: 8,
    backgroundColor: "#2563EB",
    borderRadius: 12,
    paddingHorizontal: 24,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
  },
  permissionButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 18,
    paddingBottom: 34,
    paddingHorizontal: 24,
    alignItems: "center",
    gap: 10,
    backgroundColor: "rgba(15, 23, 42, 0.55)",
  },
  shutterOuter: {
    width: 74,
    height: 74,
    borderRadius: 37,
    borderWidth: 4,
    borderColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  shutterInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FFFFFF",
  },
  hint: {
    fontSize: 12,
    color: "#E2E8F0",
  },
});
