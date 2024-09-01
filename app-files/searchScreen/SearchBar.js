import { Ionicons } from "@expo/vector-icons";
import { TextInput, StyleSheet, View, Pressable } from "react-native";

const SearchBar = ({ searchText, setSearchText, onSearch }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Search"
        placeholderTextColor="grey"
        value={searchText}
        onChangeText={setSearchText}
      />
      <Pressable onPress={onSearch} style={styles.icon}>
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
    marginTop: 14,
    width: "80%",

    marginHorizontal: 30,
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
