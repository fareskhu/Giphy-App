import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";

function IconButton({ isPressed }) {
  return (
    <View style={styles.root}>
      {isPressed ? (
        <Ionicons name="heart" size={22} color={"red"} />
      ) : (
        <Ionicons name="heart-outline" size={22} color={"red"} />
      )}
    </View>
  );
}
export default IconButton;

const styles = StyleSheet.create({
  root: {
    position: "absolute",
    zIndex: 90,
    left: 5,
    marginTop: 10,
  },
});
