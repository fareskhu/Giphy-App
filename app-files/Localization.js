import { View, StyleSheet, Pressable, Alert, I18nManager } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import i18n from "./i18";
import { useTranslation } from "react-i18next";
import * as Updates from "expo-updates";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Localization = () => {
  const { t } = useTranslation();

  const switchToArabic = async () => {
    await AsyncStorage.setItem("lang", "ar");

    I18nManager.forceRTL(true);
    I18nManager.allowRTL(true);
    Updates.reloadAsync();
    setTimeout(() => {
      i18n.changeLanguage("ar");
    }, 1000);
  };
  const switchToEnglish = async () => {
    await AsyncStorage.setItem("lang", "en");
    I18nManager.forceRTL(false);
    I18nManager.allowRTL(false);

    Updates.reloadAsync();
    setTimeout(() => {
      i18n.changeLanguage("en");
    }, 1000);
  };

  const showLanguageOptions = () => {
    Alert.alert(
      t("Select Language"),
      t("Choose your preferred language:"),
      [
        {
          text: t("Arabic"),
          onPress: switchToArabic,
        },
        {
          text: t("English"),
          onPress: switchToEnglish,
        },
        {
          text: t("Cancel"),
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <Pressable onPress={showLanguageOptions} style={styles.container}>
      <Ionicons
        name="globe-outline"
        size={36}
        color="white"
        style={styles.icon}
      />
    </Pressable>
  );
};

export default Localization;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,

    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
  },
  icon: {
    color: "white",
  },
});
