import React, { useState } from "react";
import { View, Alert, StyleSheet, Text, Image } from "react-native";
import { Button, Input } from "tamagui";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BaseURL = ({ onBaseURLChanged }: { onBaseURLChanged: any }) => {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  const handleSaveValue = async () => {
    if (inputValue.trim() === "") {
      setIsEmpty(true);
      return;
    }

    setIsEmpty(false);

    try {
      await AsyncStorage.setItem("baseURL", inputValue);
      Alert.alert("Başarılı", "Değer kaydedildi!");
      onBaseURLChanged(inputValue);
    } catch (error) {
      console.error(error);
      Alert.alert("Hata", "Değer kaydedilirken bir hata oluştu.");
    }
  };

  const handleChangeText = (text: string) => {
    setInputValue(text);
    setIsEmpty(false); // Inputa yazı girildiğinde hata mesajını gizle
  };

  return (
    <View style={{ padding: 20, flex: 1, justifyContent: "center" }}>
      <View style={{ marginBottom: 20 }}>
        <Image
          source={require("../assets/images/logo.png")} // Dosya yolu örnek olarak verilmiştir, gerçek dosya yolunu giriniz.
          style={styles.logo}
        />
        <Text style={{ textAlign: "center" }}>version: 0.0.1</Text>
      </View>
      <Input
        value={inputValue}
        onChangeText={handleChangeText}
        placeholder="URL girin"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={[styles.input, isFocused && styles.focusedInput]}
      />
      {isEmpty && <Text style={styles.errorText}>Alanın doldurulması lazım!</Text>}
      <Button size="$3" onPress={handleSaveValue} style={styles.button}>
        Kaydet
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
  logo: {
    width: 150, // Logo genişliği
    alignSelf: "center", // Logo merkeze hizalanır
    resizeMode: "contain", // Logo oranlarını korur
  },
  focusedInput: {
    borderColor: "blue",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#0051ff",
    color: "white",
    fontWeight: "normal",
    fontSize: 14,
  },
});

export default BaseURL;
