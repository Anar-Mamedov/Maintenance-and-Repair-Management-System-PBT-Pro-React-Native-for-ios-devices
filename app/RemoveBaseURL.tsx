import React from "react";
import { View, Alert, StyleSheet } from "react-native";
import { Button, Text } from "tamagui";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RemoveBaseURL = ({
  onBaseURLRemoved,
}: {
  onBaseURLRemoved: (value: string | null) => void;
}) => {
  const handleRemoveValue = async () => {
    try {
      await AsyncStorage.removeItem("baseURL");
      Alert.alert("Başarılı", "Değer silindi!");
      onBaseURLRemoved(null); // Add this line
    } catch (error) {
      console.error(error);
      Alert.alert("Hata", "Değer silinirken bir hata oluştu.");
    }
  };

  return (
    <View style={{ padding: 20, justifyContent: "center" }}>
      <Button size="$3" onPress={handleRemoveValue} style={styles.button}>
        URL Sil
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#1677ff",
    color: "white",
    fontWeight: "normal",
    fontSize: 14,
  },
});

export default RemoveBaseURL;
