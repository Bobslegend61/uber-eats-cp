import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import CartList from "../components/CartList";
import UberText from "../components/UberText";
import useCart from "../hooks/useCart";
import useGeneral from "../hooks/useGeneral";
import tw from "../lib/tailwind";

const CartScreen = () => {
  const { theme, cart } = useGeneral();
  const { purchase } = useCart();
  return (
    <View style={tw`bg-${theme} flex-1`}>
      <StatusBar style={theme === "light" ? "dark" : "light"} />
      <SafeAreaView style={tw`flex-1`}>
        <CartList />
        {cart.length > 0 ? (
          <View
            style={tw`absolute flex-row items-center justify-between bottom-0 left-0 right-0 bg-${theme}-primary py-3 px-3 rounded-t-lg`}
          >
            <UberText
              twStyle={tw`text-lg text-${theme}`}
              csStyle={{ fontFamily: "OpenSans_600SemiBold" }}
            >
              $
              {cart
                .flatMap((item) =>
                  item.items.map((product) => product.quantity * product.price),
                )
                .reduce((a, b) => a + b, 0)
                .toFixed(2)}
            </UberText>
            <TouchableOpacity
              onPress={purchase}
              style={tw`bg-${theme} py-1 px-5 rounded-full items-center`}
            >
              <UberText
                twStyle={tw`text-lg text-${theme}-primary`}
                csStyle={{ fontFamily: "OpenSans_600SemiBold" }}
              >
                Checkout
              </UberText>
            </TouchableOpacity>
          </View>
        ) : null}
      </SafeAreaView>
    </View>
  );
};

export default CartScreen;
