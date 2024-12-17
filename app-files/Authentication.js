import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Login";
import Signup from "./Signup";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator();

const Authentication = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={({ navigation }) => ({
          headerShown: true,
          title: "Signup",

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

export default Authentication;
