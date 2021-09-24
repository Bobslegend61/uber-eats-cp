import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Icon, Input } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import UberText from "../components/UberText";
import { appTheme } from "../config";
import useGeneral from "../hooks/useGeneral";
import useLogin from "../hooks/useLogin";
import tw from "../lib/tailwind";

const RegisterScreen = () => {
  const { theme, navigation } = useGeneral();
  const {
    email,
    password,
    setEmail,
    setPassword,
    resetFields,
    confirmPassword,
    setConfirmPassword,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    register,
  } = useLogin();
  return (
    <View style={tw`flex-1 bg-${theme}`}>
      <StatusBar style={theme === "light" ? "dark" : "light"} />
      <SafeAreaView style={tw`flex-1 items-center justify-between`}>
        <View style={tw`w-full`}>
          <View style={tw`flex-row items-center w-full px-4`}>
            <TouchableOpacity
              onPress={() => {
                resetFields();
                navigation.goBack();
              }}
            >
              <Icon
                name="arrow-back-outline"
                type="ionicon"
                size={30}
                color={appTheme?.[theme].primary}
              />
            </TouchableOpacity>
            <UberText
              twStyle={tw`ml-2 text-${theme}-primary uppercase`}
              csStyle={{ fontFamily: "OpenSans_600SemiBold" }}
            >
              Login
            </UberText>
          </View>
          <Image
            source={require("../assets/icon.png")}
            resizeMode="contain"
            style={tw`w-28 h-28 mt-10 self-center`}
          />
        </View>
        <View style={tw`w-full px-3`}>
          <UberText
            twStyle={tw`text-2xl ml-2 text-${theme}-primary`}
            csStyle={{ fontFamily: "OpenSans_600SemiBold" }}
          >
            Register
          </UberText>
          <View style={tw`mt-4`}>
            <Input
              placeholder="First name"
              autoCompleteType="name"
              onChangeText={(text) => setFirstName(text)}
              leftIcon={{
                name: "person",
                type: "ionicon",
                color: appTheme?.[theme].primary,
              }}
              value={firstName}
              placeholderTextColor="gray"
              inputContainerStyle={tw`bg-${theme}-accent rounded px-3 border-0`}
              inputStyle={[
                tw`ml-3 text-${theme}-primary`,
                { fontFamily: "OpenSans_600SemiBold" },
              ]}
            />
            <Input
              placeholder="Last name"
              autoCompleteType="name"
              onChangeText={(text) => setLastName(text)}
              leftIcon={{
                name: "person",
                type: "ionicon",
                color: appTheme?.[theme].primary,
              }}
              value={lastName}
              placeholderTextColor="gray"
              inputContainerStyle={tw`bg-${theme}-accent rounded px-3 border-0`}
              inputStyle={[
                tw`ml-3 text-${theme}-primary`,
                { fontFamily: "OpenSans_600SemiBold" },
              ]}
            />
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
            <Input
              placeholder="Confirm Password"
              autoCompleteType="password"
              secureTextEntry
              value={confirmPassword}
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
              onChangeText={(text) => setConfirmPassword(text)}
            />

            <TouchableOpacity
              style={tw`bg-${theme}-primary mx-3 p-3 rounded`}
              onPress={register}
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
      </SafeAreaView>
    </View>
  );
};

export default RegisterScreen;
