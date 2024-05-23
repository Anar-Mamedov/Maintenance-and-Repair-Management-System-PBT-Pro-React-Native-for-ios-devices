import { View, Text, Button } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const HomePage = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    router.push("/");
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>HomePage</Text>
      <Button
        onPress={() => {
          if (router.canGoBack()) {
            // geri dönecek bir ekran olup olmadığını kontrol edin
            router.back();
          }
        }}
        title="Go back"
      />
      <Button onPress={handleLogout} title="Logout" />
    </View>
  );
};

export default HomePage;
