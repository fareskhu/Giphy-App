import { View, Text, StyleSheet, Pressable } from "react-native";
import { useSelector } from "react-redux";
import FavoriteScreen from "./FavoriteScreen";
import HomeScreen from "./homeScreen/HomeScreen";
import SearchScreen from "./searchScreen/SearchScreen";
import DetailsScreen from "./detailsScreen/DetailsScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const BottomTabs = () => {
  const favoritesCounter = useSelector(
    (state) => state.favorites.favoriteGifs.length
  );

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
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Home Screen", tabBarLabel: "Home" }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{ title: "Favorite Screen", tabBarLabel: "Favorite" }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{ title: "Search Screen", tabBarLabel: "Search" }}
      />
    </Tab.Navigator>
  );
};

const BottomNavigationBar = () => {
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
          title: "Details",
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
