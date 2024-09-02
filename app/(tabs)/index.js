import { View, StyleSheet } from "react-native";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Validation from "../../app-files/Validation";
import BottomNavigationBar from "../../app-files/BottomNavigationBar";
import { store, persistor } from "../../app-files/store";

const AppContent = () => {
  const isLoggedIn = useSelector((state) => state.favorites.isLoggedIn);

  if (isLoggedIn) {
    return <BottomNavigationBar />;
  } else {
    return (
      <View style={styles.root}>
        <Validation />
      </View>
    );
  }
};

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContent />
      </PersistGate>
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
