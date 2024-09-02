import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

const LogoutButton = () => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch({ type: "LOGOUT" });
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
