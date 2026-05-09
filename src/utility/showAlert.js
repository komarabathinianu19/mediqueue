// ─────────────────────────────────────────────────────────────────────────────
//  showAlert.js  –  Cross-platform Alert utility
//  Works on both React Native (mobile) and Web (browser)
//  Place this in: src/utils/showAlert.js
// ─────────────────────────────────────────────────────────────────────────────

import { Platform, Alert } from "react-native";

/**
 * Cross-platform alert that works on BOTH web and mobile.
 *
 * On mobile (iOS/Android) → uses React Native's native Alert.alert()
 * On web (browser)        → uses window.alert() or a custom web modal
 *
 * Usage:
 *   showAlert("Title", "Message")
 *   showAlert("Confirm?", "Are you sure?", [
 *     { text: "Cancel", style: "cancel" },
 *     { text: "OK", onPress: () => doSomething() }
 *   ])
 */
export const showAlert = (title, message, buttons) => {
  if (Platform.OS === "web") {
    // Web: native Alert.alert() doesn't work, use browser APIs
    if (!buttons || buttons.length === 0) {
      window.alert(`${title}\n\n${message}`);
      return;
    }

    // If there are action buttons (e.g. Confirm/Cancel), use confirm()
    const okButton = buttons.find(
      (b) => b.style !== "cancel" && b.onPress
    );
    const cancelButton = buttons.find((b) => b.style === "cancel");

    if (buttons.length === 1) {
      window.alert(`${title}\n\n${message}`);
      if (buttons[0].onPress) buttons[0].onPress();
      return;
    }

    // 2-button confirm/cancel dialog
    const confirmed = window.confirm(`${title}\n\n${message}`);
    if (confirmed && okButton?.onPress) {
      okButton.onPress();
    } else if (!confirmed && cancelButton?.onPress) {
      cancelButton.onPress();
    }
  } else {
    // Mobile: use native React Native Alert
    Alert.alert(title, message, buttons);
  }
};

/**
 * Shorthand: single OK alert (no buttons needed)
 * showInfo("Login Failed", "Invalid credentials")
 */
export const showInfo = (title, message) => {
  showAlert(title, message, [{ text: "OK" }]);
};

/**
 * Shorthand: confirm/cancel dialog
 * showConfirm("Delete?", "This cannot be undone", () => handleDelete())
 */
export const showConfirm = (title, message, onConfirm, onCancel) => {
  showAlert(title, message, [
    { text: "Cancel", style: "cancel", onPress: onCancel },
    { text: "Confirm", onPress: onConfirm },
  ]);
};