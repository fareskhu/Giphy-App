import { useEffect, useState } from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Authentication from "../../app-files/Authentication";
import BottomNavigationBar from "../../app-files/BottomNavigationBar";
import { store, persistor } from "../../app-files/store";
import { firebase } from "../../app-files/firebaseConfig";
import { I18nManager, StyleSheet, View } from "react-native"; // Import I18nManager for layout direction
import i18n from "@/app-files/i18";
import AsyncStorage from "@react-native-async-storage/async-storage";

I18nManager.allowRTL(true);
I18nManager.forceRTL(false);

const AppContent = () => {
  const isLoggedIn = useSelector((state) => state.favorites.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    // Handle the authentication state
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch({ type: "LOGIN" });
      }
    });

    return unsubscribe;
  }, [dispatch]);

  if (isLoggedIn) {
    return <BottomNavigationBar />;
  } else {
    return <Authentication />;
  }
};

export default function App() {
  const [language, setLanguage] = useState();
  const getLanguage = async () => {
    let language = await AsyncStorage.getItem("lang");
    setLanguage(language);
  };

  useEffect(() => {
    // I18nManager.forceRTL(false);

    if (language === "ar") {
      i18n.changeLanguage("ar");
      I18nManager.forceRTL(true);
    } else {
      i18n.changeLanguage("en");
      I18nManager.forceRTL(false);
    }
  }, [language]);

  useEffect(() => {
    getLanguage();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContent />
      </PersistGate>
    </Provider>
  );
}
