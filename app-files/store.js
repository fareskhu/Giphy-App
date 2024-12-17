import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialFavoritesState = { favoriteGifs: [], isLoggedIn: false };

function reducer(state = initialFavoritesState, action) {
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
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: true,
      };
    case "SIGNUP":
      return {
        ...state,
        isLoggedIn: true,
      };
    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
        favoriteGifs: [],
      };
    case "RESET":
      return initialFavoritesState;
    default:
      return state;
  }
}

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  favorites: persistReducer(persistConfig, reducer),
});

export const store = createStore(rootReducer);
export const persistor = persistStore(store);
