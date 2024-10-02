import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet, Pressable, Alert, Linking } from "react-native";
import { Camera, CameraView } from "expo-camera";
import Localization from "./Localization";

const SettingsScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraVisible, setCameraVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const openCamera = () => {
    if (hasPermission === true) {
      Alert.alert(
        "Camera Access",
        "Do you want to open the camera?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => setCameraVisible(true),
          },
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert("Camera access is required.");
    }
  };

  const closeCamera = () => {
    setCameraVisible(false);
  };

  if (cameraVisible) {
    return (
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={({ data }) => {
          Linking.openURL(data);
        }}
      >
        <View style={styles.cameraControl}>
          <Pressable onPress={closeCamera} style={styles.closeButton}>
            <Ionicons name="close-circle-outline" size={50} color="white" />
          </Pressable>
        </View>
      </CameraView>
    );
  }

  return (
    <View style={styles.root}>
      <Pressable style={styles.camera} onPress={openCamera}>
        <Ionicons name="camera-outline" size={36} color="white" />
      </Pressable>
      <Localization />
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  camera: {
    backgroundColor: "red",
    borderRadius: 14,
    padding: 10,
  },
  cameraControl: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderRadius: 50,
  },
});
// try {
//   const supported = Linking.openURL(data);
//   if (supported) {
//     await Linking.openURL(data);
//   } else {
//     Alert.alert(
//       "Invalid URL",
//       "The scanned code is not a valid URL."
//     );
//   }
// } catch (error) {
//   Alert.alert("Error", "Unable to open the URL.");
// }

// try {
//   const supported = Linking.openURL(data);
//   if (supported) {
//     Linking.openURL(data);
//   } else {
//     Alert.alert(
//       "Invalid URL",
//       "The scanned code is not a valid URL."
//     );
//   }
// } catch (error) {
//   Alert.alert("Error", "Unable to open the URL.");
// }
