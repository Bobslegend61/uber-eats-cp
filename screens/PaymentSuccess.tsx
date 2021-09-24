import React from "react";
import { View } from "react-native";
import useGeneral from "../hooks/useGeneral";
import LottieView from "lottie-react-native";
import tw from "../lib/tailwind";
import UberText from "../components/UberText";
import { TouchableOpacity } from "react-native-gesture-handler";

const PaymentSuccess = () => {
  const { theme, navigation } = useGeneral();
  const animPath =
    theme === "dark"
      ? require("../assets/animations/dark-truck-animation.json")
      : require("../assets/animations/light-truck-animation.json");
  return (
    <View style={tw`flex-1 items-center justify-center bg-${theme}`}>
      <LottieView source={animPath} loop autoPlay style={tw`w-56 h-48`} />

      <View style={tw`mt-5 w-full justify-center items-center`}>
        <UberText
          twStyle={tw`text-${theme}-primary text-2xl`}
          csStyle={{ fontFamily: "OpenSans_600SemiBold" }}
        >
          Yeee!!!!!!
        </UberText>
        <UberText
          twStyle={tw`text-${theme}-primary mt-3`}
          csStyle={{ fontFamily: "OpenSans_600SemiBold" }}
        >
          Your order has been placed successfully
        </UberText>
        <TouchableOpacity
          onPress={() => navigation.navigate("HomeScreen")}
          style={tw`mt-3 rounded-full py-2 px-5 bg-${theme}-primary`}
        >
          <UberText
            twStyle={tw`text-${theme}`}
            csStyle={{ fontFamily: "OpenSans_600SemiBold" }}
          >
            Continue Shopping
          </UberText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PaymentSuccess;
