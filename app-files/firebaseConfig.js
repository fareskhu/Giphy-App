import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD_-DS_Dip48_6cGN_TAc5AbmWzzO9IrG0",
  authDomain: "giphy-app-d02ef.firebaseapp.com",
  projectId: "giphy-app-d02ef",
  storageBucket: "giphy-app-d02ef.appspot.com",
  messagingSenderId: "90941263948",
  appId: "1:90941263948:ios:a7db3876598e18c2ab24e9",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
