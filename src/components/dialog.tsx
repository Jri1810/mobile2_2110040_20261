import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

import { colors, radius, shadow } from "@/styles/theme";

export type DialogOptions = {
  title: string;
  message?: string;
  icon?: React.ComponentProps<typeof Ionicons>["name"];
  iconColor?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
};

type State = (DialogOptions & { id: number }) | null;

let listener: ((s: State) => void) | null = null;
let counter = 0;

/**
 * Menampilkan dialog. Dipakai sebagai pengganti Alert.alert karena
 * Alert bawaan react-native-web tidak tampil di browser.
 */
export function showDialog(options: DialogOptions) {
  counter += 1;
  listener?.({ ...options, id: counter });
}

/** Dialog konfirmasi dengan dua tombol. */
export function confirmDialog(options: DialogOptions) {
  showDialog({
    cancelLabel: "Batal",
    confirmLabel: "Lanjutkan",
    ...options,
  });
}

export function DialogHost() {
  const [state, setState] = useState<State>(null);

  useEffect(() => {
    listener = setState;
    return () => {
      listener = null;
    };
  }, []);

  const close = () => setState(null);

  if (!state) return null;

  const handleConfirm = () => {
    const cb = state.onConfirm;
    close();
    cb?.();
  };

  const handleCancel = () => {
    const cb = state.onCancel;
    close();
    cb?.();
  };

  return (
    <Modal visible transparent animationType="fade" onRequestClose={handleCancel}>
      <Pressable style={styles.backdrop} onPress={handleCancel}>
        <Pressable style={styles.card} onPress={() => {}}>
          <View
            style={[
              styles.iconWrap,
              {
                backgroundColor: state.destructive
                  ? colors.dangerSoft
                  : colors.primarySoft,
                borderColor: state.destructive
                  ? colors.dangerSoftBorder
                  : colors.primarySoftBorder,
              },
            ]}
          >
            <Ionicons
              name={state.icon ?? "information-circle-outline"}
              size={22}
              color={
                state.destructive
                  ? colors.dangerInk
                  : (state.iconColor ?? colors.primary)
              }
            />
          </View>

          <Text style={styles.title}>{state.title}</Text>
          {state.message ? (
            <Text style={styles.message}>{state.message}</Text>
          ) : null}

          <View style={styles.actions}>
            {state.cancelLabel ? (
              <Pressable
                style={[styles.button, styles.cancelButton]}
                onPress={handleCancel}
              >
                <Text style={styles.cancelText}>{state.cancelLabel}</Text>
              </Pressable>
            ) : null}

            <Pressable
              style={[
                styles.button,
                styles.confirmButton,
                state.destructive && { backgroundColor: colors.danger },
              ]}
              onPress={handleConfirm}
            >
              <Text style={styles.confirmText}>
                {state.confirmLabel ?? "Mengerti"}
              </Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(15,27,45,0.45)",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  card: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: 20,
    gap: 12,
    ...shadow.lifted,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 16.5,
    fontWeight: "800",
    color: colors.ink,
    letterSpacing: -0.3,
  },
  message: {
    fontSize: 13,
    color: colors.inkMuted,
    lineHeight: 19,
    marginTop: -4,
  },
  actions: {
    flexDirection: "row",
    gap: 9,
    marginTop: 6,
  },
  button: {
    flex: 1,
    height: 46,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButton: {
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cancelText: {
    fontSize: 13.5,
    fontWeight: "700",
    color: colors.inkMuted,
  },
  confirmButton: {
    backgroundColor: colors.primary,
  },
  confirmText: {
    fontSize: 13.5,
    fontWeight: "800",
    color: colors.inkOnDark,
  },
});
