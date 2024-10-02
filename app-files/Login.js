import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Pressable,
  Keyboard,
} from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "./firebaseConfig";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for the eye icon

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [hidePassword, setHidePassword] = useState(true); // State to toggle password visibility

  const dispatch = useDispatch();
  const navigation = useNavigation();

  // Email regex: Start with letters, then can have numbers, _, -, ends with valid domain
  const emailRegex =
    /^[A-Za-z][A-Za-z0-9_-]*@(gmail|yahoo|outlook|hotmail)\.(com|net|org)$/;

  // Password regex: Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special character
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const loginHandler = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      dispatch({ type: "LOGIN" });
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        setPasswordError("The password is incorrect!");
      } else if (error.code === "auth/user-not-found") {
        setEmailError("No user found with this email!");
      } else if (error.code === "auth/invalid-email") {
        setEmailError("Invalid email format!");
      } else {
        setEmailError("Your email/password is incorrect.");
      }
    }
  };

  const validationHandler = () => {
    setEmailError("");
    setPasswordError("");
    setHasSubmitted(true);

    // Case 1: Both email and password are empty
    if (!email && !password) {
      setEmailError("You must enter an email.");
      setPasswordError("You must enter a password.");
    }
    // Case 2: Both email and password are invalid
    else if (!emailRegex.test(email) && !passwordRegex.test(password)) {
      setEmailError("Email does not meet the requirements.");
      setPasswordError("Password does not meet the requirements.");
    }
    // Case 3: Email is invalid, password is valid
    else if (!emailRegex.test(email)) {
      setEmailError("Email does not meet the requirements.");
    }
    // Case 4: Email is valid, password is invalid
    else if (!passwordRegex.test(password)) {
      setPasswordError("Password does not meet the requirements.");
    }
    // Success case: both email and password are valid
    else {
      loginHandler();
    }
  };

  const emailHandler = (text) => {
    setEmail(text);

    if (emailRegex.test(text)) {
      setEmailError("");
    }

    if (emailError === "") {
      if (!emailRegex.test(text)) {
        setEmailError("Email does not meet the requirements.");
      }
    }
  };

  const passwordHandler = (pass) => {
    setPassword(pass);
    if (passwordRegex.test(pass)) {
      setPasswordError("");
    }
    if (passwordError === "") {
      if (!passwordRegex.test(pass)) {
        setPasswordError("Password does not meet the requirements.");
      }
    }
  };

  const dismissKeyboardHandler = () => {
    Keyboard.dismiss();
  };

  // Function to toggle password visibility
  const showPasswordHandler = () => {
    setHidePassword(!hidePassword);
  };

  return (
    <Pressable onPress={dismissKeyboardHandler} style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="grey"
          onChangeText={emailHandler}
          value={email}
          returnKeyType={"next"}
          onSubmitEditing={() => {
            this.Password.focus();
          }}
          blurOnSubmit={false}
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
            secureTextEntry={hidePassword} // Hide or show password
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
            onPress={showPasswordHandler} // Toggle show/hide password
          />
        </View>
        {hasSubmitted && passwordError ? (
          <Text style={styles.errorText}>{passwordError}</Text>
        ) : null}
      </View>
      <Pressable style={styles.button} onPress={validationHandler}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
      <Pressable
        style={styles.signupButton}
        onPress={() => navigation.navigate("Signup")}
      >
        <Text style={styles.signUpText}>Sign Up</Text>
      </Pressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#AFEEEE",
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
    backgroundColor: "red",
    width: "60%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 4,
    flexDirection: "row",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  signupButton: {
    backgroundColor: "red",
    width: "60%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    borderRadius: 4,
    marginTop: 10,
  },
  signUpText: {
    color: "white",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold",
  },
});

export default Login;
