import { StatusBar } from "expo-status-bar";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import AccountHeader from "../components/AccountHeader";
import AccountUserInterface from "../components/AccountUserInterface";
import UberText from "../components/UberText";
import { appTheme } from "../config";
import useGeneral from "../hooks/useGeneral";
import tw from "../lib/tailwind";

const AccountScreen = () => {
  const { theme, auth, logout } = useGeneral();
  return (
    <View style={tw`flex-1 bg-${theme}`}>
      <StatusBar style={theme === "light" ? "dark" : "light"} />
      <SafeAreaView style={tw`flex-1`}>
        {/* header */}
        <AccountHeader theme={theme} auth={auth} />

        {/* User interfece options */}
        <AccountUserInterface theme={theme} auth={auth} />

        {/* logout */}
        <TouchableOpacity
          style={tw`mt-3 mx-3 flex-row items-center`}
          onPress={logout}
        >
          <Icon
            name="log-out-outline"
            type="ionicon"
            size={25}
            color={appTheme?.[theme].primary}
          />
          <UberText
            twStyle={tw`ml-3 text-${theme}-primary`}
            csStyle={{ fontFamily: "OpenSans_400Regular" }}
          >
            Logout
          </UberText>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default AccountScreen;
