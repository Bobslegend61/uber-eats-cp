import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Input } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import UberText from "../components/UberText";
import { appTheme } from "../config";
import useGeneral from "../hooks/useGeneral";
import useLogin from "../hooks/useLogin";
import tw from "../lib/tailwind";

const LoginScreen = () => {
  const { theme, navigation } = useGeneral();
  const { email, password, setEmail, setPassword, login, resetFields } =
    useLogin();
  return (
    <View style={tw`flex-1 bg-${theme}`}>
      <StatusBar style={theme === "light" ? "dark" : "light"} />
      <SafeAreaView style={tw`flex-1 items-center justify-between`}>
        <Image
          source={require("../assets/icon.png")}
          resizeMode="contain"
          style={tw`w-28 h-28 mt-10`}
        />
        <View style={tw`w-full px-3`}>
          <UberText
            twStyle={tw`text-2xl ml-2 text-${theme}-primary`}
            csStyle={{ fontFamily: "OpenSans_600SemiBold" }}
          >
            Login
          </UberText>
          <View style={tw`mt-4`}>
            <Input
              placeholder="Email Address"
              autoCompleteType="email"
              onChangeText={(text) => setEmail(text)}
              leftIcon={{
                name: "mail",
                type: "ionicon",
                color: appTheme?.[theme].primary,
              }}
              value={email}
              placeholderTextColor="gray"
              inputContainerStyle={tw`bg-${theme}-accent rounded px-3 border-0`}
              inputStyle={[
                tw`ml-3 text-${theme}-primary`,
                { fontFamily: "OpenSans_600SemiBold" },
              ]}
            />

            <Input
              placeholder="Password"
              autoCompleteType="password"
              secureTextEntry
              value={password}
              leftIcon={{
                name: "key",
                type: "ionicon",
                color: appTheme?.[theme].primary,
              }}
              inputContainerStyle={tw`bg-${theme}-accent rounded px-3 border-0`}
              inputStyle={[
                tw`ml-3 text-${theme}-primary`,
                { fontFamily: "OpenSans_600SemiBold" },
              ]}
              placeholderTextColor="gray"
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity style={tw`self-end mb-5 mr-3`}>
              <UberText
                twStyle={tw`text-${theme}-primary text-xs`}
                csStyle={{ fontFamily: "OpenSans_400Regular" }}
              >
                Forgot Password?
              </UberText>
            </TouchableOpacity>

            <TouchableOpacity
              style={tw`bg-${theme}-primary mx-3 p-3 rounded`}
              onPress={login}
            >
              <UberText
                csStyle={{ fontFamily: "OpenSans_600SemiBold" }}
                twStyle={tw`text-${theme} text-center uppercase`}
              >
                Login
              </UberText>
            </TouchableOpacity>
            <View style={tw`px-3 my-4`}>
              <UberText
                twStyle={tw`text-${theme}-primary`}
                csStyle={{ fontFamily: "OpenSans_400Regular" }}
              >
                Don't have an account with us?
              </UberText>
              <TouchableOpacity
                style={tw`bg-${theme}-primary p-3 mt-4 rounded`}
                onPress={() => {
                  resetFields();
                  navigation.navigate("RegisterScreen");
                }}
              >
                <UberText
                  csStyle={{ fontFamily: "OpenSans_600SemiBold" }}
                  twStyle={tw`text-${theme} text-center uppercase`}
                >
                  Register
                </UberText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default LoginScreen;
