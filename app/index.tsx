import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground, Image, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Login from "./login";
import BaseURL from "./baseURL";
import RemoveBaseURL from "./RemoveBaseURL";
import MenuDrawer from "./MenuDrawer";

const Index = () => {
  const [baseURL, setBaseURL] = useState<string | null>(null);

  useEffect(() => {
    const fetchBaseURL = async () => {
      const storedBaseURL = await AsyncStorage.getItem("baseURL");
      setBaseURL(storedBaseURL);
    };

    fetchBaseURL();
  }, []); // Bağımlılık dizisi boş, yani yalnızca bileşen monte edildiğinde çalışır

  return (
    <ImageBackground
      source={require("../assets/images/login_background.webp")} // Yerel dosya yolunu buraya girin
      style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "rgba(238, 238, 238, 0.94)", paddingBottom: 15 }}>
        {baseURL === null ? (
          <BaseURL onBaseURLChanged={setBaseURL} />
        ) : (
          <>
            <Login />
            <RemoveBaseURL onBaseURLRemoved={setBaseURL} />
          </>
        )}
        {/* <MenuDrawer /> */}
        <Image
          source={require("../assets/images/orjin-yazilim-logo.png")} // Dosya yolu örnek olarak verilmiştir, gerçek dosya yolunu giriniz.
          style={styles.logo}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  logo: {
    height: 20, // Logo yüksekliği
    alignSelf: "center", // Logo merkeze hizalanır
    resizeMode: "contain", // Logo oranlarını korur
    marginBottom: 15,
  },
});

export default Index;
