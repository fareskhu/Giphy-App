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

// import React, { useEffect } from "react";
// import {
//   View,
//   Image,
//   Pressable,
//   StyleSheet,
//   Linking,
//   Alert,
// } from "react-native";
// import IconButton from "../IconButton";
// import Animated, {
//   Easing,
//   useSharedValue,
//   withTiming,
//   useAnimatedStyle,
// } from "react-native-reanimated"; // Import Reanimated

// const DetailsImage = ({ image, url, isFavorite, toggleFavorite }) => {
//   // Define animation values
//   const imageOpacity = useSharedValue(0);
//   const imageScale = useSharedValue(0.8);

//   // Start animation when the component mounts
//   useEffect(() => {
//     imageOpacity.value = withTiming(1, { duration: 600 });
//     imageScale.value = withTiming(1, {
//       duration: 600,
//       easing: Easing.out(Easing.exp),
//     });
//   }, []);

//   // Animated style for the image
//   const animatedStyle = useAnimatedStyle(() => ({
//     opacity: imageOpacity.value,
//     transform: [{ scale: imageScale.value }],
//   }));

//   const handlePressImage = async () => {
//     try {
//       const pressed = await Linking.canOpenURL(url);
//       if (pressed) {
//         await Linking.openURL(url);
//       } else {
//         Alert.alert(`Don't know how to open this URL: ${url}`);
//       }
//     } catch (error) {
//       Alert.alert("Failed to open the link. Please try again later.");
//     }
//   };

//   return (
//     <View style={styles.imageContainer}>
//       <Pressable onPress={handlePressImage}>
//         <Animated.Image
//           source={{ uri: image }}
//           style={[styles.image, animatedStyle]}
//         />
//       </Pressable>
//       <Pressable onPress={toggleFavorite} style={styles.icon}>
//         <IconButton isPressed={isFavorite} />
//       </Pressable>
//     </View>
//   );
// };

// export default DetailsImage;

// const styles = StyleSheet.create({
//   imageContainer: {
//     position: "relative",
//   },
//   image: {
//     width: "100%",
//     height: 400,
//     resizeMode: "cover",
//     borderRadius: 15,
//     marginBottom: 20,
//   },
//   icon: {
//     position: "absolute",
//     left: 10,
//     zIndex: 100,
//     borderRadius: 20,
//     padding: 5,
//   },
// });
