import { View, StyleSheet } from "react-native";
import Validation from "../../app-files/Validation";
import { useState } from "react";
import BottomNavigationBar from "../../app-files/BottomNavigationBar";

import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

const store = createStore(combineReducers({ favorites }));

function favorites(state = { favoriteGifs: [] }, action) {
  switch (action.type) {
    case "ADD_TO_FAVORITE":
      return {
        ...state,
        favoriteGifs: [...state.favoriteGifs, action.payload],
      };
    case "REMOVE_FROM_FAVORITE":
      return {
        ...state,
        favoriteGifs: state.favoriteGifs.filter(
          (item) => item.id !== action.payload
        ),
      };
    case "REMOVE_ALL_FROM_FAVORITE":
      return {
        ...state,
        favoriteGifs: [],
      };
    default:
      return state;
  }
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Provider store={store}>
      {isLoggedIn ? (
        <BottomNavigationBar />
      ) : (
        <View style={styles.root}>
          <Validation setIsLoggedIn={setIsLoggedIn} />
        </View>
      )}
    </Provider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#AFEEEE",
  },
});
