import React, { useState } from "react";
import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Button, Input } from "tamagui";
import AxiosInstance from "../api/http.jsx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons"; // Bu paketi eklemek için `expo install @expo/vector-icons` kullanın
import { useRouter } from "expo-router";

const Page = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();

  // const handleLogin = () => {
  //   // Burada giriş işlemlerini gerçekleştirin
  //   console.log(username, password);
  // };

  const handleLogin = async () => {
    try {
      const response = await AxiosInstance.post("/api/login", {
        KLL_KOD: username,
        KLL_SIFRE: password,
      });
      if (response.data && response.data.AUTH_TOKEN) {
        await AsyncStorage.setItem("token", response.data.AUTH_TOKEN);
        console.log("Token stored successfully");
        // AsyncStorage'den token alınıyor
        const tokenFromStorage = await AsyncStorage.getItem("token");
        console.log("Token from AsyncStorage: ", tokenFromStorage);
        router.push("/MenuDrawer");
      } else {
        console.log("No token received");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <View style={{ padding: 20, flex: 1, gap: 10, justifyContent: "center" }}>
      <View>
        <Image
          source={require("../assets/images/logo.png")} // Dosya yolu örnek olarak verilmiştir, gerçek dosya yolunu giriniz.
          style={styles.logo}
        />
        <Text style={{ textAlign: "center" }}>version: 0.0.1</Text>
      </View>
      <TouchableOpacity>
        <Input
          size="$3"
          value={username}
          onChangeText={setUsername}
          placeholder={"Kullanıcı Adı"}
          textContentType="username" // iOS'ta kullanıcı adı için otomatik doldurma önerisi yapılmasını sağlar
        />
      </TouchableOpacity>
      <View
        style={{ flexDirection: "row", alignItems: "center", width: "100%" }}
      >
        <Input
          size="$3"
          value={password}
          onChangeText={setPassword}
          placeholder={"Şifre"}
          secureTextEntry={!passwordVisible}
          textContentType="password" // iOS'ta şifre için otomatik doldurma önerisi yapılmasını sağlar
          style={{ width: "100%" }}
        />
        <Feather
          name={passwordVisible ? "eye-off" : "eye"}
          size={18}
          color="gray"
          onPress={togglePasswordVisibility}
          style={{ marginLeft: -30 }}
        />
      </View>

      <Button
        size="$3"
        theme="active"
        onPress={handleLogin}
        style={{
          backgroundColor: "#1677ff",
          color: "white",
          fontWeight: "normal",
          fontSize: 14,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        Giriş Yap
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    gap: 10,
    justifyContent: "center",
  },
  logo: {
    width: 150, // Logo genişliği
    alignSelf: "center", // Logo merkeze hizalanır
    resizeMode: "contain", // Logo oranlarını korur
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  input: {
    width: "100%",
  },
  icon: {
    marginLeft: -30,
  },
  button: {
    backgroundColor: "#1677ff",
    color: "white",
    fontWeight: "normal",
    fontSize: 14,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default Page;
