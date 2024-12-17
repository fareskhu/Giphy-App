import { Ionicons } from "@expo/vector-icons";
import { TextInput, StyleSheet, View, Pressable, Keyboard } from "react-native";
import { useTranslation } from "react-i18next";

const SearchBar = ({ searchText, setSearchText, onSearch }) => {
  const handleSearch = () => {
    onSearch();
    Keyboard.dismiss();
  };
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder={t("Search")}
        placeholderTextColor="grey"
        value={searchText}
        onChangeText={setSearchText}
        returnKeyType="search"
        onSubmitEditing={handleSearch}
      />
      <Pressable onPress={handleSearch} style={styles.icon}>
        <Ionicons name="search" size={20} color="black" />
      </Pressable>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 8,
    padding: 5,
    marginVertical: 10,
    marginHorizontal: 30,
    height: 45,
  },
  textInput: {
    flex: 1,
    padding: 8,
    fontSize: 16,
  },
  icon: {
    marginLeft: 10,
  },
});
