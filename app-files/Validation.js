import {
  StyleSheet,
  TextInput,
  View,
  Alert,
  Text,
  Pressable,
} from "react-native";
import { useState } from "react";
import { useDispatch } from "react-redux";

const Validation = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  function validationHandler() {
    const regex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$");
    if (!regex.test(email)) {
      Alert.alert("Please enter a valid email");
    } else if (password.length < 8) {
      Alert.alert("Please enter a valid password");
      return false;
    } else {
      dispatch({ type: "LOGIN", payload: { email, password } });
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="grey"
          onChangeText={setEmail}
          value={email}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="grey"
          secureTextEntry={true}
          onChangeText={setPassword}
          value={password}
        />
      </View>
      <Pressable style={styles.button} onPress={validationHandler}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderColor: "black",
    borderRadius: 4,
    height: 40,
    borderWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: "white",
    fontSize: 16,
    width: 250,
  },
  button: {
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 4,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default Validation;
