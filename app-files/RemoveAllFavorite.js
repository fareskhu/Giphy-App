import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Alert, Pressable, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

const RemoveAllFavorite = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const removeFavorites = () => {
    Alert.alert(
      t("Confirm Action"),
      t("Are you sure you want to remove all favorites?"),
      [
        {
          text: t("Cancel"),
          style: "cancel",
        },
        {
          text: t("Yes"),
          onPress: () => {
            dispatch({ type: "REMOVE_ALL_FROM_FAVORITE" });
          },
        },
      ]
    );
  };

  return (
    <Pressable style={styles.floatingButton} onPress={removeFavorites}>
      <Ionicons name="trash-outline" size={30} color="white" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#e60000",
    // #e60000
    borderRadius: 50,
    padding: 15,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
});

export default RemoveAllFavorite;
