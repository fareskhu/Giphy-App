import { useEffect, useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Pressable,
  Keyboard,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { firebase } from "./firebaseConfig";
import { Ionicons } from "@expo/vector-icons";
import * as LocalAuthentication from "expo-local-authentication";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);

  const dispatch = useDispatch();

  const onAuthenticate = async () => {
    const { success } = await LocalAuthentication.authenticateAsync();
    if (success) {
      signUpHandler();
    } else {
    }
    Alert.alert("Error", "Authentication Failed!");
  };

  const emailRegex =
    /^[A-Za-z][A-Za-z0-9_-]*@(gmail|yahoo|outlook|hotmail)\.(com|net|org)$/;

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const signUpHandler = async () => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      dispatch({ type: "SIGNUP", payload: { email, password } });
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setEmailError("That email address is already in use!");
      } else if (error.code === "auth/invalid-email") {
        setEmailError("That email address is invalid!");
      } else {
        setEmailError("Something went wrong. Please try again.");
      }
    }
  };

  const validationHandler = () => {
    setEmailError("");
    setPasswordError("");
    setHasSubmitted(true);

    if (!email && !password) {
      setEmailError("You must enter an email.");
      setPasswordError("You must enter a password.");
    } else if (!emailRegex.test(email) && !passwordRegex.test(password)) {
      setEmailError("Email does not meet the requirements.");
      setPasswordError("Password does not meet the requirements.");
    } else if (!emailRegex.test(email)) {
      setEmailError("Email does not meet the requirements.");
    } else if (!passwordRegex.test(password)) {
      setPasswordError("Password does not meet the requirements.");
    } else {
      signUpHandler();
    }
  };

  const dismissKeyboardHandler = () => {
    Keyboard.dismiss();
  };

  const emailHandler = (text) => {
    setEmail(text);
    if (emailRegex.test(text)) {
      setEmailError("");
    }
    if (emailError === "" && !emailRegex.test(text)) {
      setEmailError("Email does not meet the requirements.");
    }
  };

  const passwordHandler = (pass) => {
    setPassword(pass);
    if (passwordRegex.test(pass)) {
      setPasswordError("");
    }
    if (passwordError === "" && !passwordRegex.test(pass)) {
      setPasswordError("Password does not meet the requirements.");
    }
  };

  const showPasswordHandler = () => {
    setHidePassword(!hidePassword);
  };

  return (
    <Pressable style={styles.container} onPress={dismissKeyboardHandler}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="grey"
          onChangeText={emailHandler}
          value={email}
          returnKeyType={"next"}
          blurOnSubmit={false}
          onSubmitEditing={() => {
            this.Password.focus();
          }}
        />
        {hasSubmitted && emailError ? (
          <Text style={styles.errorText}>{emailError}</Text>
        ) : null}
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.inputPassword}
            placeholder="Password"
            placeholderTextColor="grey"
            secureTextEntry={hidePassword}
            onChangeText={passwordHandler}
            value={password}
            ref={(input) => {
              this.Password = input;
            }}
          />
          <Ionicons
            name={hidePassword ? "eye-outline" : "eye-off-outline"}
            size={20}
            color="grey"
            style={styles.eyeIcon}
            onPress={showPasswordHandler}
          />
        </View>
        {hasSubmitted && passwordError ? (
          <Text style={styles.errorText}>{passwordError}</Text>
        ) : null}
      </View>

      <Pressable style={styles.button} onPress={validationHandler}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={onAuthenticate}>
        <Text style={styles.buttonText}>Sign Up with Face ID</Text>
      </Pressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#AFEEEE",
  },
  inputContainer: {
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
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
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 4,
    height: 40,
    backgroundColor: "white",
    width: 250,
  },
  inputPassword: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  eyeIcon: {
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    width: 250,
    borderRadius: 4,
    alignSelf: "center",
    marginTop: 6,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold",
  },
});

export default Signup;
