import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import IconButton from "../IconButton";

const GifItem = ({ item, isFavorite, toggleFavorite, pressHandler }) => (
  <Pressable style={styles.itemContainer} onPress={() => pressHandler(item)}>
    <View style={styles.viewImage}>
      <Pressable style={styles.icon} onPress={() => toggleFavorite(item)}>
        <IconButton isPressed={isFavorite} />
      </Pressable>

      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />
      </View>
    </View>

    <Text style={styles.title} numberOfLines={1}>
      {item.title}
    </Text>
    <Text numberOfLines={2} style={styles.description}>
      {item.description
        ? item.description
        : "There is no description for this Gif"}
    </Text>
  </Pressable>
);

export default GifItem;

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "white",
    marginBottom: 16,
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  viewImage: {
    paddingLeft: 4,
    resizeMode: "cover",
  },
  icon: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    zIndex: 90,
    left: 5,
    marginTop: 20,
  },
  imageContainer: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    backgroundColor: "white",
    paddingRight: 5,
    resizeMode: "cover",
    marginTop: 10,
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    borderRadius: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
    color: "#333",
    paddingHorizontal: 5,
  },
  description: {
    fontSize: 12,
    color: "#666",
    paddingHorizontal: 5,
    marginBottom: 10,
  },
});
