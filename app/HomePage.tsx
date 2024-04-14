import { View, Text, Button } from "react-native";
import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";

const HomePage = () => {
  const navigation = useNavigation(); // useNavigation hook'unu kullanarak navigation nesnesine erişim sağlayın
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>HomePage</Text>
      <Button
        onPress={() => {
          if (navigation.canGoBack()) {
            // geri dönecek bir ekran olup olmadığını kontrol edin
            navigation.goBack();
          }
        }}
        title="Go back"
      />
    </View>
  );
};

export default HomePage;
