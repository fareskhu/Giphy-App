import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import IconButton from "../IconButton";

const GifItem = ({
  item,
  isFavorite,
  toggleFavorite,
  pressHandler,
  screenType,
}) => (
  <Pressable
    style={[
      styles.itemContainer,
      screenType === "SearchScreen" ? styles.searchScreenItemContainer : null,
    ]}
    onPress={() => pressHandler(item)}
  >
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
    flex: 1,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchScreenItemContainer: {
    margin: 5,
  },
  viewImage: {
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
    resizeMode: "cover",
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
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

// import { View, Text, Image, Pressable, StyleSheet } from "react-native";
// import IconButton from "../IconButton";
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   withTiming,
// } from "react-native-reanimated"; // Import Reanimated

// const GifItem = ({
//   item,
//   isFavorite,
//   toggleFavorite,
//   pressHandler,
//   screenType,
// }) => {
//   // Animation values for image scaling
//   const scaleValue = useSharedValue(1);

//   // Animated style for image scaling
//   const animatedStyle = useAnimatedStyle(() => ({
//     transform: [{ scale: scaleValue.value }],
//   }));

//   // Handle press for scaling effect and navigating to Details
//   const handlePress = () => {
//     // Scale the image slightly before opening details
//     scaleValue.value = withTiming(0.95, { duration: 150 }, () => {
//       // Reset scale back after navigating
//       scaleValue.value = withTiming(1, { duration: 150 });
//     });
//     pressHandler(item); // Navigate to Details
//   };

//   return (
//     <Pressable
//       style={[
//         styles.itemContainer,
//         screenType === "SearchScreen" ? styles.searchScreenItemContainer : null,
//       ]}
//       onPress={handlePress} // Open details screen only on press
//     >
//       <View style={styles.viewImage}>
//         <Pressable style={styles.icon} onPress={() => toggleFavorite(item)}>
//           <IconButton isPressed={isFavorite} />
//         </Pressable>

//         {/* Only the Image is animated here */}
//         <Animated.View style={[styles.imageContainer, animatedStyle]}>
//           <Image source={{ uri: item.image }} style={styles.image} />
//         </Animated.View>
//       </View>

//       <Text style={styles.title} numberOfLines={1}>
//         {item.title}
//       </Text>
//       <Text numberOfLines={2} style={styles.description}>
//         {item.description
//           ? item.description
//           : "There is no description for this Gif"}
//       </Text>
//     </Pressable>
//   );
// };

// export default GifItem;

// const styles = StyleSheet.create({
//   itemContainer: {
//     backgroundColor: "white",
//     flex: 1,
//     borderRadius: 10,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   searchScreenItemContainer: {
//     margin: 5,
//   },
//   viewImage: {
//     resizeMode: "cover",
//   },
//   icon: {
//     flexDirection: "row",
//     alignItems: "center",
//     position: "absolute",
//     zIndex: 90,
//     left: 5,
//     marginTop: 20,
//   },
//   imageContainer: {
//     resizeMode: "cover",
//     borderRadius: 10,
//   },
//   image: {
//     width: "100%",
//     height: 250,
//     resizeMode: "cover",
//     borderTopRightRadius: 8,
//     borderTopLeftRadius: 8,
//   },
//   title: {
//     fontSize: 14,
//     fontWeight: "bold",
//     marginTop: 5,
//     color: "#333",
//     paddingHorizontal: 5,
//   },
//   description: {
//     fontSize: 12,
//     color: "#666",
//     paddingHorizontal: 5,
//     marginBottom: 10,
//   },
// });
