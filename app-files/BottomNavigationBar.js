import { View, Text, StyleSheet, Pressable } from "react-native";
import { useSelector } from "react-redux";
import FavoriteScreen from "./FavoriteScreen";
import HomeScreen from "./homeScreen/HomeScreen";
import SearchScreen from "./searchScreen/SearchScreen";
import DetailsScreen from "./detailsScreen/DetailsScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import LogoutButton from "./LogoutButton";
import SettingsScreen from "./SettingsScreen";
import { useTranslation } from "react-i18next";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const BottomTabs = () => {
  const favoritesCounter = useSelector(
    (state) => state.favorites.favoriteGifs.length
  );
  const { t } = useTranslation(); // Hook to use translations

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let routeName = route.name;

          if (routeName === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (routeName === "Favorite") {
            iconName = focused ? "heart" : "heart-outline";
          } else if (routeName === "Search") {
            iconName = "search";
          } else if (routeName === "Settings") {
            iconName = focused ? "settings-sharp" : "settings-outline";
          }

          return (
            <View>
              <Ionicons name={iconName} color={color} size={size} />
              {routeName === "Favorite" && favoritesCounter > 0 && (
                <View style={styles.viewContainer}>
                  <Text style={styles.text}>
                    {favoritesCounter > 9 ? "+9" : favoritesCounter}
                  </Text>
                </View>
              )}
            </View>
          );
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: t("Home Screen"),
          tabBarLabel: t("Home"),
          headerRight: () => <LogoutButton />,
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{ title: t("Favorite Screen"), tabBarLabel: t("Favorite") }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{ title: t("Search Screen"), tabBarLabel: t("Search") }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: t("Settings Screen"), tabBarLabel: t("Settings") }}
      />
    </Tab.Navigator>
  );
};

const BottomNavigationBar = () => {
  const { t } = useTranslation(); // Hook to use translations
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomTabs"
        component={BottomTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={({ navigation }) => ({
          headerShown: true,
          title: t("Details"),
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerLeft: () => (
            <Pressable onPress={() => navigation.goBack()}>
              <Ionicons
                name="arrow-back"
                size={24}
                color="white"
                style={{ marginLeft: 10 }}
              />
            </Pressable>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default BottomNavigationBar;

const styles = StyleSheet.create({
  viewContainer: {
    position: "absolute",
    right: -8,
    top: -3,
    backgroundColor: "red",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});

// import { View, Text, StyleSheet, Pressable } from "react-native";
// import { useSelector } from "react-redux";
// import FavoriteScreen from "./FavoriteScreen";
// import HomeScreen from "./homeScreen/HomeScreen";
// import SearchScreen from "./searchScreen/SearchScreen";
// import DetailsScreen from "./detailsScreen/DetailsScreen";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import {
//   createStackNavigator,
//   TransitionPresets,
// } from "@react-navigation/stack"; // Import TransitionPresets
// import { Ionicons } from "@expo/vector-icons";
// import LogoutButton from "./LogoutButton";
// import SettingsScreen from "./SettingsScreen";
// import { useTranslation } from "react-i18next";

// const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();

// const BottomTabs = () => {
//   const favoritesCounter = useSelector(
//     (state) => state.favorites.favoriteGifs.length
//   );
//   const { t } = useTranslation(); // Hook to use translations

//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName;
//           let routeName = route.name;

//           if (routeName === "Home") {
//             iconName = focused ? "home" : "home-outline";
//           } else if (routeName === "Favorite") {
//             iconName = focused ? "heart" : "heart-outline";
//           } else if (routeName === "Search") {
//             iconName = "search";
//           } else if (routeName === "Settings") {
//             iconName = focused ? "settings-sharp" : "settings-outline";
//           }

//           return (
//             <View>
//               <Ionicons name={iconName} color={color} size={size} />
//               {routeName === "Favorite" && favoritesCounter > 0 && (
//                 <View style={styles.viewContainer}>
//                   <Text style={styles.text}>
//                     {favoritesCounter > 9 ? "+9" : favoritesCounter}
//                   </Text>
//                 </View>
//               )}
//             </View>
//           );
//         },
//         tabBarActiveTintColor: "tomato",
//         tabBarInactiveTintColor: "gray",
//       })}
//     >
//       <Tab.Screen
//         name="Home"
//         component={HomeScreen}
//         options={{
//           title: t("Home Screen"),
//           tabBarLabel: t("Home"),
//           headerRight: () => <LogoutButton />,
//         }}
//       />
//       <Tab.Screen
//         name="Favorite"
//         component={FavoriteScreen}
//         options={{ title: t("Favorite Screen"), tabBarLabel: t("Favorite") }}
//       />
//       <Tab.Screen
//         name="Search"
//         component={SearchScreen}
//         options={{ title: t("Search Screen"), tabBarLabel: t("Search") }}
//       />
//       <Tab.Screen
//         name="Settings"
//         component={SettingsScreen}
//         options={{ title: t("Settings Screen"), tabBarLabel: t("Settings") }}
//       />
//     </Tab.Navigator>
//   );
// };

// const BottomNavigationBar = () => {
//   const { t } = useTranslation();

//   return (
//     <Stack.Navigator
//       screenOptions={{
//         gestureEnabled: true,
//         ...TransitionPresets.SlideFromRightIOS, // Use smooth slide transition preset
//       }}
//     >
//       <Stack.Screen
//         name="BottomTabs"
//         component={BottomTabs}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="Details"
//         component={DetailsScreen}
//         options={({ navigation }) => ({
//           headerShown: true,
//           title: t("Details"),
//           headerStyle: {
//             backgroundColor: "#f4511e",
//           },
//           headerTintColor: "#fff",
//           headerTitleStyle: {
//             fontWeight: "bold",
//           },
//           headerLeft: () => (
//             <Pressable onPress={() => navigation.goBack()}>
//               <Ionicons
//                 name="arrow-back"
//                 size={24}
//                 color="white"
//                 style={{ marginLeft: 10 }}
//               />
//             </Pressable>
//           ),
//           transitionSpec: {
//             open: { animation: "timing", config: { duration: 300 } },
//             close: { animation: "timing", config: { duration: 300 } },
//           },
//         })}
//       />
//     </Stack.Navigator>
//   );
// };

// export default BottomNavigationBar;

// const styles = StyleSheet.create({
//   viewContainer: {
//     position: "absolute",
//     right: -8,
//     top: -3,
//     backgroundColor: "red",
//     borderRadius: 10,
//     width: 20,
//     height: 20,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   text: {
//     color: "white",
//     fontSize: 12,
//     fontWeight: "bold",
//   },
// });
