import React from "react";
import { Pressable, StyleSheet, Alert } from "react-native";
import { useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { persistor } from "./store";
import { useTranslation } from "react-i18next";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const logoutHandler = () => {
    Alert.alert(t("Confirm Logout"), t("Are you sure you want to log out?"), [
      {
        text: t("Cancel"),
        style: "cancel",
      },
      {
        text: t("Yes"),
        onPress: () => {
          dispatch({ type: "LOGOUT" });
          persistor.purge().then(() => {
            dispatch({ type: "RESET" });
          });
        },
      },
    ]);
  };

  return (
    <Pressable onPress={logoutHandler} style={styles.logoutButton}>
      <Ionicons name="log-out-outline" size={24} color="white" />
    </Pressable>
  );
};

export default LogoutButton;

const styles = StyleSheet.create({
  logoutButton: {
    marginRight: 15,
  },
});
