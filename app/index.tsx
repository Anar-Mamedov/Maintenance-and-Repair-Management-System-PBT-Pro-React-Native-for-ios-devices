import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
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

  if (baseURL === null) {
    return <BaseURL onBaseURLChanged={setBaseURL} />; // onBaseURLChanged prop'u eklendi
  } else {
    return (
      <>
        <Login />
        <RemoveBaseURL onBaseURLRemoved={setBaseURL} />
      </>
    );
  }
};

export default Index;
