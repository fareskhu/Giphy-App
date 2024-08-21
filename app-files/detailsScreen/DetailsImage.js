import {
  View,
  Image,
  Pressable,
  StyleSheet,
  Linking,
  Alert,
} from "react-native";
import IconButton from "../IconButton";

const DetailsImage = ({ image, url, isFavorite, toggleFavorite }) => {
  const handlePressImage = async () => {
    try {
      const pressed = await Linking.canOpenURL(url);
      if (pressed) {
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    } catch (error) {
      Alert.alert("Failed to open the link. Please try again later.");
    }
  };

  return (
    <View style={styles.imageContainer}>
      <Pressable onPress={handlePressImage}>
        <Image source={{ uri: image }} style={styles.image} />
      </Pressable>
      <Pressable onPress={toggleFavorite} style={styles.icon}>
        <IconButton isPressed={isFavorite} />
      </Pressable>
    </View>
  );
};

export default DetailsImage;

const styles = StyleSheet.create({
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 400,
    resizeMode: "cover",
    borderRadius: 15,
    marginBottom: 20,
  },
  icon: {
    position: "absolute",
    left: 10,
    zIndex: 100,
    borderRadius: 20,
    padding: 5,
  },
});
