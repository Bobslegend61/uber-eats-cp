import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { RootSiblingParent } from "react-native-root-siblings";
import React from "react";
import { Provider } from "react-redux";
import AppIndex from "./AppIndex";
import { store } from "./store";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { KeyboardAvoidingView, Platform } from "react-native";

export default function App() {
  return (
    <Provider store={store}>
      <RootSiblingParent>
        <SafeAreaProvider>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
          >
            <NavigationContainer>
              <AppIndex />
            </NavigationContainer>
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </RootSiblingParent>
    </Provider>
  );
}
