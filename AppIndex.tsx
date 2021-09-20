import AppLoading from "expo-app-loading";
import React from "react";
import { View, Text } from "react-native";
import useAuth from "./hooks/useAuth";

const AppIndex = () => {
  const { fontsLoaded, authenticateUser } = useAuth();

  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={authenticateUser}
        onFinish={() => console.log("Done!")}
        onError={(e) => console.log(e)}
      />
    );
  }

  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
};

export default AppIndex;
