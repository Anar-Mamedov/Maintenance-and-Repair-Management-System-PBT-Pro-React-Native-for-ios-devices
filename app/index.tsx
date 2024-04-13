import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Login from "./login";
import BaseURL from "./baseURL";
import RemoveBaseURL from "./RemoveBaseURL";

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
      </View>
    </ImageBackground>
  );
};

export default Index;
